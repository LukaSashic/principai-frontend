"""
GründerAI Backend - Main API (Updated with PayPal Integration)
FastAPI server for business plan analysis with payment processing
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import os
import uuid
from datetime import datetime
from dotenv import load_dotenv
import time
from fastapi.responses import Response
from fastapi.responses import StreamingResponse
import io

# Import our modules
from grant_calibration import analyze_business_plan
from pdf_processor import extract_text_from_file
from paypal_integration import create_order, capture_order, get_order_details
from pdf_generator import generate_report_pdf
from email_service import send_report_email, send_payment_confirmation

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(
    title="GründerAI API",
    description="Business Plan Analysis for Gründungszuschuss Approval",
    version="2.0.0",
)

# CORS Configuration
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3001")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://principai.de",
        "https://www.principai.de",
        "https://principai-frontend.vercel.app",
	"http://localhost:3001",
        "http://localhost:3000",  # Für lokales Testing
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic Models
class Issue(BaseModel):
    title: str
    description: str
    severity: str
    fix: str


class AnalysisResult(BaseModel):
    analysis_id: Optional[str] = None
    score: int
    risk_level: str
    detected_industry: Optional[str] = None
    estimated_revenue: Optional[str] = None
    benchmark_revenue: Optional[str] = None
    top_issues: List[Issue]


class PaymentRequest(BaseModel):
    analysis_id: str
    amount: float = 39.00
    currency: str = "EUR"


class CapturePaymentRequest(BaseModel):
    order_id: str
    analysis_id: str
    customer_email: EmailStr
    customer_name: str


# In-memory storage (replace with database in production)
analysis_storage = {}
payment_storage = {}


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "GründerAI API v2.0 - Now with PayPal Integration!",
        "status": "online",
        "endpoints": {
            "health": "/health",
            "analyze": "/api/analyze",
            "create_payment": "/api/create-payment",
            "capture_payment": "/api/capture-payment",
            "download_report": "/api/download-report/{analysis_id}",
        },
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    anthropic_configured = bool(os.getenv("ANTHROPIC_API_KEY"))
    paypal_configured = bool(
        os.getenv("PAYPAL_CLIENT_ID") and os.getenv("PAYPAL_SECRET")
    )

    return {
        "status": "healthy",
        "anthropic_configured": anthropic_configured,
        "paypal_configured": paypal_configured,
        "timestamp": datetime.now().isoformat(),
    }


@app.post("/api/analyze")
async def analyze_endpoint(file: UploadFile = File(...)):
    """
    Analyze business plan from uploaded PDF/DOCX
    Returns analysis with score, risk level, and top issues
    """
    try:
        # Validate file type
        allowed_types = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ]
        if file.content_type not in allowed_types:
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Only PDF and DOCX files are supported.",
            )

        # Validate file size (max 5MB)
        content = await file.read()
        if len(content) > 5 * 1024 * 1024:
            raise HTTPException(
                status_code=400, detail="File too large. Maximum size is 5MB."
            )

        # Extract text from file
        text = extract_text_from_file(content, file.content_type)

        if not text or len(text.strip()) < 100:
            raise HTTPException(
                status_code=400,
                detail="Could not extract sufficient text from file. Please ensure the document contains readable text.",
            )

        # Analyze with Claude
        result = analyze_business_plan(text)

        # Generate unique analysis ID
        analysis_id = str(uuid.uuid4())

        # Store analysis result
        analysis_storage[analysis_id] = {
            "result": result,
            "timestamp": datetime.now().isoformat(),
            "filename": file.filename,
            "paid": False,
        }

        # Add analysis_id to result
        result["analysis_id"] = analysis_id

        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.post("/api/create-payment")
async def create_payment_endpoint(payment_request: PaymentRequest):
    """Create PayPal payment order"""
    try:
        print(
            f"🔍 DEBUG: Creating payment for analysis_id: {payment_request.analysis_id}"
        )

        # Verify analysis exists
        if payment_request.analysis_id not in analysis_storage:
            print(f"❌ DEBUG: Analysis not found: {payment_request.analysis_id}")
            raise HTTPException(status_code=404, detail="Analysis not found...")

        print(f"✅ DEBUG: Analysis found, creating PayPal order...")

        # Create PayPal order
        order = create_order(
            analysis_id=payment_request.analysis_id,
            amount=payment_request.amount,
            currency=payment_request.currency,
        )

        print(f"✅ DEBUG: PayPal order created: {order}")

        # Store payment info
        payment_storage[order["order_id"]] = {
            "analysis_id": payment_request.analysis_id,
            "amount": payment_request.amount,
            "currency": payment_request.currency,
            "status": "created",
            "created_at": datetime.now().isoformat(),
        }

        print(f"✅ DEBUG: Payment stored in memory")
        print(f"📦 DEBUG: payment_storage keys: {list(payment_storage.keys())}")

        return {
            "success": True,
            "order_id": order["order_id"],
            "approval_url": order["approval_url"],
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ DEBUG: Exception in create_payment: {str(e)}")
        print(f"❌ DEBUG: Exception type: {type(e)}")
        import traceback

        print(f"❌ DEBUG: Traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500, detail=f"Failed to create payment: {str(e)}"
        )


@app.post("/api/capture-payment")
async def capture_payment_endpoint(capture_request: CapturePaymentRequest):
    """
    Capture PayPal payment after user approval
    Generates PDF report and sends email
    """
    try:
        # Verify payment exists
        if capture_request.order_id not in payment_storage:
            raise HTTPException(status_code=404, detail="Payment order not found.")

        # Verify analysis exists
        if capture_request.analysis_id not in analysis_storage:
            raise HTTPException(status_code=404, detail="Analysis not found.")

        # Capture PayPal payment
        capture_result = capture_order(capture_request.order_id)

        if not capture_result.get("completed", False):
            raise HTTPException(
                status_code=400, detail="Payment capture failed. Please try again."
            )

        # Update payment status
        payment_storage[capture_request.order_id]["status"] = "completed"
        payment_storage[capture_request.order_id][
            "captured_at"
        ] = datetime.now().isoformat()

        # Mark analysis as paid
        analysis_storage[capture_request.analysis_id]["paid"] = True
        analysis_storage[capture_request.analysis_id][
            "customer_email"
        ] = capture_request.customer_email
        analysis_storage[capture_request.analysis_id][
            "customer_name"
        ] = capture_request.customer_name

        # Get analysis result
        analysis_result = analysis_storage[capture_request.analysis_id]["result"]

        # Generate PDF report
        reports_dir = os.path.join(os.path.dirname(__file__), "reports")
        os.makedirs(reports_dir, exist_ok=True)
        pdf_path = os.path.join(
            reports_dir, f"report_{capture_request.analysis_id}.pdf"
        )

        generate_report_pdf(analysis_result, pdf_path)

        # Send payment confirmation email
        send_payment_confirmation(
            to_email=capture_request.customer_email,
            customer_name=capture_request.customer_name,
            order_id=capture_request.order_id,
            amount=payment_storage[capture_request.order_id]["amount"],
        )

        # Send report email
        send_report_email(
            to_email=capture_request.customer_email,
            customer_name=capture_request.customer_name,
            score=analysis_result["score"],
            risk_level=analysis_result["risk_level"],
            pdf_path=pdf_path,
        )

        return {
            "success": True,
            "message": "Payment successful! Report has been sent to your email.",
            "download_url": f"/api/download-report/{capture_request.analysis_id}",
            "order_id": capture_request.order_id,
            "capture_id": capture_result.get("capture_id"),
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to process payment: {str(e)}"
        )


@app.get("/api/download-report/{analysis_id}")
async def download_report_endpoint(analysis_id: str):
    """
    Download PDF report (only after payment)
    """
    try:
        # Verify analysis exists
        if analysis_id not in analysis_storage:
            raise HTTPException(status_code=404, detail="Analysis not found.")

        # Verify payment
        if not analysis_storage[analysis_id].get("paid", False):
            raise HTTPException(
                status_code=403,
                detail="Payment required. Please complete payment first.",
            )

        # Check if PDF exists
        pdf_path = os.path.join(
            os.path.dirname(__file__), "reports", f"report_{analysis_id}.pdf"
        )

        if not os.path.exists(pdf_path):
            raise HTTPException(
                status_code=404, detail="Report not found. Please contact support."
            )

        # Return PDF file
        return FileResponse(
            pdf_path,
            media_type="application/pdf",
            filename=f"gruenderai_report_{analysis_id}.pdf",
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to download report: {str(e)}"
        )


@app.get("/api/order-status/{order_id}")
async def get_order_status(order_id: str):
    """
    Get PayPal order status
    """
    try:
        if order_id not in payment_storage:
            raise HTTPException(status_code=404, detail="Order not found.")

        # Get order details from PayPal
        order_details = get_order_details(order_id)

        return {
            "order_id": order_id,
            "status": order_details.get("status"),
            "local_status": payment_storage[order_id].get("status"),
            "amount": payment_storage[order_id].get("amount"),
            "currency": payment_storage[order_id].get("currency"),
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to get order status: {str(e)}"
        )

# Neuer Endpoint (irgendwo in main.py):
@app.post("/api/report/generate")
async def generate_report(data: dict):
    """Generate PDF from analysis data"""
    try:
        from pdf_generator import generate_report_pdf
        
        pdf_bytes = generate_report_pdf(data)
        
        safe_name = data.get('business_name', 'Report').replace(" ", "_")[:30]
        filename = f"ZuschussCheck_{safe_name}.pdf"
        
        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# TEST ENDPOINT - Report Generation ohne Payment
@app.get("/api/test-report")
async def test_report_generation():
    """Generate a test report for development/testing"""

    # Mock analysis data (use real data from your test)
    mock_analysis = {
        "analysis_id": "test_" + str(int(time.time())),
        "score": 25,
        "risk_level": "CRITICAL",
        "detected_industry": "Gastronomie",
        "estimated_revenue": "230.826€",
        "benchmark_revenue": "60.000€",
        "issues": [
            {
                "title": "Zwei Gründerinnen statt Solo-Selbständigkeit",
                "severity": "CRITICAL",
                "description": "Der Businessplan zeigt zwei Geschäftsführerinnen (Victoria Heimbach und Maren Hauke). Der Gründungszuschuss ist jedoch nur für Einzelpersonen verfügbar, die sich solo selbständig machen.",
                "fix": "Nur eine Person kann den Gründungszuschuss beantragen. Die andere muss als Angestellte oder später als Gesellschafterin einsteigen.",
            },
            {
                "title": "Unrealistische Umsatzprognose",
                "severity": "HIGH",
                "description": "Mit 230.826€ im ersten Jahr liegt der geplante Umsatz 4-6x über typischen Gründungszuschuss-Projekten (40-60K€). Dies wirkt unrealistisch für eine Neugründung.",
                "fix": "Umsatzprognose auf realistischere 40.000-60.000€ im ersten Jahr anpassen basierend auf DEHOGA-Benchmarks.",
            },
            {
                "title": "Geplante GmbH-Gründung nicht förderbar",
                "severity": "CRITICAL",
                "description": "Der Plan sieht eine GmbH vor. Dies ist für den Gründungszuschuss nicht geeignet. Gefördert werden nur Einzelunternehmen oder Freiberufler.",
                "fix": "Wechsle zur Rechtsform Einzelunternehmen oder Freiberufler. Als Solo-Selbstständige kannst du später immer noch eine GmbH gründen.",
            },
        ],
    }

    try:
        # Generate PDF
        from pdf_generator import generate_report_pdf

        pdf_bytes = generate_report_pdf(mock_analysis)

        # Return as downloadable PDF
        from fastapi.responses import Response

        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=GruenderAI_Report_Test.pdf"
            },
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Report generation failed: {str(e)}"
        )


@app.get("/api/dev-report/{analysis_id}")
async def dev_report_generation(analysis_id: str):
    """
    Generate report for specific analysis WITHOUT payment check
    FOR DEVELOPMENT ONLY
    """
    try:
        # Verify analysis exists
        if analysis_id not in analysis_storage:
            raise HTTPException(status_code=404, detail="Analysis not found.")

        # Get analysis result
        analysis_result = analysis_storage[analysis_id]["result"]

        # Generate PDF (returns file PATH, not bytes!)
        from pdf_generator import generate_report_pdf
        import os
        
        # Create reports directory
        reports_dir = os.path.join(os.path.dirname(__file__), "reports")
        os.makedirs(reports_dir, exist_ok=True)
        
        # Generate PDF with specific path
        pdf_path = os.path.join(reports_dir, f"dev_report_{analysis_id}.pdf")
        generate_report_pdf(analysis_result, pdf_path)
        
        # READ the generated PDF file
        with open(pdf_path, 'rb') as f:
            pdf_bytes = f.read()

        # Return PDF bytes as downloadable file
        from fastapi.responses import Response
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=ZuschussCheck_Report_{analysis_id}.pdf"
            },
        )
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        print(f"❌ ERROR in dev-report: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500, detail=f"Report generation failed: {str(e)}"
        )

# Run with: uvicorn main:app --reload --host 0.0.0.0 --port 8000
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

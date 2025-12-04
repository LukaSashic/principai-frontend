"""
GründerAI Backend - Main API
FastAPI server for business plan analysis
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

from grant_calibration import analyze_business_plan
from pdf_processor import extract_text_from_file

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(
    title="GründerAI API",
    description="Business Plan Analysis for Gründungszuschuss Approval",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Response Models
class Issue(BaseModel):
    title: str
    description: str
    severity: str  # CRITICAL, HIGH, MEDIUM, LOW
    fix: str

class AnalysisResult(BaseModel):
    score: int  # 0-100
    risk_level: str  # LOW, MEDIUM, HIGH, CRITICAL
    top_issues: List[Issue]
    detected_industry: Optional[str] = None
    estimated_revenue: Optional[str] = None
    benchmark_revenue: Optional[str] = None

# Health Check
@app.get("/")
def read_root():
    return {
        "service": "GründerAI API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    anthropic_key = os.getenv("ANTHROPIC_API_KEY")
    return {
        "status": "healthy",
        "anthropic_configured": bool(anthropic_key)
    }

# Main Analysis Endpoint
@app.post("/api/analyze", response_model=AnalysisResult)
async def analyze_business_plan_endpoint(
    file: UploadFile = File(...)
):
    """
    Analyze uploaded business plan
    
    Accepts: PDF or DOCX
    Returns: Grant Calibration Score + Issues
    """
    
    # Validate file type
    allowed_types = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only PDF and DOCX allowed."
        )
    
    # Validate file size (max 5MB)
    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail="File too large. Maximum 5MB allowed."
        )
    
    try:
        # Extract text from file
        text = extract_text_from_file(content, file.content_type)
        
        if not text or len(text) < 100:
            raise HTTPException(
                status_code=400,
                detail="Could not extract sufficient text from file. Please check file format."
            )
        
        # Analyze with Claude
        result = analyze_business_plan(text)
        
        return result
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

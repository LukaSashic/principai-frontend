"""
Email Service für GründerAI
Sends PDF reports via SendGrid or SMTP
Supports both production (SendGrid) and development (SMTP) modes
"""

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

# Email configuration
EMAIL_MODE = os.getenv("EMAIL_MODE", "smtp")  # "sendgrid" or "smtp"
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "info@principal.de")
SENDER_NAME = os.getenv("SENDER_NAME", "PrincipalAI - GründerAI")

# SMTP Configuration (for development/testing)
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.ionos.de")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "info@principal.de")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")


def send_email_sendgrid(
    to_email: str,
    subject: str,
    html_content: str,
    pdf_path: Optional[str] = None
) -> bool:
    """
    Send email via SendGrid API
    
    Args:
        to_email: Recipient email address
        subject: Email subject
        html_content: HTML email body
        pdf_path: Optional path to PDF attachment
    
    Returns:
        bool: True if sent successfully
    """
    try:
        from sendgrid import SendGridAPIClient
        from sendgrid.helpers.mail import Mail, Attachment, FileContent, FileName, FileType, Disposition
        import base64
        
        message = Mail(
            from_email=(SENDER_EMAIL, SENDER_NAME),
            to_emails=to_email,
            subject=subject,
            html_content=html_content
        )
        
        # Add PDF attachment if provided
        if pdf_path and os.path.exists(pdf_path):
            with open(pdf_path, 'rb') as f:
                pdf_data = f.read()
                encoded_pdf = base64.b64encode(pdf_data).decode()
            
            attached_file = Attachment(
                FileContent(encoded_pdf),
                FileName(os.path.basename(pdf_path)),
                FileType('application/pdf'),
                Disposition('attachment')
            )
            message.attachment = attached_file
        
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        
        return response.status_code in [200, 201, 202]
    
    except Exception as e:
        print(f"SendGrid email error: {str(e)}")
        return False


def send_email_smtp(
    to_email: str,
    subject: str,
    html_content: str,
    pdf_path: Optional[str] = None
) -> bool:
    """
    Send email via SMTP (IONOS or any SMTP server)
    
    Args:
        to_email: Recipient email address
        subject: Email subject
        html_content: HTML email body
        pdf_path: Optional path to PDF attachment
    
    Returns:
        bool: True if sent successfully
    """
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['From'] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Add HTML body
        html_part = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(html_part)
        
        # Add PDF attachment if provided
        if pdf_path and os.path.exists(pdf_path):
            with open(pdf_path, 'rb') as f:
                pdf_data = f.read()
            
            pdf_attachment = MIMEApplication(pdf_data, _subtype='pdf')
            pdf_attachment.add_header(
                'Content-Disposition',
                'attachment',
                filename=os.path.basename(pdf_path)
            )
            msg.attach(pdf_attachment)
        
        # Send via SMTP
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
        
        return True
    
    except Exception as e:
        print(f"SMTP email error: {str(e)}")
        return False


def send_report_email(
    to_email: str,
    customer_name: str,
    score: int,
    risk_level: str,
    pdf_path: str
) -> bool:
    """
    Send business plan report email to customer
    
    Args:
        to_email: Customer email address
        customer_name: Customer name
        score: Grant calibration score
        risk_level: Risk level (LOW, MEDIUM, HIGH, CRITICAL)
        pdf_path: Path to PDF report
    
    Returns:
        bool: True if sent successfully
    """
    subject = f"Ihr GründerAI Report - Score: {score}/100"
    
    # Risk level translation
    risk_translations = {
        "LOW": "Niedriges Risiko",
        "MEDIUM": "Mittleres Risiko",
        "HIGH": "Hohes Risiko",
        "CRITICAL": "Kritisches Risiko"
    }
    risk_text = risk_translations.get(risk_level, risk_level)
    
    # HTML email template
    html_content = f"""
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {{
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .header {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 12px;
                text-align: center;
                margin-bottom: 30px;
            }}
            .header h1 {{
                margin: 0;
                font-size: 28px;
            }}
            .score-box {{
                background: #f8f9fa;
                border-left: 4px solid #667eea;
                padding: 20px;
                margin: 20px 0;
                border-radius: 8px;
            }}
            .score {{
                font-size: 48px;
                font-weight: bold;
                color: #667eea;
                margin: 10px 0;
            }}
            .risk-badge {{
                display: inline-block;
                padding: 8px 16px;
                border-radius: 6px;
                font-weight: bold;
                font-size: 14px;
                margin: 10px 0;
            }}
            .risk-low {{ background: #d4edda; color: #155724; }}
            .risk-medium {{ background: #fff3cd; color: #856404; }}
            .risk-high {{ background: #f8d7da; color: #721c24; }}
            .risk-critical {{ background: #f8d7da; color: #721c24; }}
            .content {{
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }}
            .button {{
                display: inline-block;
                background: #667eea;
                color: white;
                padding: 14px 28px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                margin: 20px 0;
            }}
            .footer {{
                text-align: center;
                color: #666;
                font-size: 12px;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #eee;
            }}
            ul {{
                padding-left: 20px;
            }}
            li {{
                margin: 10px 0;
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🎯 Dein GründerAI Report ist fertig!</h1>
        </div>
        
        <div class="content">
            <p>Hallo {customer_name},</p>
            
            <p>vielen Dank für die Nutzung von GründerAI! Dein Business Plan wurde erfolgreich analysiert.</p>
            
            <div class="score-box">
                <strong>Grant Calibration Score:</strong>
                <div class="score">{score}/100</div>
                <span class="risk-badge risk-{risk_level.lower()}">{risk_text}</span>
            </div>
            
            <h3>📄 Dein vollständiger Report</h3>
            <p>Im Anhang findest du deinen detaillierten 5-Seiten Report mit:</p>
            <ul>
                <li><strong>Executive Summary</strong> - Überblick über deine Analyse</li>
                <li><strong>Top 3 Critical Issues</strong> - Konkrete Verbesserungsvorschläge</li>
                <li><strong>IHK-Benchmarks</strong> - Branchenspezifische Kennzahlen</li>
                <li><strong>Step-by-Step Fixes</strong> - Wie du jeden Punkt behebst</li>
                <li><strong>Next Steps</strong> - Dein Weg zur Genehmigung</li>
            </ul>
            
            <h3>🚀 Nächste Schritte</h3>
            <p>
                1. Öffne den PDF-Report im Anhang<br>
                2. Arbeite die identifizierten Issues durch<br>
                3. Nutze unsere konkreten Fixes und Benchmarks<br>
                4. Reiche deinen optimierten Plan bei der Arbeitsagentur ein
            </p>
            
            <p>
                <strong>Wichtig:</strong> Die Arbeitsagentur legt großen Wert auf realistische Zahlen und konkrete Marktanalysen. 
                Nutze die IHK-Benchmarks aus dem Report, um deine Prognosen zu untermauern.
            </p>
            
            <h3>💬 Fragen?</h3>
            <p>
                Wir helfen gerne weiter!<br>
                📧 Email: <a href="mailto:support@principal.de">support@principal.de</a><br>
                🌐 Website: <a href="https://principal.de">www.principal.de</a>
            </p>
            
            <p>Viel Erfolg bei deiner Gründung! 🎉</p>
            
            <p>
                Beste Grüße,<br>
                <strong>Das PrincipalAI Team</strong>
            </p>
        </div>
        
        <div class="footer">
            <p>
                <strong>PrincipalAI - GründerAI</strong><br>
                Business Plan Analyse für Gründungszuschuss<br>
                info@principal.de | www.principal.de
            </p>
            <p style="font-size: 11px; color: #999;">
                Diese Email wurde automatisch generiert. Deine Daten werden gemäß DSGVO behandelt 
                und nach 7 Tagen automatisch gelöscht.
            </p>
        </div>
    </body>
    </html>
    """
    
    # Send via configured method
    if EMAIL_MODE == "sendgrid" and SENDGRID_API_KEY:
        return send_email_sendgrid(to_email, subject, html_content, pdf_path)
    else:
        return send_email_smtp(to_email, subject, html_content, pdf_path)


def send_payment_confirmation(
    to_email: str,
    customer_name: str,
    order_id: str,
    amount: float
) -> bool:
    """
    Send payment confirmation email
    
    Args:
        to_email: Customer email
        customer_name: Customer name
        order_id: PayPal order ID
        amount: Payment amount
    
    Returns:
        bool: True if sent successfully
    """
    subject = "Zahlungsbestätigung - GründerAI Report"
    
    html_content = f"""
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <style>
            body {{
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .header {{
                background: #667eea;
                color: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
            }}
            .content {{
                padding: 30px;
                background: #f9f9f9;
                border-radius: 8px;
                margin-top: 20px;
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>✓ Zahlung erfolgreich!</h1>
        </div>
        <div class="content">
            <p>Hallo {customer_name},</p>
            <p>Vielen Dank für deinen Kauf! Deine Zahlung wurde erfolgreich verarbeitet.</p>
            <p>
                <strong>Betrag:</strong> €{amount:.2f}<br>
                <strong>Transaktions-ID:</strong> {order_id}
            </p>
            <p>Dein Report wird jetzt generiert und in wenigen Minuten per Email zugestellt.</p>
            <p>Beste Grüße,<br>Das PrincipalAI Team</p>
        </div>
    </body>
    </html>
    """
    
    if EMAIL_MODE == "sendgrid" and SENDGRID_API_KEY:
        return send_email_sendgrid(to_email, subject, html_content)
    else:
        return send_email_smtp(to_email, subject, html_content)

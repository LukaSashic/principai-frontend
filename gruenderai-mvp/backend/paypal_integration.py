"""
PayPal Integration für GründerAI
Handles payment creation, capture, and verification
Supports both Sandbox and Production environments
"""

import os
import requests
from typing import Dict, Optional
from dotenv import load_dotenv

load_dotenv()

# PayPal Configuration
PAYPAL_MODE = os.getenv("PAYPAL_MODE", "sandbox")  # "sandbox" or "live"
PAYPAL_CLIENT_ID = os.getenv("PAYPAL_CLIENT_ID")
PAYPAL_SECRET = os.getenv("PAYPAL_SECRET")

# Base URLs
PAYPAL_BASE_URLS = {
    "sandbox": "https://api-m.sandbox.paypal.com",
    "live": "https://api-m.paypal.com"
}

PAYPAL_BASE_URL = PAYPAL_BASE_URLS.get(PAYPAL_MODE, PAYPAL_BASE_URLS["sandbox"])


def get_access_token() -> str:
    """
    Get PayPal OAuth 2.0 access token
    
    Returns:
        str: Access token for API calls
    """
    try:
        auth = (PAYPAL_CLIENT_ID, PAYPAL_SECRET)
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        data = {"grant_type": "client_credentials"}
        
        response = requests.post(
            f"{PAYPAL_BASE_URL}/v1/oauth2/token",
            auth=auth,
            headers=headers,
            data=data,
            timeout=10
        )
        
        response.raise_for_status()
        return response.json()["access_token"]
    
    except Exception as e:
        raise Exception(f"Failed to get PayPal access token: {str(e)}")


def create_order(
    analysis_id: str,
    amount: float = 39.00,
    currency: str = "EUR",
    return_url: str = None,
    cancel_url: str = None
) -> Dict:
    """
    Create PayPal order for business plan report
    
    Args:
        analysis_id: Unique analysis ID
        amount: Payment amount (default 39 EUR)
        currency: Currency code (EUR, USD, etc.)
        return_url: URL to redirect after successful payment
        cancel_url: URL to redirect after cancelled payment
    
    Returns:
        Dict with order_id and approval_url
    """
    try:
        access_token = get_access_token()
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }
        
        # Default URLs if not provided
        if not return_url:
            return_url = f"{os.getenv('FRONTEND_URL', 'http://localhost:3001')}/success"
        if not cancel_url:
            cancel_url = f"{os.getenv('FRONTEND_URL', 'http://localhost:3001')}/results"
        
        # Create order payload
        payload = {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "reference_id": analysis_id,
                    "description": "GründerAI Business Plan Report - Grant Calibration Analysis",
                    "amount": {
                        "currency_code": currency,
                        "value": f"{amount:.2f}"
                    }
                }
            ],
            "application_context": {
                "brand_name": "PrincipalAI",
                "landing_page": "NO_PREFERENCE",
                "user_action": "PAY_NOW",
                "return_url": return_url,
                "cancel_url": cancel_url
            }
        }
        
        response = requests.post(
            f"{PAYPAL_BASE_URL}/v2/checkout/orders",
            headers=headers,
            json=payload,
            timeout=10
        )
        
        response.raise_for_status()
        order_data = response.json()
        
        # Extract approval URL
        approval_url = next(
            (link["href"] for link in order_data.get("links", []) if link["rel"] == "approve"),
            None
        )
        
        return {
            "order_id": order_data["id"],
            "status": order_data["status"],
            "approval_url": approval_url
        }
    
    except requests.exceptions.RequestException as e:
        raise Exception(f"PayPal API request failed: {str(e)}")
    except Exception as e:
        raise Exception(f"Failed to create PayPal order: {str(e)}")


def capture_order(order_id: str) -> Dict:
    """
    Capture (complete) a PayPal order after user approval
    
    Args:
        order_id: PayPal order ID
    
    Returns:
        Dict with capture details and payment status
    """
    try:
        access_token = get_access_token()
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }
        
        response = requests.post(
            f"{PAYPAL_BASE_URL}/v2/checkout/orders/{order_id}/capture",
            headers=headers,
            timeout=10
        )
        
        response.raise_for_status()
        capture_data = response.json()
        
        # Extract payment details
        status = capture_data.get("status")
        payer_email = capture_data.get("payer", {}).get("email_address")
        payer_name = capture_data.get("payer", {}).get("name", {}).get("given_name", "Customer")
        
        # Extract capture ID
        capture_id = None
        purchase_units = capture_data.get("purchase_units", [])
        if purchase_units:
            captures = purchase_units[0].get("payments", {}).get("captures", [])
            if captures:
                capture_id = captures[0].get("id")
        
        return {
            "order_id": order_id,
            "status": status,
            "capture_id": capture_id,
            "payer_email": payer_email,
            "payer_name": payer_name,
            "completed": status == "COMPLETED"
        }
    
    except requests.exceptions.RequestException as e:
        raise Exception(f"PayPal capture request failed: {str(e)}")
    except Exception as e:
        raise Exception(f"Failed to capture PayPal order: {str(e)}")


def get_order_details(order_id: str) -> Dict:
    """
    Get details of a PayPal order
    
    Args:
        order_id: PayPal order ID
    
    Returns:
        Dict with order details
    """
    try:
        access_token = get_access_token()
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }
        
        response = requests.get(
            f"{PAYPAL_BASE_URL}/v2/checkout/orders/{order_id}",
            headers=headers,
            timeout=10
        )
        
        response.raise_for_status()
        return response.json()
    
    except requests.exceptions.RequestException as e:
        raise Exception(f"PayPal get order request failed: {str(e)}")
    except Exception as e:
        raise Exception(f"Failed to get PayPal order details: {str(e)}")


def verify_webhook_signature(
    transmission_id: str,
    transmission_time: str,
    cert_url: str,
    auth_algo: str,
    transmission_sig: str,
    webhook_id: str,
    webhook_event: Dict
) -> bool:
    """
    Verify PayPal webhook signature (for production security)
    
    Args:
        transmission_id: From webhook headers
        transmission_time: From webhook headers
        cert_url: From webhook headers
        auth_algo: From webhook headers
        transmission_sig: From webhook headers
        webhook_id: Your webhook ID from PayPal dashboard
        webhook_event: Full webhook event body
    
    Returns:
        bool: True if signature is valid
    """
    try:
        access_token = get_access_token()
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }
        
        payload = {
            "transmission_id": transmission_id,
            "transmission_time": transmission_time,
            "cert_url": cert_url,
            "auth_algo": auth_algo,
            "transmission_sig": transmission_sig,
            "webhook_id": webhook_id,
            "webhook_event": webhook_event
        }
        
        response = requests.post(
            f"{PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature",
            headers=headers,
            json=payload,
            timeout=10
        )
        
        response.raise_for_status()
        result = response.json()
        
        return result.get("verification_status") == "SUCCESS"
    
    except Exception as e:
        print(f"Webhook verification failed: {str(e)}")
        return False

'use client';

import { useEffect, useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface PayPalButtonProps {
  analysisId: string;
  amount?: number;
  currency?: string;
  onSuccess: (orderId: string) => void;
  onError: (error: string) => void;
}

export default function PayPalButton({
  analysisId,
  amount = 39.00,
  currency = 'EUR',
  onSuccess,
  onError
}: PayPalButtonProps) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'ATUV5mqZLUqnp8XNPqGq9F8ZLIPQ3fxWdOtHw0Qx-jWVPqT_duG';

  const [loading, setLoading] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const buttonRendered = useRef(false);

  useEffect(() => {
    // Load PayPal SDK
    if (typeof window !== 'undefined' && !(window as any).paypal) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=ATUV5mqZLUqnp8XNPqGq9F8ZLIPQ3fxWdOtHw0Qx-jWVPqT_duG&currency=${currency}&intent=capture&locale=de_DE`;
      script.addEventListener('load', () => setPaypalLoaded(true));
      script.addEventListener('error', () => {
        onError('Failed to load PayPal SDK');
      });
      document.body.appendChild(script);
    } else {
      setPaypalLoaded(true);
    }
  }, [currency, onError]);

  useEffect(() => {
    // CRITICAL: Prevent multiple renders
    if (!paypalLoaded || buttonRendered.current || !(window as any).paypal) return;

    const paypal = (window as any).paypal;
    const container = document.getElementById('paypal-button-container');

    // CRITICAL: Clear container before rendering
    if (container) {
      container.innerHTML = '';
    }

    // Render PayPal Button
    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'pay',
        height: 45
      },

      createOrder: async () => {
        try {
          setLoading(true);

          const response = await fetch('http://localhost:8000/api/create-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              analysis_id: analysisId,
              amount: amount,
              currency: currency
            })
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create order');
          }

          const data = await response.json();
          return data.order_id;

        } catch (error: any) {
          onError(error.message || 'Payment creation failed');
          throw error;
        } finally {
          setLoading(false);
        }
      },

      onApprove: async (data: any) => {
        try {
          setLoading(true);
          onSuccess(data.orderID);
        } catch (error: any) {
          onError(error.message || 'Payment approval failed');
        }
      },

      onCancel: () => {
        setLoading(false);
      },

      onError: (err: any) => {
        setLoading(false);
        onError('Payment error occurred');
        console.error('PayPal Error:', err);
      }
    }).render('#paypal-button-container');

    // CRITICAL: Mark as rendered
    buttonRendered.current = true;

    // Cleanup on unmount
    return () => {
      if (container) {
        container.innerHTML = '';
      }
      buttonRendered.current = false;
    };
  }, [paypalLoaded, analysisId, amount, currency, onSuccess, onError]);

  if (!paypalLoaded) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <span className="ml-3 text-gray-600">PayPal wird geladen...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
          <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
        </div>
      )}
      <div id="paypal-button-container" className="min-h-[150px]"></div>
    </div>
  );
}
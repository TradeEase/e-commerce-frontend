// In Payments1.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaymentForm from './components/PaymentForm';
import { ShoppingBag, CheckCircle, XCircle } from 'lucide-react';

function Payments1() {
  const location = useLocation();

  const { cart, totalPrice } = location.state || {};
  console.log('Total Price in Payments1:', totalPrice); // Debug to check the received value

  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSuccess = () => {
    setPaymentStatus('success');
  };

  const handleError = (error) => {
    setPaymentStatus('error');
    setErrorMessage(error);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-14 w-14 text-blue-700 animate-bounce" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Secure Your Purchase</h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Complete your payment with our secure platform powered by Stripe.
          </p>
        </div>

        {paymentStatus === 'idle' && (
          <div className="bg-white shadow-lg rounded-xl p-8">
            <PaymentForm
              amount={totalPrice} // Pass the totalPrice from cart data
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="bg-green-50 shadow-lg rounded-xl p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. You will receive a confirmation email shortly.
            </p>
            <button
              onClick={() => setPaymentStatus('idle')}
              className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
            >
              Make Another Payment
            </button>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="bg-red-50 shadow-lg rounded-xl p-8 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-red-700 mb-2">Payment Failed</h2>
            <p className="text-red-600 mb-6">{errorMessage}</p>
            <button
              onClick={() => setPaymentStatus('idle')}
              className="bg-red-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>This is a secure SSL encrypted payment. Your information is safe with us.</p>
        </div>
      </div>
    </div>
  );
}

export default Payments1;

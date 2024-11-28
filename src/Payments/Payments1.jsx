import React, { useState } from 'react';
import PaymentForm from './components/PaymentForm';
import { ShoppingBag, CheckCircle, XCircle } from 'lucide-react';

function Payments1() {
  const [paymentStatus, setPaymentStatus] = useState('idle'); // Removed TypeScript type annotations
  const [errorMessage, setErrorMessage] = useState('');

  const handleSuccess = () => {
    setPaymentStatus('success');
    // You might want to redirect to an order confirmation page here
  };

  const handleError = (error) => {
    setPaymentStatus('error');
    setErrorMessage(error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Your Purchase</h1>
          <p className="text-lg text-gray-600">Secure payment powered by Stripe</p>
        </div>

        {paymentStatus === 'idle' && (
          <PaymentForm
            amount={9999} // $99.99
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}

        {paymentStatus === 'success' && (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Thank you for your purchase. You will receive a confirmation email shortly.</p>
            <button
              onClick={() => setPaymentStatus('idle')}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Make Another Payment
            </button>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-red-600 mb-6">{errorMessage}</p>
            <button
              onClick={() => setPaymentStatus('idle')}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>This is a secure SSL encrypted payment</p>
        </div>
      </div>
    </div>
  );
}
export default Payments1;
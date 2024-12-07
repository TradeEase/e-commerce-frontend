import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QLGZSCalQQ0YPlOBaAgU4J3h9Xu6uK1JRyhpxMlCsYf0ptGMtwc4lTnbUBYaD60FmJvOPqrV2p012FHeAWrjWHi00KWZLrINZ');

const CheckoutForm = ({ amount, onSuccess, onError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('Payment for services'); // Example description
    const [currency, setCurrency] = useState('usd'); // Example currency

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!stripe || !elements) {
                throw new Error('Stripe.js has not loaded yet');
            }

            // Prepare the payment data
            const paymentRequest = {
                amount, // already in cents (e.g., $10.00 = 1000)
                currency,
                description,
            };

            // Send the data to the backend
            const response = await fetch('http://localhost:8080/api/payments/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentRequest),
            });

            const { clientSecret } = await response.json();

            // Confirm the PaymentIntent using CardElement
            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                onError(error.message || 'Payment failed');
            } else {
                onSuccess();
            }
        } catch (err) {
            onError(err.message || 'Payment processing failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="p-8 bg-white rounded-lg shadow-xl">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">Payment Details</h2>

                {/* Card input field */}
                <CardElement
                    options={{
                        style: {
                            base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } },
                            invalid: { color: '#9e2146' },
                        },
                    }}
                    className="mb-6"
                />

                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : `Pay $${(amount).toFixed(2)}`}
                </button>
            </div>
        </form>
    );
};

const PaymentForm = (props) => (
    <Elements stripe={stripePromise}>
        <CheckoutForm {...props} />
    </Elements>
);

export default PaymentForm;

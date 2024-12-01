import React from 'react';

import './Payments1.css';
import OrderSummary from './OrderSummary';

import FeatureSection from './FeatureSection';

function Payments3() {
  return (
    <div
      data-layername="payment1"
      className="flex overflow-hidden flex-col bg-white"
    >
  
      <main>
        {/* Checkout Section */}
        <section className="flex flex-col justify-center items-center px-20 py-12 mt-2 w-full text-white bg-slate-900 max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col max-w-full w-[233px]">
            <h1
              data-layername="checkout"
              className="text-5xl font-medium max-md:text-4xl"
            >
              Checkout
            </h1>
            <div className="flex gap-1.5 self-center max-w-full text-base w-[157px]">
              <div data-layername="home" className="grow font-medium">
                Home
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/97ad27ef41eb41c881f5f55b1d2863ce/17356b23804ad799663b7f68cc581ad281559e951b231e78b7cdcab44ad361b0?apiKey=97ad27ef41eb41c881f5f55b1d2863ce&"
                alt=""
                className="object-contain shrink-0 my-auto w-5 aspect-square"
              />
              <div data-layername="checkout" className="font-light">
                Checkout
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="flex flex-col self-center w-full max-w-[1161px] max-md:max-w-full px-6 py-8">
          <div className="flex flex-col gap-10">
            {/* Order Summary */}
            <OrderSummary />

            {/* Order Details */}
            <div className="max-w-xl mx-auto p-6 rounded-md shadow-md border border-gray-200 bg-white">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-sm text-gray-600">Order ID</h2>
                  <p className="font-medium text-gray-800">2015fni4544l</p>
                </div>
                <div>
                  <h2 className="text-sm text-gray-600">Guaranteed By</h2>
                  <p className="font-medium text-gray-800">11/10</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xl text-purple-500">👤</span>
                </div>
                <div>
                  <h2 className="text-sm text-gray-600">Your Order Partner</h2>
                  <p className="font-medium text-gray-800">LX-wrnk2qop</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and for
                other purposes described in our{' '}
                <a
                  href="/privacy-policy"
                  className="text-blue-500 underline"
                >
                  privacy policy
                </a>
                .
              </p>
            </div>

            {/* Place Order Button. */}
            <button
              data-layername="placeOrder"
              className="self-center px-16 py-4 text-xl rounded-xl bg-slate-600 text-white shadow-md hover:bg-slate-700 transition-all max-md:w-full"
            >
              Place Order
            </button>
          </div>
        </section>
      </main>

      {/* Additional Sections */}
      <FeatureSection />
     
    </div>
  );
}

export default Payments3;
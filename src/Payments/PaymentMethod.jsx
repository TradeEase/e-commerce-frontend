import React, { useState } from "react";
import "./Payments1.css";

function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState("paypal"); // State to manage selected payment method
  const [selectedMethod, setSelectedMethod] = useState("credit-card"); // State to manage credit card or other payment method

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <div
      data-layername="column"
      className="flex ml-7 flex-col w-6/12 max-md:ml-0 max-md:w-full"
    >
      <div className="flex flex-col grow max-md:mt-8 max-md:max-w-full">
        <div className="flex flex-col items-start pl-4 w-full max-md:max-w-full">
          <h2
            data-layername="billingDetails"
            className="text-4xl font-semibold text-black"
          >
            Payment Method
          </h2>
          <div className="flex gap-1 mt-1.5 max-w-full text-xs text-black w-[385px]">
            <div className="flex flex-col whitespace-nowrap">
              <div className="flex shrink-0 rounded-xl bg-slate-900 h-[39px] w-[39px]" />
              <div data-layername="address" className="mt-3.5">
                Address
              </div>
            </div>
            <div className="flex flex-col grow shrink-0 basis-0 w-fit">
              <div className="flex gap-1 self-start whitespace-nowrap">
                <div data-layername="" className="flex-auto my-auto">
                  --------------------------------------------------
                </div>
                <div className="flex shrink-0 rounded-xl bg-slate-900 h-[39px] w-[39px]" />
              </div>
              <div data-layername="paymentMethod" className="self-end mt-3">
                Payment Method
              </div>
            </div>
          </div>
          <form className="self-stretch mt-7 max-md:max-w-full">
            <div className="flex flex-col max-md:flex-col">
              {/* Add the "Select a Payment Method" sentence */}
              <div className="flex items-center mb-2">
                <h3 className="mr-2 text-xl font-medium text-black">
                  Select a Payment Method
                </h3> {/* Increased font size */}
              </div>
              {/* Align the radio button for Credit/Debit Card to the left */}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="credit-card"
                  name="payment-method"
                  value="credit-card"
                  checked={selectedMethod === "credit-card"}
                  onChange={handleMethodChange}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
                <label
                  htmlFor="credit-card"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Credit/Debit Card
                </label>
              </div>
              {/* Add more payment methods here, if needed */}
            </div>
          </form>

          <form>
            <label
              htmlFor="emailAddress"
              data-layername="emailAddress"
              className="self-start mt-16 text-base font-medium text-black max-md:mt-10"
            >
              Card Number
            </label>
            <input
              id="emailAddress"
              type="email"
              className="flex shrink-0 mt-6 max-w-full bg-white rounded-xl border border-solid border-neutral-400 h-[75px] w-[453px]"
            />
          </form>

          <form>
            <label
              htmlFor="cardHolderName"
              data-layername="cardHolderName"
              className="self-start mt-16 text-base font-medium text-black max-md:mt-10"
            >
              Card Holder Name
            </label>
            <input
              id="cardHolderName"
              type="text"
              className="flex shrink-0 mt-6 max-w-full bg-white rounded-xl border border-solid border-neutral-400 h-[75px] w-[453px]"
            />
          </form>

          <form className="self-stretch mt-7 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div
                data-layername="column"
                className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full"
              >
                <div className="flex flex-col grow text-base font-medium text-black max-md:mt-10">
                  <label
                    htmlFor="expDate"
                    data-layername="expDate"
                    className="self-start"
                  >
                    EXP Date
                  </label>
                  <input
                    id="expDate"
                    type="text"
                    className="flex shrink-0 mt-6 bg-white rounded-xl border border-solid border-neutral-400 h-[75px] w-[211px]"
                  />
                </div>
              </div>
              <div
                data-layername="column"
                className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full"
              >
                <div className="flex flex-col grow text-base font-medium text-black max-md:mt-10">
                  <label
                    htmlFor="cvn"
                    data-layername="cvn"
                    className="self-start"
                  >
                    CVN
                  </label>
                  <input
                    id="cvn"
                    type="text"
                    className="flex shrink-0 mt-6 bg-white rounded-xl border border-solid border-neutral-400 h-[75px] w-[211px]"
                  />
                </div>
              </div>
            </div>
          </form>

          <button
            data-layername="placeOrder"
            className="px-16 py-4 mt-10 max-w-full text-xl rounded-2xl border-4 border-solid bg-slate-600 border-slate-500 text-white w-[318px] max-md:px-5"
          >
            Add Card
          </button>

          {/* Other Payment Methods */}
          <div className="mb-2">
            <input
              type="radio"
              id="paypal"
              name="paymentMethod"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
              className="mr-2"
            />
            <label
              htmlFor="paypal"
              className="font-medium text-lg text-black"
            >
              PayPal
            </label>
          </div>
          <div className="mb-4">
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              checked={paymentMethod === "cashOnDelivery"}
              onChange={() => setPaymentMethod("cashOnDelivery")}
              className="mr-2"
            />
            <label
              htmlFor="cashOnDelivery"
              className="font-medium text-lg text-black"
            >
              Cash On Delivery
            </label>
          </div>
          <button
            data-layername="placeOrder"
            className="px-16 py-4 mt-10 max-w-full text-xl rounded-2xl border-4 border-solid bg-slate-600 border-slate-500 text-white w-[318px] max-md:px-5"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;

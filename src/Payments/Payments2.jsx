import React from 'react';
import Header from './Header';
import './Payments1.css';
import OrderSummary from './OrderSummary';
import Footer from './Footer';
import FeatureSection from './FeatureSection';
import PaymentMethod from "./PaymentMethod";

function Payments2() {
  return (
    <div data-layername="payment1" className="flex overflow-hidden flex-col bg-white">
      <Header />
      <main>
        <section className="flex flex-col justify-center items-center px-20 py-12 mt-2 w-full text-white whitespace-nowrap bg-slate-900 max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col max-w-full w-[233px]">
            <h1 data-layername="checkout" className="text-5xl font-medium max-md:text-4xl">
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
        <section className="flex flex-col self-center w-full max-w-[1161px] max-md:max-w-full">
          <div className="max-md:max-w-full">
            <div className="flex gap-20 max-md:flex-col">
              <PaymentMethod />
              <div className="flex flex-col w-full">
                <OrderSummary />
                <form>
          <div className="flex gap-4 self-start mt-6 text-base text-black max-md:ml-0.5">
            <input type="radio" id="directBankTransfer" name="paymentMethod" className="shrink-0 my-auto w-3.5 h-3.5" />
            <label htmlFor="directBankTransfer" data-layername="directBankTransfer" className="basis-auto">
              Direct Bank Transfer
            </label>
          </div>
          Continuing from where we left off:

          <p data-layername="directBankTransferDescription" className="mt-3 text-base font-light text-neutral-400 max-md:mr-1 max-md:max-w-full">
            Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
          </p>
          <div className="flex gap-4 self-start mt-6 text-base font-medium text-neutral-400 max-md:ml-0.5">
            <input type="radio" id="creditCard" name="paymentMethod" className="shrink-0 my-auto w-3.5 h-3.5" />
            <label htmlFor="creditCard" data-layername="creditCard" className="basis-auto">
              Credit Card
            </label>
          </div>
          <div className="flex gap-4 self-start mt-3 text-base font-medium text-neutral-400 max-md:ml-0.5">
            <input type="radio" id="cashOnDelivery" name="paymentMethod" className="shrink-0 my-auto w-3.5 h-3.5" />
            <label htmlFor="cashOnDelivery" data-layername="cashOnDelivery" className="basis-auto">
              Cash On Delivery
            </label>
          </div>
        </form>
        <p data-layername="privacyPolicy" className="mt-6 text-base font-light text-black max-md:mr-1 max-md:max-w-full">
          Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
          <span className="font-semibold">privacy policy</span>.
        </p>
                <button 
                  data-layername="placeOrder" 
                  className="self-center px-16 py-4 mt-6 text-xl rounded-2xl border-4 border-solid bg-slate-600 border-slate-500 text-white w-[318px] max-md:w-full max-md:px-5"
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FeatureSection />
      <Footer />
    </div>
  );
}

export default Payments2;

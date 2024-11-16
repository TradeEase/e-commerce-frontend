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
              <div className="flex flex-col items-center justify-center mt-4">
                <OrderSummary />
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

import React from 'react';

function Footer() {
  return (
    <footer className="flex flex-col items-center py-11 pl-10 mt-32 w-full bg-white border-t border-black border-opacity-20 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-start w-full max-w-[1133px] max-md:max-w-full">
        <div className="flex flex-col">
          <div data-layername="funiro" className="self-start text-2xl font-bold text-black">
            Shop
          </div>
          <address data-layername="address" className="mt-12 text-base text-neutral-400 max-md:mt-10 not-italic">
            400 University Drive Suite 200 Coral Gables,
            <br />
            FL 33134 USA
          </address>
        </div>
        <nav className="flex flex-col items-start self-stretch text-base font-medium text-black whitespace-nowrap">
          <h3 data-layername="links" className="text-neutral-400">Links</h3>
          <ul className="mt-14 max-md:mt-10">
            <li data-layername="home" className="mt-12 max-md:mt-10"><a href="#home">Home</a></li>
            <li data-layername="shop" className="mt-12 max-md:mt-10"><a href="#shop">Shop</a></li>
            <li data-layername="about" className="mt-12 max-md:mt-10"><a href="#about">About</a></li>
            <li data-layername="contact" className="self-stretch mt-11 max-md:mt-10"><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="flex-auto max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div data-layername="column" className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <nav className="flex flex-col grow items-start text-base font-medium text-black max-md:mt-10">
                <h3 data-layername="help" className="text-neutral-400">Help</h3>
                <ul className="mt-14 max-md:mt-10">
                  <li data-layername="paymentOptions" className="self-stretch mt-12 max-md:mt-10"><a href="#payment">Payment Options</a></li>
                  <li data-layername="returns" className="mt-12 max-md:mt-10"><a href="#returns">Returns</a></li>
                  <li data-layername="privacyPolicies" className="mt-11 max-md:mt-10"><a href="#privacy">Privacy Policies</a></li>
                </ul>
              </nav>
            </div>
            <div data-layername="column" className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col w-full max-md:mt-10">
                <h3 data-layername="newsletter" className="self-start text-base font-medium text-neutral-400">
                  Newsletter
                </h3>
                <form className="flex gap-3 mt-14 text-sm max-md:mt-10">
                  <div className="flex flex-col text-neutral-400">
                    <label htmlFor="emailInput" className="sr-only">Enter Your Email Address</label>
                    <input
                      type="email"
                      id="emailInput"
                      placeholder="Enter Your Email Address"
                      className="self-start border-b border-black"
                    />
                  </div>
                  <button type="submit" className="flex flex-col font-medium text-black whitespace-nowrap">
                    <span>SUBSCRIBE</span>
                    <div className="shrink-0 h-px border border-black border-solid"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="shrink-0 mt-12 max-w-full h-px border border-solid border-zinc-300 w-[1240px] max-md:mt-10" />
      <p data-layername="copyright" className="mt-9 text-base text-black">
        All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
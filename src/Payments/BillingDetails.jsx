import React from "react";
import "./Payments1.css";
function BillingDetails() {
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
            Billing details
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
            <div className="flex gap-5 max-md:flex-col">
              <div
                data-layername="column"
                className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full"
              >
                <div className="flex flex-col grow text-base font-medium text-black max-md:mt-10">
                  <label
                    htmlFor="firstName"
                    data-layername="firstName"
                    className="self-start"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
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
                    htmlFor="lastName"
                    data-layername="lastName"
                    className="self-start"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="flex shrink-0 mt-6 bg-white rounded-xl border border-solid border-neutral-400 h-[75px] w-[211px]"
                  />
                </div>
              </div>
            </div>
          </form>
          <div
            data-layername="shippingBilling"
            className="mt-8 text-base font-medium text-black"
          >
            Shipping & Billing
          </div>
          <div className="flex flex-col justify-center items-end px-20 py-7 mt-6 max-w-full bg-white rounded-xl border border-solid border-neutral-400 w-[453px] max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/97ad27ef41eb41c881f5f55b1d2863ce/3f1ac5ba21e65fda52836aee9325e8795969b7f85c738d0e19b9a31c7e2387db?apiKey=97ad27ef41eb41c881f5f55b1d2863ce&"
              alt=""
              className="object-contain w-5 aspect-square"
            />
          </div>
          <form>
            <label
              htmlFor="emailAddress"
              data-layername="emailAddress"
              className="self-start mt-16 text-base font-medium text-black max-md:mt-10"
            >
              Email address
            </label>
            <input
              id="emailAddress"
              type="email"
              className="flex shrink-0 mt-6 max-w-full bg-white rounded-xl border border-solid border-neutral-400 h-[75px] w-[453px]"
            />
          </form>
          <div className="flex flex-col items-start pr-12 pl-5 mt-10 text-base font-medium text-black max-md:pr-5 max-md:max-w-full">
            <div data-layername="promotion">Promotion</div>
            <input
              type="text"
              placeholder="Enter Promotion Code"
              className="self-stretch px-8 py-7 mt-6 bg-white rounded-xl border border-solid border-neutral-400 text-neutral-400 max-md:px-5 max-md:max-w-full"
            />
            <div data-layername="deliveryOption" className="mt-16 max-md:mt-10">
              Delivery Option
            </div>
            <div className="flex flex-col items-start px-10 pt-4 pb-7 mt-6 max-w-full bg-white rounded-xl border border-solid border-neutral-400 w-[271px] max-md:px-5">
              <div data-layername="rs260">Rs. 260</div>
              <div data-layername="standardDelivery" className="mt-2">
                Standard Delivery
              </div>
              <div
                data-layername="guaranteedBy1110"
                className="mt-14 max-md:mt-10"
              >
                Guaranteed By 11/10
              </div>
            </div>
            <div className="flex mt-12  gap-1 whitespace-nowrap">
              <div
                className="flex shrink-0 h-28 bg-zinc-300 w-[124px]"
                aria-label="Product image"
                role="img"
              />
              <h2 className="self-start basis-auto font-medium text-black">
                Product Name
              </h2>
              <div className="flex flex-col">
                <span className="font-medium text-black">Rs. 900</span>
                <span className="self-start text-neutral-400">-23%</span>
              </div>
              <span className="grow ml-2 text-neutral-400">Qty:</span>
              <span className="font-medium text-black">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingDetails;

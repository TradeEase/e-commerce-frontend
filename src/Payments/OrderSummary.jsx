import React from 'react';

function OrderSummary() {
  return (
    <div data-layername="column" className="flex flex-col ml-28 w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col px-10 py-20 mx-auto w-full bg-white max-md:px-5 max-md:mt-8 max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div data-layername="column" className="flex flex-col w-[45%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-start w-full max-md:mt-10">
                <div className="flex gap-2.5 self-stretch">
                  <div className="flex gap-1">
                    <div className="flex flex-col">
                      <div data-layername="product" className="self-start text-2xl font-medium text-black">
                        Product
                      </div>
                      <div data-layername="productName" className="mt-3.5 text-base text-neutral-400">
                        Product Name
                      </div>
                    </div>
                    <div data-layername="x" className="self-end mt-14 text-xs font-medium text-black max-md:mt-10">
                      X
                    </div>
                  </div>
                  <div data-layername="1" className="self-end mt-14 text-xs font-medium text-black max-md:mt-10">
                    1
                  </div>
                </div>
                <div data-layername="subtotal" className="mt-6 text-base text-black">
                  Subtotal
                </div>
                <div data-layername="total" className="mt-6 text-base text-black">
                  Total
                </div>
              </div>
            </div>
            <div data-layername="column" className="flex flex-col ml-5 w-[55%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10">
                <div className="flex flex-col items-end pl-9 text-base font-light text-black max-md:pl-5">
                  <div data-layername="subtotal" className="text-2xl font-medium">
                    Subtotal
                  </div>
                  <div data-layername="rs25000000" className="mt-3.5 max-md:mr-1">
                    Rs. 250,000.00
                  </div>
                  <div data-layername="rs25000000" className="mt-6">
                    Rs. 250,000.00
                  </div>
                </div>
                <div data-layername="rs25000000" className="mt-4 text-2xl font-bold text-yellow-600">
                  Rs. 250,000.00
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="shrink-0 mt-8 max-w-full h-px border border-solid border-zinc-300 w-[527px] max-md:mr-1" />
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
        {/* <button data-layername="placeOrder" className="self-center px-16 py-4 mt-10 max-w-full text-xl rounded-2xl border-4 border-solid bg-slate-600 border-slate-500 text-white w-[318px] max-md:px-5">
          Place order
        </button> */}
      </div>
    </div>
  );
}

export default OrderSummary;
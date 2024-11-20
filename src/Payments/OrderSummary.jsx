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
      </div>
    </div>
  );
}

export default OrderSummary;
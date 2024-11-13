import React from 'react';
import './Payments1.css'; 
function Header() {
  return (
    <header className="flex self-center w-full max-w-[1316px] max-md:max-w-full">
      <div className="flex z-10 shrink-0 my-auto bg-zinc-300 h-[54px] w-[60px] max-md:mr-0" />
      <div data-layername="header" className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
        <div className="px-16 py-8 w-full bg-white max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div data-layername="column" className="flex flex-col w-[22%] max-md:ml-0 max-md:w-full">
              <h2 data-layername="skinClinic" className="gap-1.5 self-stretch text-4xl font-bold text-black whitespace-nowrap max-md:mt-10">
                Shopping
              </h2>
            </div>
            <nav data-layername="column" className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <ul className="flex ml-11 gap-14 self-stretch my-auto text-base font-medium text-black whitespace-nowrap max-md:mt-10">
                <li data-layername="home"><a href="#home">Home</a></li>
                <li data-layername="shop"><a href="#shop">Shop</a></li>
                <li data-layername="about"><a href="#about">About</a></li>
                <li data-layername="contact"><a href="#contact">Contact</a></li>
              </ul>
            </nav>
            <div data-layername="column" className="flex flex-col ml-5 w-[28%] max-md:ml-0 max-md:w-full">
              <div className="flex ml-5 gap-10 self-stretch my-auto max-md:mt-10">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/97ad27ef41eb41c881f5f55b1d2863ce/85b8f5cce40da0fcb2cb55ba988b53fad45d58e978a14dfaf63daa67adae893c?apiKey=97ad27ef41eb41c881f5f55b1d2863ce&" alt="" className="object-contain shrink-0 aspect-[0.89] w-[25px]" />
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/97ad27ef41eb41c881f5f55b1d2863ce/e42868e41afc3dcead1a612bfb6843d22488f9b2056d36f57b986ee32c3321aa?apiKey=97ad27ef41eb41c881f5f55b1d2863ce&" alt="" className="object-contain shrink-0 aspect-[0.89] w-[25px]" />
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/97ad27ef41eb41c881f5f55b1d2863ce/ae7d96311a4a24236d47e3e7ed547880f98628c9784e09bbf911ff7fce1c0c41?apiKey=97ad27ef41eb41c881f5f55b1d2863ce&" alt="" className="object-contain shrink-0 aspect-[0.89] w-[25px]" />
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/97ad27ef41eb41c881f5f55b1d2863ce/1071dec6bfab1cb9a36741256de9cbb74225ae85f5e04b74ae367c41613bcf49?apiKey=97ad27ef41eb41c881f5f55b1d2863ce&" alt="" className="object-contain shrink-0 w-6 aspect-[0.86]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
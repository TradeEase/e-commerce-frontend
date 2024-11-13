import React from 'react';
import './Payments1.css'; 

function FeatureSection() {
  const features = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/97ad27ef41eb41c881f5f55b1d2863ce/50ec9e821f61879ac2bff4e7ebf1c6b6d4fc469446bc1005ad54652076c699ef?apiKey=97ad27ef41eb41c881f5f55b1d2863ce&",
      title: "High Quality",
      description: "crafted from top materials"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/97ad27ef41eb41c881f5f55b1d2863ce/b39e5c8b3cdc2f27abfc1b4b2748b54f04e1405744a1ca6b910dcbd13306a24c?apiKey=97ad27ef41eb41c881f5f55b1d2863ce&",
      title: "Warranty Protection",
      description: "Over 2 years"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/97ad27ef41eb41c881f5f55b1d2863ce/eb19bc0517c6cf823a070dd313dd2508d5bbe542f895f2ebecaabcaedd6cf9a4?apiKey=97ad27ef41eb41c881f5f55b1d2863ce&",
      title: "Free Shipping",
      description: "Order over 150 $"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/97ad27ef41eb41c881f5f55b1d2863ce/f776fd4320fbb573f6afbb0a8c01804a353d5b7df8ffc96ad75de4faf3c1b885?apiKey=97ad27ef41eb41c881f5f55b1d2863ce&",
      title: "24 / 7 Support",
      description: "Dedicated support"
    }
  ];

  return (
    <section className="flex flex-col justify-center items-center  mt-32 w-full bg-slate-900 min-h-[207px] max-md:mt-10 max-md:max-w-full">
      <div data-layername="feature" className="flex flex-wrap gap-3 justify-between items-center max-w-full w-[1276px]">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-2.5 items-center self-stretch my-auto min-w-[240px]">
            <img loading="lazy" src={feature.icon} alt="" className="object-contain shrink-0 self-stretch my-auto aspect-square w-[60px]" />
            <div data-layername="text" className="flex flex-col self-stretch my-auto min-w-[240px]">
              <div className="text-2xl font-semibold text-white">{feature.title}</div>
              <div className="text-xl font-medium text-zinc-500">{feature.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;
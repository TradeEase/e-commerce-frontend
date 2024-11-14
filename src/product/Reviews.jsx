import React from "react";
import Slider from "react-slick";
import "./review.css";

const TestimonialData = [
  {
    id: 1,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Satya Nadella",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Virat Kohli",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "Sachin Tendulkar",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/103/103",
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonials-container">
  <div className="container">
    <div className="testimonials-header">
      <p data-aos="fade-up">What our customers are saying</p>
      <h1 data-aos="fade-up">Testimonials</h1>
      <p data-aos="fade-up" className="subtext">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit asperiores modi
      </p>
    </div>

    <div data-aos="zoom-in">
      <Slider {...settings}>
        {TestimonialData.map((data) => (
          <div className="testimonial-card-container" key={data.id}>
            <div className="testimonial-image">
              <img src={data.img} alt={`${data.name}'s testimonial`} />
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="space-y-3">
                <p className="testimonial-text">{data.text}</p>
                <h1 className="testimonial-name">{data.name}</h1>
              </div>
            </div>
            <p className="testimonial-quote">,,</p>
          </div>
        ))}
      </Slider>
    </div>
  </div>
</div>

  );
};

export default Testimonials;

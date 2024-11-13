import React from 'react';
import './home.css';



function home() {
  const products = [
    { id: 1, image: 'https://via.placeholder.com/100', alt: 'Product 1' },
    { id: 2, image: 'https://via.placeholder.com/100', alt: 'Product 2' },
    { id: 3, image: 'https://via.placeholder.com/100', alt: 'Product 3' },
    { id: 4, image: 'https://via.placeholder.com/100', alt: 'Product 4' },
    { id: 5, image: 'https://via.placeholder.com/100', alt: 'Product 5' },
    { id: 6, image: 'https://via.placeholder.com/100', alt: 'Product 6' },
    { id: 7, image: 'https://via.placeholder.com/100', alt: 'Product 7' },
    { id: 8, image: 'https://via.placeholder.com/100', alt: 'Product 8' },
  ];
  return (
    <section className="showcase">
      
      <div className="showcase-card">
     
        <div className="showcase-content">
          <h1>Style Haven</h1>
          <p>
            A clothing shop is a fashion-forward store offering a wide range of
            apparel, accessories, and footwear for men, women, and children, all
            organized into distinct collections and styles.
          </p>
          <div className="buttons">
            <button className="primary-button">25% Off Festival</button>
            <button className="secondary-button">Discover</button>
          </div>
        </div>
        <div className="showcase-image">
          <img src="https://via.placeholder.com/200" alt="Main Model" />
        </div>
      </div>
      <nav className="breadcrumb">
        Home / Category
      </nav>
      <div className="product-gallery">
        {products.map((product) => (
          <img
            key={product.id}
            src={product.image}
            alt={product.alt}
            className="product-image"
          />
        ))}
      </div>
    
    </section>
  )
}

export default home
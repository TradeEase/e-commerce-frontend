import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products from the backend
  useEffect(() => {
    fetch('http://localhost:8083/api/product/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Navigate to product details page
  const handleCategoryClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="showcase">
      <div className="showcase-card">
        <div className="showcase-content">
          <h1>Style Haven</h1>
          <p>
            A clothing shop is a fashion-forward store offering a wide range
            of apparel, accessories, and footwear for men, women, and children,
            all organized into distinct collections and styles.
          </p>
          <div className="buttons">
            <button className="primary-button">25% Off Festival</button>
            <button
              className="secondary-button"
              onClick={() => navigate('/discover')}
            >
              Discover
            </button>
          </div>
        </div>
        <div className="showcase-image">
          <img src="https://via.placeholder.com/200" alt="Main Model" />
        </div>
      </div>

      <nav className="breadcrumb">Home / Category</nav>

      <div className="category-gallery">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product.productId} className="category-card">
              <h2>{product.name}</h2>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              {product.image && (
                <img src={product.image} alt={product.name} className="category-image" />
              )}
              <button onClick={() => handleCategoryClick(product.productId)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </section>
  );
}

export default Home;

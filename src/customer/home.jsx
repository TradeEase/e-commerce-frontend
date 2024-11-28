import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const [categories, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch('http://localhost:8083/api/product/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('Unable to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
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
              onClick={() => navigate('/discover')} // Navigate to a discover route
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
          <p>Loading categories...</p>
        ) : error ? (
          <p>{error}</p>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.categoryId}
              className="category-card"
              role="button" // Accessibility enhancement
              tabIndex={0} // Make it focusable
              onClick={() => handleCategoryClick(category.categoryId)}
            >
              <h2>{category.name}</h2>
              <p>
                <strong>Description:</strong>{' '}
                {category.description || 'No description available'}
              </p>
            </div>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </section>
  );
}

export default Home;

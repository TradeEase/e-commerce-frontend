import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './home.css';

function Home() {
  const [categories, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch('http://localhost:8083/api/product/categories');
        if (!response.ok) {
          throw new Error('Server Error');
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // Navigate to the category page with categoryId as a URL parameter
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

      <div className="category-gallery">
        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.categoryId}
              className={`category-card`}
              onClick={() => handleCategoryClick(category.categoryId)}
            >
              <h2>{category.name}</h2>
              <p>
                <strong>Description:</strong> {category.description || 'No description available'}
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

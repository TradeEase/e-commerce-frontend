import React, { useEffect } from 'react';
import './home.css';

function home() {
  const [categories, setCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
      <div className="category-gallery">
        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            // <img
            //   key={category.id}
            //   src={category.image}
            //   alt={category.alt}
            //   className="category-image"
            // />
            <div key={category.categoryId} className="category-card">
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
  )
}

export default home
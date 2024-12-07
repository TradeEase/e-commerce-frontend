import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access categoryId from the URL
import './CategoryPage.css';

function CategoryPage() {
  const { categoryId } = useParams(); // Get categoryId from URL parameter
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/product/categories/${categoryId}`);
        if (!response.ok) {
          throw new Error('Server Error');
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]); // Dependency on categoryId to fetch products when category changes

  return (
    <section>
      <h1>Products in Category {categoryId}</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <div className="product-gallery">
          {products.map((product) => (
            <div key={product.productId} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this category</p>
      )}
    </section>
  );
}

export default CategoryPage;

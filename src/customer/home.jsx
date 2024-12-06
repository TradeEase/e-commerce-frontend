import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import homeimg from "../assets/home.jpg";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = fetch("http://localhost:8083/api/product/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .catch((error) => {
        setError(error.message);
        return [];
      });

    const fetchCategories = fetch(
      "http://localhost:8083/api/product/categories"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .catch((error) => {
        setError(error.message);
        return [];
      });

    Promise.all([fetchProducts, fetchCategories])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const categoriesWithProducts = categories.filter((category) =>
    products.some((product) => product.categories.includes(category.categoryId))
  );

  return (
    <section className="showcase">
      <div className="showcase-card">
        <div className="showcase-content">
          <section className="style-haven">
            <h1 className="main-heading">
              Welcome to <span>Style Haven</span>
            </h1>
            <p className="intro-text">
              Step into a realm where fashion knows no limits! At{" "}
              <strong>Style Haven</strong>, we bring you an extraordinary
              selection of apparel, accessories, and footwear designed to
              elevate your look and express your individuality. Whether you're
              after timeless elegance or cutting-edge trends, our curated
              collections cater to every style, mood, and occasion.
            </p>
            <p className="closing-text">
              It's time to redefine your wardrobe and embrace your unique style.
              Visit <span>Style Haven</span> today and let your fashion journey
              begin!
            </p>
          </section>
        </div>
        <div className="showcase-image">
          <img src={homeimg} alt="Home visual" />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        categoriesWithProducts.map((category) => (
          <div key={category.categoryId} className="category-section">
            <h2 className="category-title">{category.name}</h2>
            <div className="category-gallery">
              {products
                .filter((product) =>
                  product.categories.includes(category.categoryId)
                )
                .map((product) => (
                  <div key={product.productId} className="category-card">
                    {product.quantity === 0 && (
                      <div className="out-of-stock">Out of Stock</div>
                    )}
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="category-image"
                      />
                    )}
                    <div className="card-details">
                      <h2>{product.name}</h2>
                      <p>
                        <strong>Price:</strong> ${product.price}
                      </p>
                      <button
                        onClick={() => handleCategoryClick(product.productId)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default Home;

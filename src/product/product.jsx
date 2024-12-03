import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./product.css";

const ProductDetails = () => {
  const [productData, setProductData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(0); // Show 0 initially
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  const productId = window.location.pathname.split("/").pop();

  useEffect(() => {
    fetch(`http://localhost:8083/api/product/products/${productId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch product details.");
        return response.json();
      })
      .then((data) => setProductData(data))
      .catch((error) => setError(error.message));
  }, [productId]);

  useEffect(() => {
    fetch(`http://localhost:8083/api/product/reviews`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch reviews.");
        return response.json();
      })
      .then((data) => {
        const filteredReviews = data.filter((review) => review.productId === parseInt(productId));
        setReviews(filteredReviews);
      })
      .catch((error) => setError(error.message));
  }, [productId]);

  const handleAddToCart = () => setShowAddToCartModal(true);
  const handleWriteReview = () => setShowReviewModal(true);
  const handleRatingClick = (value) => setRating(value);
  const handleSizeChange = (e) => setSelectedSize(e.target.value);

  // Calculate the average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (error) return <p className="error-message">{error}</p>;
  if (!productData) return <p>Loading product details...</p>;

  return (
    <div className="banner-container">
      <div className="product-row">
        <div className="banner-inner">
          <div data-aos="zoom-in">
            <img
              src={productData.image || "https://via.placeholder.com/400"}
              alt={productData.name}
              className="banner-image"
            />
          </div>

          <div className="product-details">
            <h2 className="product-name">{productData.name}</h2>
            <p className="product-price">${productData.price}</p>
            <p className="product-description">{productData.description}</p>

           {/* Average Rating as Stars */}
<div className="average-rating">
  <p>Average Rating:</p>
  <div className="stars-container">
    {[...Array(5)].map((_, index) => (
      index < Math.round(averageRating) ? (
        <AiFillStar key={index} style={{ color: "#ffd700" }} />
      ) : (
        <AiOutlineStar key={index} style={{ color: "#ccc" }} />
      )
    ))}
  </div>
  <p>({averageRating.toFixed(1)} / 5)</p>
</div>


            <div className="size-selector">
              <label htmlFor="size">Select Size:</label>
              <select id="size" value={selectedSize} onChange={handleSizeChange}>
                <option value="" disabled>
                  Choose a size
                </option>
                {["XS", "S", "M", "L", "XL", "XXL"].map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="0"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="write-review-btn" onClick={handleWriteReview}>
              Write Review
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.reviewId} className="review">
                <p className="review-name">User ID: {review.userId}</p>
                <div className="review-rating">
                  {[...Array(5)].map((_, index) =>
                    index < review.rating ? (
                      <AiFillStar key={index} />
                    ) : (
                      <AiOutlineStar key={index} />
                    )
                  )}
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>

  {/* Modals */}
  {showAddToCartModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Added to Cart</h4>
            <p>
              {quantity} x {productData.name} - ${productData.price}
            </p>
            <button onClick={() => setShowAddToCartModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showReviewModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Write a Review</h4>
            <textarea placeholder="Write your review here..." rows="4"></textarea>
            <div className="rating-input">
              <p>Rate the Product:</p>
              {[...Array(5)].map((_, index) => (
                <AiFillStar
                  key={index}
                  onClick={() => handleRatingClick(index + 1)}
                  className={index < rating ? "filled-star" : ""}
                  style={{ cursor: "pointer", color: index < rating ? "#ffd700" : "#ccc" }}
                />
              ))}
            </div>
            <button onClick={() => setShowReviewModal(false)}>Submit Review</button>
            <button onClick={() => setShowReviewModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

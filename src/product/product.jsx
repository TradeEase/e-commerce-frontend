import React, { useState } from "react";
import "./product.css";
import BannerImg from "../assets/women/women2.jpg";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Banner = () => {
  const [quantity, setQuantity] = useState(1);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);

  const productData = {
    name: "Winter Coat",
    price: "$49.99",
    description:
      "This cozy winter coat is perfect for cold weather, keeping you warm and stylish with its sleek design.",
    sizes: ["S", "M", "L", "XL"],
    reviews: [
      { id: 1, name: "John", rating: 5, comment: "Great quality!" },
      { id: 2, name: "Sarah", rating: 4, comment: "Very warm and stylish." },
    ],
  };

  const handleAddToCart = () => {
    setShowAddToCartModal(true);
  };

  const handleWriteReview = () => {
    setShowReviewModal(true);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <div className="banner-container">
      <div className="product-row">
        <div className="banner-inner">
          {/* Product Image */}
          <div data-aos="zoom-in">
            <img src={BannerImg} alt="Product" className="banner-image" />
          </div>

          {/* Product Details */}
          <div className="product-details">
            <h2 className="product-name">{productData.name}</h2>
            <p className="product-price">{productData.price}</p>
            <p className="product-description">{productData.description}</p>
            <div className="size-selector">
              <label htmlFor="size-select">Select Size:</label>
              <select id="size-select">
                {productData.sizes.map((size, index) => (
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
                min="1"
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
          {productData.reviews.map((review) => (
            <div key={review.id} className="review">
              <p className="review-name">{review.name}</p>
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
          ))}
        </div>
      </div>

      {/* Add to Cart Modal */}
      {showAddToCartModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Added to Cart</h4>
            <p>
              {quantity} x {productData.name} - {productData.price}
            </p>
            <button onClick={() => setShowAddToCartModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
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

export default Banner;

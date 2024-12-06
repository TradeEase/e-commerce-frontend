import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./product.css";
import jwtDecode from "jwt-decode";

const ProductDetails = () => {
  const [productData, setProductData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(0); // Show 0 initially
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const productId = window.location.pathname.split("/").pop();

  // Extract userId from JWT token
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming token is stored with key 'jwtToken'
    console.log("Token:", token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        setUserId(decoded.userId);
        console.log("Decoded User ID:", decoded.userId); // Update based on your token's payload structure
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  console.log(userId)

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
        const filteredReviews = data.filter(
          (review) => review.productId === parseInt(productId)
        );
        setReviews(filteredReviews);
      })
      .catch((error) => setError(error.message));
  }, [productId]);

  const handleWriteReview = () => setShowReviewModal(true);
  const handleRatingClick = (value) => setRating(value);

  const handleReviewSubmit = () => {
    if (rating === 0 || reviewComment.trim() === "") {
      alert("Please provide a rating and a comment.");
      return;
    }

    const reviewData = {
      reviewId: 0, // Backend will auto-generate this
      productId: parseInt(productId),
      userId: userId, // Replace with the actual user ID in your app
      rating,
      comment: reviewComment,
    };

    fetch("http://localhost:8083/api/product/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to submit the review.");
        return response.json();
      })
      .then(() => {
        alert("Review submitted successfully!");
        setShowReviewModal(false);
        setRating(0);
        setReviewComment("");

        // Optionally fetch updated reviews
        fetch(`http://localhost:8083/api/product/reviews`)
          .then((response) => response.json())
          .then((data) => {
            const filteredReviews = data.filter(
              (review) => review.productId === parseInt(productId)
            );
            setReviews(filteredReviews);
          });
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    setErrorMessage(""); // Clear error message when size is selected
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setErrorMessage("Please select a size.");
      return;
    }

    if (!quantity || quantity <= 0) {
      setErrorMessage("Please enter a valid quantity.");
      return;
    }

    try {
      // Step 1: Get the cart ID for the user
      const cartResponse = await fetch(
        `http://localhost:8082/api/carts/user/${userId}`
      );

      if (!cartResponse.ok) {
        throw new Error("Failed to fetch cart details.");
      }

      const cartData = await cartResponse.json();
      const cartId = cartData.cartId;

      // Step 2: Post the cart item data
      const cartItemData = {
        cartItemId: 0,
        productId: parseInt(productId), // Ensure productId is an integer
        quantity: parseInt(quantity), // Ensure quantity is an integer
        cart: cartId,
      };

      const addCartItemResponse = await fetch(
        "http://localhost:8082/api/cartItems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItemData),
        }
      );

      if (!addCartItemResponse.ok) {
        throw new Error("Failed to add item to cart.");
      }

      // Step 3: Show success modal if item is added successfully
      setShowAddToCartModal(true);
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      console.error("Error adding to cart:", error);
      setErrorMessage(`Error: ${error.message}`);
    }
  };


  // Calculate the average rating
  const averageRating =
    reviews.length > 0
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
                {[...Array(5)].map((_, index) =>
                  index < Math.round(averageRating) ? (
                    <AiFillStar key={index} style={{ color: "#ffd700" }} />
                  ) : (
                    <AiOutlineStar key={index} style={{ color: "#ccc" }} />
                  )
                )}
              </div>
              <p>({averageRating.toFixed(1)} / 5)</p>
            </div>

            {/* Separated Product Actions */}
            <div className="product-actions">
              <div className="size-selector">
                <label htmlFor="size">Select Size:</label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={handleSizeChange}
                >
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
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setErrorMessage(""); // Clear error message when quantity is entered
                  }}
                />
              </div>

              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}

              <div className="action-buttons">
                <button
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={productData.quantity === 0} // Disable if out of stock
                  style={{
                    backgroundColor:
                      productData.quantity === 0 ? "#ccc" : "#28a745",
                    cursor:
                      productData.quantity === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  {productData.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
                <button
                  className="write-review-btn"
                  onClick={handleWriteReview}
                >
                  Write Review
                </button>
              </div>
            </div>
            {/* **End of Separated Product Actions** */}
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

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Write a Review</h4>
            <textarea
              placeholder="Write your review..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
            <div className="rating-input">
              {[...Array(5)].map((_, index) => (
                <AiFillStar
                  key={index}
                  onClick={() => handleRatingClick(index + 1)}
                  style={{
                    color: index < rating ? "#ffd700" : "#ccc",
                    cursor: "pointer",
                    marginRight: "5px", // space between stars
                    fontSize: "2rem", // Increased size of stars
                  }}
                />
              ))}
            </div>
            <div className="buttons">
              <button onClick={handleReviewSubmit}>Submit Review</button>
              <button
                className="close-button"
                onClick={() => setShowReviewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

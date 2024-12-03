import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import jwtDecode from "jwt-decode";
import "./product.css";

const ProductDetails = () => {
  const [productData, setProductData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(0); // Show 0 initially
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [comment, setComment] = useState(""); // New state to store the comment
  const [rating, setRating] = useState(0);
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
     // Fetch user names for each review
     const fetchUserNames = filteredReviews.map((review) =>
      fetch(`http://localhost:8088/auth/get/${review.userId}`)
        .then((response) => {
          if (!response.ok) {
            console.log(`Error fetching user data for userId ${review.userId}:`, response.status);
            return { name: "Unknown User" }; // Fallback in case of error
          }
          console.log(`Fetched user data for userId ${review.userId}:`, response);
          return response.json();
        })
        .then((userData) => {
          console.log(`Fetched user data for userId ${review.userId}:`, userData);
          return {
            ...review,
            userName: userData.name || "Unknown User", // Assuming the API returns { name: "User's Name" }
          };
        })
        .catch((error) => {
          console.log(`Error fetching user data for userId ${review.userId}:`, error);
          return {
            ...review,
            userName: "Unknown User", // Fallback in case of error
          };
        })
    );

    // Wait for all user names to be fetched
    Promise.all(fetchUserNames)
      .then((reviewsWithUserNames) => setReviews(reviewsWithUserNames))
      .catch((error) => {
        console.error("Error fetching all user names:", error);
        setError("Failed to fetch user names.");
      });
  })
  .catch((error) => {
    console.error("Error fetching reviews:", error);
    setError(error.message);
  });
}, [productId]);

  const handleAddToCart = () => setShowAddToCartModal(true);
  const handleWriteReview = () => setShowReviewModal(true);
  const handleRatingClick = (value) => setRating(value);
  const handleSizeChange = (e) => setSelectedSize(e.target.value);

  const handleReviewSubmit = () => {
    const reviewData = {
      
      productId: parseInt(productId, 10), // Ensure productId is an integer
      userId: parseInt(userId, 10),
      rating: rating,
      comment: comment,
    };

    console.log("Review Data:", reviewData);

    fetch("http://localhost:8083/api/product/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to submit review.");
        return response.json();
      })
      .then((data) => {
        setReviews((prevReviews) => [...prevReviews, data]);
        setShowReviewModal(false);
        console.log("Review submitted:", data);
        window.location.reload();
      })
      .catch((error) => setError(error.message));
  };


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
                <p className="review-name">User: {review.userName || "Unknown User"}</p>
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
            <textarea
              placeholder="Write your review here..."
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)} // Update comment state
            />
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
            <button onClick={handleReviewSubmit}>Submit Review</button>
            <button onClick={() => setShowReviewModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

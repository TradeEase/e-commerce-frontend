import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"; // To decode the JWT token
import "./Orders.css"; // Import CSS for styling

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found in localStorage.");

        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;

        // Fetch orders for the user
        const ordersResponse = await axios.get(`http://localhost:8082/api/orders/user?userId=${userId}`);
        const ordersData = ordersResponse.data;

        if (!ordersData || !Array.isArray(ordersData)) {
          throw new Error("Invalid orders response data.");
        }

        // Fetch product details for each order
        const ordersWithProductDetails = await Promise.all(
          ordersData.map(async (order) => {
            try {
              const productResponse = await axios.get(
                `http://localhost:8083/api/product/products/${Number(order.productId)}`
              );
              const productDetails = productResponse.data;

              return {
                ...order,
                productDetails,
              };
            } catch (productError) {
              console.error(`Error fetching product details for Product ID ${order.productId}:`, productError);
              return {
                ...order,
                productDetails: null, // Gracefully handle missing product details
              };
            }
          })
        );

        setOrders(ordersWithProductDetails);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const cancelOrder = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const updatedOrders = orders.filter((order) => order.orderId !== orderId);
      setOrders(updatedOrders);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

 return (
  <div className="orders-wrapper">
    <h2 className="orders-header">My Orders</h2>
    <div className="orders-container">
      {orders.map((order) => (
        <div key={order.orderId} className="order-card">
          <div className="order-details">
            {order.productDetails ? (
              <div className="order-item">
                <img
                  src={order.productDetails.image || "placeholder-image-url"}
                  alt={order.productDetails.name || "Product"}
                />
                <h4>{order.productDetails.name}</h4>
                <p>Price: ${order.productDetails.price}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Description: {order.productDetails.description}</p>
              </div>
            ) : (
              <p>Product details not available</p>
            )}
          </div>
          <button
            className="cancel-order"
            onClick={() => cancelOrder(order.orderId)}
          >
            Cancel Order
          </button>
        </div>
      ))}
    </div>
  </div>
);
};


export default Orders;

import React, { useState } from "react";
import CartProducts from "../checkout/CartProducts.png";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalcode: "",
    cardType: "",
    cardNumber: "",
    expiryDate: "",
    securitycode: "",
    cardHolderName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment submitted");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: "20px" }}>
      {/* Header Section */}
      <header style={{ backgroundColor: "#001f3f", color: "#fff", padding: "20px 0", textAlign: "center" }}>
        <h3 style={{ margin: 0 }}>BuySwift Demo Checkout</h3>
      </header>

      {/* Main Content Section */}
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 20px" }}>
        <form onSubmit={handleSubmit} style={{ width: "400px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
          {/* Contact Section */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "24px", color: "#001f3f" }}>Contact</h2>
            <p style={{ fontSize: "14px", float: "right", color: "#001f3f" }}>
              Have an account? <a href="#" style={{ color: "#007bff" }}>Create Account</a>
            </p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
            />
          </div>

          {/* Delivery Section */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "24px", color: "#001f3f" }}>Delivery</h2>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
            >
              <option value="">Country / Region</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
              <option value="UK">UK</option>
              <option value="Australia">Australia</option>
            </select>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
              />
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
              style={{ width: "100%", padding: "10px", marginTop: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
              />
              <input
                type="text"
                name="postalcode"
                value={formData.postalcode}
                onChange={handleChange}
                placeholder="Postal Code"
                required
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <input type="checkbox" /> Save This Info For Future
            </div>
          </div>

          {/* Payment Section */}
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "24px", color: "#001f3f" }}>Payment</h2>
            <select
              name="cardType"
              value={formData.cardType}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
            >
              <option value="">Credit Card</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
            </select>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Card Number"
              required
              style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="Expiration Date"
                required
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
              />
              <input
                type="text"
                name="securitycode"
                value={formData.securitycode}
                onChange={handleChange}
                placeholder="Security Code"
                required
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
              />
            </div>
            <input
              type="text"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleChange}
              placeholder="Card Holder Name"
              required
              style={{ width: "100%", padding: "10px", marginTop: "10px", borderRadius: "4px", border: "1px solid #ced4da" }}
            />
            <div style={{ marginTop: "10px" }}>
              <input type="checkbox" /> Save This Info For Future
            </div>
          </div>

          {/* Pay Now Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "#001f3f",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              borderRadius: "4px",
            }}
          >
            Pay Now
          </button>
        </form>

        {/* CartProducts Image */}
        <div style={{ marginLeft: "50px", marginTop: "10px" }}>
          <img
            src={CartProducts}
            alt="Cart Products"
            style={{ width: "400px", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

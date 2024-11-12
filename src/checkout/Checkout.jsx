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

  const [isDeliveryInfoSaved, setIsDeliveryInfoSaved] = useState(false);
  const [isPaymentInfoSaved, setIsPaymentInfoSaved] = useState(false);

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

  const inputStyles = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ced4da",
    backgroundColor: "#fff",
    color: "#001f3f",
  };

  const checkboxContainerStyle = {
    display: "flex",
    alignItems: "center",
    color: "#001f3f",
    marginTop: "10px",
  };

  const customCheckboxStyle = {
    appearance: "none",
    width: "20px",
    height: "20px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    border: "2px solid #ced4da",
    position: "relative",
    cursor: "pointer",
    marginRight: "10px",
  };

  const checkmarkStyle = (isChecked) => ({
    position: "absolute",
    top: "2px",
    left: "5px",
    fontSize: "16px",
    color: "#001f3f",
    display: isChecked ? "block" : "none",
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: "20px" }}>
      <header style={{ backgroundColor: "#f8f9fa", color: "#001f3f", padding: "20px 0", textAlign: "center" }}>
        <h3 style={{ margin: 0 }}>BuySwift Demo Checkout</h3>
      </header>

      <div style={{ display: "flex", justifyContent: "center", padding: "40px 20px" }}>
        <form onSubmit={handleSubmit} style={{ width: "400px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
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
              style={inputStyles}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "24px", color: "#001f3f" }}>Delivery</h2>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              style={inputStyles}
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
                style={inputStyles}
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                style={inputStyles}
              />
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
              style={{ ...inputStyles, marginTop: "10px" }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                style={inputStyles}
              />
              <input
                type="text"
                name="postalcode"
                value={formData.postalcode}
                onChange={handleChange}
                placeholder="Postal Code"
                required
                style={inputStyles}
              />
            </div>
            <div style={checkboxContainerStyle}>
              <div
                style={customCheckboxStyle}
                onClick={() => setIsDeliveryInfoSaved(!isDeliveryInfoSaved)}
              >
                <span style={checkmarkStyle(isDeliveryInfoSaved)}>✓</span>
              </div>
              Save This Info For Future
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "24px", color: "#001f3f" }}>Payment</h2>
            <select
              name="cardType"
              value={formData.cardType}
              onChange={handleChange}
              required
              style={inputStyles}
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
              style={inputStyles}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="Expiration Date"
                required
                style={inputStyles}
              />
              <input
                type="text"
                name="securitycode"
                value={formData.securitycode}
                onChange={handleChange}
                placeholder="Security Code"
                required
                style={inputStyles}
              />
            </div>
            <input
              type="text"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleChange}
              placeholder="Card Holder Name"
              required
              style={{ ...inputStyles, marginTop: "10px" }}
            />
            <div style={checkboxContainerStyle}>
              <div
                style={customCheckboxStyle}
                onClick={() => setIsPaymentInfoSaved(!isPaymentInfoSaved)}
              >
                <span style={checkmarkStyle(isPaymentInfoSaved)}>✓</span>
              </div>
              Save This Info For Future
            </div>
          </div>

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

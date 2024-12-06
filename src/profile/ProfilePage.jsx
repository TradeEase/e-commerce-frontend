import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import "./ProfilePage.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Extract userId from JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  // Fetch user data
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `http://localhost:8088/auth/get/${userId}`
          );
          if (!response.ok) throw new Error("Server Error");
          const data = await response.json();
          setUserData(data);
          setFormData({
            fullname: data.fullName || "",
            email: data.email || "",
            mobile: data.mobile || "",
            address: data.address || "",
          });
        } catch (err) {
          setError("Error fetching user data. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserData();
    }
  }, [userId]);

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8088/auth/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          fullName: formData.fullname,
          email: formData.email,
          mobile: formData.mobile,
          address: formData.address,
        }),
      });

      if (!response.ok) throw new Error("Update failed");
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Error updating profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-icon-container">
        <i className="fas fa-user profile-icon"></i>
      </div>
      <h1 className="profile-header">My Profile</h1>
      <div className="profile-form-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <form className="profile-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email address"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                placeholder="Enter your phone number"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Enter your address"
                className="form-input"
              />
            </div>
            <button type="submit" className="form-submit-button">
              Update Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;

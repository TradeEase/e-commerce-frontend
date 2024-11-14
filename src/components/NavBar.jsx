import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Notification from '../notificaton/notification';
import { FaSearch, FaUser, FaStar, FaShoppingCart, FaBell, FaKey, FaDoorOpen } from 'react-icons/fa';

function NavBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLoginLogout = () => {
    setIsAuthenticated(!isAuthenticated); // Toggle authentication status
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>BuySwift</h1>
      </div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/orders">Orders</a>
        <a href="/contact">Contact Us</a>
      </div>
      


<div className="navbar-icons">
  <Link to="">
    <FaSearch className="icon" />
  </Link>
  <Link to="/profile">
    <FaUser className="icon" />
  </Link>
  <Link to="/cartpage">
    <FaShoppingCart className="icon" />
  </Link>
  <FaBell className="icon notification-icon" onClick={toggleNotifications} />
  {showNotifications && <Notification />}
  {isAuthenticated ? (
    <FaDoorOpen className="icon auth-icon" onClick={handleLoginLogout} title="Logout" />
  ) : (
    <Link to="/login">
      <FaKey className="icon auth-icon" title="Login" />
    </Link>
  )}
</div>

    </nav>
  );
}

export default NavBar;

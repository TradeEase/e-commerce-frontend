import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './Navbar.css';

import { FaSearch, FaUser, FaShoppingCart, FaKey, FaDoorOpen } from 'react-icons/fa';

function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  }, []);

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch (e) {
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    console.log('Logged out');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>BuySwift</h1>
      </div>
      <div className="navbar-links">
        <a href="/">Home</a>
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

        {isAuthenticated ? (
          <FaDoorOpen
            className="icon auth-icon"
            onClick={handleLogout}
            title="Logout"
          />
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

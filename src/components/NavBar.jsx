import React from 'react';
import './Navbar.css';
import { FaSearch, FaUser, FaStar, FaShoppingCart, FaBell } from 'react-icons/fa';


function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>BuySwift</h1>
      </div>
      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#promotion">Promotion</a>
        <a href="#products">Products</a>
        <div className="navbar-dropdown">
          <button className="dropdown-btn">Pages</button>
          <div className="dropdown-content">
            <a href="#page1">Page 1</a>
            <a href="#page2">Page 2</a>
          </div>
        </div>
        <a href="#contact">Contact Us</a>
      </div>
      <div className="navbar-icons">
        <FaSearch className="icon" />
        <FaUser className="icon" />
        <FaStar className="icon" />
        <FaShoppingCart className="icon" />
        <FaBell className="icon" />
      </div>
    </nav>
  )
}

export default NavBar
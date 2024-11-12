import React, { useState } from 'react';
import './Navbar.css';
import Notification from '../notificaton/notification';
import { FaSearch, FaUser, FaStar, FaShoppingCart, FaBell } from 'react-icons/fa';


function NavBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
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
        <FaBell className="icon notification-icon" onClick={toggleNotifications}/>
        {showNotifications && <Notification />}
      </div>
    </nav>
  )
}

export default NavBar
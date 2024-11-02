import React from 'react';
import './Footer.css'
import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';


function Footer() {
  return (
    <footer className="footer">
      <p className="quote">
        “Be who you are and say what you feel,<br/> because those who mind don't matter, and those who matter don't mind.”
      </p>
      <div className="social-icons">
        <FaFacebook className="icon" />
        <FaInstagram className="icon" />
        <FaWhatsapp className="icon" />
        <FaTwitter className="icon" />
      </div>
    </footer>
  )
}

export default Footer
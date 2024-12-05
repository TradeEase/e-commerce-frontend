import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <div className="wrapper">
      <div className="content">
        {/* Add main page content here */}
      </div>
      <footer className="footer">
        <p className="quote">
          “Be who you are and say what you feel,<br />
          because those who mind don't matter, and those who matter don't mind.”
        </p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook className="icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="icon" />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp className="icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="icon" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

// src/PasswordReset.js

import React from 'react';
import './login/PasswordReset.css';

function PasswordReset() {
  return (
    <div className="outer-container">
      <div className="password-reset-container">
        <div className="image-section">
          <img
            src="LoginIMG.jpg" // Replace with actual image URL
            alt="Stylish Woman"
          />
        </div>
        <div className="form-section">
          <h1 className="brand-name">FASCO</h1>
          <h2 className="title">Enter Your New Password</h2>
          <form>
            <label>
              <input type="password" placeholder="New Password" required />
            </label>
            <label>
              <input type="password" placeholder="Confirmation Password" required />
            </label>
            <button type="submit">Submit</button>
          </form>
          <footer>FASCO Terms & Conditions</footer>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;

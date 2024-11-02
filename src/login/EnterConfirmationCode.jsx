// EnterConfirmationCode.js
import React from 'react';
import './EnterConfirmationCode.css';

function EnterConfirmationCode() {
    return (
        <div className="container">
            <div className="content">
                <div className="image-section">
                    <img src="LoginIMG.jpg" alt="Background visual" />
                </div>
                <div className="form-section">
                    <h1>FASCO</h1>
                    <h2>Enter The Confirmation Code</h2>
                    <input type="text" placeholder="Confirmation Code" className="input-field" />
                    <button className="recover-button">Recover Account</button>
                    <p className="resend-text">
                        Didn't receive Confirmation Code? <a href="#">Resend Now</a>
                    </p>
                    <footer>FASCO Terms & Conditions</footer>
                </div>
            </div>
        </div>
    );
}

export default EnterConfirmationCode;

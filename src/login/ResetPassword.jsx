import React from 'react';
import './Form.css';

function ResetPassword() {
    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-image">
                    <img src={require('../assets/SignIMG.jpg')} alt="Reset Password visual" />
                </div>
                <div className="auth-form">
                    <h1>FASCO</h1>
                    <h2>Enter Your New Password</h2>
                    <form>
                        <input type="password" placeholder="New Password" className="input-field" />
                        <input type="password" placeholder="Confirmation Password" className="input-field" />
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                    <p className="links">FASCO Terms & Conditions</p>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;

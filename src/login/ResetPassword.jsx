import React from 'react';
import './Form.css';
import Image from '../assets/SignIMG.jpg';
import { Link } from 'react-router-dom';

function ResetPassword() {
    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-image">
                    <img src={Image} alt="Reset Password visual" />
                </div>
                <div className="auth-form">
                    <h1>FASCO</h1>
                    <h2>Enter Your New Password</h2>
                    <form>
                        <input type="password" placeholder="New Password" className="input-field" />
                        <input type="password" placeholder="Confirmation Password" className="input-field" />
                        <button type="submit" className="submit-btn"><Link to="/login">Submit</Link></button>
                    </form>
                    <p className="links">FASCO Terms & Conditions</p>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;

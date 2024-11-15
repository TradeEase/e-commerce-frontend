import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import signup from '../assets/SignIMG.jpg';


function ForgotPassword() {


    return (
        
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-image">
                    <img src={signup} alt="Forgot Password visual" />
                </div>
                <div className="auth-form">
                    <h1>FASCO</h1>
                    <h2>Forget Password</h2>
                    <form>
                        <input type="text" placeholder="First Name" className="input-field" />
                        <input type="text" placeholder="Last Name" className="input-field" />
                        <input type="email" placeholder="Email Address" className="input-field" />
                        <input type="text" placeholder="Phone Number" className="input-field" />
                        <button type="submit" className="submit-btn">Send Confirmation Code</button>
                    </form>
                    <div className="links">
                        <Link to="/">Already have an account? Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;

import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';

function Signup() {
    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-image">
                    <img src="RegIMG.jpg" alt="Signup visual" />
                </div>
                <div className="auth-form">
                    <h1>FASCO</h1>
                    <h2>Create Account</h2>
                    <div className="social-buttons">
                        <button className="social-button google">Sign up with Google</button>
                        <button className="social-button email">Sign up with Email</button>
                    </div>
                    <div className="divider">— OR —</div>
                    <form>
                        <div className="two-column">
                            <input type="text" placeholder="First Name" className="input-field" />
                            <input type="text" placeholder="Last Name" className="input-field" />
                        </div>
                        <div className="two-column">
                            <input type="email" placeholder="Email Address" className="input-field" />
                            <input type="text" placeholder="Phone Number" className="input-field" />
                        </div>
                        <div className="two-column">
                            <input type="password" placeholder="Password" className="input-field" />
                            <input type="password" placeholder="Confirm Password" className="input-field" />
                        </div>
                        <button type="submit" className="submit-btn">Create Account</button>
                    </form>
                    <div className="links">
                        <Link to="/">Already have an account? Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;

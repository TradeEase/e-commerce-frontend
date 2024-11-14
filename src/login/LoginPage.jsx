import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import loginimg from '../assets/LoginIMG.jpg';

function Login() {
    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-image">
                    <img src={loginimg} alt="Login visual" />
                </div>
                <div className="auth-form">
                    <h1>FASCO</h1>
                    <h2>Sign In To FASCO</h2>
                    <div className="social-buttons">
                        <button className="social-button google">Sign up with Google</button>
                        <button className="social-button email">Sign up with Email</button>
                    </div>
                    <div className="divider">— OR —</div>
                    <form>
                        <input type="email" placeholder="Email" className="input-field" />
                        <input type="password" placeholder="Password" className="input-field" />
                        <button type="submit" className="submit-btn">Sign In</button>
                    </form>
                    <div className="links">
                        <Link to="/forgotpassword">Forgot Password?</Link> | <Link to="/signup">Register Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
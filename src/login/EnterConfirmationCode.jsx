import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';
import signup from '../assets/SignIMG.jpg';

function EnterConfirmationCode() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Redirect to the reset password page
        navigate('/reset-password');
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-image">
                    <img src={signup} alt="Confirmation visual" />
                </div>
                <div className="auth-form">
                    <h1>FASCO</h1>
                    <h2>Enter The Confirmation Code</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Confirmation Code" className="input-field" />
                        <button type="submit" className="submit-btn">
                            <Link to="/reset-password">Recover Account</Link>
                            </button>
                    </form>
                    <div className="links">
                        <p>Didn't receive Confirmation Code?<button>Resend Now</button></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EnterConfirmationCode;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import loginimg from '../assets/LoginIMG.jpg';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let validationErrors = {};

        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Invalid email format';
        }

        if (!formData.password.trim()) {
            validationErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Login successful', formData);
            // Add login logic here
        }
    };

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
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input-field"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="error-msg">{errors.email}</div>}
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input-field"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <div className="error-msg">{errors.password}</div>}
                        </div>
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

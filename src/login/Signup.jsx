import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import loginimg from '../assets/LoginIMG.jpg';


function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required.';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required.';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address.';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        } else if (!/^\d+$/.test(formData.phone)) {
            newErrors.phone = 'Enter a valid phone number.';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }
        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Account created successfully!');
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
                    <h2>Create Account</h2>
                    <div className="social-buttons">
                        <button className="social-button google">Sign up with Google</button>
                        <button className="social-button email">Sign up with Email</button>
                    </div>
                    <div className="divider">— OR —</div>
                    <form onSubmit={handleSubmit}>
                        <div className="two-column">
                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="input-field"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <p className="error-msg">{errors.firstName}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="input-field"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <p className="error-msg">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div className="two-column">
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="input-field"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="error-msg">{errors.email}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className="input-field"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                {errors.phone && <p className="error-msg">{errors.phone}</p>}
                            </div>
                        </div>
                        <div className="two-column">
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input-field"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className="error-msg">{errors.password}</p>}
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="input-field"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}
                            </div>
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

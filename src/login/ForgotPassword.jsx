import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import signup from '../assets/SignIMG.jpg';

function ForgotPassword() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Proceed with form submission (e.g., send confirmation code)
            console.log('Form submitted:', formData);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-image">
                    <img src={signup} alt="Forgot Password visual" />
                </div>
                <div className="auth-form">
                    <h1>FASCO</h1>
                    <h2>Forget Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="input-field"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <div className="error-msg">{errors.firstName}</div>}
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
                            {errors.lastName && <div className="error-msg">{errors.lastName}</div>}
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="input-field"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="error-msg">{errors.email}</div>}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                className="input-field"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                            {errors.phoneNumber && <div className="error-msg">{errors.phoneNumber}</div>}
                        </div>

                        <button type="submit" className="submit-btn">
                            <Link to="/enter-confirmation-code">Send Confirmation Code </Link>
                            </button>
                    </form>
                    <div className="links">
                        <Link to="/login">Already have an account? Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;

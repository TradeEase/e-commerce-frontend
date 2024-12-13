import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';
import loginimg from '../assets/LoginIMG.jpg';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState(''); // For displaying backend validation errors
    const navigate = useNavigate(); // Hook for navigation

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                // Step 1: Login request
                const response = await axios.post('http://gateway:8080/api/taskUserService/auth/signin', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data && response.data.jwt) {
                    // Store JWT in localStorage
                    localStorage.setItem('token', response.data.jwt);

                    // Decode JWT to get user info
                    const decodedToken = jwtDecode(response.data.jwt);

                    if (decodedToken.userId) {
                        console.log('User ID:', decodedToken.userId);

                        // Step 2: Fetch user details
                        const userDetailsResponse = await axios.get(`http://gateway:8080/api/taskUserService/auth/get/${decodedToken.userId}`, {
                            headers: {
                                Authorization: `Bearer ${response.data.jwt}`,
                            },
                        });

                        const user = userDetailsResponse.data;

                        if (user.role === 'ROLE_CUSTOMER') {
                            navigate('/'); // Navigate to home page for customers
                        } else if (user.role === 'USER') {
                            navigate('/admincreation'); // Navigate to admin panel for admin users
                        } else {
                            alert('Invalid role assigned to the user.');
                        }

                        // Optional: Cart creation logic
                        try {
                            const cartResponse = await axios.post(
                                'http://gateway:8080/api/orders/carts',
                                { userId: decodedToken.userId },
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${response.data.jwt}`,
                                    },
                                }
                            );
                            console.log('Cart created:', cartResponse.data);
                        } catch (cartError) {
                            console.error('Cart API request failed:', cartError);
                            alert('Logged in successfully, but cart creation failed. You can still proceed.');
                        }
                    } else {
                        console.error('User ID not found in token');
                    }
                }
            } catch (error) {
                console.error('Login request failed:', error);
                setErrorMsg('Invalid email or password'); // Display generic error message
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-image">
                    <img src={loginimg} alt="Login visual" />
                </div>
                <div className="auth-form">
                    <h1>BuySwift</h1>
                    <h2>Sign In To BuySwift</h2>

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
                        {errorMsg && <div className="error-msg">{errorMsg}</div>}
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

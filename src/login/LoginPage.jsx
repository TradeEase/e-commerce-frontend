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
                const response = await axios.post('http://localhost:8088/auth/signin', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.data && response.data.jwt) {
                    // Store JWT in localStorage
                    localStorage.setItem('token', response.data.jwt);
    
                    // Step 3: Decode JWT to get user info
                    const decodedToken = jwtDecode(response.data.jwt);
                    //console.log('Decoded Token:', decodedToken);
    
                    if (decodedToken.userId) {
                        console.log('User ID:', decodedToken.userId);
    
                        // Step 4: Send userId in POST request to carts API
                        const cartResponse = await axios.post(
                            'http://localhost:8082/api/order/carts',
                            { userId: decodedToken.userId }, // Send userId in request body
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${response.data.jwt}` // Pass the JWT for authentication
                                }
                            }
                        );
    
                        console.log('Cart API Response:', cartResponse.data);
    
                        // Navigate to home page after both requests are successful
                        navigate('/');
                    } else {
                        console.log('User ID not found in token');
                    }
    
                    console.log('Login successful', response.data);
                }
            } catch (error) {
                console.error('Login or Cart API request failed:', error);
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import loginimg from '../assets/LoginIMG.jpg';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        if (!email.trim()) {
            return "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Invalid email format.";
        } else if (!newPassword.trim()) {
            return "New password is required.";
        } else if (newPassword.length < 6) {
            return "Password must be at least 6 characters long.";
        } else if (newPassword !== confirmPassword) {
            return "Passwords do not match.";
        }
        return "";
    };

    const handleChangePassword = async () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");

        try {
            // Construct the full URL with the email passed in the path
            const url = `http://localhost:8088/auth/updatePasswordByEmail/${encodeURIComponent(email)}`;

            // Make a POST request to the endpoint
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: newPassword, // Send the new password in the request body
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to change password. Please try again.");
            }

            const responseData = await response.text(); // Read the response as text
            alert(responseData); // Display the response from the backend
            navigate("/login"); // Redirect to the login page after successful password change
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-image">
                    <img src={loginimg} alt="Forgot Password visual" />
                </div>
                <div className="auth-form">
                    <h1>BuySwift</h1>
                    <h2>Forgot Password</h2>

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Enter New Password"
                            className="input-field"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            className="input-field"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="error-msg">{error}</div>}
                    <button type="button" className="submit-btn" onClick={handleChangePassword}>
                        Change Password
                    </button>

                    <div className="links">
                        <a href="/login">Back to Login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
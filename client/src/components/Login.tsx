import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Login.css";

const Login: React.FC = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
    });

    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from AuthContext

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
            const { token } = response.data;

            // Use the login function from AuthContext
            login(token);

            // Optional: Decode the token for user data (not recommended for sensitive info)
            const userData = JSON.parse(atob(token.split(".")[1]));
            console.log("Logged-in user data:", userData);

            setMessage("Login successful!");
            navigate("/home");
        } catch (error: any) {
            setMessage(error.response?.data?.error || "Something went wrong.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="login-field">
                    <label htmlFor="emailOrUsername">Email or Username</label>
                    <input
                        type="text"
                        id="emailOrUsername"
                        name="emailOrUsername"
                        value={formData.emailOrUsername}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        required
                    />
                </div>
                <div className="login-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="password"
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>

    );
};

export default Login;

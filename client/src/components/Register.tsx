import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validators";
import "../styles/Register.css";

const Register = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setMessage("Invalid email");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
            setMessage(`Success: ${response.data.message}`);
            if (response.status === 201) {
                navigate("/login"); // Use react-router-dom's useNavigate hook
            }

        } catch (error: any) {
            setMessage(`Error: ${error.response?.data?.error || "Something went wrong"}`);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="register-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        required
                    />
                </div>
                <div className="register-field">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="HarmoniUser"
                        required
                    />
                </div>
                <div className="register-field">
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
                <button type="submit">Register</button>
            </form>
        </div>

    );
};

export default Register;

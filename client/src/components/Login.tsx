import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: "",
    });

    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/auth/login", formData);
            const { token } = response.data;

            // Save token to localStorage
            localStorage.setItem("token", token);

            setMessage("Login successful!");
            navigate("/home");
        } catch (error: any) {
            setMessage(error.response?.data?.error || "Something went wrong.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="emailOrUsername">Email or Username:</label>
                    <input
                        type="text"
                        id="emailOrUsername"
                        name="emailOrUsername"
                        value={formData.emailOrUsername}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validators";

const Register = () => {
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
            const response = await axios.post("http://localhost:8080/auth/register", formData);
            setMessage(`Success: ${response.data.message}`);
            if (response.status === 201) {
                navigate("/login"); // Use react-router-dom's useNavigate hook
            }

        } catch (error: any) {
            setMessage(`Error: ${error.response?.data?.error || "Something went wrong"}`);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;

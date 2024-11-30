import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check login state on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Set to true if token exists
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/" className="nav-link">
                    Harmoni
                </Link>
            </div>
            <ul className="nav-links">
                <li className="nav-item">
                    <Link to="/about" className="nav-link">
                        About
                    </Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li className="nav-item">
                            <button className="nav-link button-link" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;

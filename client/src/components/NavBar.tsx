import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import the AuthContext
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
    const { isLoggedIn, logout } = useAuth(); // Access isLoggedIn and logout from AuthContext
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Log the user out and clear token
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

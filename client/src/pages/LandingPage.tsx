import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const goToRegister = () => {
        navigate('/register');
    }

    const goToLogin = () => {
        navigate('/login');
    }

    return (
        <div>
            <h1>Welcome to Harmoni</h1>
            <p>Create an account or log in to access our features and connect with others!</p>
            <div>
                <button onClick={goToRegister}>
                    Register
                </button>
                <button onClick={goToLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
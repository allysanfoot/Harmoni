import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the AuthContext
interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider to wrap the app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Login and logout functions
    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

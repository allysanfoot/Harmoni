import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const token = localStorage.getItem("token");

    return token ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

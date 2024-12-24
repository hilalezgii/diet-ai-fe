import React from "react";
import { Navigate, Outlet } from "react-router";

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
};

const PrivateRoute: React.FC = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

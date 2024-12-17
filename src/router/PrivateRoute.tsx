import React from "react";
import { Navigate, Outlet } from "react-router";

// Auth kontrolü (Örnek bir auth yapısı)
const isAuthenticated = () => {
    const token = localStorage.getItem("token"); // Token kontrolü
    return !!token; // Token varsa true döner, yoksa false
};

const PrivateRoute: React.FC = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

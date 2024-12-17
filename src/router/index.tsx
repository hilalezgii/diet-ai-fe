import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import LoginPage from "../pages/Login/LoginPage.tsx";
import RegisterPage from "../pages/Register/RegisterPage.tsx";
import ChatbotPage from "../pages/ChatBot/ChatBotPage.tsx";
import DashboardPage from "../pages/Dashboard/DashboardPage.tsx";
import PrivateRoute from "./PrivateRoute.tsx";

const AppRouter: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>

                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />


                    <Route element={<PrivateRoute />}>
                        <Route path="/chatbot" element={<ChatbotPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
};

export default AppRouter;

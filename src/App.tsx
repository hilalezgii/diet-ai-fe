import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import LoginPage from './Pages/Login/LoginPage.tsx';
import RegisterPage from "./Pages/Register/RegisterPage.tsx";
import ChatbotPage from "./Pages/ChatBot/ChatBotPage.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardPage from "./Pages/Dashboard/DashboardPage.tsx";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/chatbot" element={<ChatbotPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />



                </Routes>
            </Router>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>

    );
}

export default App;

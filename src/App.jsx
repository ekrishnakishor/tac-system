import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transaction from './pages/Transcation';
import ViewTransactions from './pages/ViewTransactions';
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/view-transactions" element={<ViewTransactions />} />
            </Routes>
        </Router>
    );
};

export default App;

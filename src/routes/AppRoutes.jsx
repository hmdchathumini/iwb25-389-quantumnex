import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import AboutUs from '../AboutUs';
import Contact from '../Contact';

import Reviews from '../Reviews';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CustomerDashboardPage from '../pages/CustomerDashboardPage';
import WorkerDashboardPage from '../pages/WorkerDashboardPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer-dashboard" element={<CustomerDashboardPage />} />
            <Route path="/worker-dashboard" element={<WorkerDashboardPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        </Routes>
    );
};

export default AppRoutes;
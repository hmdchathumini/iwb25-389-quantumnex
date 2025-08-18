import React, { useState } from 'react';
import AdminDashboard from '../components/admin/AdminDashboard';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';


const AdminDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex pt-16"> {/* Add top padding to account for Navbar height */}
                <Sidebar type="admin" activeTab={activeTab} setActiveTab={setActiveTab} />
                <main className="flex-1 p-6 ml-64"> {/* Add left margin to account for Sidebar width */}
                    <AdminDashboard activeTab={activeTab} />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardPage;

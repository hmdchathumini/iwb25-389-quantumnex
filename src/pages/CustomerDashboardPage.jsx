import React, { useState } from 'react';
import CustomerDashboard from '../components/customer/CustomerDashboard';

import Sidebar from '../components/common/Sidebar';

const CustomerDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('postTask');

    return (
        <div className="min-h-screen bg-gray-50">
            
            <div className="flex pt-16">
                <Sidebar type="customer" activeTab={activeTab} setActiveTab={setActiveTab} />
                <main className="flex-1 p-6 ml-64">
                    <CustomerDashboard activeTab={activeTab} />
                </main>
            </div>
        </div>
    );
};

export default CustomerDashboardPage;
import React from 'react';
import UsersTab from './UsersTab';
import TasksTab from './TasksTab';
import PaymentsTab from './PaymentsTab';
import AnalyticsTab from './AnalyticsTab';
import AdminProfileTab from './Profile';

const AdminDashboard = ({ activeTab }) => {
    switch (activeTab) {
        case 'users':
            return <UsersTab />;
        case 'tasks':
            return <TasksTab />;
        case 'payments':
            return <PaymentsTab />;
        case 'analytics':
            return <AnalyticsTab />;
        case 'profile':
            return <AdminProfileTab />;
        default:
            return <div>Select a tab</div>;
    }
};

export default AdminDashboard;
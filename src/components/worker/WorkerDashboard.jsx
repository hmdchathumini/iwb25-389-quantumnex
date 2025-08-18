import React from 'react';
import ProfileTab from './ProfileTab';
import MyTasksTab from './MyTasksTab';
import TaskFeedTab from './TaskFeedTab';

const WorkerDashboard = ({ activeTab = 'taskfeed' }) => {
    if (activeTab === 'profile') {
        return <ProfileTab />;
    }
    if (activeTab === 'mytasks') {
        return <MyTasksTab />;
    }
    if (activeTab === 'taskfeed') {
        return <TaskFeedTab />;
    }
};

export default WorkerDashboard;

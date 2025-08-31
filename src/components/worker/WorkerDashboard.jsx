import React from 'react';
import ProfileTab from './ProfileTab';
import MyTasksTab from './MyTasksTab';
import TaskFeedTab from './TaskFeedTab';
import MapViewTab from './MapViewTab';
import WorkerNotificationTab from '../worker/NotificationTab';

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
    if(activeTab==='mapView'){
        return <MapViewTab/>;
    }
    if(activeTab==='notifications'){
        return <WorkerNotificationTab/>;
    }
    
        
};

export default WorkerDashboard;

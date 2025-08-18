import React from 'react';
import PostTaskTab from './PostTaskTab';
import TaskListTab from './TaskListTab';
import MapViewTab from './MapViewTab';

const CustomerDashboard = ({ activeTab }) => {
    return (
        <div>
            {activeTab === 'postTask' && <PostTaskTab />}
            {activeTab === 'taskList' && <TaskListTab />}
            {activeTab === 'mapView' && <MapViewTab />}
        </div>
    );
};

export default CustomerDashboard;
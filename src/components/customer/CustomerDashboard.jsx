import React, { useState } from 'react';
import OverviewTab from './OverviewTab';
import TaskListTab from './TaskListTab';
import NotificationsTab from './NotificationsTab';
import PaymentsTab from './PaymentsTab';
import MapViewTab from './MapViewTab';
import ProfileTab from './CustomerProfile';

export default function CustomerDashboard({ activeTab }) {
  const tab = activeTab || 'overview';

  // Example: state for profile and tasks
  const [profileData, setProfileData] = useState({});
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      {tab === 'overview' && <OverviewTab />}
      {tab === 'taskList' && (
        <TaskListTab tasks={tasks} setTasks={setTasks} />
      )}
      {tab === 'notifications' && <NotificationsTab />}
      {tab === 'payments' && <PaymentsTab />}
      {tab === 'mapView' && <MapViewTab />}
      {tab === 'profile' && (
        <ProfileTab profileData={profileData} setProfileData={setProfileData} />
      )}
    </div>
  );
}

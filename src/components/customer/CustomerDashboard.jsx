import React, { useState } from 'react';
import OverviewTab from './OverviewTab';
import PostTaskTab from './PostTaskTab';
import TaskListTab from './TaskListTab';
import NotificationsTab from './NotificationsTab';
import PaymentsTab from './PaymentsTab';

export default function CustomerDashboard({ activeTab }) {
  // if you want internal tab switching, you can use local state; here we rely on prop activeTab
  const tab = activeTab || 'overview';
  return (
    <div>
      {tab === 'overview' && <OverviewTab />}
      {tab === 'postTask' && <PostTaskTab onPosted={() => { /* could refresh tasks */ }} />}
      {tab === 'taskList' && <TaskListTab />}
      {tab === 'notifications' && <NotificationsTab />}
      {tab === 'payments' && <PaymentsTab />}
    </div>
  );
}

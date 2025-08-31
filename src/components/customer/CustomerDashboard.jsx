import OverviewTab from './OverviewTab';
import TaskListTab from './TaskListTab';
import NotificationsTab from './NotificationsTab';
import PaymentsTab from './PaymentsTab';
import ProfileTab from './CustomerProfile';

const CustomerDashboard = ({ activeTab = 'overview' }) => {
  if (activeTab === 'overview') {
    return <OverviewTab />;
  }
  if (activeTab === 'taskList') {
    return <TaskListTab />;
  }
  if (activeTab === 'notifications') {
    return <NotificationsTab />;
  }
  if (activeTab === 'payments') {
    return <PaymentsTab />;
  }
  if (activeTab === 'profile') {
    return <ProfileTab />;
  }

  // fallback to overview ✅
  return <OverviewTab />;
};

export default CustomerDashboard;

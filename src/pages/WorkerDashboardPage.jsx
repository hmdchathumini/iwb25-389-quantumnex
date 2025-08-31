import React, { useState } from 'react';
import WorkerDashboard from '../components/worker/WorkerDashboard';

import Sidebar from '../components/common/Sidebar';

const WorkerDashboardPage = () => {
    const [activeTab, setActiveTab] = useState('taskfeed');

    return (
        <div className="min-h-screen bg-gray-50">
            
            <div className="flex pt-16">
                <Sidebar type="worker" activeTab={activeTab} setActiveTab={setActiveTab} />
                <main className="flex-1 p-6 ml-64">
                    <WorkerDashboard activeTab={activeTab} />
                </main>
            </div>
        </div>
    );
};

export default WorkerDashboardPage;
import React from 'react';
import { motion } from 'framer-motion';
import DashboardHome from '@/components/pages/DashboardHome.jsx';
import TestBookings from '@/components/pages/TestBookings.jsx';
import SampleCollections from '@/components/pages/SampleCollections.jsx';
import ReportsManagement from '@/components/pages/ReportsManagement.jsx';
import Inventory from '@/components/pages/Inventory.jsx';
import UsersRoles from '@/components/pages/UsersRoles.jsx';
import Analytics from '@/components/pages/Analytics.jsx';
import Notifications from '@/components/pages/Notifications.jsx';
import Settings from '@/components/pages/Settings.jsx';
import Integrations from '@/components/pages/Integrations.jsx';

const Dashboard = ({ currentPage, userRole }) => {
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome userRole={userRole} />;
      case 'bookings':
        return <TestBookings userRole={userRole} />;
      case 'collections':
        return <SampleCollections userRole={userRole} />;
      case 'reports':
        return <ReportsManagement userRole={userRole} />;
      case 'inventory':
        return <Inventory userRole={userRole} />;
      case 'users':
        return <UsersRoles userRole={userRole} />;
      case 'analytics':
        return <Analytics userRole={userRole} />;
      case 'integrations':
        return <Integrations userRole={userRole} />;
      case 'notifications':
        return <Notifications userRole={userRole} />;
      case 'settings':
        return <Settings userRole={userRole} />;
      default:
        return <DashboardHome userRole={userRole} />;
    }
  };

  return (
    <motion.div
      key={currentPage}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {renderPage()}
    </motion.div>
  );
};

export default Dashboard;
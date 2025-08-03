import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  Package, 
  UserCheck, 
  BarChart3, 
  Bell, 
  Settings,
  TestTube,
  MapPin,
  Plug,
  X
} from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, userRole, sidebarOpen, setSidebarOpen, isMobile }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'technician', 'collector'] },
    { id: 'bookings', name: 'Test Bookings', icon: Calendar, roles: ['admin', 'technician'] },
    { id: 'collections', name: 'Sample Collections', icon: MapPin, roles: ['admin', 'collector'] },
    { id: 'reports', name: 'Reports Management', icon: FileText, roles: ['admin', 'technician'] },
    { id: 'inventory', name: 'Inventory', icon: Package, roles: ['admin', 'technician'] },
    { id: 'users', name: 'Users & Roles', icon: UserCheck, roles: ['admin'] },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, roles: ['admin'] },
    { id: 'integrations', name: 'Integrations', icon: Plug, roles: ['admin'] },
    { id: 'notifications', name: 'Notifications', icon: Bell, roles: ['admin', 'technician', 'collector'] },
    { id: 'settings', name: 'Settings', icon: Settings, roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  const handleNavigation = (page) => {
    setCurrentPage(page);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" }
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
          )}
          <motion.aside
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-64 bg-white shadow-xl h-screen fixed left-0 top-0 z-50 border-r border-gray-200 flex flex-col"
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TestTube className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Curo24</h2>
                  <p className="text-sm text-gray-500">Lab Management</p>
                </div>
              </div>
              {isMobile && (
                <button onClick={() => setSidebarOpen(false)} className="p-1">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              )}
            </div>

            <nav className="mt-6 px-4 flex-1 overflow-y-auto">
              <div className="space-y-2">
                {filteredMenuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      currentPage === item.id
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </motion.button>
                ))}
              </div>
            </nav>

            <div className="p-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {userRole.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">{userRole}</p>
                    <p className="text-xs text-gray-500">Active Session</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
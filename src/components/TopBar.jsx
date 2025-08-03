import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  Calendar,
  LogOut
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast.js';

const TopBar = ({ userRole, onLogout, sidebarOpen, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, type: 'urgent', message: 'Urgent test request for Patient #12345', time: '2 min ago' },
    { id: 2, type: 'info', message: 'Low stock alert: CBC Test Kits', time: '15 min ago' },
    { id: 3, type: 'success', message: 'Report uploaded for Booking #67890', time: '1 hour ago' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
      });
    }
  };

  return (
    <header className="sticky top-0 bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </Button>
          
          <div className="hidden lg:block">
            <h1 className="text-xl font-semibold text-gray-800">Curo24 Lab Panel</h1>
          </div>

        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
           <form onSubmit={handleSearch} className="hidden sm:flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-48 lg:w-80"
              />
            </div>
          </form>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => toast({ 
              title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" 
            })}
            className="relative"
          >
            <Calendar className="w-5 h-5" />
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              >
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                      <div className={`flex items-start space-x-3 ${
                        notification.type === 'urgent' ? 'text-red-600' :
                        notification.type === 'success' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'urgent' ? 'bg-red-500' :
                          notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 capitalize">{userRole}</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="text-gray-500 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
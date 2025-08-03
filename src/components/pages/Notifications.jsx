import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { Bell, AlertTriangle, CheckCircle, Info, Clock, Trash2, BookMarked as MarkAsUnread, Settings } from 'lucide-react';

const Notifications = ({ userRole }) => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: "NOT001",
      type: "urgent",
      title: "Critical Stock Alert",
      message: "Glucose Reagent stock is critically low (8 bottles remaining). Immediate reorder required.",
      time: "2 minutes ago",
      read: false,
      category: "inventory"
    },
    {
      id: "NOT002",
      type: "info",
      title: "New Test Booking",
      message: "New booking received for Complete Blood Count - Patient: John Doe, Time: 10:30 AM",
      time: "15 minutes ago",
      read: false,
      category: "booking"
    },
    {
      id: "NOT003",
      type: "success",
      title: "Report Uploaded",
      message: "Lab report for Booking #BK001 has been successfully uploaded and sent to patient.",
      time: "1 hour ago",
      read: true,
      category: "report"
    },
    {
      id: "NOT004",
      type: "warning",
      title: "Collection Delayed",
      message: "Sample collection for Booking #BK002 is running 30 minutes behind schedule.",
      time: "2 hours ago",
      read: false,
      category: "collection"
    },
    {
      id: "NOT005",
      type: "info",
      title: "System Maintenance",
      message: "Scheduled system maintenance will occur tonight from 2:00 AM to 4:00 AM.",
      time: "3 hours ago",
      read: true,
      category: "system"
    },
    {
      id: "NOT006",
      type: "urgent",
      title: "Equipment Malfunction",
      message: "CBC Analyzer #2 is showing error codes. Technical support has been notified.",
      time: "4 hours ago",
      read: false,
      category: "equipment"
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'urgent': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'warning': return Clock;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'inventory': return 'bg-purple-100 text-purple-800';
      case 'booking': return 'bg-blue-100 text-blue-800';
      case 'report': return 'bg-green-100 text-green-800';
      case 'collection': return 'bg-orange-100 text-orange-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      case 'equipment': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAction = (action, notificationId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Stay updated with important alerts and updates</p></div>
        <div className="flex gap-2">
          <Button onClick={() => handleAction('markAllRead')} variant="outline" size="sm">
            Mark All Read
          </Button>
          <Button onClick={() => handleAction('settings')} variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: notifications.length, color: 'bg-blue-500', icon: Bell },
          { label: 'Unread', value: unreadCount, color: 'bg-red-500', icon: MarkAsUnread },
          { label: 'Urgent', value: notifications.filter(n => n.type === 'urgent').length, color: 'bg-orange-500', icon: AlertTriangle },
          { label: 'Today', value: notifications.filter(n => n.time.includes('hour') || n.time.includes('minute')).length, color: 'bg-green-500', icon: Clock }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-4 medical-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="glass-card p-4 medical-shadow">
        <div className="flex flex-wrap gap-2">
          {['all', 'unread', 'read', 'urgent', 'warning', 'info', 'success'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType === 'all' ? 'All Notifications' : filterType}
            </Button>
          ))}
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`glass-card p-4 medical-shadow hover:shadow-lg transition-shadow ${
              !notification.read ? 'border-l-4 border-l-blue-500' : ''
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  notification.type === 'urgent' ? 'bg-red-100' :
                  notification.type === 'success' ? 'bg-green-100' :
                  notification.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {React.createElement(getNotificationIcon(notification.type), { 
                    className: `w-5 h-5 ${
                      notification.type === 'urgent' ? 'text-red-600' :
                      notification.type === 'success' ? 'text-green-600' :
                      notification.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }` 
                  })}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    <Badge className={`${getNotificationColor(notification.type)} border text-xs`}>
                      {notification.type}
                    </Badge>
                    <Badge className={`${getCategoryColor(notification.category)} text-xs`}>
                      {notification.category}
                    </Badge>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className={`text-sm mb-2 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>

                <div className="flex gap-1">
                  {!notification.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAction('markRead', notification.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAction('delete', notification.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <Card className="glass-card p-12 text-center medical-shadow">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications found</h3>
          <p className="text-gray-600">You're all caught up! No notifications match your current filter.</p>
        </Card>
      )}
    </div>
  );
};

export default Notifications;
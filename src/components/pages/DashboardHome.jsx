import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { 
  Calendar, 
  FileText, 
  Package, 
  DollarSign, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Zap,
  Target
} from 'lucide-react';

const DashboardHome = ({ userRole }) => {
  const kpiCards = [
    { 
      title: "Today's Bookings", 
      value: "24", 
      change: "+12%", 
      icon: Calendar, 
      color: "bg-blue-500",
      trend: "up"
    },
    { 
      title: "Pending Reports", 
      value: "8", 
      change: "-5%", 
      icon: FileText, 
      color: "bg-yellow-500",
      trend: "down"
    },
    { 
      title: "Avg. Turnaround", 
      value: "18 Hrs", 
      change: "-7%", 
      icon: Clock, 
      color: "bg-purple-500",
      trend: "down"
    },
    { 
      title: "Revenue Today", 
      value: "₹12,450", 
      change: "+18%", 
      icon: DollarSign, 
      color: "bg-green-500",
      trend: "up"
    },
  ];

  const quickActions = [
    { title: "Create Booking", icon: Calendar, color: "bg-blue-500" },
    { title: "Assign Collector", icon: Users, color: "bg-purple-500" },
    { title: "Upload Report", icon: FileText, color: "bg-green-500" },
    { title: "Check Inventory", icon: Package, color: "bg-orange-500" },
  ];
  
  const marketingAdvantages = [
    { text: "Streamlined workflow: faster than competitors", icon: Zap },
    { text: "Advanced inventory management", icon: Package },
    { text: "Built for multi-branch scalability", icon: Target },
  ];

  const recentBookings = [
    { id: "BK001", patient: "John Doe", test: "Complete Blood Count", status: "pending", time: "09:30 AM" },
    { id: "BK002", patient: "Jane Smith", test: "Lipid Profile", status: "in-progress", time: "10:15 AM" },
    { id: "BK003", patient: "Mike Johnson", test: "Thyroid Function", status: "completed", time: "11:00 AM" },
    { id: "BK004", patient: "Sarah Wilson", test: "Diabetes Panel", status: "urgent", time: "11:30 AM" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'status-urgent';
      case 'pending': return 'status-pending';
      case 'in-progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQuickAction = (action) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening in your lab today.</p>
        </div>
        <div className="text-left sm:text-right mt-2 sm:mt-0">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-6 medical-shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 ${card.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={`text-sm ml-1 ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {card.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card p-6 medical-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              <Button variant="outline" size="sm" onClick={() => handleQuickAction("View All")}>
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">{booking.id.slice(-2)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{booking.patient}</p>
                      <p className="text-sm text-gray-600">{booking.test}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">{booking.time}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                      {booking.status.replace('-', ' ')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
        
        <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card p-6 medical-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <Button
                      key={action.title}
                      variant="outline"
                      onClick={() => handleQuickAction(action.title)}
                      className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 border-2 hover:border-blue-200"
                    >
                      <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-center">{action.title}</span>
                    </Button>
                  ))}
                </div>
              </Card>
            </motion.div>
            
            {/* Marketing Advantages */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
                <Card className="glass-card p-6 medical-shadow bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <h3 className="text-lg font-semibold mb-4">Curo24 Advantages</h3>
                    <ul className="space-y-3">
                        {marketingAdvantages.map((adv, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                    <adv.icon className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium">{adv.text}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </motion.div>
        </div>

      </div>

    </div>
  );
};

export default DashboardHome;
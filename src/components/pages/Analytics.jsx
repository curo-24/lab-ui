import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

const Analytics = ({ userRole }) => {
  const [timeRange, setTimeRange] = useState('7days');

  const kpiData = [
    {
      title: "Total Revenue",
      value: "₹1,24,500",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500"
    },
    {
      title: "Tests Completed",
      value: "342",
      change: "+12.5%",
      trend: "up",
      icon: BarChart3,
      color: "bg-blue-500"
    },
    {
      title: "Active Patients",
      value: "156",
      change: "+8.3%",
      trend: "up",
      icon: Users,
      color: "bg-purple-500"
    },
    {
      title: "Avg Turnaround",
      value: "24.5 hrs",
      change: "-5.2%",
      trend: "down",
      icon: Calendar,
      color: "bg-orange-500"
    }
  ];

  const popularTests = [
    { name: "Complete Blood Count", count: 45, percentage: 32 },
    { name: "Lipid Profile", count: 38, percentage: 27 },
    { name: "Thyroid Function", count: 28, percentage: 20 },
    { name: "Diabetes Panel", count: 18, percentage: 13 },
    { name: "Liver Function", count: 11, percentage: 8 }
  ];

  const collectorPerformance = [
    { name: "Raj Kumar", collections: 28, onTime: 96, rating: 4.8 },
    { name: "Priya Sharma", collections: 24, onTime: 94, rating: 4.7 },
    { name: "Amit Patel", collections: 22, onTime: 91, rating: 4.6 },
    { name: "Sarah Wilson", collections: 18, onTime: 89, rating: 4.5 }
  ];

  const handleAction = (action) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Performance insights and business metrics</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleAction('refresh')} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => handleAction('export')} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Time Range Filter */}
      <Card className="glass-card p-4 medical-shadow">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Time Range:</span>
          <div className="flex gap-2">
            {[
              { value: '7days', label: 'Last 7 Days' },
              { value: '30days', label: 'Last 30 Days' },
              { value: '3months', label: 'Last 3 Months' },
              { value: '1year', label: 'Last Year' }
            ].map((range) => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-6 medical-shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={`text-sm ml-1 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card p-6 medical-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <Button variant="outline" size="sm" onClick={() => handleAction('viewChart')}>
                View Details
              </Button>
            </div>
            <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="text-gray-600">Revenue chart visualization</p>
                <p className="text-sm text-gray-500 mt-1">Interactive charts coming soon</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Test Volume Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card p-6 medical-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Test Volume</h3>
              <Button variant="outline" size="sm" onClick={() => handleAction('viewChart')}>
                View Details
              </Button>
            </div>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                <p className="text-gray-600">Test volume analytics</p>
                <p className="text-sm text-gray-500 mt-1">Daily/weekly trends</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Tests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-card p-6 medical-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Tests</h3>
            <div className="space-y-4">
              {popularTests.map((test, index) => (
                <div key={test.name} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{test.name}</span>
                      <span className="text-sm text-gray-600">{test.count} tests</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${test.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Collector Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="glass-card p-6 medical-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Collector Performance</h3>
            <div className="space-y-4">
              {collectorPerformance.map((collector, index) => (
                <div key={collector.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{collector.name}</p>
                    <p className="text-sm text-gray-600">{collector.collections} collections</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{collector.onTime}% on-time</p>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">Rating: {collector.rating}</span>
                      <div className="flex ml-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${i < Math.floor(collector.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Inventory Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="glass-card p-6 medical-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Inventory Analytics</h3>
            <Button variant="outline" size="sm" onClick={() => handleAction('viewInventory')}>
              View Full Report
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">₹45,200</p>
              <p className="text-sm text-gray-600">Total Inventory Value</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">₹8,500</p>
              <p className="text-sm text-gray-600">Monthly Consumption</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">2.5%</p>
              <p className="text-sm text-gray-600">Wastage Rate</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;
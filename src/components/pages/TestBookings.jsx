
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  FileText, 
  Clock,
  MapPin,
  Phone,
  DollarSign
} from 'lucide-react';

const TestBookings = ({ userRole }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const bookings = [
    {
      id: "BK001",
      patient: "John Doe",
      phone: "+91 9876543210",
      test: "Complete Blood Count",
      date: "2024-01-15",
      time: "09:30 AM",
      status: "pending",
      payment: "paid",
      amount: "₹450",
      address: "123 Main St, Mumbai",
      doctor: "Dr. Smith"
    },
    {
      id: "BK002",
      patient: "Jane Smith",
      phone: "+91 9876543211",
      test: "Lipid Profile",
      date: "2024-01-15",
      time: "10:15 AM",
      status: "in-progress",
      payment: "pending",
      amount: "₹650",
      address: "456 Oak Ave, Delhi",
      doctor: "Dr. Johnson"
    },
    {
      id: "BK003",
      patient: "Mike Johnson",
      phone: "+91 9876543212",
      test: "Thyroid Function",
      date: "2024-01-15",
      time: "11:00 AM",
      status: "completed",
      payment: "paid",
      amount: "₹800",
      address: "789 Pine Rd, Bangalore",
      doctor: "Dr. Brown"
    },
    {
      id: "BK004",
      patient: "Sarah Wilson",
      phone: "+91 9876543213",
      test: "Diabetes Panel",
      date: "2024-01-15",
      time: "11:30 AM",
      status: "urgent",
      payment: "insurance",
      amount: "₹1200",
      address: "321 Elm St, Chennai",
      doctor: "Dr. Davis"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentColor = (payment) => {
    switch (payment) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'insurance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAction = (action, bookingId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.test.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Bookings</h1>
          <p className="text-gray-600 mt-1">Manage and track all test bookings</p>
        </div>
        <Button onClick={() => handleAction('create')} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Filters */}
      <Card className="glass-card p-4 medical-shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by patient name, booking ID, or test..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['all', 'urgent', 'pending', 'in-progress', 'completed'].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status === 'all' ? 'All' : status.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Bookings List */}
      <div className="grid gap-4">
        {filteredBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-6 medical-shadow hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">{booking.id.slice(-2)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.patient}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {booking.phone}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(booking.status)} border`}>
                        {booking.status.replace('-', ' ')}
                      </Badge>
                      <Badge className={getPaymentColor(booking.payment)}>
                        {booking.payment}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <FileText className="w-4 h-4 mr-2" />
                      <span>{booking.test}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{booking.date} at {booking.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="truncate">{booking.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>{booking.amount}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Doctor:</span> {booking.doctor}
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  <Button
                    size="sm"
                    onClick={() => handleAction('view', booking.id)}
                    variant="outline"
                    className="w-full"
                  >
                    View Details
                  </Button>
                  {booking.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => handleAction('assign', booking.id)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Assign Collector
                    </Button>
                  )}
                  {booking.status === 'in-progress' && (
                    <Button
                      size="sm"
                      onClick={() => handleAction('track', booking.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Track Collection
                    </Button>
                  )}
                  {booking.status === 'completed' && (
                    <Button
                      size="sm"
                      onClick={() => handleAction('report', booking.id)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Upload Report
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card className="glass-card p-12 text-center medical-shadow">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <Button onClick={() => handleAction('create')} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Booking
          </Button>
        </Card>
      )}
    </div>
  );
};

export default TestBookings;

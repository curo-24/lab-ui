
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Navigation,
  CheckCircle,
  AlertCircle,
  Truck
} from 'lucide-react';

const SampleCollections = ({ userRole }) => {
  const [selectedCollection, setSelectedCollection] = useState(null);

  const collections = [
    {
      id: "SC001",
      bookingId: "BK001",
      patient: "John Doe",
      phone: "+91 9876543210",
      address: "123 Main St, Andheri West, Mumbai - 400058",
      test: "Complete Blood Count",
      timeSlot: "09:30 AM - 10:00 AM",
      status: "assigned",
      collector: "Raj Kumar",
      collectorPhone: "+91 9876543220",
      priority: "normal",
      otp: "1234"
    },
    {
      id: "SC002",
      bookingId: "BK002",
      patient: "Jane Smith",
      phone: "+91 9876543211",
      address: "456 Oak Ave, Connaught Place, Delhi - 110001",
      test: "Lipid Profile",
      timeSlot: "10:15 AM - 10:45 AM",
      status: "en-route",
      collector: "Priya Sharma",
      collectorPhone: "+91 9876543221",
      priority: "normal",
      otp: "5678"
    },
    {
      id: "SC003",
      bookingId: "BK003",
      patient: "Mike Johnson",
      phone: "+91 9876543212",
      address: "789 Pine Rd, Koramangala, Bangalore - 560034",
      test: "Thyroid Function",
      timeSlot: "11:00 AM - 11:30 AM",
      status: "collected",
      collector: "Amit Patel",
      collectorPhone: "+91 9876543222",
      priority: "normal",
      otp: "9012"
    },
    {
      id: "SC004",
      bookingId: "BK004",
      patient: "Sarah Wilson",
      phone: "+91 9876543213",
      address: "321 Elm St, T. Nagar, Chennai - 600017",
      test: "Diabetes Panel",
      timeSlot: "11:30 AM - 12:00 PM",
      status: "urgent",
      collector: "Unassigned",
      collectorPhone: "",
      priority: "urgent",
      otp: "3456"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'assigned': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'en-route': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'collected': return 'bg-green-100 text-green-800 border-green-200';
      case 'delivered': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'urgent': return AlertCircle;
      case 'assigned': return Clock;
      case 'en-route': return Truck;
      case 'collected': return CheckCircle;
      case 'delivered': return CheckCircle;
      default: return Clock;
    }
  };

  const handleAction = (action, collectionId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sample Collections</h1>
          <p className="text-gray-600 mt-1">Coordinate and track sample collection activities</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleAction('map')} variant="outline">
            <MapPin className="w-4 h-4 mr-2" />
            Map View
          </Button>
          <Button onClick={() => handleAction('assign')} className="bg-blue-600 hover:bg-blue-700">
            <User className="w-4 h-4 mr-2" />
            Auto Assign
          </Button>
        </div>
      </div>

      {/* Collection Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { status: 'urgent', count: 1, color: 'bg-red-500' },
          { status: 'assigned', count: 1, color: 'bg-yellow-500' },
          { status: 'en-route', count: 1, color: 'bg-blue-500' },
          { status: 'collected', count: 1, color: 'bg-green-500' }
        ].map((item, index) => (
          <motion.div
            key={item.status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-4 medical-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 capitalize">{item.status}</p>
                  <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                </div>
                <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                  {React.createElement(getStatusIcon(item.status), { className: "w-5 h-5 text-white" })}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Collections List */}
      <div className="grid gap-4">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-6 medical-shadow hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">{collection.id.slice(-2)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{collection.patient}</h3>
                      <p className="text-sm text-gray-600">Booking: {collection.bookingId}</p>
                    </div>
                    <Badge className={`${getStatusColor(collection.status)} border`}>
                      {collection.status.replace('-', ' ')}
                    </Badge>
                    {collection.priority === 'urgent' && (
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        URGENT
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-start text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{collection.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">{collection.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{collection.timeSlot}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Test:</span> {collection.test}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Collector:</span> {collection.collector}
                      </p>
                      {collection.collectorPhone && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Collector Phone:</span> {collection.collectorPhone}
                        </p>
                      )}
                    </div>
                  </div>

                  {collection.status === 'collected' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        Sample collected successfully. OTP verified: {collection.otp}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  {collection.status === 'urgent' && (
                    <Button
                      size="sm"
                      onClick={() => handleAction('assign', collection.id)}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      Assign Collector
                    </Button>
                  )}
                  {collection.status === 'assigned' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleAction('navigate', collection.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Navigate
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAction('contact', collection.id)}
                        variant="outline"
                        className="w-full"
                      >
                        Contact Patient
                      </Button>
                    </>
                  )}
                  {collection.status === 'en-route' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleAction('arrived', collection.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Mark Arrived
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAction('track', collection.id)}
                        variant="outline"
                        className="w-full"
                      >
                        Track Location
                      </Button>
                    </>
                  )}
                  {collection.status === 'collected' && (
                    <Button
                      size="sm"
                      onClick={() => handleAction('deliver', collection.id)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Mark Delivered
                    </Button>
                  )}
                  <Button
                    size="sm"
                    onClick={() => handleAction('details', collection.id)}
                    variant="outline"
                    className="w-full"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Map Placeholder */}
      <Card className="glass-card p-6 medical-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Map</h3>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2" />
            <p className="text-gray-600 mb-2">Interactive map with collector locations</p>
            <Button 
              onClick={() => handleAction('fullMap')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Open Full Map
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SampleCollections;

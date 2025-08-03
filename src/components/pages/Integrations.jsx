import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { 
  Plug, 
  Map, 
  CreditCard, 
  MessageSquare, 
  Database,
  Link,
  Info
} from 'lucide-react';

const Integrations = ({ userRole }) => {
  const integrationsList = [
    {
      name: "Google Maps API",
      description: "For collector routing & live location tracking.",
      icon: Map,
      color: "from-green-400 to-blue-500",
      status: "Connected"
    },
    {
      name: "Razorpay Payments",
      description: "For accepting online payments for bookings.",
      icon: CreditCard,
      color: "from-blue-400 to-indigo-500",
      status: "Not Connected"
    },
    {
      name: "WhatsApp API",
      description: "For sending automated notifications to patients.",
      icon: MessageSquare,
      color: "from-green-500 to-teal-500",
      status: "Not Connected"
    },
    {
      name: "LIMS API",
      description: "For automated ingestion of reports from lab machines.",
      icon: Database,
      color: "from-gray-500 to-gray-700",
      status: "Connected"
    }
  ];

  const handleAction = (action, integrationName) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-1">Connect Curo24 with your favorite tools and services</p>
        </div>
      </div>

      <Card className="glass-card p-6 medical-shadow bg-blue-50 border-blue-200">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full">
                <Info className="w-5 h-5"/>
            </div>
            <div>
                <h3 className="font-semibold text-gray-900">Unlock more power</h3>
                <p className="text-sm text-gray-600">Integrations help automate your workflow, from payment collection to patient communication.</p>
            </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrationsList.map((integration, index) => (
          <motion.div
            key={integration.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card medical-shadow hover:shadow-lg transition-shadow overflow-hidden">
              <div className={`p-6 bg-gradient-to-br ${integration.color} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <integration.icon className="w-8 h-8" />
                    <h3 className="text-xl font-bold">{integration.name}</h3>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${integration.status === 'Connected' ? 'bg-green-500' : 'bg-gray-600'}`}>
                    {integration.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/90">{integration.description}</p>
              </div>
              <div className="p-4 bg-white/80 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleAction('docs', integration.name)}>
                  Read Docs
                </Button>
                {integration.status === 'Connected' ? (
                  <Button variant="destructive" size="sm" onClick={() => handleAction('disconnect', integration.name)}>
                    Disconnect
                  </Button>
                ) : (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleAction('connect', integration.name)}>
                    <Link className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Integrations;
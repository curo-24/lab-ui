import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { 
  Settings as SettingsIcon, 
  Building, 
  Bell, 
  Key, 
  Palette,
  Clock,
  Mail,
  Phone,
  MapPin,
  Save
} from 'lucide-react';

const Settings = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('lab');
  const [settings, setSettings] = useState({
    lab: {
      name: 'Curo24 Lab - Mumbai Central',
      address: '123 Medical Plaza, Andheri West, Mumbai - 400058',
      phone: '+91 22 1234 5678',
      email: 'info@curo24lab.com',
      workingHours: '8:00 AM - 8:00 PM',
      emergencyContact: '+91 98765 43210'
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: true,
      pushNotifications: true,
      lowStockAlerts: true,
      urgentTestAlerts: true,
      reportReadyAlerts: true,
      systemMaintenanceAlerts: false
    },
    integrations: {
      whatsappApi: '',
      smsGateway: '',
      emailProvider: 'smtp',
      paymentGateway: 'razorpay'
    },
    system: {
      autoBackup: true,
      dataRetention: '2 years',
      sessionTimeout: '30 minutes',
      twoFactorAuth: true
    }
  });

  const tabs = [
    { id: 'lab', name: 'Lab Profile', icon: Building },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: Key },
    { id: 'system', name: 'System', icon: SettingsIcon }
  ];

  const handleSave = (section) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderLabSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="labName">Lab Name</Label>
          <Input
            id="labName"
            value={settings.lab.name}
            onChange={(e) => handleInputChange('lab', 'name', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="labPhone">Phone Number</Label>
          <Input
            id="labPhone"
            value={settings.lab.phone}
            onChange={(e) => handleInputChange('lab', 'phone', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="labAddress">Address</Label>
        <Input
          id="labAddress"
          value={settings.lab.address}
          onChange={(e) => handleInputChange('lab', 'address', e.target.value)}
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="labEmail">Email</Label>
          <Input
            id="labEmail"
            type="email"
            value={settings.lab.email}
            onChange={(e) => handleInputChange('lab', 'email', e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="workingHours">Working Hours</Label>
          <Input
            id="workingHours"
            value={settings.lab.workingHours}
            onChange={(e) => handleInputChange('lab', 'workingHours', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="emergencyContact">Emergency Contact</Label>
        <Input
          id="emergencyContact"
          value={settings.lab.emergencyContact}
          onChange={(e) => handleInputChange('lab', 'emergencyContact', e.target.value)}
          className="mt-1"
        />
      </div>

      <Button onClick={() => handleSave('lab')} className="bg-blue-600 hover:bg-blue-700">
        <Save className="w-4 h-4 mr-2" />
        Save Lab Settings
      </Button>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Alert Preferences</h3>
        
        {[
          { key: 'emailAlerts', label: 'Email Alerts', description: 'Receive notifications via email' },
          { key: 'smsAlerts', label: 'SMS Alerts', description: 'Receive notifications via SMS' },
          { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
          { key: 'lowStockAlerts', label: 'Low Stock Alerts', description: 'Alert when inventory is low' },
          { key: 'urgentTestAlerts', label: 'Urgent Test Alerts', description: 'Immediate alerts for urgent tests' },
          { key: 'reportReadyAlerts', label: 'Report Ready Alerts', description: 'Notify when reports are ready' },
          { key: 'systemMaintenanceAlerts', label: 'System Maintenance', description: 'Maintenance and update notifications' }
        ].map((setting) => (
          <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{setting.label}</p>
              <p className="text-sm text-gray-600">{setting.description}</p>
            </div>
            <Switch
              checked={settings.notifications[setting.key]}
              onCheckedChange={(checked) => handleInputChange('notifications', setting.key, checked)}
            />
          </div>
        ))}
      </div>

      <Button onClick={() => handleSave('notifications')} className="bg-blue-600 hover:bg-blue-700">
        <Save className="w-4 h-4 mr-2" />
        Save Notification Settings
      </Button>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">API Integrations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="whatsappApi">WhatsApp API Key</Label>
            <Input
              id="whatsappApi"
              type="password"
              placeholder="Enter WhatsApp API key"
              value={settings.integrations.whatsappApi}
              onChange={(e) => handleInputChange('integrations', 'whatsappApi', e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="smsGateway">SMS Gateway API</Label>
            <Input
              id="smsGateway"
              type="password"
              placeholder="Enter SMS gateway API key"
              value={settings.integrations.smsGateway}
              onChange={(e) => handleInputChange('integrations', 'smsGateway', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="emailProvider">Email Provider</Label>
            <select
              id="emailProvider"
              value={settings.integrations.emailProvider}
              onChange={(e) => handleInputChange('integrations', 'emailProvider', e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="smtp">SMTP</option>
              <option value="sendgrid">SendGrid</option>
              <option value="mailgun">Mailgun</option>
            </select>
          </div>
          <div>
            <Label htmlFor="paymentGateway">Payment Gateway</Label>
            <select
              id="paymentGateway"
              value={settings.integrations.paymentGateway}
              onChange={(e) => handleInputChange('integrations', 'paymentGateway', e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="razorpay">Razorpay</option>
              <option value="stripe">Stripe</option>
              <option value="payu">PayU</option>
            </select>
          </div>
        </div>
      </div>

      <Button onClick={() => handleSave('integrations')} className="bg-blue-600 hover:bg-blue-700">
        <Save className="w-4 h-4 mr-2" />
        Save Integration Settings
      </Button>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">System Configuration</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Auto Backup</p>
              <p className="text-sm text-gray-600">Automatically backup data daily</p>
            </div>
            <Switch
              checked={settings.system.autoBackup}
              onCheckedChange={(checked) => handleInputChange('system', 'autoBackup', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Require 2FA for all users</p>
            </div>
            <Switch
              checked={settings.system.twoFactorAuth}
              onCheckedChange={(checked) => handleInputChange('system', 'twoFactorAuth', checked)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="dataRetention">Data Retention Period</Label>
            <select
              id="dataRetention"
              value={settings.system.dataRetention}
              onChange={(e) => handleInputChange('system', 'dataRetention', e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1 year">1 Year</option>
              <option value="2 years">2 Years</option>
              <option value="5 years">5 Years</option>
              <option value="permanent">Permanent</option>
            </select>
          </div>
          <div>
            <Label htmlFor="sessionTimeout">Session Timeout</Label>
            <select
              id="sessionTimeout"
              value={settings.system.sessionTimeout}
              onChange={(e) => handleInputChange('system', 'sessionTimeout', e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="15 minutes">15 Minutes</option>
              <option value="30 minutes">30 Minutes</option>
              <option value="1 hour">1 Hour</option>
              <option value="2 hours">2 Hours</option>
            </select>
          </div>
        </div>
      </div>

      <Button onClick={() => handleSave('system')} className="bg-blue-600 hover:bg-blue-700">
        <Save className="w-4 h-4 mr-2" />
        Save System Settings
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure your lab management system</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card className="glass-card p-4 medical-shadow lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </Card>

        {/* Settings Content */}
        <Card className="glass-card p-6 medical-shadow lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'lab' && renderLabSettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'integrations' && renderIntegrationSettings()}
            {activeTab === 'system' && renderSystemSettings()}
          </motion.div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
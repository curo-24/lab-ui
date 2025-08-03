import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card } from '@/components/ui/card.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { TestTube, Shield, Users, Stethoscope } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin');

  const roles = [
    { id: 'admin', name: 'Administrator', icon: Shield, color: 'bg-blue-500' },
    { id: 'technician', name: 'Lab Technician', icon: TestTube, color: 'bg-green-500' },
    { id: 'collector', name: 'Sample Collector', icon: Users, color: 'bg-purple-500' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing credentials",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen medical-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card p-8 medical-shadow">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4"
            >
              <Stethoscope className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Curo24 Lab</h1>
            <p className="text-gray-600">Professional Lab Management System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Role</Label>
              <div className="grid grid-cols-1 gap-2">
                {roles.map((role) => (
                  <motion.div
                    key={role.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <label className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedRole === role.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="role"
                        value={role.id}
                        checked={selectedRole === role.id}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-8 h-8 rounded-full ${role.color} flex items-center justify-center mr-3`}>
                        <role.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{role.name}</span>
                    </label>
                  </motion.div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => toast({ 
                title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" 
              })}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot your password?
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
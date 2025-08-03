import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { 
  UserPlus, 
  Search, 
  Shield, 
  TestTube, 
  Users, 
  Edit, 
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const UsersRoles = ({ userRole }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const users = [
    {
      id: "USR001",
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@curo24.com",
      phone: "+91 9876543210",
      role: "admin",
      status: "active",
      branch: "Mumbai Central",
      joinDate: "2023-01-15",
      lastLogin: "2024-01-15 09:30 AM",
      permissions: ["manage_bookings", "upload_reports", "manage_inventory", "manage_users"]
    },
    {
      id: "USR002",
      name: "Priya Sharma",
      email: "priya.sharma@curo24.com",
      phone: "+91 9876543211",
      role: "technician",
      status: "active",
      branch: "Mumbai Central",
      joinDate: "2023-03-20",
      lastLogin: "2024-01-15 08:45 AM",
      permissions: ["view_bookings", "upload_reports", "manage_inventory"]
    },
    {
      id: "USR003",
      name: "Amit Patel",
      email: "amit.patel@curo24.com",
      phone: "+91 9876543212",
      role: "collector",
      status: "active",
      branch: "Mumbai Central",
      joinDate: "2023-06-10",
      lastLogin: "2024-01-15 07:15 AM",
      permissions: ["view_collections", "update_collection_status"]
    },
    {
      id: "USR004",
      name: "Sarah Wilson",
      email: "sarah.wilson@curo24.com",
      phone: "+91 9876543213",
      role: "technician",
      status: "inactive",
      branch: "Delhi Branch",
      joinDate: "2023-08-05",
      lastLogin: "2024-01-10 05:30 PM",
      permissions: ["view_bookings", "upload_reports"]
    }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'technician': return 'bg-green-100 text-green-800 border-green-200';
      case 'collector': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return Shield;
      case 'technician': return TestTube;
      case 'collector': return Users;
      default: return Users;
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const handleAction = (action, userId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    const matchesFilter = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const roles = ['all', 'admin', 'technician', 'collector'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users & Roles</h1>
          <p className="text-gray-600 mt-1">Manage staff members and their permissions</p>
        </div>
        <Button onClick={() => handleAction('add')} className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* User Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '4', color: 'bg-blue-500', icon: Users },
          { label: 'Administrators', value: '1', color: 'bg-purple-500', icon: Shield },
          { label: 'Technicians', value: '2', color: 'bg-green-500', icon: TestTube },
          { label: 'Collectors', value: '1', color: 'bg-orange-500', icon: Users }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-4 medical-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{item.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                </div>
                <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="glass-card p-4 medical-shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {roles.map((role) => (
              <Button
                key={role}
                variant={filterRole === role ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRole(role)}
                className="capitalize"
              >
                {role === 'all' ? 'All Roles' : role}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-6 medical-shadow hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      {React.createElement(getRoleIcon(user.role), { className: "w-6 h-6 text-blue-600" })}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">ID: {user.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getRoleColor(user.role)} border`}>
                        {user.role}
                      </Badge>
                      <Badge className={`${getStatusColor(user.status)} border`}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">{user.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{user.branch}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Joined:</span> {user.joinDate}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Last Login:</span> {user.lastLogin}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                    <div className="flex flex-wrap gap-2">
                      {user.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  <Button
                    size="sm"
                    onClick={() => handleAction('view', user.id)}
                    variant="outline"
                    className="w-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAction('edit', user.id)}
                    variant="outline"
                    className="w-full"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit User
                  </Button>
                  {user.status === 'active' ? (
                    <Button
                      size="sm"
                      onClick={() => handleAction('deactivate', user.id)}
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700"
                    >
                      Deactivate
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleAction('activate', user.id)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Activate
                    </Button>
                  )}
                  <Button
                    size="sm"
                    onClick={() => handleAction('delete', user.id)}
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="glass-card p-12 text-center medical-shadow">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <Button onClick={() => handleAction('add')} className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </Card>
      )}
    </div>
  );
};

export default UsersRoles;
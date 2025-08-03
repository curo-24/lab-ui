import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { toast } from '@/components/ui/use-toast.js';
import { 
  Package, 
  Plus, 
  Search, 
  AlertTriangle, 
  TrendingDown, 
  Calendar,
  Truck,
  BarChart3,
  Edit,
  Eye
} from 'lucide-react';

const Inventory = ({ userRole }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const inventoryItems = [
    {
      id: "INV001",
      name: "CBC Test Kits",
      category: "Test Kits",
      currentStock: 25,
      minStock: 50,
      maxStock: 200,
      unit: "pieces",
      costPerUnit: "₹45",
      supplier: "MedSupply Co.",
      expiryDate: "2024-06-15",
      batchNumber: "BCH001",
      status: "low"
    },
    {
      id: "INV002",
      name: "Blood Collection Tubes",
      category: "Consumables",
      currentStock: 150,
      minStock: 100,
      maxStock: 500,
      unit: "pieces",
      costPerUnit: "₹12",
      supplier: "LabTech Supplies",
      expiryDate: "2025-03-20",
      batchNumber: "BCH002",
      status: "good"
    },
    {
      id: "INV003",
      name: "Glucose Reagent",
      category: "Reagents",
      currentStock: 8,
      minStock: 20,
      maxStock: 100,
      unit: "bottles",
      costPerUnit: "₹180",
      supplier: "ChemLab Inc.",
      expiryDate: "2024-02-28",
      batchNumber: "BCH003",
      status: "critical"
    },
    {
      id: "INV004",
      name: "Lipid Profile Kits",
      category: "Test Kits",
      currentStock: 75,
      minStock: 30,
      maxStock: 150,
      unit: "pieces",
      costPerUnit: "₹85",
      supplier: "MedSupply Co.",
      expiryDate: "2024-08-10",
      batchNumber: "BCH004",
      status: "good"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStockPercentage = (current, max) => {
    return Math.round((current / max) * 100);
  };

  const isExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const handleAction = (action, itemId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === 'all' || item.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const categories = ['all', 'Test Kits', 'Consumables', 'Reagents'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track and manage lab supplies and equipment</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleAction('reorder')} variant="outline">
            <Truck className="w-4 h-4 mr-2" />
            Auto Reorder
          </Button>
          <Button onClick={() => handleAction('add')} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: '4', color: 'bg-blue-500', icon: Package },
          { label: 'Low Stock', value: '1', color: 'bg-yellow-500', icon: TrendingDown },
          { label: 'Critical', value: '1', color: 'bg-red-500', icon: AlertTriangle },
          { label: 'Expiring Soon', value: '1', color: 'bg-orange-500', icon: Calendar }
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
                placeholder="Search by item name, category, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filterCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Inventory Items */}
      <div className="grid gap-4">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-6 medical-shadow hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">ID: {item.id} | Category: {item.category}</p>
                    </div>
                    <Badge className={`${getStatusColor(item.status)} border`}>
                      {item.status}
                    </Badge>
                    {isExpiringSoon(item.expiryDate) && (
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        Expiring Soon
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Current Stock</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">
                          {item.currentStock} {item.unit}
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.status === 'critical' ? 'bg-red-500' :
                              item.status === 'low' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${getStockPercentage(item.currentStock, item.maxStock)}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Min: {item.minStock} | Max: {item.maxStock}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Cost per Unit</p>
                      <p className="text-lg font-semibold text-gray-900">{item.costPerUnit}</p>
                      <p className="text-xs text-gray-500 mt-1">Supplier: {item.supplier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Expiry Date</p>
                      <p className={`text-lg font-semibold ${
                        isExpiringSoon(item.expiryDate) ? 'text-orange-600' : 'text-gray-900'
                      }`}>
                        {item.expiryDate}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Batch: {item.batchNumber}</p>
                    </div>
                  </div>

                  {item.status === 'critical' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-800">
                        <AlertTriangle className="w-4 h-4 inline mr-1" />
                        Critical stock level! Immediate reorder required.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  <Button
                    size="sm"
                    onClick={() => handleAction('view', item.id)}
                    variant="outline"
                    className="w-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAction('edit', item.id)}
                    variant="outline"
                    className="w-full"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Item
                  </Button>
                  {(item.status === 'critical' || item.status === 'low') && (
                    <Button
                      size="sm"
                      onClick={() => handleAction('reorder', item.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Reorder Now
                    </Button>
                  )}
                  <Button
                    size="sm"
                    onClick={() => handleAction('usage', item.id)}
                    variant="outline"
                    className="w-full"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Usage Stats
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="glass-card p-12 text-center medical-shadow">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <Button onClick={() => handleAction('add')} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Item
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Inventory;
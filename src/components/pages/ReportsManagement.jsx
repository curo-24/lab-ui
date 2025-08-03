
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { 
  Upload, 
  Download, 
  Eye, 
  Share2, 
  FileText, 
  Search,
  Filter,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const ReportsManagement = ({ userRole }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const reports = [
    {
      id: "RPT001",
      bookingId: "BK001",
      patient: "John Doe",
      test: "Complete Blood Count",
      date: "2024-01-15",
      status: "uploaded",
      uploadedBy: "Dr. Smith",
      uploadDate: "2024-01-15 14:30",
      fileSize: "2.3 MB",
      format: "PDF"
    },
    {
      id: "RPT002",
      bookingId: "BK002",
      patient: "Jane Smith",
      test: "Lipid Profile",
      date: "2024-01-15",
      status: "pending",
      uploadedBy: "",
      uploadDate: "",
      fileSize: "",
      format: ""
    },
    {
      id: "RPT003",
      bookingId: "BK003",
      patient: "Mike Johnson",
      test: "Thyroid Function",
      date: "2024-01-15",
      status: "draft",
      uploadedBy: "Lab Tech",
      uploadDate: "2024-01-15 12:15",
      fileSize: "1.8 MB",
      format: "PDF"
    },
    {
      id: "RPT004",
      bookingId: "BK004",
      patient: "Sarah Wilson",
      test: "Diabetes Panel",
      date: "2024-01-15",
      status: "urgent",
      uploadedBy: "",
      uploadDate: "",
      fileSize: "",
      format: ""
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploaded': return CheckCircle;
      case 'pending': return Clock;
      case 'draft': return FileText;
      case 'urgent': return AlertTriangle;
      default: return FileText;
    }
  };

  const handleAction = (action, reportId) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.test.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports Management</h1>
          <p className="text-gray-600 mt-1">Upload, manage and share test reports</p>
        </div>
        <Button onClick={() => handleAction('upload')} className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Report
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { status: 'uploaded', count: 1, color: 'bg-green-500', label: 'Uploaded' },
          { status: 'pending', count: 1, color: 'bg-yellow-500', label: 'Pending' },
          { status: 'draft', count: 1, color: 'bg-blue-500', label: 'Draft' },
          { status: 'urgent', count: 1, color: 'bg-red-500', label: 'Urgent' }
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
                  <p className="text-sm font-medium text-gray-600">{item.label}</p>
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

      {/* Filters */}
      <Card className="glass-card p-4 medical-shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by patient name, report ID, or test..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['all', 'urgent', 'pending', 'draft', 'uploaded'].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status === 'all' ? 'All' : status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Reports List */}
      <div className="grid gap-4">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card p-6 medical-shadow hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{report.patient}</h3>
                      <p className="text-sm text-gray-600">Report ID: {report.id} | Booking: {report.bookingId}</p>
                    </div>
                    <Badge className={`${getStatusColor(report.status)} border`}>
                      {report.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <FileText className="w-4 h-4 mr-2" />
                      <span>{report.test}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{report.date}</span>
                    </div>
                    {report.uploadedBy && (
                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span>By {report.uploadedBy}</span>
                      </div>
                    )}
                  </div>

                  {report.status === 'uploaded' && (
                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                      <span>Uploaded: {report.uploadDate}</span>
                      <span>Size: {report.fileSize}</span>
                      <span>Format: {report.format}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  {report.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => handleAction('upload', report.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Report
                    </Button>
                  )}
                  {report.status === 'urgent' && (
                    <Button
                      size="sm"
                      onClick={() => handleAction('urgent-upload', report.id)}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Urgent Upload
                    </Button>
                  )}
                  {report.status === 'draft' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleAction('edit', report.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Edit Draft
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAction('publish', report.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Publish Report
                      </Button>
                    </>
                  )}
                  {report.status === 'uploaded' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleAction('view', report.id)}
                        variant="outline"
                        className="w-full"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Report
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAction('download', report.id)}
                        variant="outline"
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAction('share', report.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card className="glass-card p-12 text-center medical-shadow">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <Button onClick={() => handleAction('upload')} className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload New Report
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ReportsManagement;

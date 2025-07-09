import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { AdminLayout } from '../../components/AdminLayout';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText
} from 'lucide-react';

export const AdminApplications: React.FC = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const applications = [
    {
      id: 'RSF001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '9876543210',
      loanType: 'Personal Loan',
      amount: 500000,
      status: 'Pending',
      date: '2024-01-15',
      documents: ['ID Proof', 'Address Proof', 'Income Proof'],
      employmentType: 'Salaried',
      monthlyIncome: 75000
    },
    {
      id: 'RSF002',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '9876543211',
      loanType: 'Home Loan',
      amount: 2500000,
      status: 'Approved',
      date: '2024-01-14',
      documents: ['ID Proof', 'Address Proof', 'Income Proof', 'Property Docs'],
      employmentType: 'Salaried',
      monthlyIncome: 120000
    },
    {
      id: 'RSF003',
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '9876543212',
      loanType: 'Car Loan',
      amount: 800000,
      status: 'Under Review',
      date: '2024-01-13',
      documents: ['ID Proof', 'Address Proof', 'Income Proof', 'Car Quotation'],
      employmentType: 'Self-Employed',
      monthlyIncome: 95000
    },
    {
      id: 'RSF004',
      name: 'Sunita Devi',
      email: 'sunita.devi@email.com',
      phone: '9876543213',
      loanType: 'Group Loan',
      amount: 200000,
      status: 'Approved',
      date: '2024-01-12',
      documents: ['ID Proof', 'Address Proof', 'Group Formation Docs'],
      employmentType: 'Self-Employed',
      monthlyIncome: 45000
    },
    {
      id: 'RSF005',
      name: 'Ramesh Singh',
      email: 'ramesh.singh@email.com',
      phone: '9876543214',
      loanType: 'Business Loan',
      amount: 1500000,
      status: 'Rejected',
      date: '2024-01-11',
      documents: ['ID Proof', 'Address Proof', 'Business Docs'],
      employmentType: 'Business Owner',
      monthlyIncome: 180000
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Under Review': return <Eye className="w-4 h-4 text-blue-500" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const updateApplicationStatus = (id: string, newStatus: string) => {
    // In a real app, this would call an API
    console.log(`Updating application ${id} to ${newStatus}`);
    // For demo purposes, we'll just log it
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Loan Applications</h1>
            <p className="text-gray-600">Manage and review loan applications</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or application ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Financial Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{app.name}</div>
                        <div className="text-sm text-gray-500">{app.id}</div>
                        <div className="text-sm text-gray-500">{app.email}</div>
                        <div className="text-sm text-gray-500">{app.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{app.loanType}</div>
                        <div className="text-sm text-gray-500">₹{app.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{app.date}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{app.employmentType}</div>
                        <div className="text-sm text-gray-500">₹{app.monthlyIncome.toLocaleString()}/month</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(app.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        {app.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'Approved')}
                              className="text-green-600 hover:text-green-700 flex items-center space-x-1"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                              className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Details Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Application Details</h3>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Name:</strong> {selectedApplication.name}</p>
                      <p><strong>Email:</strong> {selectedApplication.email}</p>
                      <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                      <p><strong>Employment:</strong> {selectedApplication.employmentType}</p>
                      <p><strong>Monthly Income:</strong> ₹{selectedApplication.monthlyIncome.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Loan Information</h4>
                    <div className="space-y-1 text-sm">
                      <p><strong>Loan Type:</strong> {selectedApplication.loanType}</p>
                      <p><strong>Amount:</strong> ₹{selectedApplication.amount.toLocaleString()}</p>
                      <p><strong>Status:</strong> 
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedApplication.status)}`}>
                          {selectedApplication.status}
                        </span>
                      </p>
                      <p><strong>Applied Date:</strong> {selectedApplication.date}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Documents Submitted</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.documents.map((doc, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
                
                {selectedApplication.status === 'Pending' && (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        updateApplicationStatus(selectedApplication.id, 'Approved');
                        setSelectedApplication(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve Application
                    </button>
                    <button
                      onClick={() => {
                        updateApplicationStatus(selectedApplication.id, 'Rejected');
                        setSelectedApplication(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject Application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
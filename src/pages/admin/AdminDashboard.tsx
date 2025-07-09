import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { AdminLayout } from '../../components/AdminLayout';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    {
      title: 'Total Applications',
      value: '156',
      change: '+12%',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Approved Loans',
      value: '89',
      change: '+8%',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Pending Review',
      value: '23',
      change: '+3',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Total Disbursed',
      value: '₹2.3 Cr',
      change: '+15%',
      icon: DollarSign,
      color: 'purple'
    }
  ];

  const recentApplications = [
    {
      id: 'RSF001',
      name: 'Rajesh Kumar',
      loanType: 'Personal Loan',
      amount: '₹5,00,000',
      status: 'Pending',
      date: '2024-01-15'
    },
    {
      id: 'RSF002',
      name: 'Priya Sharma',
      loanType: 'Home Loan',
      amount: '₹25,00,000',
      status: 'Approved',
      date: '2024-01-14'
    },
    {
      id: 'RSF003',
      name: 'Amit Patel',
      loanType: 'Car Loan',
      amount: '₹8,00,000',
      status: 'Under Review',
      date: '2024-01-13'
    },
    {
      id: 'RSF004',
      name: 'Sunita Devi',
      loanType: 'Group Loan',
      amount: '₹2,00,000',
      status: 'Approved',
      date: '2024-01-12'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your loans.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatColor(stat.color)}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <button
                onClick={() => navigate('/admin/applications')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {app.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.loanType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/admin/applications')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Review Applications
              </button>
              <button
                onClick={() => navigate('/admin/loan-types')}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Manage Loan Types
              </button>
              <button
                onClick={() => navigate('/admin/profile')}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Update Profile
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Today's Applications</span>
                <span className="text-sm font-medium text-gray-900">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="text-sm font-medium text-gray-900">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="text-sm font-medium text-gray-900">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Approval Rate</span>
                <span className="text-sm font-medium text-green-600">78%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900">5 applications pending review</p>
                  <p className="text-xs text-gray-500">Due today</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900">3 loans approved</p>
                  <p className="text-xs text-gray-500">Ready for disbursement</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900">2 follow-ups required</p>
                  <p className="text-xs text-gray-500">Documents pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
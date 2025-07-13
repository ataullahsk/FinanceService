import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { AdminLayout } from '../../components/AdminLayout';
import { loanTypeService } from '../../services/loanTypeService';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export const AdminLoanTypes: React.FC = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [loanTypes, setLoanTypes] = useState([
    {
      id: 1,
      name: 'Personal Loan',
      description: 'Quick and flexible personal loans for any purpose',
      interestRate: 10.5,
      maxAmount: 1000000,
      minTenure: 12,
      maxTenure: 60,
      processingFee: 2.5,
      active: true
    },
    {
      id: 2,
      name: 'Home Loan',
      description: 'Make your dream home a reality with our home loans',
      interestRate: 8.5,
      maxAmount: 10000000,
      minTenure: 120,
      maxTenure: 360,
      processingFee: 1.0,
      active: true
    },
    {
      id: 3,
      name: 'Car Loan',
      description: 'Drive your dream car with our affordable car loans',
      interestRate: 9.2,
      maxAmount: 5000000,
      minTenure: 12,
      maxTenure: 84,
      processingFee: 1.5,
      active: true
    },
    {
      id: 4,
      name: 'Group Loan',
      description: 'Collective financing solutions for community needs',
      interestRate: 11.5,
      maxAmount: 2500000,
      minTenure: 12,
      maxTenure: 48,
      processingFee: 3.0,
      active: true
    },
    {
      id: 5,
      name: 'Business Loan',
      description: 'Fuel your business growth with our business loans',
      interestRate: 12.5,
      maxAmount: 20000000,
      minTenure: 12,
      maxTenure: 84,
      processingFee: 2.0,
      active: true
    },
    {
      id: 6,
      name: 'Education Loan',
      description: 'Invest in your future with our education loans',
      interestRate: 9.8,
      maxAmount: 3000000,
      minTenure: 60,
      maxTenure: 180,
      processingFee: 1.0,
      active: true
    }
  ]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    interestRate: 0,
    maxAmount: 0,
    minTenure: 0,
    maxTenure: 0,
    processingFee: 0,
    active: true
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    } else {
      loadLoanTypes();
    }
  }, [isAuthenticated, navigate]);

  const loadLoanTypes = async () => {
    try {
      const data = await loanTypeService.getAllLoanTypes();
      // Transform data to match component structure
      const transformedData = data.map(lt => ({
        id: lt.id,
        name: lt.name,
        description: lt.description,
        interestRate: lt.interest_rate,
        maxAmount: lt.max_amount,
        minTenure: lt.min_tenure,
        maxTenure: lt.max_tenure,
        processingFee: lt.processing_fee,
        active: lt.is_active
      }));
      setLoanTypes(transformedData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading loan types:', error);
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const handleEdit = (loanType: any) => {
    setEditingId(loanType.id);
    setFormData({ ...loanType });
  };

  const handleSave = async () => {
    try {
      const loanTypeData = {
        name: formData.name,
        description: formData.description,
        interest_rate: formData.interestRate,
        max_amount: formData.maxAmount,
        min_tenure: formData.minTenure,
        max_tenure: formData.maxTenure,
        processing_fee: formData.processingFee,
        is_active: formData.active
      };

      if (editingId) {
        await loanTypeService.updateLoanType(editingId, loanTypeData);
        setEditingId(null);
      } else {
        await loanTypeService.createLoanType(loanTypeData);
        setShowAddForm(false);
      }

      // Reload loan types
      await loadLoanTypes();
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        interestRate: 0,
        maxAmount: 0,
        minTenure: 0,
        maxTenure: 0,
        processingFee: 0,
        active: true
      });
    } catch (error) {
      console.error('Error saving loan type:', error);
      alert('Error saving loan type');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      description: '',
      interestRate: 0,
      maxAmount: 0,
      minTenure: 0,
      maxTenure: 0,
      processingFee: 0,
      active: true
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this loan type?')) {
      try {
        await loanTypeService.deleteLoanType(id);
        await loadLoanTypes();
      } catch (error) {
        console.error('Error deleting loan type:', error);
        alert('Error deleting loan type');
      }
    }
  };

  const toggleActive = async (id: number) => {
    try {
      await loanTypeService.toggleLoanTypeStatus(id);
      await loadLoanTypes();
    } catch (error) {
      console.error('Error toggling loan type status:', error);
      alert('Error updating loan type status');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Loan Types Management</h1>
            <p className="text-gray-600">Manage loan products and their terms</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Loan Type</span>
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Loan Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({ ...formData, interestRate: parseFloat(e.target.value) })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Amount (₹)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.maxAmount}
                  onChange={(e) => setFormData({ ...formData, maxAmount: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Processing Fee (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.processingFee}
                  onChange={(e) => setFormData({ ...formData, processingFee: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Tenure (months)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.minTenure}
                  onChange={(e) => setFormData({ ...formData, minTenure: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Tenure (months)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.maxTenure}
                  onChange={(e) => setFormData({ ...formData, maxTenure: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        )}

        {/* Loan Types List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tenure Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Processing Fee
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
                {loanTypes.map((loanType) => (
                  <tr key={loanType.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === loanType.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                          <textarea
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            rows={2}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="font-medium text-gray-900">{loanType.name}</div>
                          <div className="text-sm text-gray-500">{loanType.description}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === loanType.id ? (
                        <input
                          type="number"
                          step="0.1"
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          value={formData.interestRate}
                          onChange={(e) => setFormData({ ...formData, interestRate: parseFloat(e.target.value) })}
                        />
                      ) : (
                        <span className="text-sm font-medium text-green-600">{loanType.interestRate}%</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === loanType.id ? (
                        <input
                          type="number"
                          className="w-32 px-2 py-1 border border-gray-300 rounded text-sm"
                          value={formData.maxAmount}
                          onChange={(e) => setFormData({ ...formData, maxAmount: parseInt(e.target.value) })}
                        />
                      ) : (
                        <span className="text-sm text-gray-900">₹{loanType.maxAmount.toLocaleString()}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === loanType.id ? (
                        <div className="flex space-x-1">
                          <input
                            type="number"
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                            value={formData.minTenure}
                            onChange={(e) => setFormData({ ...formData, minTenure: parseInt(e.target.value) })}
                          />
                          <span className="text-sm">-</span>
                          <input
                            type="number"
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                            value={formData.maxTenure}
                            onChange={(e) => setFormData({ ...formData, maxTenure: parseInt(e.target.value) })}
                          />
                        </div>
                      ) : (
                        <span className="text-sm text-gray-900">{loanType.minTenure} - {loanType.maxTenure} months</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === loanType.id ? (
                        <input
                          type="number"
                          step="0.1"
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          value={formData.processingFee}
                          onChange={(e) => setFormData({ ...formData, processingFee: parseFloat(e.target.value) })}
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{loanType.processingFee}%</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleActive(loanType.id)}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          loanType.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {loanType.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingId === loanType.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(loanType)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(loanType.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
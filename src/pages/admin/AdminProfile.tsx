import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { AdminLayout } from '../../components/AdminLayout';
import { Building2, Save, Upload, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const AdminProfile: React.FC = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const [profileData, setProfileData] = useState({
    companyName: 'RS FINANCE SERVICE',
    address: 'Nutunhat, Near Indian Oil Petrol Pump, West Bengal',
    phone: '8391808557',
    email: 'info@rsfinanceservice.com',
    description: 'RS Finance Service is a trusted financial services provider offering comprehensive loan solutions for individuals and businesses. With years of experience in the industry, we are committed to helping our customers achieve their financial goals through personalized service and competitive rates.',
    establishedYear: '2019',
    license: 'NBFC-MFI-2019-001',
    website: 'www.rsfinanceservice.com',
    businessHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleChange = (section: string, field: string, value: string) => {
    if (section === 'main') {
      setProfileData(prev => ({ ...prev, [field]: value }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Profile saved:', profileData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Organization Profile</h1>
            <p className="text-gray-600">Manage your organization's public information</p>
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>

        {saved && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-green-800">Profile updated successfully!</p>
          </div>
        )}

        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profileData.companyName}
                onChange={(e) => handleChange('main', 'companyName', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Established Year
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profileData.establishedYear}
                onChange={(e) => handleChange('main', 'establishedYear', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profileData.license}
                onChange={(e) => handleChange('main', 'license', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profileData.website}
                onChange={(e) => handleChange('main', 'website', e.target.value)}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                value={profileData.description}
                onChange={(e) => handleChange('main', 'description', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            Contact Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profileData.phone}
                onChange={(e) => handleChange('main', 'phone', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profileData.email}
                onChange={(e) => handleChange('main', 'email', e.target.value)}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                value={profileData.address}
                onChange={(e) => handleChange('main', 'address', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Business Hours
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(profileData.businessHours).map(([day, hours]) => (
              <div key={day} className="flex items-center space-x-4">
                <label className="w-20 text-sm font-medium text-gray-700 capitalize">
                  {day}:
                </label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={hours}
                  onChange={(e) => handleChange('businessHours', day, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profileData.socialMedia.facebook}
                onChange={(e) => handleChange('socialMedia', 'facebook', e.target.value)}
                placeholder="https://facebook.com/rsfinanceservice"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profileData.socialMedia.twitter}
                onChange={(e) => handleChange('socialMedia', 'twitter', e.target.value)}
                placeholder="https://twitter.com/rsfinanceservice"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profileData.socialMedia.linkedin}
                onChange={(e) => handleChange('socialMedia', 'linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/rsfinanceservice"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={profileData.socialMedia.instagram}
                onChange={(e) => handleChange('socialMedia', 'instagram', e.target.value)}
                placeholder="https://instagram.com/rsfinanceservice"
              />
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Company Logo</h2>
          
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-12 h-12 text-blue-600" />
            </div>
            
            <div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Logo</span>
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Recommended size: 200x200px, PNG or JPG format
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
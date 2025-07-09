import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-yellow-400" />
              <span className="text-xl font-bold">RS FINANCE SERVICE</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted financial partner providing comprehensive loan solutions
              for all your financial needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-yellow-400 transition-colors">Home</Link></li>
              <li><Link to="/loan-types" className="text-gray-300 hover:text-yellow-400 transition-colors">Loan Types</Link></li>
              <li><Link to="/apply-now" className="text-gray-300 hover:text-yellow-400 transition-colors">Apply Now</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Personal Loans</li>
              <li>Home Loans</li>
              <li>Car Loans</li>
              <li>Group Loans</li>
              <li>Business Loans</li>
              <li>Education Loans</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">8391808557</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">info@rsfinanceservice.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-yellow-400 mt-0.5" />
                <span className="text-gray-300">Nutunhat, Near Indian Oil Petrol Pump, West Bengal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">Mon-Sat: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 RS Finance Service. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/admin/login" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Admin Login
              </Link>
              <span className="text-gray-400 text-sm">Privacy Policy</span>
              <span className="text-gray-400 text-sm">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
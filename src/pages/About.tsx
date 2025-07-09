import React from 'react';
import { Users, Award, Target, Heart, Shield, TrendingUp } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About RS Finance Service
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Your trusted financial partner committed to making your dreams come true
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                RS Finance Service was founded with a simple yet powerful mission: to provide 
                accessible, transparent, and reliable financial solutions to individuals and 
                businesses in West Bengal and beyond. Since our inception, we have been dedicated 
                to helping our customers achieve their financial goals through personalized 
                loan products and exceptional service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">500+ Happy Customers</h3>
                <p className="text-gray-600">Trusted by families and businesses across West Bengal</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">5+ Years Experience</h3>
                <p className="text-gray-600">Proven track record in financial services</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">₹50+ Cr Disbursed</h3>
                <p className="text-gray-600">Total loan amount processed and disbursed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide accessible, transparent, and reliable financial solutions that 
                  empower individuals and businesses to achieve their goals while maintaining 
                  the highest standards of customer service and ethical practices.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the most trusted and preferred financial services provider in 
                  West Bengal, known for our customer-centric approach, innovative solutions, 
                  and commitment to financial inclusion.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Values</h3>
                <p className="text-gray-600 leading-relaxed">
                  Integrity, transparency, customer focus, innovation, and social responsibility 
                  are the core values that guide our decisions and actions in serving our 
                  customers and communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose RS Finance Service?
              </h2>
              <p className="text-lg text-gray-600">
                We stand out in the financial services industry through our commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Personalized Service',
                  description: 'We understand that every customer has unique financial needs. Our team works closely with you to find the perfect loan solution.',
                  icon: '👥'
                },
                {
                  title: 'Quick Processing',
                  description: 'Our streamlined application process ensures faster approval and disbursement, getting you the funds when you need them.',
                  icon: '⚡'
                },
                {
                  title: 'Competitive Rates',
                  description: 'We offer some of the most competitive interest rates in the market, helping you save money on your loans.',
                  icon: '💰'
                },
                {
                  title: 'Transparent Process',
                  description: 'No hidden fees or charges. We believe in complete transparency in all our dealings and loan terms.',
                  icon: '🔍'
                },
                {
                  title: 'Expert Guidance',
                  description: 'Our experienced financial advisors provide expert guidance throughout your loan journey.',
                  icon: '🎯'
                },
                {
                  title: 'Local Presence',
                  description: 'With our local presence in West Bengal, we understand the regional financial landscape and needs.',
                  icon: '📍'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Services
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive financial solutions for all your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Personal Loans',
                  description: 'Quick and flexible personal financing',
                  icon: '👤',
                  features: ['No collateral required', 'Quick approval', 'Flexible terms']
                },
                {
                  title: 'Home Loans',
                  description: 'Make your dream home a reality',
                  icon: '🏠',
                  features: ['Competitive rates', 'Long tenure', 'Tax benefits']
                },
                {
                  title: 'Car Loans',
                  description: 'Drive your dream car today',
                  icon: '🚗',
                  features: ['New & used cars', 'Fast processing', 'Low EMIs']
                },
                {
                  title: 'Business Loans',
                  description: 'Fuel your business growth',
                  icon: '💼',
                  features: ['Working capital', 'Equipment finance', 'Expansion loans']
                },
                {
                  title: 'Group Loans',
                  description: 'Community-based financing',
                  icon: '👥',
                  features: ['Collective lending', 'Lower risk', 'Community support']
                },
                {
                  title: 'Education Loans',
                  description: 'Invest in your future',
                  icon: '🎓',
                  features: ['Study abroad', 'Moratorium period', 'Tax benefits']
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500">• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Company Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <span className="ml-2 text-gray-600">8391808557</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="ml-2 text-gray-600">info@rsfinanceservice.com</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Address:</span>
                      <span className="ml-2 text-gray-600">
                        Nutunhat, Near Indian Oil Petrol Pump, West Bengal
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Monday - Friday:</span>
                      <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Saturday:</span>
                      <span className="text-gray-600">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Sunday:</span>
                      <span className="text-gray-600">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
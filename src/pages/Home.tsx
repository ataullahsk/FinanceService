import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, TrendingUp, CheckCircle, Star } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Financial Dreams, Our Expertise
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              RS Finance Service - Making your financial goals achievable with 
              personalized loan solutions and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apply-now"
                className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/loan-types"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Explore Loans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Loan Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to meet your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Personal Loans',
                description: 'Quick and flexible personal loans for any purpose',
                icon: '👤',
                rate: '10.5%',
                amount: 'Up to ₹10 Lakhs'
              },
              {
                title: 'Home Loans',
                description: 'Make your dream home a reality with our home loans',
                icon: '🏠',
                rate: '8.5%',
                amount: 'Up to ₹1 Crore'
              },
              {
                title: 'Car Loans',
                description: 'Drive your dream car with our affordable car loans',
                icon: '🚗',
                rate: '9.2%',
                amount: 'Up to ₹50 Lakhs'
              },
              {
                title: 'Group Loans',
                description: 'Collective financing solutions for community needs',
                icon: '👥',
                rate: '11.5%',
                amount: 'Up to ₹25 Lakhs'
              },
              {
                title: 'Business Loans',
                description: 'Fuel your business growth with our business loans',
                icon: '💼',
                rate: '12.5%',
                amount: 'Up to ₹2 Crores'
              },
              {
                title: 'Education Loans',
                description: 'Invest in your future with our education loans',
                icon: '🎓',
                rate: '9.8%',
                amount: 'Up to ₹30 Lakhs'
              },
            ].map((loan, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{loan.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{loan.title}</h3>
                <p className="text-gray-600 mb-4">{loan.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Interest Rate</span>
                    <span className="text-sm font-semibold text-green-600">{loan.rate}*</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Amount</span>
                    <span className="text-sm font-semibold">{loan.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose RS Finance Service?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional financial services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-12 h-12 text-blue-600" />,
                title: 'Secure & Trusted',
                description: 'Your financial security is our top priority with advanced encryption and data protection'
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
                title: 'Competitive Rates',
                description: 'We offer some of the most competitive interest rates in the market'
              },
              {
                icon: <Users className="w-12 h-12 text-blue-600" />,
                title: 'Expert Support',
                description: 'Our experienced team provides personalized guidance throughout your loan journey'
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Application Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your loan approved in just 4 easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Apply Online',
                description: 'Fill out our simple online application form'
              },
              {
                step: '2',
                title: 'Submit Documents',
                description: 'Upload required documents securely'
              },
              {
                step: '3',
                title: 'Get Approved',
                description: 'Receive approval within 24-48 hours'
              },
              {
                step: '4',
                title: 'Receive Funds',
                description: 'Get your funds transferred to your account'
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                role: 'Business Owner',
                content: 'RS Finance Service helped me expand my business with a quick and hassle-free loan process. Highly recommended!',
                rating: 5
              },
              {
                name: 'Priya Sharma',
                role: 'Homeowner',
                content: 'Thanks to their home loan, I was able to buy my dream house. The team was very supportive throughout.',
                rating: 5
              },
              {
                name: 'Amit Patel',
                role: 'Student',
                content: 'The education loan helped me pursue my higher studies abroad. Great rates and excellent service.',
                rating: 5
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Apply for your loan today and take the first step towards your financial goals
          </p>
          <Link
            to="/apply-now"
            className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors inline-flex items-center space-x-2"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
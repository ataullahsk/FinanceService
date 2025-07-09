import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Calculator, Clock, Shield } from 'lucide-react';

export const LoanTypes: React.FC = () => {
  const loanTypes = [
    {
      id: 'personal',
      title: 'Personal Loans',
      description: 'Quick and flexible personal loans for any purpose - medical expenses, travel, wedding, or any personal need.',
      icon: '👤',
      rate: '10.5%',
      amount: 'Up to ₹10 Lakhs',
      tenure: '12 - 60 months',
      processingTime: '24 hours',
      features: [
        'No collateral required',
        'Quick approval process',
        'Flexible repayment options',
        'Minimal documentation',
        'Online application'
      ],
      eligibility: [
        'Age: 21-65 years',
        'Minimum income: ₹15,000/month',
        'Employment: Salaried/Self-employed',
        'Credit score: 650+'
      ],
      documents: [
        'Identity proof',
        'Address proof',
        'Income proof',
        'Bank statements',
        'Photograph'
      ]
    },
    {
      id: 'home',
      title: 'Home Loans',
      description: 'Make your dream home a reality with our affordable home loans. Purchase, construct, or renovate your home.',
      icon: '🏠',
      rate: '8.5%',
      amount: 'Up to ₹1 Crore',
      tenure: '120 - 360 months',
      processingTime: '7-10 days',
      features: [
        'Competitive interest rates',
        'Up to 90% property financing',
        'Flexible EMI options',
        'Tax benefits available',
        'Balance transfer facility'
      ],
      eligibility: [
        'Age: 23-65 years',
        'Minimum income: ₹25,000/month',
        'Employment: Stable job/business',
        'Credit score: 700+'
      ],
      documents: [
        'Identity & address proof',
        'Income documents',
        'Property documents',
        'Bank statements',
        'Employment proof'
      ]
    },
    {
      id: 'car',
      title: 'Car Loans',
      description: 'Drive your dream car today with our attractive car loan offers. New or used vehicles, we have you covered.',
      icon: '🚗',
      rate: '9.2%',
      amount: 'Up to ₹50 Lakhs',
      tenure: '12 - 84 months',
      processingTime: '2-3 days',
      features: [
        'Finance up to 90% of car value',
        'New and used car financing',
        'Quick loan approval',
        'Flexible down payment',
        'Insurance tie-ups'
      ],
      eligibility: [
        'Age: 21-65 years',
        'Minimum income: ₹20,000/month',
        'Employment: Salaried/Self-employed',
        'Valid driving license'
      ],
      documents: [
        'Identity & address proof',
        'Income proof',
        'Car quotation/invoice',
        'Bank statements',
        'Driving license'
      ]
    },
    {
      id: 'group',
      title: 'Group Loans',
      description: 'Collective financing solutions for community needs, self-help groups, and joint ventures.',
      icon: '👥',
      rate: '11.5%',
      amount: 'Up to ₹25 Lakhs',
      tenure: '12 - 48 months',
      processingTime: '5-7 days',
      features: [
        'Community-based lending',
        'Flexible group terms',
        'Collective responsibility',
        'Lower individual risk',
        'Group insurance coverage'
      ],
      eligibility: [
        'Group of 5-20 members',
        'Age: 18-65 years',
        'Regular group meetings',
        'Savings track record'
      ],
      documents: [
        'Group formation documents',
        'Member identity proofs',
        'Income statements',
        'Group savings records',
        'Meeting minutes'
      ]
    },
    {
      id: 'business',
      title: 'Business Loans',
      description: 'Fuel your business growth with our comprehensive business financing solutions.',
      icon: '💼',
      rate: '12.5%',
      amount: 'Up to ₹2 Crores',
      tenure: '12 - 84 months',
      processingTime: '5-10 days',
      features: [
        'Working capital finance',
        'Equipment financing',
        'Business expansion loans',
        'Overdraft facilities',
        'Trade finance solutions'
      ],
      eligibility: [
        'Business age: 2+ years',
        'Annual turnover: ₹10 lakhs+',
        'Profit for last 2 years',
        'Good credit history'
      ],
      documents: [
        'Business registration',
        'Financial statements',
        'Tax returns',
        'Bank statements',
        'Business plan'
      ]
    },
    {
      id: 'education',
      title: 'Education Loans',
      description: 'Invest in your future with our education loans for higher studies in India and abroad.',
      icon: '🎓',
      rate: '9.8%',
      amount: 'Up to ₹30 Lakhs',
      tenure: '60 - 180 months',
      processingTime: '3-5 days',
      features: [
        'Study in India or abroad',
        'Covers tuition & living costs',
        'Moratorium period available',
        'Tax benefits under 80E',
        'Flexible repayment options'
      ],
      eligibility: [
        'Student age: 16-35 years',
        'Admission confirmation',
        'Co-applicant required',
        'Academic performance'
      ],
      documents: [
        'Admission letter',
        'Fee structure',
        'Academic records',
        'Identity proofs',
        'Co-applicant documents'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Loan Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of loan products designed to meet your diverse financial needs
          </p>
        </div>

        {/* Loan Types Grid */}
        <div className="space-y-12">
          {loanTypes.map((loan, index) => (
            <div key={loan.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Left Side - Main Info */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="text-5xl mr-4">{loan.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{loan.title}</h2>
                      <p className="text-gray-600">{loan.description}</p>
                    </div>
                  </div>

                  {/* Key Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Interest Rate</div>
                      <div className="text-2xl font-bold text-blue-600">{loan.rate}*</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Loan Amount</div>
                      <div className="text-2xl font-bold text-green-600">{loan.amount}</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Tenure</div>
                      <div className="text-lg font-bold text-purple-600">{loan.tenure}</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Processing Time</div>
                      <div className="text-lg font-bold text-orange-600">{loan.processingTime}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {loan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/apply-now"
                    state={{ selectedLoan: loan.title }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* Right Side - Eligibility & Documents */}
                <div className="space-y-6">
                  {/* Eligibility */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Shield className="w-5 h-5 text-blue-500 mr-2" />
                      Eligibility Criteria
                    </h3>
                    <ul className="space-y-2">
                      {loan.eligibility.map((criteria, idx) => (
                        <li key={idx} className="flex items-start text-gray-700">
                          <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          {criteria}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Documents Required */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Calculator className="w-5 h-5 text-green-500 mr-2" />
                      Documents Required
                    </h3>
                    <ul className="space-y-2">
                      {loan.documents.map((doc, idx) => (
                        <li key={idx} className="flex items-start text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 bg-blue-600 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing the Right Loan?</h2>
          <p className="text-blue-100 mb-6">
            Our financial experts are here to help you find the perfect loan solution for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/apply-now"
              className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
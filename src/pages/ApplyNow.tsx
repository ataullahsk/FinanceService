import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export const ApplyNow: React.FC = () => {
  const location = useLocation();
  const selectedLoan = location.state?.selectedLoan || '';
  
  const [formData, setFormData] = useState({
    loanType: selectedLoan,
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      fatherName: '',
      motherName: ''
    },
    addressInfo: {
      currentAddress: '',
      permanentAddress: '',
      city: '',
      state: '',
      pincode: '',
      residenceType: '',
      yearsAtCurrentAddress: ''
    },
    employmentInfo: {
      employmentType: '',
      companyName: '',
      designation: '',
      workExperience: '',
      monthlyIncome: '',
      additionalIncome: '',
      officialEmail: '',
      officeAddress: ''
    },
    loanDetails: {
      loanAmount: '',
      loanPurpose: '',
      preferredTenure: '',
      existingLoans: '',
      bankAccount: '',
      ifscCode: ''
    },
    documents: {
      identityProof: null,
      addressProof: null,
      incomeProof: null,
      bankStatements: null,
      photograph: null
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { number: 1, title: 'Personal Information', icon: '👤' },
    { number: 2, title: 'Address Details', icon: '🏠' },
    { number: 3, title: 'Employment Details', icon: '💼' },
    { number: 4, title: 'Loan Information', icon: '💰' },
    { number: 5, title: 'Documents Upload', icon: '📁' }
  ];

  const loanTypes = [
    'Personal Loan',
    'Home Loan',
    'Car Loan',
    'Group Loan',
    'Business Loan',
    'Education Loan'
  ];

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (field: string, file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  const validateStep = (step: number) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.personalInfo.firstName) newErrors['firstName'] = 'First name is required';
        if (!formData.personalInfo.lastName) newErrors['lastName'] = 'Last name is required';
        if (!formData.personalInfo.email) newErrors['email'] = 'Email is required';
        if (!formData.personalInfo.phone) newErrors['phone'] = 'Phone is required';
        if (!formData.personalInfo.dateOfBirth) newErrors['dateOfBirth'] = 'Date of birth is required';
        break;
      case 2:
        if (!formData.addressInfo.currentAddress) newErrors['currentAddress'] = 'Current address is required';
        if (!formData.addressInfo.city) newErrors['city'] = 'City is required';
        if (!formData.addressInfo.state) newErrors['state'] = 'State is required';
        if (!formData.addressInfo.pincode) newErrors['pincode'] = 'Pincode is required';
        break;
      case 3:
        if (!formData.employmentInfo.employmentType) newErrors['employmentType'] = 'Employment type is required';
        if (!formData.employmentInfo.monthlyIncome) newErrors['monthlyIncome'] = 'Monthly income is required';
        break;
      case 4:
        if (!formData.loanDetails.loanAmount) newErrors['loanAmount'] = 'Loan amount is required';
        if (!formData.loanDetails.loanPurpose) newErrors['loanPurpose'] = 'Loan purpose is required';
        if (!formData.loanDetails.preferredTenure) newErrors['preferredTenure'] = 'Preferred tenure is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Application Submitted Successfully!
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for applying for a loan with RS Finance Service. 
                Your application has been received and is being processed.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Application ID:</strong> RSF{Date.now()}
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Expected Processing Time:</strong> 2-3 business days
                </p>
              </div>
              <p className="text-gray-600 mb-6">
                Our team will review your application and contact you within 24-48 hours. 
                You can expect to receive updates via email and SMS.
              </p>
              <div className="space-y-4">
                <div className="text-sm text-gray-500">
                  For any queries, contact us at:
                </div>
                <div className="text-sm">
                  <strong>Phone:</strong> 8391808557<br />
                  <strong>Email:</strong> info@rsfinanceservice.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Loan Application
            </h1>
            <p className="text-xl text-gray-600">
              Complete your loan application in simple steps
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      currentStep >= step.number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="text-xs text-center mt-2 max-w-20">
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors['firstName'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={formData.personalInfo.firstName}
                      onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                    />
                    {errors['firstName'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['firstName']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors['lastName'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={formData.personalInfo.lastName}
                      onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                    />
                    {errors['lastName'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['lastName']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors['email'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={formData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    />
                    {errors['email'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['email']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors['phone'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={formData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    />
                    {errors['phone'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['phone']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors['dateOfBirth'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={formData.personalInfo.dateOfBirth}
                      onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                    />
                    {errors['dateOfBirth'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['dateOfBirth']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.personalInfo.gender}
                      onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marital Status
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.personalInfo.maritalStatus}
                      onChange={(e) => handleInputChange('personalInfo', 'maritalStatus', e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Father's Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.personalInfo.fatherName}
                      onChange={(e) => handleInputChange('personalInfo', 'fatherName', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Address Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Address Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Address *
                    </label>
                    <textarea
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors['currentAddress'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      rows={3}
                      value={formData.addressInfo.currentAddress}
                      onChange={(e) => handleInputChange('addressInfo', 'currentAddress', e.target.value)}
                    />
                    {errors['currentAddress'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['currentAddress']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Permanent Address (if different from current)
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      value={formData.addressInfo.permanentAddress}
                      onChange={(e) => handleInputChange('addressInfo', 'permanentAddress', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors['city'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData.addressInfo.city}
                        onChange={(e) => handleInputChange('addressInfo', 'city', e.target.value)}
                      />
                      {errors['city'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['city']}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors['state'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData.addressInfo.state}
                        onChange={(e) => handleInputChange('addressInfo', 'state', e.target.value)}
                      />
                      {errors['state'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['state']}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors['pincode'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData.addressInfo.pincode}
                        onChange={(e) => handleInputChange('addressInfo', 'pincode', e.target.value)}
                      />
                      {errors['pincode'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['pincode']}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Residence Type
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.addressInfo.residenceType}
                        onChange={(e) => handleInputChange('addressInfo', 'residenceType', e.target.value)}
                      >
                        <option value="">Select Type</option>
                        <option value="owned">Owned</option>
                        <option value="rented">Rented</option>
                        <option value="parental">Parental</option>
                        <option value="company">Company Provided</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years at Current Address
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.addressInfo.yearsAtCurrentAddress}
                        onChange={(e) => handleInputChange('addressInfo', 'yearsAtCurrentAddress', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Employment Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Employment Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employment Type *
                    </label>
                    <select
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors['employmentType'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={formData.employmentInfo.employmentType}
                      onChange={(e) => handleInputChange('employmentInfo', 'employmentType', e.target.value)}
                    >
                      <option value="">Select Employment Type</option>
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self Employed</option>
                      <option value="business">Business Owner</option>
                      <option value="professional">Professional</option>
                      <option value="retired">Retired</option>
                    </select>
                    {errors['employmentType'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['employmentType']}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company/Business Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.employmentInfo.companyName}
                        onChange={(e) => handleInputChange('employmentInfo', 'companyName', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.employmentInfo.designation}
                        onChange={(e) => handleInputChange('employmentInfo', 'designation', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Experience (Years)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.employmentInfo.workExperience}
                        onChange={(e) => handleInputChange('employmentInfo', 'workExperience', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Income *
                      </label>
                      <input
                        type="number"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors['monthlyIncome'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData.employmentInfo.monthlyIncome}
                        onChange={(e) => handleInputChange('employmentInfo', 'monthlyIncome', e.target.value)}
                      />
                      {errors['monthlyIncome'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['monthlyIncome']}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Income (if any)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.employmentInfo.additionalIncome}
                        onChange={(e) => handleInputChange('employmentInfo', 'additionalIncome', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Official Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.employmentInfo.officialEmail}
                        onChange={(e) => handleInputChange('employmentInfo', 'officialEmail', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Office Address
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      value={formData.employmentInfo.officeAddress}
                      onChange={(e) => handleInputChange('employmentInfo', 'officeAddress', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Loan Information */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Type
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.loanType}
                      onChange={(e) => setFormData(prev => ({ ...prev, loanType: e.target.value }))}
                    >
                      <option value="">Select Loan Type</option>
                      {loanTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan Amount *
                      </label>
                      <input
                        type="number"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors['loanAmount'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData.loanDetails.loanAmount}
                        onChange={(e) => handleInputChange('loanDetails', 'loanAmount', e.target.value)}
                      />
                      {errors['loanAmount'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['loanAmount']}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Tenure (months) *
                      </label>
                      <select
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors['preferredTenure'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData.loanDetails.preferredTenure}
                        onChange={(e) => handleInputChange('loanDetails', 'preferredTenure', e.target.value)}
                      >
                        <option value="">Select Tenure</option>
                        <option value="12">12 months</option>
                        <option value="24">24 months</option>
                        <option value="36">36 months</option>
                        <option value="48">48 months</option>
                        <option value="60">60 months</option>
                        <option value="72">72 months</option>
                        <option value="84">84 months</option>
                      </select>
                      {errors['preferredTenure'] && (
                        <p className="text-red-500 text-sm mt-1">{errors['preferredTenure']}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Purpose *
                    </label>
                    <textarea
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors['loanPurpose'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      rows={3}
                      value={formData.loanDetails.loanPurpose}
                      onChange={(e) => handleInputChange('loanDetails', 'loanPurpose', e.target.value)}
                    />
                    {errors['loanPurpose'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['loanPurpose']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Existing Loans (if any)
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Please provide details of any existing loans"
                      value={formData.loanDetails.existingLoans}
                      onChange={(e) => handleInputChange('loanDetails', 'existingLoans', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.loanDetails.bankAccount}
                        onChange={(e) => handleInputChange('loanDetails', 'bankAccount', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.loanDetails.ifscCode}
                        onChange={(e) => handleInputChange('loanDetails', 'ifscCode', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Documents Upload */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents Upload</h2>
                
                <div className="space-y-6">
                  {[
                    { key: 'identityProof', label: 'Identity Proof (Aadhar/PAN/Passport)', required: true },
                    { key: 'addressProof', label: 'Address Proof (Utility Bill/Rental Agreement)', required: true },
                    { key: 'incomeProof', label: 'Income Proof (Salary Slips/ITR)', required: true },
                    { key: 'bankStatements', label: 'Bank Statements (Last 6 months)', required: true },
                    { key: 'photograph', label: 'Passport Size Photograph', required: true },
                  ].map((doc) => (
                    <div key={doc.key} className="border border-gray-200 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {doc.label} {doc.required && '*'}
                      </label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor={doc.key}
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id={doc.key}
                                type="file"
                                className="sr-only"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleFileUpload(doc.key, file);
                                  }
                                }}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                          {formData.documents[doc.key] && (
                            <p className="text-sm text-green-600 flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {formData.documents[doc.key].name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Important Notes:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>All documents should be clear and legible</li>
                        <li>File size should not exceed 10MB</li>
                        <li>Accepted formats: PDF, JPG, PNG</li>
                        <li>Ensure all uploaded documents are valid and up-to-date</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Back
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
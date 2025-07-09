import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              We're here to help you with all your financial needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">8391808557</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Sat: 9 AM - 6 PM</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600">info@rsfinanceservice.com</p>
                <p className="text-sm text-gray-500 mt-1">24/7 Support</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-gray-600 text-sm">
                  Nutunhat, Near Indian Oil Petrol Pump, West Bengal
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hours</h3>
                <p className="text-gray-600 text-sm">
                  Mon-Fri: 9 AM - 6 PM<br />
                  Sat: 9 AM - 2 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-600 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={formData.subject}
                          onChange={handleChange}
                        >
                          <option value="">Select Subject</option>
                          <option value="loan-inquiry">Loan Inquiry</option>
                          <option value="application-status">Application Status</option>
                          <option value="general-query">General Query</option>
                          <option value="complaint">Complaint</option>
                          <option value="feedback">Feedback</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Map and Office Info */}
              <div className="space-y-8">
                {/* Map */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-semibold mb-4">Our Location</h3>
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-600">
                        Nutunhat, Near Indian Oil Petrol Pump<br />
                        West Bengal
                      </p>
                    </div>
                  </div>
                </div>

                {/* Office Info */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-semibold mb-4">Visit Our Office</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-gray-600">
                          Nutunhat, Near Indian Oil Petrol Pump, West Bengal
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 9:00 AM - 2:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-gray-600">
                          8391808557<br />
                          Available during business hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-blue-50 rounded-2xl p-8">
                  <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <a
                      href="/apply-now"
                      className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                    >
                      Apply for Loan
                    </a>
                    <a
                      href="/loan-types"
                      className="block w-full bg-white text-blue-600 py-3 px-4 rounded-lg text-center font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      View Loan Types
                    </a>
                    <a
                      href="tel:8391808557"
                      className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-green-700 transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "What documents do I need for a loan application?",
                  answer: "You'll need identity proof, address proof, income proof, bank statements, and a recent photograph. Specific requirements may vary by loan type."
                },
                {
                  question: "How long does the loan approval process take?",
                  answer: "Our approval process typically takes 24-48 hours for personal loans and 7-10 days for home loans, depending on documentation completeness."
                },
                {
                  question: "Can I prepay my loan without penalties?",
                  answer: "Yes, most of our loan products allow prepayment without penalties. Please check your loan agreement for specific terms."
                },
                {
                  question: "What are your interest rates?",
                  answer: "Our interest rates are competitive and vary by loan type. Please contact us or visit our loan types page for current rates."
                },
                {
                  question: "Do you offer loans to self-employed individuals?",
                  answer: "Yes, we offer loans to both salaried and self-employed individuals with appropriate documentation and income verification."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
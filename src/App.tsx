import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { LoanTypes } from './pages/LoanTypes';
import { ApplyNow } from './pages/ApplyNow';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminApplications } from './pages/admin/AdminApplications';
import { AdminLoanTypes } from './pages/admin/AdminLoanTypes';
import { AdminProfile } from './pages/admin/AdminProfile';
import { AdminProvider } from './context/AdminContext';

function App() {
  return (
    <AdminProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loan-types" element={<LoanTypes />} />
            <Route path="/apply-now" element={<ApplyNow />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/loan-types" element={<AdminLoanTypes />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AdminProvider>
  );
}

export default App;
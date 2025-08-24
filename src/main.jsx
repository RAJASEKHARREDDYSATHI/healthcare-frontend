import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Page1 from './page1.jsx';
import Dashboard from './Dashboard.jsx';
import Cancer from './Cancer.jsx';
import Cardio from './Cardio.jsx';
import Kidney from './Kidney.jsx';
import Neuro from './Neuro.jsx';
import Ortho from './Ortho.jsx';
import Patientbooking from './Patientbooking.jsx';
import DoctorAppointment from './DoctorAppointment.jsx';
import Profile from './Profile.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 👇 basename ensures routing works under /healthcare-frontend/ */}
    <Router basename="/healthcare-frontend">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Cancer" element={<Cancer />} />
        <Route path="/Cardio" element={<Cardio />} />
        <Route path="/Kidney" element={<Kidney />} />
        <Route path="/Neuro" element={<Neuro />} />
        <Route path="/Ortho" element={<Ortho />} />
        <Route path="/Patientbooking" element={<Patientbooking />} />
        <Route path="/DoctorAppointment" element={<DoctorAppointment />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  </StrictMode>
);

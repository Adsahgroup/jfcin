/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Projects from './pages/Projects';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AppProvider } from './context/AppContext';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Helper wrapper to include Layout on public pages but maybe exclude on specialized ones if needed
const PublicRoute = ({ children }: React.PropsWithChildren<{}>) => (
  <Layout>{children}</Layout>
);

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
          <Route path="/gallery" element={<PublicRoute><Gallery /></PublicRoute>} />
          <Route path="/exco" element={<PublicRoute><Team /></PublicRoute>} />
          <Route path="/chairmen" element={<PublicRoute><Team /></PublicRoute>} />
          <Route path="/blog" element={<PublicRoute><Blog /></PublicRoute>} />
          <Route path="/projects" element={<PublicRoute><Projects /></PublicRoute>} />
          <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Login /></PublicRoute>} /> {/* Reusing Login for visual demo */}
          
          {/* Admin Route - Does not use standard Layout */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <FloatingWhatsApp />
      </HashRouter>
    </AppProvider>
  );
};

export default App;
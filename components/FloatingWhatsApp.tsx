/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/2348000000000" // Replace with real number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center animate-bounce-subtle"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} fill="white" />
    </a>
  );
};

export default FloatingWhatsApp;
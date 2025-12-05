/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-20 min-h-screen bg-white animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
        {/* Contact Info & Form */}
        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-green-50/50">
          <span className="text-jfcin-primary font-bold tracking-wider uppercase text-sm mb-2">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">We'd love to hear from you.</h1>
          
          <div className="space-y-6 mb-12">
             <div className="flex items-start gap-4">
               <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                 <MapPin size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">Visit Us</h3>
                 <p className="text-gray-600">Block B, Agriculture House, Central Business District, Abuja, Nigeria.</p>
               </div>
             </div>
             
             <div className="flex items-start gap-4">
               <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                 <Mail size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">Email Us</h3>
                 <p className="text-gray-600">support@jfcin.org.ng</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                 <Phone size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900">Call Us</h3>
                 <p className="text-gray-600">+234 (0) 800 123 4567</p>
               </div>
             </div>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full p-4 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
              <input type="text" placeholder="Last Name" className="w-full p-4 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full p-4 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
            <textarea placeholder="Your Message" rows={4} className="w-full p-4 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"></textarea>
            <button className="w-full bg-jfcin-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-jfcin-secondary transition shadow-lg flex items-center justify-center gap-2">
              Send Message <Send size={20} />
            </button>
          </form>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-200 h-96 lg:h-auto relative w-full">
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.803584825965!2d7.4984!3d9.0558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf887e9151%3A0x946f87d46c82352b!2sAbuja!5e0!3m2!1sen!2sng!4v1634567890123!5m2!1sen!2sng" 
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen={true} 
            loading="lazy"
            className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
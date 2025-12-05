/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Team = () => {
  const { members } = useApp();
  const location = useLocation();
  const isExco = location.pathname.includes('exco');
  
  const [searchTerm, setSearchTerm] = useState('');

  // Filter members based on route (EXCO vs Chairmen) and search term
  const filteredMembers = members.filter(member => {
    const matchesType = isExco ? member.type === 'EXCO' : member.type === 'CHAIRMAN';
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (member.state && member.state.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="pt-20 min-h-screen bg-gray-50 animate-fade-in">
      <div className="bg-jfcin-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {isExco ? 'National Executive Council' : 'State Chairmen'}
          </h1>
          <p className="max-w-xl mx-auto text-green-100">
            {isExco 
              ? 'The visionary leaders steering JFCIN towards our strategic goals.' 
              : 'Our dedicated representatives coordinating activities across the 36 states.'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Filter (Mostly for Chairmen) */}
        {!isExco && (
          <div className="max-w-md mx-auto mb-12 relative">
            <input
              type="text"
              placeholder="Search by State or Name..."
              className="w-full py-3 px-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="h-64 overflow-hidden relative bg-gray-200">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {!isExco && member.state && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-jfcin-primary flex items-center gap-1 shadow-sm">
                    <MapPin size={12} /> {member.state}
                  </div>
                )}
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-green-600 font-medium text-sm mb-3">{member.role}</p>
                <div className="w-10 h-1 bg-green-100 mx-auto mb-3"></div>
                <p className="text-gray-500 text-sm line-clamp-3">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            <p>No members found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
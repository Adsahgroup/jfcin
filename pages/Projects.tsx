/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import { MapPin, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Projects = () => {
  const { projects } = useApp();

  return (
    <div className="pt-20 min-h-screen bg-gray-50 animate-fade-in">
      {/* Header */}
      <div className="bg-jfcin-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
          <p className="max-w-xl mx-auto text-green-100">
            Transforming agriculture through sustainable initiatives across Nigeria.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  project.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                  project.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {project.status}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {project.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {project.date}</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="mt-auto border-t border-gray-100 pt-4 flex items-center text-sm font-semibold text-jfcin-primary">
                  {project.status === 'Completed' ? (
                     <><CheckCircle size={16} className="mr-2" /> Successfully Delivered</>
                  ) : (
                     <><Clock size={16} className="mr-2" /> Work in Progress</>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p>No projects currently listed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
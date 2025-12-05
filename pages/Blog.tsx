/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import { Calendar, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Blog = () => {
  const { blogs } = useApp();

  return (
    <div className="pt-20 min-h-screen bg-gray-50 animate-fade-in">
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">News & Updates</h1>
          <p className="text-gray-600">Stay informed about agricultural trends and JFCIN activities.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
              <div className="h-56 overflow-hidden rounded-t-2xl relative">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {blog.category}
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</div>
                  <div className="flex items-center gap-1"><User size={14} /> {blog.author}</div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors cursor-pointer">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-6 flex-grow">{blog.excerpt}</p>
                <button className="w-full mt-auto py-2 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors">
                  Read Article
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
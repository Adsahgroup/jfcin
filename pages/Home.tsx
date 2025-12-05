/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Activity, Users, Globe, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { sliders, blogs } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliders.length]);

  return (
    <div className="animate-fade-in">
      {/* Hero Slider */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-gray-900">
        {sliders.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[10000ms]"
              style={{ backgroundImage: `url(${slide.image})`, transform: index === currentSlide ? 'scale(100)' : 'scale(110)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-3xl text-white space-y-6">
                  <span className="inline-block px-4 py-1 rounded-full border border-green-500 text-green-400 text-sm font-semibold tracking-wider uppercase animate-fade-in-up">
                    Joint Farmers Community Initiative
                  </span>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 max-w-xl border-l-4 border-green-500 pl-4">
                    {slide.subtitle}
                  </p>
                  <div className="pt-6">
                    <Link
                      to={slide.ctaLink}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-jfcin-primary to-jfcin-secondary hover:from-green-600 hover:to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-green-500/30 transition-all transform hover:-translate-y-1"
                    >
                      {slide.ctaText} <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Dots */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
          {sliders.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-green-500' : 'w-2 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://picsum.photos/600/600?random=50" 
                alt="Farmers Meeting" 
                className="rounded-2xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-jfcin-light rounded-full -z-0 opacity-50 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-100 rounded-full -z-0 opacity-50 blur-xl"></div>
            </div>
            <div className="space-y-6">
              <h2 className="text-jfcin-primary font-bold tracking-wider uppercase text-sm">Who We Are</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Empowering Nigeria Through Agriculture</h3>
              <p className="text-gray-600 leading-relaxed">
                JFCIN is dedicated to uniting farmers across Nigeria, providing access to modern resources, financial grants, and sustainable farming techniques. Our mission is to transform the agricultural landscape into a thriving economic powerhouse.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="text-2xl font-bold text-jfcin-primary mb-1">36+</h4>
                  <p className="text-sm text-gray-600">States Covered</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="text-2xl font-bold text-jfcin-primary mb-1">50k+</h4>
                  <p className="text-sm text-gray-600">Registered Farmers</p>
                </div>
              </div>

              <Link to="/about" className="inline-flex items-center text-jfcin-primary font-semibold hover:text-jfcin-dark mt-4">
                Read our full story <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Features Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Pillars</h2>
            <p className="text-gray-600">We operate on a foundation of integrity, community, and technological advancement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Globe className="text-white" size={32} />, title: "Market Access", desc: "Connecting local farmers directly to national and international markets.", color: "bg-blue-500" },
              { icon: <Leaf className="text-white" size={32} />, title: "Sustainable Farming", desc: "Promoting eco-friendly practices that ensure long-term soil health.", color: "bg-green-600" },
              { icon: <Users className="text-white" size={32} />, title: "Community Support", desc: "A strong network of farmers helping farmers through knowledge sharing.", color: "bg-yellow-500" }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Latest Updates</h2>
              <p className="text-gray-500 mt-2">News and insights from the field</p>
            </div>
            <Link to="/blog" className="hidden md:flex items-center gap-1 text-jfcin-primary font-medium hover:underline">
              View All Posts <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog) => (
              <article key={blog.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl mb-4 relative h-64">
                   <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-jfcin-primary">
                    {blog.category}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{blog.date}</span> • <span>{blog.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-jfcin-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
             <Link to="/blog" className="inline-block py-3 px-8 border border-gray-300 rounded-full text-gray-700 font-medium">View All Posts</Link>
          </div>
        </div>
      </section>

       {/* Call to Action */}
       <section className="py-20 bg-gradient-to-br from-jfcin-dark to-jfcin-primary text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="container mx-auto px-4 relative z-10 text-center">
           <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Join the Revolution?</h2>
           <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
             Become a part of the largest network of farmers in Nigeria. Access grants, tools, and a community that cares.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/register" className="bg-white text-jfcin-primary px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors">
               Register as Member
             </Link>
             <Link to="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
               Contact Support
             </Link>
           </div>
         </div>
       </section>
    </div>
  );
};

export default Home;
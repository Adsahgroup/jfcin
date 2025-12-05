
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React, { useState, useEffect, PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Instagram, Youtube, User, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LOGO_URL } from '../constants';

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'EXCO', path: '/exco' },
    { name: 'Chairmen', path: '/chairmen' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      {/* Navbar */}
      <header
        className={`fixed w-full z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`p-1 rounded-full transition-colors ${scrolled ? 'bg-transparent' : 'bg-white/10 backdrop-blur-sm'}`}>
              <img 
                src={LOGO_URL} 
                alt="JFCIN Logo" 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                    // Fallback if logo.png is missing
                    (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=JFCIN&background=0a7a28&color=fff&size=128";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-xl tracking-tight ${scrolled ? 'text-jfcin-primary' : 'text-white shadow-black drop-shadow-md'}`}>
                JFCIN
              </span>
              <span className={`text-[10px] font-medium tracking-wider ${scrolled ? 'text-gray-600' : 'text-gray-200 shadow-black drop-shadow-md'}`}>
                NIGERIA
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium text-sm uppercase tracking-wide transition-colors hover:text-green-400 ${
                  scrolled ? 'text-gray-700' : 'text-white shadow-black drop-shadow-sm'
                } ${location.pathname === link.path ? 'text-green-500 font-bold' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-3 ml-4">
                 <Link to="/admin" className="px-4 py-2 rounded-full bg-jfcin-primary text-white text-sm hover:bg-jfcin-dark transition">
                  Dashboard
                </Link>
                <button onClick={logout} className="p-2 text-red-500 hover:bg-red-50 rounded-full" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className={`ml-4 px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                scrolled ? 'bg-jfcin-primary text-white hover:bg-jfcin-dark' : 'bg-white text-jfcin-primary hover:bg-gray-100'
              }`}>
                Join Us
              </Link>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`xl:hidden p-2 rounded-lg ${scrolled ? 'text-gray-800' : 'text-white'}`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMenuOpen(false)}>
        <div className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col pt-20 pb-6 px-6 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
          <nav className="flex flex-col gap-4">
             {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-lg font-medium border-b border-gray-100 pb-2 ${location.pathname === link.path ? 'text-jfcin-primary' : 'text-gray-600'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
               {user ? (
                 <div className="flex flex-col gap-3">
                   <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                     <User size={16} /> {user.name}
                   </div>
                   <Link to="/admin" className="block w-full text-center py-3 bg-jfcin-primary text-white rounded-lg">Admin Dashboard</Link>
                   <button onClick={logout} className="block w-full text-center py-3 bg-red-100 text-red-600 rounded-lg">Logout</button>
                 </div>
               ) : (
                 <Link to="/login" className="block w-full text-center py-3 bg-jfcin-primary text-white rounded-lg shadow-lg shadow-green-200">
                  Member Login
                </Link>
               )}
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-0 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={LOGO_URL} alt="JFCIN Logo" className="w-12 h-12 object-contain" />
                <span className="text-xl font-bold">JFCIN</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Empowering Nigerian farmers through community, technology, and sustainable practices. Join the movement for a food-secure nation.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition"><Twitter size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition"><Youtube size={18} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-green-500">Quick Links</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link to="/projects" className="hover:text-white transition">Our Projects</Link></li>
                <li><Link to="/blog" className="hover:text-white transition">Latest News</Link></li>
                <li><Link to="/gallery" className="hover:text-white transition">Media Gallery</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact Support</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-green-500">Contact Info</h3>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-white">HQ:</span>
                  123 Farming Estate, Abuja FCT, Nigeria
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-white">Phone:</span>
                  +234 800 123 4567
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-semibold text-white">Email:</span>
                  info@jfcin.org.ng
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-green-500">Newsletter</h3>
              <p className="text-gray-400 text-xs mb-4">Subscribe to get updates on farming grants and news.</p>
              <form className="flex flex-col gap-2">
                <input type="email" placeholder="Your Email Address" className="bg-gray-800 border-none rounded-lg py-3 px-4 text-sm text-white focus:ring-1 focus:ring-green-500 outline-none" />
                <button className="bg-jfcin-primary hover:bg-jfcin-secondary text-white py-2 rounded-lg text-sm font-semibold transition">Subscribe</button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Joint Farmers Community Initiative of Nigeria. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
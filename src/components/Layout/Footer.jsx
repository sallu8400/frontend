import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-slate-900 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-400 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-2xl font-bold">Couture</span>
            </Link>
            <p className={`leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-slate-300'
            }`}>
              Elevating your style with premium fashion and exceptional quality. Discover the perfect blend of elegance and comfort.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-white'
              }`}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-white'
              }`}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-white'
              }`}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-white'
              }`}>
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-300 hover:text-white'
              }`}>About Us</Link></li>
              <li><Link to="/men" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-300 hover:text-white'
              }`}>Men's Collection</Link></li>
              <li><Link to="/women" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-300 hover:text-white'
              }`}>Women's Collection</Link></li>
              <li><Link to="/accessories" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-300 hover:text-white'
              }`}>Accessories</Link></li>
              <li><Link to="/sale" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-300 hover:text-white'
              }`}>Sale</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-4">
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-300 hover:text-white'
              }`}>Contact Us</a></li>
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-300 hover:text-white'
              }`}>Shipping & Returns</a></li>
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-300 hover:text-white'
              }`}>FAQ</a></li>
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-300 hover:text-white'
              }`}>Track Order</a></li>
              <li><a href="#" className={`transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-slate-300 hover:text-white'
              }`}>Gift Cards</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className={isDarkMode ? 'text-gray-300' : 'text-slate-300'}>123 Fashion Ave, Style District, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className={isDarkMode ? 'text-gray-300' : 'text-slate-300'}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className={isDarkMode ? 'text-gray-300' : 'text-slate-300'}>hello@couture.com</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white border-gray-600' 
                      : 'bg-slate-800 text-white border-slate-700'
                  }`}
                />
                <button className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-r-lg transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`border-t mt-12 pt-8 transition-colors ${
          isDarkMode ? 'border-gray-700' : 'border-slate-800'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-slate-400'
            }`}>
              © 2024 Couture. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-white'
              }`}>Privacy Policy</a>
              <a href="#" className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-white'
              }`}>Terms of Service</a>
              <a href="#" className={`text-sm transition-colors ${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-white'
              }`}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
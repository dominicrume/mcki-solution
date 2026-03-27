import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'UK Students', path: '/uk' },
    { name: 'International', path: '/international' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-mcki-blue text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-white p-2 rounded-full group-hover:bg-mcki-gold transition-colors">
              <GraduationCap className="h-6 w-6 text-mcki-blue" />
            </div>
            <span className="font-heading font-bold text-xl tracking-wide">MCKI<span className="text-mcki-gold">.</span></span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-mcki-gold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
             <Link to="/book">
                <Button variant="primary" className="text-sm py-2">
                  Book Free Call
                </Button>
             </Link>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-mcki-gold focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-900 border-t border-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-mcki-gold"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link to="/book" onClick={() => setIsOpen(false)}>
                 <Button variant="primary" fullWidth>Book Free Call</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
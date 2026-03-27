import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-mcki-blue text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
               <GraduationCap className="h-6 w-6 text-mcki-gold" />
               <span className="font-heading font-bold text-xl">MCKI Solutions</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner in higher education admissions across the UK and Europe.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-mcki-gold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/uk" className="hover:text-white">UK Students</Link></li>
              <li><Link to="/international" className="hover:text-white">International Students</Link></li>
              <li><Link to="/apply" className="hover:text-white">Apply Now</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-mcki-gold">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><span className="cursor-pointer hover:text-white">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-white">Terms & Conditions</span></li>
              <li><span className="cursor-pointer hover:text-white">Cookie Policy</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-mcki-gold">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-mcki-gold shrink-0" />
                <span>123 Education Lane, London, UK</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-mcki-gold shrink-0" />
                <span>+44 20 1234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-mcki-gold shrink-0" />
                <span>admissions@mcki.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} MCKI Solutions. All rights reserved.</p>
          <p className="mt-2 text-xs opacity-70">MCKI Solutions does not guarantee admission. All services subject to eligibility & T&Cs.</p>
        </div>
      </div>
    </footer>
  );
};
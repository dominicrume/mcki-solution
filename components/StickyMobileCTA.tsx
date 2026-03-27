import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Phone } from 'lucide-react';

export const StickyMobileCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-50 flex gap-3">
       <a 
        href="https://wa.me/447000000000" 
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-3 rounded-md border-2 border-green-600 text-green-700 bg-white"
        aria-label="WhatsApp"
      >
        <Phone className="w-6 h-6" />
      </a>
      <Button 
        variant="primary" 
        fullWidth 
        onClick={() => navigate('/apply')}
      >
        Start Application
      </Button>
    </div>
  );
};
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-mcki-gold text-white hover:bg-yellow-600 focus:ring-mcki-gold shadow-md",
    secondary: "bg-mcki-blue text-white hover:bg-blue-900 focus:ring-mcki-blue shadow-md",
    outline: "border-2 border-mcki-blue text-mcki-blue hover:bg-mcki-blue hover:text-white",
    text: "text-mcki-blue hover:text-mcki-gold underline-offset-4 hover:underline bg-transparent px-0 py-0"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};
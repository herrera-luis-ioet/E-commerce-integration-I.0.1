import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// PUBLIC_INTERFACE
/**
 * Mobile menu component that slides in from the side on small screens
 * @param {boolean} isOpen - Whether the menu is open
 * @param {function} onClose - Function to close the menu
 */
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
      onClick={handleBackdropClick}
    >
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-primary">Menu</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="mt-8">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block py-2 px-4 text-gray-800 hover:bg-primary hover:text-white rounded transition-colors"
                  onClick={onClose}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/all" 
                  className="block py-2 px-4 text-gray-800 hover:bg-primary hover:text-white rounded transition-colors"
                  onClick={onClose}
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/electronics" 
                  className="block py-2 px-4 text-gray-800 hover:bg-primary hover:text-white rounded transition-colors"
                  onClick={onClose}
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link 
                  to="/category/clothing" 
                  className="block py-2 px-4 text-gray-800 hover:bg-primary hover:text-white rounded transition-colors"
                  onClick={onClose}
                >
                  Clothing
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link 
              to="/cart" 
              className="flex items-center py-2 px-4 text-gray-800 hover:bg-primary hover:text-white rounded transition-colors"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
            </Link>
            <Link 
              to="/account" 
              className="flex items-center py-2 px-4 text-gray-800 hover:bg-primary hover:text-white rounded transition-colors"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
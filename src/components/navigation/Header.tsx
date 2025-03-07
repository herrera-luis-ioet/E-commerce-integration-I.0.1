import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import MobileMenu from './MobileMenu';

// PUBLIC_INTERFACE
/**
 * Header component with responsive navigation
 * Shows navigation links on desktop and hamburger menu on mobile
 */
const Header: React.FC = () => {
  const { isMobile } = useResponsive();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="bg-primary py-4 shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-white text-2xl font-bold hover:text-gray-200 transition-colors">
              Product Catalog
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden md:block">
                <div className="flex space-x-6">
                  <Link to="/" className="text-white hover:text-gray-200 transition-colors">
                    Home
                  </Link>
                  <Link to="/category/all" className="text-white hover:text-gray-200 transition-colors">
                    All Products
                  </Link>
                  <Link to="/category/electronics" className="text-white hover:text-gray-200 transition-colors">
                    Electronics
                  </Link>
                  <Link to="/category/clothing" className="text-white hover:text-gray-200 transition-colors">
                    Clothing
                  </Link>
                </div>
              </nav>
            )}

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Search icon */}
              <button className="text-white hover:text-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Cart icon */}
              <Link to="/cart" className="text-white hover:text-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Link>
              
              {/* Mobile menu toggle */}
              {isMobile && (
                <button 
                  onClick={toggleMobileMenu} 
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
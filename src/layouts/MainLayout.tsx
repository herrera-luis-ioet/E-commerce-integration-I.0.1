import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Main layout component that wraps the application content
 * Provides consistent layout structure with header, main content area, and footer
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-primary py-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-white text-2xl font-bold hover:text-gray-200 transition-colors">
              Product Catalog
            </Link>
            <nav className="hidden md:block">
              {/* Navigation components will be added here */}
              <div className="flex space-x-6">
                <Link to="/" className="text-white hover:text-gray-200 transition-colors">Home</Link>
                <Link to="/category/all" className="text-white hover:text-gray-200 transition-colors">All Products</Link>
                {/* More navigation items will be added here */}
              </div>
            </nav>
            <div className="flex items-center space-x-4">
              {/* Search and cart components will be added here */}
              <div className="text-white">Search</div>
              <div className="text-white">Cart</div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content area */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-secondary-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-300">
                Product Catalog Component is a comprehensive solution for managing and displaying products.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/category/all" className="text-gray-300 hover:text-white transition-colors">All Products</Link></li>
                {/* More links will be added here */}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">
                Email: info@productcatalog.com<br />
                Phone: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6">
            <p className="text-center text-gray-300">&copy; {new Date().getFullYear()} Product Catalog Component. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;

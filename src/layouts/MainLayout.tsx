import React from 'react';

// PUBLIC_INTERFACE
/**
 * Main layout component that wraps the application content
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-2xl font-bold">Product Catalog</h1>
          {/* Navigation components will be added here */}
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-secondary-dark text-white py-6">
        <div className="container mx-auto px-4">
          <p className="text-center">&copy; {new Date().getFullYear()} Product Catalog Component</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
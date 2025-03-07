import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import ProductCatalog from '../pages/ProductCatalog';
import ProductDetail from '../pages/ProductDetail';
// import NotFound from '../pages/NotFound';

// PUBLIC_INTERFACE
/**
 * Application routes configuration
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main routes */}
      <Route path="/" element={<ProductCatalog />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/category/:category" element={<ProductCatalog />} />
      
      {/* NotFound page - temporarily using Navigate until NotFound component is created */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import pages when they are created
// import ProductCatalog from '../pages/ProductCatalog';
// import ProductDetail from '../pages/ProductDetail';
// import NotFound from '../pages/NotFound';

// PUBLIC_INTERFACE
/**
 * Application routes configuration
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Placeholder routes - uncomment when components are created */}
      {/* <Route path="/" element={<ProductCatalog />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/category/:category" element={<ProductCatalog />} />
      <Route path="*" element={<NotFound />} /> */}
      
      {/* Temporary placeholder route */}
      <Route path="/" element={<div className="p-4">Product Catalog Component (Under Development)</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
import React from 'react';
import { Product, ProductResponse } from '../../types/product';
import ProductCard from './ProductCard';
import Loading from '../common/Loading';
import Error from '../common/Error';
import Pagination from '../common/Pagination';

// PUBLIC_INTERFACE
/**
 * ProductGrid component for displaying products in a grid layout
 * @param products - Array of products to display
 * @param loading - Whether products are currently loading
 * @param error - Error message if loading products failed
 * @param onProductClick - Function to call when a product is clicked
 * @param pagination - Pagination information
 * @param onPageChange - Function to call when page is changed
 * @param onRetry - Function to call when retry button is clicked
 */
interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onProductClick?: (product: Product) => void;
  pagination?: ProductResponse['pagination'];
  onPageChange?: (page: number) => void;
  onRetry?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  error,
  onProductClick,
  pagination,
  onPageChange,
  onRetry
}) => {
  // Show loading state
  if (loading) {
    return (
      <div className="py-12">
        <Loading size="large" text="Loading products..." />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="py-8">
        <Error 
          message={error} 
          retryAction={onRetry} 
          retryText="Try Again" 
        />
      </div>
    );
  }

  // Show empty state
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="text-gray-500 mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p className="text-gray-600">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={onProductClick}
            layout="grid"
          />
        ))}
      </div>

      {/* Pagination */}
      {pagination && onPageChange && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default ProductGrid;
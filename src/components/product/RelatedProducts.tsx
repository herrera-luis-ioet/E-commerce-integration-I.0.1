import React, { useState, useRef } from 'react';
import { Product } from '../../types/product';
import ProductCard from '../catalog/ProductCard';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  loading?: boolean;
}

// PUBLIC_INTERFACE
/**
 * RelatedProducts component for displaying a carousel of related products
 * @param products - Array of related product objects
 * @param title - Optional title for the section
 * @param loading - Optional loading state
 */
const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  products, 
  title = 'Related Products',
  loading = false
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll to previous set of products
  const handlePrevious = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    
    // Update scroll position after animation
    setTimeout(() => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollLeft);
      }
    }, 500);
  };
  
  // Handle scroll to next set of products
  const handleNext = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    // Update scroll position after animation
    setTimeout(() => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollLeft);
      }
    }, 500);
  };
  
  // Handle scroll event to update scroll position
  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };
  
  // If no products and not loading, don't render anything
  if (products.length === 0 && !loading) {
    return null;
  }
  
  // Calculate if we can scroll left or right
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = containerRef.current 
    ? scrollPosition < containerRef.current.scrollWidth - containerRef.current.clientWidth - 10
    : false;
  
  return (
    <div className="related-products">
      {/* Header with title and navigation arrows */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        
        {/* Navigation arrows - only show if we have products */}
        {products.length > 0 && (
          <div className="flex space-x-2">
            <button 
              className={`p-2 rounded-full border ${
                canScrollLeft 
                  ? 'border-gray-300 hover:border-primary text-gray-700 hover:text-primary' 
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
              onClick={handlePrevious}
              disabled={!canScrollLeft}
              aria-label="Previous products"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className={`p-2 rounded-full border ${
                canScrollRight 
                  ? 'border-gray-300 hover:border-primary text-gray-700 hover:text-primary' 
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
              onClick={handleNext}
              disabled={!canScrollRight}
              aria-label="Next products"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Products carousel */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto pb-4 gap-4 snap-x scrollbar-hide"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {loading ? (
          // Loading placeholders
          Array.from({ length: 4 }).map((_, index) => (
            <div 
              key={`placeholder-${index}`} 
              className="min-w-[250px] h-[350px] bg-gray-100 rounded-lg animate-pulse flex-shrink-0 snap-start"
            />
          ))
        ) : (
          // Actual products
          products.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[250px] max-w-[250px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
      
      {/* Custom scrollbar indicator */}
      {products.length > 0 && containerRef.current && containerRef.current.scrollWidth > containerRef.current.clientWidth && (
        <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full"
            style={{ 
              width: containerRef.current 
                ? `${(containerRef.current.clientWidth / containerRef.current.scrollWidth) * 100}%` 
                : '20%',
              marginLeft: containerRef.current 
                ? `${(scrollPosition / containerRef.current.scrollWidth) * 100}%` 
                : '0%',
              transition: 'margin-left 0.3s ease'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
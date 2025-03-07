import React, { useState } from 'react';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import PriceRangeFilter from './PriceRangeFilter';
import useFilters from '../../hooks/useFilters';
import Loading from '../common/Loading';
import Error from '../common/Error';

// PUBLIC_INTERFACE
/**
 * FilterPanel component that combines all filter components
 * @param categories - Array of available categories
 * @param loading - Whether the filters are loading
 * @param error - Error message if filters failed to load
 * @param minPrice - Minimum possible price (default: 0)
 * @param maxPrice - Maximum possible price (default: 1000)
 * @param className - Optional additional CSS classes
 * @param onApplyFilters - Optional callback when filters are applied
 */
interface FilterPanelProps {
  categories: string[];
  loading?: boolean;
  error?: string | null;
  minPrice?: number;
  maxPrice?: number;
  className?: string;
  onApplyFilters?: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  loading = false,
  error = null,
  minPrice = 0,
  maxPrice = 1000,
  className = '',
  onApplyFilters
}) => {
  const { clearAllFilters, applyFilters } = useFilters();
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  // Handle apply filters button click
  const handleApplyFilters = () => {
    applyFilters();
    if (onApplyFilters) {
      onApplyFilters();
    }
    
    // On mobile, collapse the filter panel after applying filters
    if (window.innerWidth < 768) {
      setIsFilterExpanded(false);
    }
  };
  
  // Handle clear filters button click
  const handleClearFilters = () => {
    clearAllFilters();
  };
  
  // Toggle filter panel on mobile
  const toggleFilterPanel = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };
  
  // If loading, show loading spinner
  if (loading) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
        <Loading text="Loading filters..." />
      </div>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
        <Error message={error} />
      </div>
    );
  }
  
  return (
    <div className={`${className}`}>
      {/* Mobile filter toggle button */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleFilterPanel}
          className="w-full bg-white p-3 rounded-lg shadow-md flex justify-between items-center"
          aria-expanded={isFilterExpanded}
          aria-controls="filter-panel"
        >
          <span className="font-medium">Filters</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform ${isFilterExpanded ? 'transform rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      
      {/* Filter panel content - hidden on mobile when collapsed */}
      <div 
        id="filter-panel"
        className={`bg-white p-6 rounded-lg shadow-md ${!isFilterExpanded ? 'hidden md:block' : ''}`}
      >
        <h2 className="text-xl font-semibold mb-6">Filters</h2>
        
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar />
        </div>
        
        <hr className="my-6 border-gray-200" />
        
        {/* Price Range Filter */}
        <div className="mb-6">
          <PriceRangeFilter 
            minPrice={minPrice} 
            maxPrice={maxPrice} 
          />
        </div>
        
        <hr className="my-6 border-gray-200" />
        
        {/* Category Filter */}
        <div className="mb-6">
          <CategoryFilter categories={categories} />
        </div>
        
        <hr className="my-6 border-gray-200" />
        
        {/* Filter Action Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
            aria-label="Apply filters"
          >
            Apply Filters
          </button>
          
          <button
            onClick={handleClearFilters}
            className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
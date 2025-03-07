import React, { useState, useEffect, useCallback } from 'react';
import useFilters from '../../hooks/useFilters';

// PUBLIC_INTERFACE
/**
 * SearchBar component for searching products by name or description
 * @param placeholder - Optional placeholder text for the search input
 * @param className - Optional additional CSS classes
 */
interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = 'Search products...', 
  className = '' 
}) => {
  const { filters, updateSearchQuery } = useFilters();
  const [searchTerm, setSearchTerm] = useState(filters.searchQuery);
  
  // Debounce search to prevent excessive API calls
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm !== filters.searchQuery) {
        updateSearchQuery(searchTerm);
      }
    }, 500);
    
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, updateSearchQuery, filters.searchQuery]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle search form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchQuery(searchTerm);
  };
  
  // Clear search input
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    updateSearchQuery('');
  }, [updateSearchQuery]);
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative ${className}`}
      role="search"
    >
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          aria-label="Search products"
        />
        
        {/* Search icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        
        {/* Clear button - only show when there's text */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
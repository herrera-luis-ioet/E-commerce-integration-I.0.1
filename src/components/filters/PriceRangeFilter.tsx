import React, { useState, useEffect } from 'react';
import useFilters from '../../hooks/useFilters';

// PUBLIC_INTERFACE
/**
 * PriceRangeFilter component for filtering products by price range
 * @param minPrice - Minimum possible price (default: 0)
 * @param maxPrice - Maximum possible price (default: 1000)
 * @param step - Step value for the slider (default: 10)
 * @param title - Optional title for the filter section
 * @param className - Optional additional CSS classes
 */
interface PriceRangeFilterProps {
  minPrice?: number;
  maxPrice?: number;
  step?: number;
  title?: string;
  className?: string;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice = 0,
  maxPrice = 1000,
  step = 10,
  title = 'Price Range',
  className = ''
}) => {
  const { filters, updatePriceRange } = useFilters();
  
  // Local state for min and max values
  const [minValue, setMinValue] = useState(filters.priceRange.min);
  const [maxValue, setMaxValue] = useState(filters.priceRange.max);
  
  // Update local state when filters change
  useEffect(() => {
    setMinValue(filters.priceRange.min);
    setMaxValue(filters.priceRange.max);
  }, [filters.priceRange.min, filters.priceRange.max]);
  
  // Handle min price input change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      // Ensure min value doesn't exceed max value
      const newMinValue = Math.min(value, maxValue);
      setMinValue(newMinValue);
    }
  };
  
  // Handle max price input change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      // Ensure max value doesn't go below min value
      const newMaxValue = Math.max(value, minValue);
      setMaxValue(newMaxValue);
    }
  };
  
  // Apply price range filter when input loses focus
  const handleBlur = () => {
    updatePriceRange(minValue, maxValue);
  };
  
  // Calculate percentage for slider positioning
  const minPercentage = ((minValue - minPrice) / (maxPrice - minPrice)) * 100;
  const maxPercentage = ((maxValue - minPrice) / (maxPrice - minPrice)) * 100;
  
  return (
    <div className={`${className}`}>
      <h3 className="font-medium mb-2">{title}</h3>
      
      {/* Price range slider */}
      <div className="relative mt-4 mb-6 px-2">
        <div className="h-1 bg-gray-200 rounded-full">
          <div 
            className="absolute h-1 bg-primary rounded-full"
            style={{ 
              left: `${minPercentage}%`, 
              right: `${100 - maxPercentage}%` 
            }}
          ></div>
        </div>
        
        {/* Min slider thumb */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          onMouseUp={handleBlur}
          onKeyUp={handleBlur}
          className="absolute top-0 left-0 w-full h-1 appearance-none bg-transparent pointer-events-none"
          style={{ 
            zIndex: 3,
            // Custom thumb styling
            WebkitAppearance: 'none',
          }}
          aria-label="Minimum price"
        />
        
        {/* Max slider thumb */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          onMouseUp={handleBlur}
          onKeyUp={handleBlur}
          className="absolute top-0 left-0 w-full h-1 appearance-none bg-transparent pointer-events-none"
          style={{ 
            zIndex: 4,
            // Custom thumb styling
            WebkitAppearance: 'none',
          }}
          aria-label="Maximum price"
        />
      </div>
      
      {/* Price input fields */}
      <div className="flex items-center justify-between">
        <div className="w-[45%]">
          <label htmlFor="min-price" className="block text-xs text-gray-500 mb-1">
            Min Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              id="min-price"
              type="number"
              min={minPrice}
              max={maxValue}
              value={minValue}
              onChange={handleMinChange}
              onBlur={handleBlur}
              className="w-full pl-7 pr-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="text-gray-400">-</div>
        
        <div className="w-[45%]">
          <label htmlFor="max-price" className="block text-xs text-gray-500 mb-1">
            Max Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              id="max-price"
              type="number"
              min={minValue}
              max={maxPrice}
              value={maxValue}
              onChange={handleMaxChange}
              onBlur={handleBlur}
              className="w-full pl-7 pr-2 py-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
import React from 'react';
import useFilters from '../../hooks/useFilters';
import Loading from '../common/Loading';
import Error from '../common/Error';

// PUBLIC_INTERFACE
/**
 * CategoryFilter component for filtering products by category
 * @param categories - Array of available categories
 * @param loading - Whether the categories are loading
 * @param error - Error message if categories failed to load
 * @param title - Optional title for the filter section
 * @param className - Optional additional CSS classes
 */
interface CategoryFilterProps {
  categories: string[];
  loading?: boolean;
  error?: string | null;
  title?: string;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  loading = false,
  error = null,
  title = 'Categories',
  className = ''
}) => {
  const { filters, toggleCategory } = useFilters();
  
  // Handle category checkbox change
  const handleCategoryChange = (category: string) => {
    toggleCategory(category);
  };
  
  // If loading, show loading spinner
  if (loading) {
    return (
      <div className={`${className}`}>
        <h3 className="font-medium mb-2">{title}</h3>
        <div className="py-4 flex justify-center">
          <Loading size="small" text="Loading categories..." />
        </div>
      </div>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <div className={`${className}`}>
        <h3 className="font-medium mb-2">{title}</h3>
        <Error message={error} />
      </div>
    );
  }
  
  // If no categories, show message
  if (categories.length === 0) {
    return (
      <div className={`${className}`}>
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">No categories available</p>
      </div>
    );
  }
  
  return (
    <div className={`${className}`}>
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center">
            <input
              type="checkbox"
              id={`category-${category}`}
              checked={filters.categories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              aria-label={`Filter by ${category}`}
            />
            <label 
              htmlFor={`category-${category}`}
              className="text-sm text-gray-700 cursor-pointer select-none"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
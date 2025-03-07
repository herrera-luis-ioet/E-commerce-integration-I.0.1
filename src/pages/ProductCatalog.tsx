import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Product Catalog page component
 * Displays a grid of products with filtering options
 */
const ProductCatalog: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Placeholder for filter handling
  const handleFilterChange = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  return (
    <div className="pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
        </h1>
        <p className="text-gray-600">
          Browse our selection of high-quality products
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Panel */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="space-y-2">
                {['Under $25', '$25 to $50', '$50 to $100', 'Over $100'].map(range => (
                  <div key={range} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`price-${range}`} 
                      className="mr-2"
                      checked={activeFilters.includes(range)}
                      onChange={() => handleFilterChange(range)}
                    />
                    <label htmlFor={`price-${range}`}>{range}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {['Electronics', 'Clothing', 'Home & Kitchen', 'Books'].map(cat => (
                  <div key={cat} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`category-${cat}`} 
                      className="mr-2"
                      checked={activeFilters.includes(cat)}
                      onChange={() => handleFilterChange(cat)}
                    />
                    <label htmlFor={`category-${cat}`}>{cat}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Rating</h3>
              <div className="space-y-2">
                {['4 stars & up', '3 stars & up', '2 stars & up'].map(rating => (
                  <div key={rating} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`rating-${rating}`} 
                      className="mr-2"
                      checked={activeFilters.includes(rating)}
                      onChange={() => handleFilterChange(rating)}
                    />
                    <label htmlFor={`rating-${rating}`}>{rating}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Clear Filters Button */}
            <button 
              className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary-dark transition-colors"
              onClick={() => setActiveFilters([])}
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-600">Showing 12 of 36 products</span>
              </div>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2">Sort by:</label>
                <select id="sort" className="border rounded p-1">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Customer Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product Card Placeholders */}
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-medium">Product Name {index + 1}</h3>
                  <div className="flex items-center mt-1">
                    <div className="text-yellow-400">★★★★☆</div>
                    <span className="text-gray-600 text-sm ml-1">(42)</span>
                  </div>
                  <div className="mt-2 font-semibold">${(19.99 + index * 10).toFixed(2)}</div>
                  <button className="mt-3 w-full bg-primary text-white py-1 rounded hover:bg-primary-dark transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded border">Previous</button>
              <button className="px-3 py-1 rounded bg-primary text-white">1</button>
              <button className="px-3 py-1 rounded border">2</button>
              <button className="px-3 py-1 rounded border">3</button>
              <button className="px-3 py-1 rounded border">Next</button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
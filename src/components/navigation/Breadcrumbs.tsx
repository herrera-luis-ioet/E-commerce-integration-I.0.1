import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

// PUBLIC_INTERFACE
/**
 * Breadcrumbs component for improved navigation
 * Shows the current navigation path based on the current route
 */
const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Generate breadcrumb items based on current path
  const breadcrumbItems: BreadcrumbItem[] = pathnames.map((value, index) => {
    // Create a path for this breadcrumb
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    
    // Format the label (capitalize and replace hyphens with spaces)
    let label = value.replace(/-/g, ' ');
    
    // Special case for product IDs
    if (value.match(/^[0-9a-fA-F-]+$/) && pathnames[index - 1] === 'products') {
      label = 'Product Details';
    } else {
      // Capitalize first letter of each word
      label = label
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    return {
      label,
      path,
      isLast: index === pathnames.length - 1,
    };
  });

  // If we're on the home page, don't show breadcrumbs
  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-gray-100">
      <ol className="flex flex-wrap items-center text-sm text-gray-600">
        {/* Home link is always first */}
        <li className="flex items-center">
          <Link to="/" className="hover:text-primary transition-colors">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            <span className="sr-only">Home</span>
          </Link>
          <span className="mx-2 text-gray-400">/</span>
        </li>

        {/* Dynamically generated breadcrumbs */}
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.isLast ? (
              <span className="font-medium text-primary" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <Link to={item.path} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
                <span className="mx-2 text-gray-400">/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
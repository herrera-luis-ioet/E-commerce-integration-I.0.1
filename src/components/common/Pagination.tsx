import React from 'react';

// PUBLIC_INTERFACE
/**
 * Pagination component for navigating through pages of content
 * @param currentPage - The current active page (1-based)
 * @param totalPages - The total number of pages
 * @param onPageChange - Function to call when a page is selected
 * @param maxVisiblePages - Maximum number of page buttons to show
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5
}) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Calculate the range of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    
    // If total pages is less than or equal to max visible pages, show all pages
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
    
    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    // Adjust if end page exceeds total pages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
  
  // Button style classes
  const baseButtonClass = "px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50";
  const activeButtonClass = `${baseButtonClass} bg-primary text-white`;
  const inactiveButtonClass = `${baseButtonClass} border border-gray-300 text-gray-700 hover:bg-gray-100`;
  const disabledButtonClass = `${baseButtonClass} border border-gray-200 text-gray-400 cursor-not-allowed`;

  return (
    <nav className="flex justify-center mt-6" aria-label="Pagination">
      <ul className="flex items-center space-x-2">
        {/* Previous page button */}
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? disabledButtonClass : inactiveButtonClass}
            aria-label="Previous page"
          >
            Previous
          </button>
        </li>
        
        {/* First page button with ellipsis if needed */}
        {pageNumbers[0] > 1 && (
          <>
            <li>
              <button
                onClick={() => onPageChange(1)}
                className={inactiveButtonClass}
                aria-label="Page 1"
              >
                1
              </button>
            </li>
            {pageNumbers[0] > 2 && (
              <li className="px-2">
                <span className="text-gray-500">...</span>
              </li>
            )}
          </>
        )}
        
        {/* Page number buttons */}
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={number === currentPage ? activeButtonClass : inactiveButtonClass}
              aria-label={`Page ${number}`}
              aria-current={number === currentPage ? 'page' : undefined}
            >
              {number}
            </button>
          </li>
        ))}
        
        {/* Last page button with ellipsis if needed */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <li className="px-2">
                <span className="text-gray-500">...</span>
              </li>
            )}
            <li>
              <button
                onClick={() => onPageChange(totalPages)}
                className={inactiveButtonClass}
                aria-label={`Page ${totalPages}`}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
        
        {/* Next page button */}
        <li>
          <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? disabledButtonClass : inactiveButtonClass}
            aria-label="Next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
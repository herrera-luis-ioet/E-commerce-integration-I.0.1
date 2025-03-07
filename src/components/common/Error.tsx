import React from 'react';

// PUBLIC_INTERFACE
/**
 * Error component for displaying error messages with optional retry functionality
 * @param message - The error message to display
 * @param retryAction - Optional function to call when retry button is clicked
 * @param retryText - Optional text for the retry button, defaults to "Try Again"
 * @param fullPage - Whether to display the error message full page
 */
interface ErrorProps {
  message: string;
  retryAction?: () => void;
  retryText?: string;
  fullPage?: boolean;
}

const Error: React.FC<ErrorProps> = ({ 
  message, 
  retryAction, 
  retryText = 'Try Again',
  fullPage = false
}) => {
  const errorContent = (
    <div className="flex flex-col items-center text-center">
      <div className="text-error-dark mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {retryAction && (
        <button
          onClick={retryAction}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          {retryText}
        </button>
      )}
    </div>
  );
  
  // If fullPage is true, center the error in the page
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          {errorContent}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-red-50 border border-red-100 rounded-lg p-6">
      {errorContent}
    </div>
  );
};

export default Error;
import React from 'react';

// PUBLIC_INTERFACE
/**
 * Loading spinner component for indicating loading states
 * @param size - Size of the spinner: 'small', 'medium', or 'large'
 * @param color - Color of the spinner, defaults to primary color
 * @param text - Optional text to display below the spinner
 */
interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  fullPage?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  color = 'primary',
  text,
  fullPage = false
}) => {
  // Determine spinner size based on prop
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };
  
  // Determine spinner color based on prop
  const colorClasses = {
    primary: 'border-primary border-t-transparent',
    secondary: 'border-secondary border-t-transparent',
    white: 'border-white border-t-transparent'
  };
  
  const spinnerClasses = `
    ${sizeClasses[size]} 
    ${colorClasses[color]} 
    rounded-full animate-spin
  `;
  
  const loadingContent = (
    <div className="flex flex-col items-center justify-center">
      <div className={spinnerClasses}></div>
      {text && <p className="mt-3 text-gray-600">{text}</p>}
    </div>
  );
  
  // If fullPage is true, center the spinner in the page
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        {loadingContent}
      </div>
    );
  }
  
  return loadingContent;
};

export default Loading;
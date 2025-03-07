import React, { useState, useRef } from 'react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

// PUBLIC_INTERFACE
/**
 * ProductGallery component for displaying product images with thumbnail navigation
 * Supports image zooming and navigation between multiple product images
 * @param images - Array of image URLs
 * @param alt - Alt text for the images
 */
const ProductGallery: React.FC<ProductGalleryProps> = ({ images, alt }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const mainImageRef = useRef<HTMLDivElement>(null);

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    setIsZoomed(false);
  };

  // Handle navigation to previous image
  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  // Handle navigation to next image
  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  // Handle mouse move for zoom effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current || !isZoomed) return;

    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  // Toggle zoom state
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // If no images are provided, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500">No image available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="product-gallery">
      {/* Main Image */}
      <div 
        ref={mainImageRef}
        className={`relative mb-4 aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={toggleZoom}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isZoomed && setIsZoomed(false)}
      >
        <img 
          src={images[activeIndex]} 
          alt={`${alt} - Image ${activeIndex + 1}`} 
          className={`w-full h-full object-center object-contain transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={
            isZoomed 
              ? { 
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : undefined
          }
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Zoom indicator */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button 
              key={index} 
              className={`border-2 rounded-md overflow-hidden focus:outline-none ${
                activeIndex === index ? 'border-primary' : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : 'false'}
            >
              <img 
                src={image} 
                alt={`${alt} - Thumbnail ${index + 1}`} 
                className="w-full h-full object-center object-cover aspect-square"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
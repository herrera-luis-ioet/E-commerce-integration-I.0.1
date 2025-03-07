import { useState, useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
/**
 * Custom hook for lazy loading images
 * @param imgRef - Reference to the image element
 * @param src - Source URL of the image
 * @param placeholderSrc - Optional placeholder image to show while loading
 * @param options - IntersectionObserver options
 * @returns Object containing loaded status and current source
 */
export const useLazyLoad = (
  imgRef: React.RefObject<HTMLImageElement>,
  src: string,
  placeholderSrc: string = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZWVlZSIvPjwvc3ZnPg==',
  options: IntersectionObserverInit = {
    rootMargin: '0px',
    threshold: 0.1,
  }
) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // If the image reference is not available, return early
    if (!imgRef.current) return;

    // Cleanup previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new observer
    observerRef.current = new IntersectionObserver(([entry]) => {
      // If the image is in the viewport
      if (entry.isIntersecting) {
        // Start loading the actual image
        const img = new Image();
        img.src = src;
        img.onload = () => {
          // Once loaded, update the source and set loaded state
          if (imgRef.current) {
            setCurrentSrc(src);
            setIsLoaded(true);
          }
        };

        // Disconnect the observer since we don't need it anymore
        observerRef.current?.disconnect();
      }
    }, options);

    // Start observing the image element
    observerRef.current.observe(imgRef.current);

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [imgRef, src, options]);

  return { isLoaded, currentSrc };
};

export default useLazyLoad;
import { useState, useEffect, useRef, useCallback } from 'react';

// PUBLIC_INTERFACE
/**
 * Custom hook for implementing infinite scrolling
 * @param callback - Function to call when more items need to be loaded
 * @param options - IntersectionObserver options
 * @returns Object containing loading state, sentinel element ref, and error state
 */
export const useInfiniteScroll = (
  callback: () => Promise<void>,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '100px',
    threshold: 0.1,
  }
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Function to load more items
  const loadMore = useCallback(async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);
      await callback();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more items');
      console.error('Infinite scroll error:', err);
    } finally {
      setLoading(false);
    }
  }, [callback, loading]);

  useEffect(() => {
    // If the sentinel element is not available, return early
    if (!sentinelRef.current) return;

    // Cleanup previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new observer
    observerRef.current = new IntersectionObserver(([entry]) => {
      // If the sentinel is in the viewport and we're not currently loading
      if (entry.isIntersecting && !loading) {
        loadMore();
      }
    }, options);

    // Start observing the sentinel element
    observerRef.current.observe(sentinelRef.current);

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, loading, options]);

  return { loading, sentinelRef, error };
};

export default useInfiniteScroll;
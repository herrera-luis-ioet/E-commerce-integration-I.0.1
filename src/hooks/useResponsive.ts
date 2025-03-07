import { useState, useEffect } from 'react';

// Define breakpoints that match Tailwind's default breakpoints
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof breakpoints;

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: Breakpoint | null;
}

// PUBLIC_INTERFACE
/**
 * Custom hook for handling responsive behavior
 * Provides information about current screen size and breakpoints
 * @returns {ResponsiveState} Object containing responsive state information
 */
const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    breakpoint: null,
  });

  useEffect(() => {
    // Function to update state based on window size
    const updateSize = (): void => {
      const width = window.innerWidth;
      
      // Determine current breakpoint
      let currentBreakpoint: Breakpoint | null = null;
      
      if (width < breakpoints.sm) {
        currentBreakpoint = null; // Below smallest breakpoint
      } else if (width < breakpoints.md) {
        currentBreakpoint = 'sm';
      } else if (width < breakpoints.lg) {
        currentBreakpoint = 'md';
      } else if (width < breakpoints.xl) {
        currentBreakpoint = 'lg';
      } else if (width < breakpoints['2xl']) {
        currentBreakpoint = 'xl';
      } else {
        currentBreakpoint = '2xl';
      }
      
      setState({
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
        breakpoint: currentBreakpoint,
      });
    };

    // Add event listener
    window.addEventListener('resize', updateSize);
    
    // Call once to set initial size
    updateSize();
    
    // Cleanup
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return state;
};

export default useResponsive;
import { useState, useEffect } from 'react';

interface BreakpointValues {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  screenWidth: number;
}

export const useResponsive = (): BreakpointValues => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024 && screenWidth < 1280;
  const isLargeDesktop = screenWidth >= 1280;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    screenWidth,
  };
};

export default useResponsive;

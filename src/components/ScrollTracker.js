import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const ScrollTracker = ({ page }) => {
    useEffect(() => {
      const savedPosition = sessionStorage.getItem(`scroll-position-${page}`) || 0;
       window.scrollTo(0, parseInt(savedPosition));
    }, [page])
    
  return null
}

export default ScrollTracker;
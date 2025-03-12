import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const ScrollTracker = ({page}) => {
    useEffect(() => {
        const savedPosition = localStorage.getItem(`scroll-position-${page}`) || 0;
        window.scrollTo(0, parseInt(savedPosition));
    }, [])
    
  return null
}

export default ScrollTracker;
import { useRef, useEffect } from 'react';


// eslint-disable-next-line react/prop-types
const ScrollTracker = ({page}) => {
    const hasMounted = useRef(false);
    const lastKnownScroll = useRef(0);

    useEffect(() => {
        const savedPosition = localStorage.getItem(`scroll-position-${page}`) || 0;
        window.scrollTo(0, parseInt(savedPosition));

        if(!hasMounted.current) {
            hasMounted.current = true;
            return
        }

        const handleScroll = () => {
            lastKnownScroll.current = window.scrollY;
        };
    
        window.addEventListener("scroll", handleScroll);

        return () => {
            localStorage.setItem(`scroll-position-${page}`, lastKnownScroll.current);
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])
    
  return null
}

export default ScrollTracker
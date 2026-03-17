import { useEffect } from 'react';
import { getActiveScrollPosition, getActiveScrollTarget } from '../utils/scrollPosition';

// eslint-disable-next-line react/prop-types
const ScrollTracker = ({ page }) => {
    useEffect(() => {
      const target = getActiveScrollTarget();

      const persistPosition = () => {
        sessionStorage.setItem(`scroll-position-${page}`, String(getActiveScrollPosition()));
      };

      if (target.type === 'element') {
        target.element.addEventListener('scroll', persistPosition, { passive: true });
      } else {
        window.addEventListener('scroll', persistPosition, { passive: true });
      }

      return () => {
        if (target.type === 'element') {
          target.element.removeEventListener('scroll', persistPosition);
        } else {
          window.removeEventListener('scroll', persistPosition);
        }
      };
    }, [page]);

    useEffect(() => {
      const savedPosition = Number(sessionStorage.getItem(`scroll-position-${page}`) || 0);
      let attemptCount = 0;
      let frameId;

      const restore = () => {
        const target = getActiveScrollTarget();
        const maxScrollTop = target.type === 'element'
          ? Math.max(0, target.element.scrollHeight - target.element.clientHeight)
          : Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

        const nextTop = Math.min(savedPosition, maxScrollTop);

        if (target.type === 'element') {
          target.element.scrollTo({ top: nextTop, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: nextTop, behavior: 'smooth' });
        }

        const currentTop = target.type === 'element'
          ? target.element.scrollTop
          : window.scrollY;

        if (savedPosition > 0 && currentTop < savedPosition && attemptCount < 30) {
          attemptCount += 1;
          frameId = requestAnimationFrame(restore);
        }
      };

      frameId = requestAnimationFrame(restore);

      return () => {
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
      };
    }, [page]);
    
  return null
}

export default ScrollTracker;
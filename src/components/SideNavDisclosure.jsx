import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';



// eslint-disable-next-line react/prop-types
const SideNavDisclosure = ({ children, triggerTitle, page, sectionPages = [] }) => {
  const detailsRef = useRef(null);
  const underline = sectionPages.includes(page);

  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('side-nav-disclosure-open');
      return stored === 'true';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem(`side-nav-disclosure-open`, isOpen);
  }, [isOpen]);
  
  return (
    <details ref={detailsRef} open={isOpen} onToggle={e => setIsOpen(e.target.open)}>
      <summary className={`list-none flex items-center justify-between text-[0.900rem] ${underline ? "underline" : ""} side-nav-link`}>
        {triggerTitle}
        {isOpen ? <ChevronRight className='rotate-90' height={13} width={13}/> : <ChevronRight height={13} width={13}/>} 
      </summary>
      <div
        className={`transition-all duration-200 ease-out origin-top-left ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
        style={{ willChange: 'opacity, transform' }}
      >
        {children}
      </div>
    </details>
  )
}

export default SideNavDisclosure
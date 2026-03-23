import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getActiveScrollPosition } from '../utils/scrollPosition';


// eslint-disable-next-line react/prop-types
const SlideOutNav = ({page, showDropdownPage}) => {
  const saveScrollPosition = () => {
    sessionStorage.setItem(`scroll-position-${page}`, String(getActiveScrollPosition()));
  };

  return (
    <AnimatePresence>
      {showDropdownPage && (
        <>
          <motion.div
            className="slide-out-side-nav-outer-div"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="slide-out-side-nav-div pt-5 pr-5 pb-[100px] pl-5 overflow-y-auto absolute top-0 left-0 h-full w-full"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ stiffness: 300, damping: 30 }}
            >
              <div>
                <Link onClick={saveScrollPosition} to='/' className={`side-nav-link ${(page === 'home') ? 'active-nav-link' : ''}`}>Home</Link>
                <div className="slide-nav-links-section">
                  <p>Documentation</p>
                  <div className="flex flex-col gap-3">
                    <Link onClick={saveScrollPosition} to='/docs' aria-label='Navigate to the documentation page' className={`side-nav-link ${(page === 'documentation') ? 'active-nav-link' : ''}`}>Introduction</Link>
                    <Link onClick={saveScrollPosition} to='/api' aria-label='Navigate to the api reference page' className={`side-nav-link ${(page === 'api') ? 'active-nav-link' : ''}`}>API Reference</Link>
                    <Link onClick={saveScrollPosition} to='/migration' aria-label='Navigate to the migration guide page' className={`side-nav-link ${(page === 'migration') ? 'active-nav-link' : ''}`}>Migration Guide</Link>
                    <Link onClick={saveScrollPosition} to='/examples' aria-label='Navigate to the examples page' className={`side-nav-link ${(page === 'examples') ? 'active-nav-link' : ''}`}>Real-World Examples</Link>
                  </div>
                </div>
                <div className="slide-nav-links-section">
                  <p>Utilities</p>
                  <div className="flex flex-col gap-3">
                    <Link onClick={saveScrollPosition} to='/utilities/accordion' aria-label="View accordion examples" className={`side-nav-link ${(page === 'accordions') ? 'active-nav-link' : ''}`}>Accordion</Link>
                    <Link onClick={saveScrollPosition} to='/utilities/block' aria-label="View block examples" className={`side-nav-link ${(page === 'tab') ? 'active-nav-link' : ''}`}>Block</Link>
                    <Link onClick={saveScrollPosition} to='/utilities/checkbox' aria-label="View checkbox examples" className={`side-nav-link ${(page === 'checkbox') ? 'active-nav-link' : ''}`}>Checkbox</Link>
                    <Link onClick={saveScrollPosition} to='/utilities/combobox' aria-label="View combobox examples" className={`side-nav-link ${(page === 'combobox') ? 'active-nav-link' : ''}`}>Combobox</Link>
                    <Link onClick={saveScrollPosition} to='/utilities/menu' aria-label="View menu examples" className={`side-nav-link ${(page === 'menu') ? 'active-nav-link' : ''}`}>Menu</Link>
                    <Link onClick={saveScrollPosition} to='/utilities/radio' aria-label="View radio examples" className={`side-nav-link ${(page === 'radio') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Radio</Link>
                    <Link onClick={saveScrollPosition} to='/utilities/tabs' aria-label="View tabs examples" className={`side-nav-link ${(page === 'tabs') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Tabs</Link>
                    <Link onClick={saveScrollPosition} to='/utilities/toggle-button' aria-label="View toggle button examples" className={`side-nav-link ${(page === 'toggle-button') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Toggle Button</Link>
                  </div>
                </div>
                <div className='slide-nav-links-section'>
                  <p>Tools & Quality</p>
                  <div className="flex flex-col gap-3">
                    <Link onClick={saveScrollPosition} to="/static-audit" className={`side-nav-link ${(page === 'audit') ? 'active-nav-link' : ''}`} aria-label='Navigate to audit page'>Static Audit</Link>
                    <Link onClick={saveScrollPosition} to="/component-testing" className={`side-nav-link ${(page === 'testing') ? 'active-nav-link' : ''}`} aria-label='Navigate to component testing page'>Component Testing</Link>
                    <Link onClick={saveScrollPosition} to="/contract/dsl" className={`side-nav-link ${(page === 'contract-dsl') ? 'active-nav-link' : ''}`} aria-label='Navigate to contract dsl page'>Contract DSL</Link>
                  </div>
                </div>
                <div className='slide-nav-links-section'>
                  <p>Philosophy</p>
                  <div className="flex flex-col gap-3">
                    <Link onClick={saveScrollPosition} to="/philosophy/utilities" className={`side-nav-link ${(page === 'utility-philosophy') ? 'active-nav-link' : ''}`} aria-label='Navigate to utility philosophy page'>Utility Philosophy</Link>
                    <Link onClick={saveScrollPosition} to="/philosophy/contracts" className={`side-nav-link ${(page === 'contract-philosophy') ? 'active-nav-link' : ''}`} aria-label='Navigate to contract philosophy page'>Contract Philosophy</Link>
                  </div>
                </div>
                <div className='slide-nav-links-section'>
                  <p>Resources</p>
                  <div className="flex flex-col gap-3">
                    {/* <Link onClick={saveScrollPosition} to="/blog/main" className={`side-nav-link ${(page === 'blog-single' || page === 'blog-main') ? 'active-nav-link' : ''}`} aria-label='Navigate to blog articles page'>Blog</Link> */}
                    {/* <Link onClick={saveScrollPosition} to="/services" className={`side-nav-link ${(page === 'services') ? 'active-nav-link' : ''}`} aria-label='Navigate to professional services page'>Services</Link> */}
                    <Link onClick={saveScrollPosition} to='https://www.w3.org/WAI/ARIA/apg/patterns/' target='_blank' rel='noopener noreferrer' className="side-nav-link" aria-label='Navigate to WAI-ARIA APG website'>WAI-ARIA APG</Link>
                  </div>
                  
                </div>
                <div className='slide-nav-links-section'>
                  <p>Project</p>
                  <Link onClick={saveScrollPosition} to="/changelog" className={`side-nav-link ${(page === 'changelog') ? 'active-nav-link' : ''}`} aria-label='Navigate to changelog page'>Changelog</Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SlideOutNav
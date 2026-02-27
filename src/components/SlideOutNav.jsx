import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";


// eslint-disable-next-line react/prop-types
const SlideOutNav = ({page, showDropdownPage}) => {
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
                <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/' className={`side-nav-link ${(page === 'home') ? 'active-nav-link' : ''}`}>Home</Link>
                <div className="slide-nav-links-section">
                  <p>Documentation</p>
                  <div className="slide-out-nav-div">
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/docs' aria-label='Navigate to the documentation page' className={`side-nav-link ${(page === 'documentation') ? 'active-nav-link' : ''}`}>Introduction</Link>
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/api' aria-label='Navigate to the api reference page' className={`side-nav-link mt-3 ${(page === 'api') ? 'active-nav-link' : ''}`}>API Reference</Link>
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/migration' aria-label='Navigate to the migration guide page' className={`side-nav-link mt-3 ${(page === 'migration') ? 'active-nav-link' : ''}`}>Migration Guide</Link>
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/examples' aria-label='Navigate to the examples page' className={`side-nav-link mt-3 ${(page === 'examples') ? 'active-nav-link' : ''}`}>Real-World Examples</Link>
                  </div>
                </div>
                <div className="slide-nav-links-section">
                  <p>Utilities</p>
                  <div className="slide-out-nav-div">
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/examples/accordion' aria-label="View accordion examples" className={`side-nav-link ${(page === 'accordions') ? 'active-nav-link' : ''}`}>Accordion</Link>
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/examples/block' aria-label="View block examples" className={`side-nav-link mt-3 ${(page === 'tab') ? 'active-nav-link' : ''}`}>Block</Link>
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/examples/checkbox' aria-label="View checkbox examples" className={`side-nav-link mt-3 ${(page === 'checkbox') ? 'active-nav-link' : ''}`}>Checkbox</Link>
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/examples/combobox' aria-label="View combobox examples" className={`side-nav-link mt-3 ${(page === 'combobox') ? 'active-nav-link' : ''}`}>Combobox</Link>
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/examples/menu' aria-label="View menu examples" className={`side-nav-link mt-3 ${(page === 'menu') ? 'active-nav-link' : ''}`}>Menu</Link>
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/examples/radio' aria-label="View radio examples" className={`side-nav-link mt-3 ${(page === 'radio') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Radio</Link>
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/examples/toggle-button' aria-label="View toggle button examples" className={`side-nav-link mt-3 ${(page === 'toggle-button') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Toggle Button</Link>
                  </div>
                </div>
                <div className='slide-nav-links-section'>
                  <p>Tools & Quality</p>
                  <div className="slide-out-nav-div">
                    <Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="/audit" className={`side-nav-link ${(page === 'audit') ? 'active-nav-link' : ''}`} aria-label='Navigate to audit page'>Runtime Audit CLI</Link>
                    <Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="/testing" className={`side-nav-link mt-3 ${(page === 'testing') ? 'active-nav-link' : ''}`} aria-label='Navigate to component testing page'>Testing Suite</Link>
                  </div>
                </div>
                <div className='slide-nav-links-section'>
                  <p>Resources</p>
                  <div className="slide-out-nav-div">
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to="/blog/main" className={`side-nav-link ${(page === 'blog-single' || page === 'blog-main') ? 'active-nav-link' : ''}`} aria-label='Navigate to blog articles page'>Blog</Link>
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to="/services" className={`side-nav-link mt-3 ${(page === 'services') ? 'active-nav-link' : ''}`} aria-label='Navigate to professional services page'>Services</Link>
                  </div>
                  
                </div>
                <div className='slide-nav-links-section'>
                  <p>Project</p>
                  <Link onClick={() => { sessionStorage.setItem(`scroll-position-${page}`, window.scrollY) }} to="/changelog" className={`side-nav-link ${(page === 'changelog') ? 'active-nav-link' : ''}`} aria-label='Navigate to changelog page'>Changelog</Link>
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
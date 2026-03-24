import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getActiveScrollPosition } from '../utils/scrollPosition';



// eslint-disable-next-line react/prop-types
const SideNav = ({page}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const saveScrollPosition = () => {
    sessionStorage.setItem(`scroll-position-${page}`, String(getActiveScrollPosition()));
  };

  return (
    <Col xs={0} sm={0} md={0} lg={3} className='px-0'>
      <div className='side-nav-div overflow-y-auto flex flex-col sticky h-[calc(100vh-56px)]' id='side-nav-div'>
        <div className='side-nav-links-section'>
          <p>Getting Started</p>
          <div className='flex flex-col gap-3'>
            <Link onClick={saveScrollPosition} to='/docs' aria-label='Navigate to the documentation page' className={`side-nav-link ${(page === 'documentation') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Introduction</Link>
            <Link onClick={saveScrollPosition} to='/api' aria-label='Navigate to API reference' className={`side-nav-link ${(page === 'api') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>API Reference</Link>
            <Link onClick={saveScrollPosition} to='/migration' aria-label='Navigate to migration guide' className={`side-nav-link ${(page === 'migration') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Migration Guide</Link>
            <Link onClick={saveScrollPosition} to='/examples' aria-label='Navigate to real-world examples' className={`side-nav-link ${(page === 'examples') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Real-World Examples</Link>
          </div>
        </div>
        <div className='side-nav-links-section'>
          <p>Utilities</p>
          <div className='flex flex-col gap-3'>
            <Link onClick={saveScrollPosition} to='/utilities/accordion' aria-label="View accordion examples" className={`side-nav-link ${(page === 'accordions') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Accordion</Link>
            <Link onClick={saveScrollPosition} to='/utilities/block' aria-label="View block examples" className={`side-nav-link ${(page === 'tab') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Block</Link>
            <Link onClick={saveScrollPosition} to='/utilities/checkbox' aria-label="View checkbox examples" className={`side-nav-link ${(page === 'checkbox') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Checkbox</Link>
            <Link onClick={saveScrollPosition} to='/utilities/combobox' aria-label="View combobox examples" className={`side-nav-link ${(page === 'combobox') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Combobox</Link>
            <Link onClick={saveScrollPosition} to='/utilities/menu' aria-label="View menu examples" className={`side-nav-link ${(page === 'menu') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Menu</Link>
            <Link onClick={saveScrollPosition} to='/utilities/radio' aria-label="View radio examples" className={`side-nav-link ${(page === 'radio') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Radio</Link>
            <Link onClick={saveScrollPosition} to='/utilities/tabs' aria-label="View tabs examples" className={`side-nav-link ${(page === 'tabs') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Tabs</Link>
            <Link onClick={saveScrollPosition} to='/utilities/toggle-button' aria-label="View toggle button examples" className={`side-nav-link ${(page === 'toggle-button') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Toggle Button</Link>
          </div>
        </div>
        <div className='side-nav-links-section'>
          <p>Tools & Quality</p>
          <div className='flex flex-col gap-3'>
            <Link onClick={saveScrollPosition} to='/static-audit' aria-label="Navigate to audit page" className={`side-nav-link ${(page === 'audit') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Static Audit</Link>
            <Link onClick={saveScrollPosition} to='/component-testing' aria-label="Navigate to component testing page" className={`side-nav-link ${(page === 'testing') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Component Testing</Link>
            <Link onClick={saveScrollPosition} to='/contract/dsl' aria-label="Navigate to contract DSL page" className={`side-nav-link ${(page === 'contract-dsl') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Contract DSL</Link>
          </div>         
        </div>
        <div className='side-nav-links-section'>
          <p>Philosophy</p>
          <div className='flex flex-col gap-3'>
            <Link onClick={saveScrollPosition} to='/philosophy/utilities' aria-label='Navigate to utility philosophy page' className={`side-nav-link ${(page === 'utility-philosophy') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Utility Philosophy</Link>
            <Link onClick={saveScrollPosition} to='/philosophy/contracts' aria-label='Navigate to contract philosophy page' className={`side-nav-link ${(page === 'contract-philosophy') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Contract Philosophy</Link>
          </div>         
        </div>
        <div className='side-nav-links-section'>
          <p>Project</p>
          <div className='flex flex-col gap-3'>
            <Link onClick={saveScrollPosition} to="/changelog" className={`side-nav-link ${(page === 'changelog') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} aria-label='Navigate to changelog page'>Changelog</Link>
          </div>         
        </div>
      </div>
    </Col>
  )
}

export default SideNav
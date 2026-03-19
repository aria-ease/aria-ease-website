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
          <Link onClick={saveScrollPosition} to='/docs' aria-label='Navigate to the documentation page' className={`side-nav-link ${(page === 'documentation') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Introduction</Link>
          <Link onClick={saveScrollPosition} to='/api' aria-label='Navigate to API reference' className={`side-nav-link ${(page === 'api') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>API Reference</Link>
          <Link onClick={saveScrollPosition} to='/migration' aria-label='Navigate to migration guide' className={`side-nav-link ${(page === 'migration') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Migration Guide</Link>
          <Link onClick={saveScrollPosition} to='/examples' aria-label='Navigate to real-world examples' className={`side-nav-link ${(page === 'examples') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Real-World Examples</Link>
        </div>
        <div className='side-nav-links-section'>
          <p>Utilities</p>
          <Link onClick={saveScrollPosition} to='/utilities/accordion' aria-label="View accordion examples" className={`side-nav-link ${(page === 'accordions') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Accordion</Link>
          <Link onClick={saveScrollPosition} to='/utilities/block' aria-label="View block examples" className={`side-nav-link ${(page === 'tab') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Block</Link>
          <Link onClick={saveScrollPosition} to='/utilities/checkbox' aria-label="View checkbox examples" className={`side-nav-link ${(page === 'checkbox') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Checkbox</Link>
          <Link onClick={saveScrollPosition} to='/utilities/combobox' aria-label="View combobox examples" className={`side-nav-link ${(page === 'combobox') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Combobox</Link>
          <Link onClick={saveScrollPosition} to='/utilities/menu' aria-label="View menu examples" className={`side-nav-link ${(page === 'menu') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Menu</Link>
          <Link onClick={saveScrollPosition} to='/utilities/radio' aria-label="View radio examples" className={`side-nav-link ${(page === 'radio') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Radio</Link>
          <Link onClick={saveScrollPosition} to='/utilities/tabs' aria-label="View tabs examples" className={`side-nav-link ${(page === 'tabs') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Tabs</Link>
          <Link onClick={saveScrollPosition} to='/utilities/toggle-button' aria-label="View toggle button examples" className={`side-nav-link ${(page === 'toggle-button') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Toggle Button</Link>
        </div>
        <div className='side-nav-links-section'>
          <p>Tools & Quality</p>
          <Link onClick={saveScrollPosition} to='/audit' aria-label="Navigate to audit page" className={`side-nav-link ${(page === 'audit') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Static Audit</Link>
          <Link onClick={saveScrollPosition} to='/testing' aria-label="Navigate to component testing page" className={`side-nav-link ${(page === 'testing') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Component Testing</Link>
        </div>
        <div className='side-nav-links-section'>
          <p>Project</p>
          <Link onClick={saveScrollPosition} to="/changelog" className={`side-nav-link ${(page === 'changelog') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} aria-label='Navigate to changelog page'>Changelog</Link>
        </div>
      </div>
    </Col>
  )
}

export default SideNav
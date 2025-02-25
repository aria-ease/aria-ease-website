import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'



// eslint-disable-next-line react/prop-types
const SideNav = ({page}) => {
  return (
    <Col xs={0} sm={0} md={3} lg={3}>
      <div className='side-nav-div' id='side-nav-div'>
        <div className='side-nav-links-section'>
          <p>Getting Started</p>
          <Link to='/docs' aria-label='Navigate to the documentation page' className={`side-nav-link ${(page === 'documentation') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Introduction</Link>
        </div>
        <div className='side-nav-links-section'>
          <p>Components</p>
          <Link to='/examples/accordion' aria-label="View accordion examples" className={`side-nav-link ${(page === 'accordions') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Accordion</Link>
          <Link to='/examples/block' aria-label="View block examples" className={`side-nav-link ${(page === 'tab') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Block</Link>
          <Link to='/examples/checkbox' aria-label="View checkbox examples" className={`side-nav-link ${(page === 'checkbox') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Checkbox</Link>
          <Link to='/examples/menu' aria-label="View menu examples" className={`side-nav-link ${(page === 'menu') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Menu</Link>
          <Link to='/examples/radio' aria-label="View radio examples" className={`side-nav-link ${(page === 'radio') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Radio</Link>
          <Link to='/examples/toggle-button' aria-label="View toggle button examples" className={`side-nav-link ${(page === 'toggle-button') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Toggle Button</Link>
        </div>
      </div>
    </Col>
  )
}

export default SideNav
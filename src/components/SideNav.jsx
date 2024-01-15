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
          <Link to='/examples/accordion' aria-label="View accordion example usage of package" className={`side-nav-link ${(page === 'accordions') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Accordion</Link>
          <Link to='/examples/block' aria-label="View block example usage of package" className={`side-nav-link ${(page === 'tab') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Block</Link>
          <Link to='/examples/menu' aria-label="View menu example usage of package" className={`side-nav-link ${(page === 'menu') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} style={{marginTop: '12px'}}>Menu</Link>
        </div>
      </div>
    </Col>
  )
}

export default SideNav
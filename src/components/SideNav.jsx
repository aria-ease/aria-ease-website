import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { makeTabAccessible } from 'aria-ease'


// eslint-disable-next-line react/prop-types
const SideNav = ({page}) => {
  useEffect(() => {
    makeTabAccessible('side-nav-div', 'side-nav-link')
  })
  return (
    <Col xs={0} sm={0} md={4} lg={3}>
      <div className='side-nav-div' id='side-nav-div'>
        <Link to='/docs' className={`side-nav-link ${(page === 'documentation') ? 'active-nav-link' : ''}`}>Introduction</Link>
        <Link to='/examples/menu' className={`side-nav-link ${(page === 'menu') ? 'active-nav-link' : ''}`}>Menu</Link>
        <Link to='/examples/tab' className={`side-nav-link ${(page === 'tab') ? 'active-nav-link' : ''}`}>Tab</Link>
      </div>
    </Col>
  )
}

export default SideNav
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'


// eslint-disable-next-line react/prop-types
const SideNav = ({page}) => {
  return (
    <Col xs={0} sm={0} md={4} lg={3}>
      <div className='side-nav-div' id='side-nav-div'>
        <Link to='/docs' className={(page === 'documentation') ? 'active-nav-link' : 'side-nav-link'}>Introduction</Link>
        <Link to='/examples/menu' className={(page === 'menu') ? 'active-nav-link' : 'side-nav-link'}>Menu</Link>
        <Link to='/examples/tab' className={(page === 'tab') ? 'active-nav-link' : 'side-nav-link'}>Tab</Link>
      </div>
    </Col>
  )
}

export default SideNav
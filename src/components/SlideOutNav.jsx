import { Link } from "react-router-dom"


// eslint-disable-next-line react/prop-types
const SlideOutNav = ({page}) => {
  return (
    <div className="slide-out-nav-outer-div">
      <Link to='/' className='slide-nav-logo-link'><span className="slide-nav-logo-span">aria-ease</span></Link>
      <div>
        <p>Documentation</p>
        <Link to='/docs' className={(page === 'documentation') ? 'active-nav-link' : 'side-nav-link'}>Introduction</Link>
      </div>
      <div>
        <p>Components</p>
        <div className="slide-out-nav-div">
          <Link to='/examples/menu' className={(page === 'menu') ? 'active-nav-link' : 'side-nav-link'}>Menu</Link>
          <Link to='/examples/tab' className={(page === 'tab') ? 'active-nav-link' : 'side-nav-link'}>Tab</Link>
        </div>
      </div>
    </div>
  )
}

export default SlideOutNav
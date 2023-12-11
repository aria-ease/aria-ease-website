import { Link } from "react-router-dom"


// eslint-disable-next-line react/prop-types
const SlideOutNav = ({page}) => {
  return (
    <div className="slide-out-nav-outer-div">
      <Link to='/' className={`side-nav-link ${(page === 'home') ? 'active-nav-link' : ''}`}>Home</Link>
      <div>
        <p>Documentation</p>
        <Link to='/docs' className={`side-nav-link ${(page === 'documentation') ? 'active-nav-link' : ''}`}>Introduction</Link>
      </div>
      <div>
        <p>Components</p>
        <div className="slide-out-nav-div">
          <Link to='/examples/menu' className={`side-nav-link ${(page === 'menu') ? 'active-nav-link' : ''}`}>Menu</Link>
          <Link to='/examples/tab' className={`side-nav-link ${(page === 'tab') ? 'active-nav-link' : ''}`}>Tab</Link>
        </div>
      </div>
    </div>
  )
}

export default SlideOutNav
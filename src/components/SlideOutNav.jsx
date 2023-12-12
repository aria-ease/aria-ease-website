import { Link } from "react-router-dom"


// eslint-disable-next-line react/prop-types
const SlideOutNav = ({page}) => {
  return (
    <div className="slide-out-nav-outer-div">
      <Link to='/' className={`side-nav-link ${(page === 'home') ? 'active-nav-link' : ''}`}>Home</Link>
      <div className="slide-nav-links-section">
        <p>Documentation</p>
        <Link to='/docs' className={`side-nav-link ${(page === 'documentation') ? 'active-nav-link' : ''}`}>Introduction</Link>
      </div>
      <div className="slide-nav-links-section">
        <p>Components</p>
        <div className="slide-out-nav-div">
          <Link to='/examples/menu' className={`side-nav-link ${(page === 'menu') ? 'active-nav-link' : ''}`}>Menu</Link>
          <Link to='/examples/tab' className={`side-nav-link ${(page === 'tab') ? 'active-nav-link' : ''}`} style={{marginTop: '12px'}}>Tab</Link>
        </div>
      </div>
    </div>
  )
}

export default SlideOutNav
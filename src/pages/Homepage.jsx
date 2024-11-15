import Header from "../components/Header"
import { Container, Row, Col } from "react-bootstrap"
import HomeExampleMenu from "../components/menus/HomeExampleMenu"
import HomeTabExampleOne from "../components/tabs/HomeTabExampleOne"
import SlideOutNav from "../components/SlideOutNav"
import { useState, useEffect } from "react"
import { makeBlockAccessible } from "aria-ease"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const Homepage = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'home'

  useEffect(() => {
    if(showDropdownPage) {
      document.querySelector('body').classList.add('no-scroll')
    } else {
      document.querySelector('body').classList.remove('no-scroll')
    }
  },[showDropdownPage])

  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('inner-body-div', 'block-interactive');
    return accessibleBlock;
  },[])

  return (
    <div className="home-body" id="inner-body-div">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>

      <div className="page-body-div">
        <div>
          <Container fluid className="homepage-above-fold-div">
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                <div className="hero-text-div">
                  <h1 className="hero-heading">Add accessibility to your web components</h1>
                  <p className="hero-paragraph mb-5">Out-of-the-box accessibility utility package that you can add to your web components with simple functions. Automate menu and block focus trapping, keyboard interactions and navigations, aria attributes update, and more.</p>
                  <Link to='/docs' className='block-interactive home-discover-functions-button' aria-label='Navigate to the documentation page'>Discover the core functions  -&gt;</Link>
                </div>
              </Col>
              <Col xs={0} sm={0} md={0} lg={6} style={{paddingRight: '0px'}}>
                <div className="hero-examples-div">
                  <HomeExampleMenu/>
                  <HomeTabExampleOne/>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="home-get-started-div flex flex-col items-center justify-center pt-[100px] pb-[100px]">
          <p className="mb-2">Get Started</p>
          <p className="get-started-ship font-semibold mb-1">Ship accessible projects faster</p>
          <p className="mb-4">Find out how Aria-Ease helps developers achieve perfect accessibility scores on their projects, including ours.</p>
          <Link to='/docs' className='block-interactive home-discover-functions-button' aria-label='Navigate to the documentation page'>Discover the core functions  -&gt;</Link>
        </div>
        <footer className="pt-[50px] pb-[50px] pl-4 pr-4">
          <p className="footer-text">Aria-Ease is open source software by <a className="underline" href='https://x.com/nattymaniac_'>Isaac Victor</a></p>
        </footer>
      </div>
        
      <div className={`slide-out-side-nav-outer-div ${showDropdownPage ? 'visible' : 'hidden'}`}>
        <div className={`slide-out-side-nav-div ${showDropdownPage ? 'slide-in' : ''}`}>
          <SlideOutNav page={page}/>
        </div>
      </div> 

      
    </div>
  )
}

export default Homepage
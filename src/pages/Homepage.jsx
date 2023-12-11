import Header from "../components/Header"
import { Container, Row, Col } from "react-bootstrap"
import HomeExampleMenu from "../components/menus/HomeExampleMenu"
import HomeTabExampleOne from "../components/tabs/HomeTabExampleOne"
import SlideOutNav from "../components/SlideOutNav"
import { useState } from "react"

// eslint-disable-next-line react/prop-types
const Homepage = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'home'

  return (
    <div>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>

        <div>
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                <div className="hero-text-div">
                  <h1 className="hero-heading">Add accessibility to your components.</h1>
                  <p className="hero-paragraph">Out-of-the-box accessibility utility package that you can add to your components with a single function. Automate menu and tab focus trapping, keyboard interactions, aria attributes update, and more.</p>
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

        <div className={`slide-out-side-nav-div ${showDropdownPage ? 'slide-in' : ''}`}>
          <SlideOutNav page={page}/>
        </div>
    </div>
  )
}

export default Homepage
import Header from "../components/Header"
import { Container, Row, Col } from "react-bootstrap"
import HomeExampleMenu from "../components/menus/HomeExampleMenu"
import HomeTabExampleOne from "../components/tabs/HomeTabExampleOne"

// eslint-disable-next-line react/prop-types
const Homepage = ({darkMode, setDarkMode}) => {
  return (
    <div>
        <Header darkMode={darkMode} setDarkMode={setDarkMode}/>

        <div>
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                <div className="hero-text-div">
                  <h1 className="hero-heading">Add accessibility to your components.</h1>
                  <p className="hero-paragraph">Out-of-the-box accessibility utility package that you can add to your components with a single function.</p>
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
    </div>
  )
}

export default Homepage
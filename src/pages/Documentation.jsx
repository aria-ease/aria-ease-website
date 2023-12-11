import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import { useState } from 'react'
import SlideOutNav from '../components/SlideOutNav'


// eslint-disable-next-line react/prop-types
const Documentation = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'documentation'
  return (
    <div>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>
        <Container fluid>
          <Row>
            <SideNav page={page}/>
            <Col xs={12} sm={12} md={8} lg={9}>
              <div className='side-body-div'>
                <span>Introduction</span>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={`slide-out-side-nav-div ${showDropdownPage ? 'slide-in' : ''}`}>
          <SlideOutNav page={page}/>
        </div>
    </div>
  )
}

export default Documentation
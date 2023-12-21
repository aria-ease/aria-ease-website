import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import SlideOutNav from '../components/SlideOutNav'
import { useState, useEffect } from 'react'
import { makeBlockAccessible } from 'aria-ease'


// eslint-disable-next-line react/prop-types
const Examples = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'menu'

  useEffect(() => {
    if(showDropdownPage) {
      document.querySelector('body').classList.add('no-scroll')
    } else {
      document.querySelector('body').classList.remove('no-scroll')
    }
  },[showDropdownPage])

  useEffect(() => {
    makeBlockAccessible('inner-body-div', 'block-interactive')
  },[])

  return (
    <div id="inner-body-div">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>
        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className='side-body-div'>
                  <h1 className='component-example-heading'>Menu</h1>
            
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        
        <div className={`slide-out-side-nav-outer-div ${showDropdownPage ? 'visible' : 'hidden'}`}>
          <div className={`slide-out-side-nav-div ${showDropdownPage ? 'slide-in' : ''}`}>
            <SlideOutNav page={page}/>
          </div>
        </div>
    </div>
  )
}

export default Examples
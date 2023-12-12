import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import { useState, useEffect } from 'react'
import SlideOutNav from '../components/SlideOutNav'


// eslint-disable-next-line react/prop-types
const Documentation = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'documentation'

  useEffect(() => {
    if(showDropdownPage) {
      document.querySelector('body').classList.add('no-scroll')
    } else {
      document.querySelector('body').classList.remove('no-scroll')
    }
  },[showDropdownPage])
  return (
    <div>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>
        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className='side-body-div'>
                  <div className='side-body-sections-div'>
                    <h1 className='introduction-heading'>Introduction</h1>
                    <p>Utility package to add accessibility functionalities to your components.</p>
                    <p>This is not a component library. The package simply provides you functions that take the components' identifiers (id of the parent div, and class name of the interactive children items of the parent div), and implements accessibility features like focus trapping, keyboard interactions, aria attributes update.</p>
                  </div>
                  <div className='side-body-sections-div'>
                    <h1 className='introduction-heading'>Installation</h1>
                    <div className='code-div'>
                      <code>npm install aria-ease</code>
                    </div>
                  </div>
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

export default Documentation
import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import SlideOutNav from '../components/SlideOutNav'
import { useState, useEffect } from 'react'
import HomeTabExampleOne from '../components/tabs/HomeTabExampleOne'
import CheckBoxBlock from '../components/tabs/CheckBoxBlock'
import { makeBlockAccessible } from 'aria-ease'


const firstTabCode = `import { useEffect } from 'react'
import { makeBlockAccessible } from "aria-ease"

const App = () => {
  useEffect(() => {
    makeBlockAccessible('custom-tab', 'custom-tab-item')
  },[])

  return (
    <div>
      <div id="custom-tab">
        <button className="custom-tab-item">One</button>
        <button className="custom-tab-item">Two</button>
        <button className="custom-tab-item">Three</button>
        <button className="custom-tab-item">Four</button>
      </div>
    </div>
  )
}

export default App`

// eslint-disable-next-line react/prop-types
const TabExamples = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
    const page = 'tab'

    useEffect(() => {
      if(showDropdownPage) {
        document.querySelector('body').classList.add('no-scroll')
      } else {
        document.querySelector('body').classList.remove('no-scroll')
      }
    },[showDropdownPage])

    useEffect(() => {
      makeBlockAccessible('checkbox-tab-div', 'checkbox-tab-items')
    },[])

  return (
    <div className='block-example-page-div'>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>
        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                  <div className='side-body-div'>
                      <h1 className='component-example-heading'>Block</h1>
                      <span>A statically displayed component that has a list of related interractive children items e.g tabs, interactive sliders, carousels, and entire web page body.</span>

                      <div className='example-each-ui-code-block-div'>
                        <HomeTabExampleOne/>
                        <pre>
                          <div className='code-div'>
                            <code>
                              {firstTabCode}
                            </code>
                          </div>
                        </pre>
                      </div>

                      <div id="checkbox-tab-div">
                        
                        
                      </div>
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

export default TabExamples
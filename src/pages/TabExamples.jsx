import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import SlideOutNav from '../components/SlideOutNav'
import { useState, useEffect } from 'react'
import HomeTabExampleOne from '../components/tabs/HomeTabExampleOne'
import TextInputBlock from '../components/tabs/TextInputBlock'
import { makeBlockAccessible } from 'aria-ease'


const firstBlockCode = `import { useEffect } from 'react'
import { makeBlockAccessible } from "aria-ease"

const App = () => {
  useEffect(() => {
    const cleanUp = makeBlockAccessible('custom-tab', 'custom-tab-item')

    return cleanUp
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

const secondBlockCode = `import { makeBlockAccessible } from 'aria-ease'
import { useEffect } from 'react'

const TextInputBlock = () => {
  useEffect(() => {
    const cleanUp = makeBlockAccessible('text-input-block-div', 'text-input-block-interactive')

    return cleanUp
  })

  return (
    <div id="text-input-block-div">
        <div className='each-text-input-block-div'>
          <input type="text" placeholder='Name' className='text-input-block-interactive'></input>
        </div>
        <div className='each-text-input-block-div'>
          <input type="text" placeholder='Email' className='text-input-block-interactive'></input>
        </div>
        <div className='each-text-input-block-div'>
          <input type="text" placeholder='Phone' className='text-input-block-interactive'></input>
        </div>
    </div>
  )
}

export default TextInputBlock`

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
      const cleanUp = makeBlockAccessible('inner-body-div', 'block-interactive')
  
      return cleanUp
    },[])

  return (
    <div className='block-example-page-div' id="inner-body-div">
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
                        <h3 className=''>Tab Block</h3>
                        <p>This creates a focus trap within the buttons tab block. The Arrow keys navigates the focus within the trap in a cycle. The Space and Enter keys &#34;clicks&#34; the interactive element. The Tab key exits the trap.</p>
                        <HomeTabExampleOne/>
                        <pre>
                          <div className='code-div'>
                            <code>
                              {firstBlockCode}
                            </code>
                          </div>
                        </pre>
                      </div>

                      <div className='example-each-ui-code-block-div'>
                        <h3>Text Input Block</h3>
                        <p>This creates a focus trap within the text input block. The Arrow keys navigates the focus within the trap in a cycle. The Tab key exits the trap.</p>
                        <TextInputBlock/>
                        <pre>
                          <div className='code-div'>
                            <code>
                              {secondBlockCode}
                            </code>
                          </div>
                        </pre>
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
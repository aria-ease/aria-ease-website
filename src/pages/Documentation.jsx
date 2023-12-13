import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import { useState, useEffect } from 'react'
import SlideOutNav from '../components/SlideOutNav'
import HomeExampleMenu from '../components/menus/HomeExampleMenu'
import HomeTabExampleOne from '../components/tabs/HomeTabExampleOne'

const menuCode = `makeMenuAccessible('custom-menu', 'profile-menu-item')`
const updateHideCode = `updateMenuTriggerAriaAttributes('display-button', 'Hide profile menu')`
const updateDisplayCode = `updateMenuTriggerAriaAttributes('display-button', 'Display profile menu')`
const tabCode = `makeBlockAccessible('custom-tab', 'custom-tab-item')`

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
        <div className='page-body-div documentation-page'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className='side-body-div'>
                  <div className='side-body-sections-div'>
                    <h1 className='introduction-heading'>Introduction</h1>
                    <p>Utility package to add accessibility functionalities to your components.</p>
                    <p>This is NOT a component library. The package simply provides you functions that take the components&#39; identifiers (id of the parent div, and class name of the interactive children items of the parent div), and implements accessibility features like focus trapping, keyboard interactions, aria attributes update.</p>
                  </div>
                  <div className='side-body-sections-div'>
                    <h1 className='introduction-heading'>Installation</h1>
                    <div className='code-div'>
                      <code>npm install aria-ease</code>
                    </div>
                  </div>
                  <div className='side-body-sections-div'>
                    <h1 className='introduction-heading'>Features</h1>
                    <>
                      <p>
                        <b className='features-function'>makeMenuAccessible:</b>
                        This function adds keyboard interactions accessibility to a menu. 
                      </p>
                      <HomeExampleMenu/>
                      <p className='feature-function-info-text'>The function creates a focus trap within the menu and focus can be navigated using the Arrow keys and Tab key. The Escape key closes the menu and returns the focus back to the trigger button. The Enter and Space keys &quot;click&quot; the interactive element (currently supports buttons, links, radios and checkboxes).</p>
                      <p>The function takes two string arguments; the id of the menu div, and the class name of the menu items children.</p>
                      <div className='code-div'>
                        <code>{menuCode}</code>
                      </div>
                      <p style={{marginTop: '24px'}}>The function should only be called after the menu has become visible or added to the DOM. When the menu becomes visible the first item of the menu is in focus.</p>
                    </>

                    <>
                      <p>
                        <b className='features-function'>updateMenuTriggerAriaAttributes:</b>
                        This function updates the aria attributes of the menu trigger button. The aria-pressed, aria-expanded and aria-label attributes of the trigger button are toggled based on the current visibility of the menu. 
                      </p>
                      <p>The function takes two string arguments; the id of the trigger button, and the aria-label that will replace the current one in the DOM. The aria-pressed and aria-expanded attributes get toggle to either true or false.</p>
                      <p>Call the function when the menu is displayed. It updates the aria label of the trigger button to indicate that the menu is open and the button will close it.</p>
                      <div className='code-div'>
                        <code>{updateHideCode}</code>
                      </div>
                      <p style={{marginTop: '24px'}}>Call the function when the menu is not displayed. It updates the aria label of the trigger button to indicate that the menu is closed and the button will open it.</p>
                      <div className='code-div'>
                        <code>{updateDisplayCode}</code>
                      </div>
                    </>

                    <>
                      <p style={{marginTop: '24px'}}>
                        <b className='features-function'>makeBlockAccessible:</b>
                        This function adds keyboard interactions accessibility to a block.
                      </p>
                      <p>A block can be entire web page body, tabs, interactive sliders and carousels e.t.c. Basically any component that is permanently displayed, unlike a menu that toggles display, and has a list of interractive children items.</p>
                      <HomeTabExampleOne/> 
                      <p className='feature-function-info-text'>The function creates a focus trap within the block and focus can be navigated using the Arrow keys and Tab key. The Enter and Space keys &quot;click&quot; the interactive element (currently supports buttons, links, radios and checkboxes).</p>
                      <p>The function takes two string arguments; the id of the block div, and the class name of the block items children.</p>
                      <div className='code-div'>
                        <code>{tabCode}</code>
                      </div>
                      <p style={{marginTop: '24px'}}>Call the function on page render, in order for the event listeners to be added as soon as the page loads.</p>
                      <p>The function can be used to add keyboard interactions functionalities to all the interactive elements on a web page by calling the function like below:</p>
                      <div className='code-div'>
                        <code>makeBlockAccessible(id-of-page-div, class-name-given-to-all-the-interactive-elements-of-the-page)</code>
                      </div>
                    </>
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
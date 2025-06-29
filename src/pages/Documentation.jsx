import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState, useEffect } from 'react';
import SlideOutNav from '../components/SlideOutNav'
import HomeExampleMenu from '../components/menus/HomeExampleMenu';
import HomeTabExampleOne from '../components/tabs/HomeTabExampleOne';
import { makeBlockAccessible } from 'aria-ease';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';

const menuCode = `makeMenuAccessible('custom-menu', 'profile-menu-item')`
const updateHideCode = `updateMenuTriggerAriaAttributes('display-button', 'Hide profile menu')`
const updateDisplayCode = `updateMenuTriggerAriaAttributes('display-button', 'Display profile menu')`
const tabCode = `makeBlockAccessible('custom-tab', 'custom-tab-item')`
const cleanUpCode = `cleanUpMenuEventListeners('custom-menu', 'profile-menu-item')`

const accordionCode = `const[isAccordionShown, setIsAccordionShown] = useState([
  {display: false, closedAriaLabel: 'Expand information on how to make appointment', openedAriaLabel: 'Collapse information on how to make appointment'},
  {display: false, closedAriaLabel: 'Expand information on how to get copy of records', openedAriaLabel: 'Collapse information on how to get copy of records'},
  {display: false, closedAriaLabel: 'Expand information on extra charge for copy of records', openedAriaLabel: 'Collapse information on extra charge for copy of records'}
])

const handleAccordionClick = (event, index) => {
  if (event.type === 'mousedown' || (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))) {
    event.preventDefault();
    setIsAccordionShown((prevStates) => {
      const newStates = prevStates.map((state, i) => ({
        ...state,
        display: i === index ? !state.display : false,
      }));
      updateAccordionTriggerAriaAttributes(newStates, 'dropdown-button', index);
      return newStates;
    });
  }
};`


// eslint-disable-next-line react/prop-types
const Documentation = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'documentation'

  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('inner-body-div', 'block-interactive');
    return accessibleBlock;
  },[])

  return (
    <div id="inner-body-div">
        <ScrollTracker page={page}/>
        <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>
        
        <div className='page-body-div documentation-page'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className='side-body-div'>
                  <div className='side-body-sections-div'>
                    <h1 className='introduction-heading'>Introduction</h1>
                    <p className='mt-2'>Utility package to add accessibility functionalities to your components.</p>
                    <p className='mt-2'>This is NOT a component library. The package simply provides you functions that take the components&#39; identifiers (ids, and class names of interactive elements), and implements accessibility features like focus trapping, keyboard interactions, aria attributes update.</p>
                  </div>
                  <div className='side-body-sections-div'>
                    <h1 className='introduction-heading'>Installation</h1>
                    <div className='flex flex-col'>
                      <div className='code-div max-w-fit'>
                        <code>npm i aria-ease</code>
                      </div>
                      <div className='code-div max-w-fit'>
                        <code>yarn add aria-ease</code>
                      </div>
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
                      <p className='mt-2 mb-2'>The function takes two string arguments; the id of the menu div, and the class name of the menu items children.</p>
                      <CodeBlockDemo code={menuCode}/>
                      <p style={{marginTop: '24px'}}>The function should only be called after the menu has become visible or added to the DOM. When the menu becomes visible the first item of the menu is in focus.</p>
                    </>

                    <>
                      <p style={{marginTop: '80px'}}>
                        <b className='features-function'>updateMenuTriggerAriaAttributes:</b>
                        This function updates the aria attributes of the menu trigger button. The aria-expanded and aria-label attributes of the trigger button are updated based on the current visibility of the menu. 
                      </p>
                      <p className='mt-2'>The function takes two string arguments; the id of the trigger button, and the aria-label that will replace the current one in the DOM. The aria-expanded attribute gets toggled to either true or false.</p>
                      <p style={{marginTop: '24px'}} className='mb-2'>Call the function as below when the menu is displayed. It updates the aria label of the trigger button to indicate that the menu is open and the button will close it.</p>
                      <CodeBlockDemo code={updateHideCode}/>

                      <p className='mb-2 mt-6'>Call the function as below when the menu is not displayed. It updates the aria label of the trigger button to indicate that the menu is closed and the button will open it.</p>
                      <CodeBlockDemo code={updateDisplayCode}/>
                    </>

                    <>
                      <p style={{marginTop: '80px'}}>
                        <b className='features-function'>cleanUpMenuEventListeners:</b>
                        This function cleans up the event listeners attached to the children items of the menu, to prevent memory leaks.
                      </p>
                      <p className='mb-2'>Call the function before the menu&#39;s display is toggled to false, or removed from the DOM. </p>
                      <CodeBlockDemo code={cleanUpCode}/>
                    </>

                    <>
                      <p style={{marginTop: '80px'}}>
                        <b className='features-function'>makeBlockAccessible:</b>
                        This function adds keyboard interactions accessibility to a block.
                      </p>
                      <p>A block can be headers, tabs, entire web pages (requires more diligence in DOM tree structuring and user experience design), interactive sliders and carousels e.t.c. Basically any component that is permanently displayed, unlike a menu that toggles display, and has a list of interractive children items.</p>
                      <HomeTabExampleOne/> 
                      <p className='feature-function-info-text'>The function creates a focus trap within the block and focus can be navigated using the Arrow keys and Tab key. The Enter and Space keys &quot;click&quot; the interactive element (currently supports buttons, links, radios and checkboxes).</p>
                      <p className='mb-2'>The function takes two string arguments; the id of the block div, and the class name of the block items children.</p>
                      <CodeBlockDemo code={tabCode}/>
                      <p style={{marginTop: '24px'}}>Call the function on page render, in order for the event listeners to be added as soon as the page loads.</p>
                      <p className='mb-2'>The function can be used to add keyboard interactions functionalities to all the interactive elements on a web page (check out the implementation example on this website) by calling the function like below:</p>
                      <CodeBlockDemo code={`makeBlockAccessible(id-of-page-div, class-name-given-to-all-the-interactive-elements-of-the-page)`}/>
                    </>

                    <>
                      <p style={{marginTop: '80px'}}>
                        <b className='features-function'>updateAccordionTriggerAriaAttributes:</b>
                        This function enables assistive technology support for accordions.
                      </p>
                      <p className='mt-2'>This feature helps visually impaired users to navigate interacting with the accordions, by informing the users about the current state, and purpose, of each of the accordion. The states are either expanded or not expanded.</p>
                      <p className='mt-2'>The function updates the aria-expanded and aria-label attributes of the accordion toggle button.</p>
                      <p className='mt-2'>The function accepts 3 arguments; an array of objects with information about each accordion in the collection, a shared class of all the accordion triggers, and the index position of the currently clicked trigger relative to the main accordion container and other trigger buttons.</p>
                      <CodeBlockDemo code={accordionCode}/>
                      <p>The updateAccordionTriggerAriaAttributes should be called with the new state after the display state for the corresponding accordion has been updated to true/false and the accordion content has become  added to/removed from the DOM.</p>
                    </>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        
        <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  )
}

export default Documentation
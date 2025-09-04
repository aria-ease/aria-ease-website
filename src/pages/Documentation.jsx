import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState, useEffect } from 'react';
import SlideOutNav from '../components/SlideOutNav'
import HomeExampleMenu from '../components/menus/HomeExampleMenu';
import { Block } from 'aria-ease';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';

const menuCode = `Menu.makeMenuAccessible({
  menuId: "custom-menu",
  menuElementsClass: "profile-menu-item",
  triggerId: "display-button"
})`
const tabCode = `Block.makeBlockAccessible('custom-tab', 'custom-tab-item')`

const accordionCode = `const[accordionState, setAccordionState] = useState([{display: false}, {display: false}, {display: false}])

const handleAccordionClick = (index) => {
  setAccordionState((prevStates) => {
    const newStates = prevStates.map((state, i) => ({
      ...state,
      display: i === index ? !state.display : false,
    }));
    Accordion.updateAccordionTriggerAriaAttributes('faq-div', 'dropdown-button', newStates, index);
    return newStates;
  });
};`


// eslint-disable-next-line react/prop-types
const Documentation = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'documentation'

  useEffect(() => {
    function initializeBlock() {
      Block.makeBlockAccessible('inner-body-div', 'block-interactive');
    }

    initializeBlock();
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
                        <b className='features-function'>Menu.makeMenuAccessible:</b>
                        This method adds keyboard interactions accessibility to a menu. 
                      </p>
                      <HomeExampleMenu/>
                      <p className='feature-function-info-text'>The method creates a focus trap within the menu and focus can be navigated using the Arrow keys and Tab key. When the menu opens, the first interactive element receives focus. The Escape key closes the menu and returns the focus back to the trigger button. The Enter and Space keys &quot;click&quot; the interactive element (currently supports buttons, links, radios and checkboxes).</p>
                      <p className='mt-2 mb-2'>The method takes an object argument. The object contains the id of the menu div, and the class name of the menu items children, and the id of the menu trigger button.</p>
                      <CodeBlockDemo code={menuCode}/>
                      <p style={{marginTop: '24px'}}>The method should only be called after the menu has been added to the DOM.</p>
                    </>

                    <>
                      <p style={{marginTop: '20px'}}>
                        <b className='features-function'>Menu.openMenu():</b>
                        This method updates the aria attributes of the menu trigger button. The aria-expanded attribute of the trigger button is updated based on the current visibility of the menu. 
                      </p>
                      <p className='mb-2 mt-6'>Call this method to open a menu. It displays the menu and updates the aria-expanded of the menu trigger button to indicate that the menu is open.</p>
                      <CodeBlockDemo code={'Menu.openMenu()'}/>
                    </>

                    <>
                      <p style={{marginTop: '20px'}}>
                        <b className='features-function'>Menu.closeMenu():</b>
                        This method updates the aria attributes of the menu trigger button. The aria-expanded attribute of the trigger button is updated based on the current visibility of the menu. 
                      </p>
                      <p className='mb-2'>Call this method to close a menu. It hides the menu and updates the aria-expanded of the menu trigger button to indicate that the menu is closed.</p>
                      <CodeBlockDemo code={'Menu.closeMenu()'}/>
                    </>

                    <>
                      <p style={{marginTop: '80px'}}>
                        <b className='features-function'>Block.makeBlockAccessible:</b>
                        This method adds keyboard interactions accessibility to a block.
                      </p>
                      <p>A block can be headers, tabs, entire web pages (requires more diligence in DOM tree structuring and user experience design), interactive sliders and carousels e.t.c. Basically any component that is permanently displayed, unlike a menu that toggles display, and has a list of interactive children items.</p>
                      <p className='feature-function-info-text'>The method creates a focus trap within the block and focus can be navigated using the Arrow keys and Tab key. The Enter and Space keys &quot;click&quot; the interactive element (currently supports buttons, links, radios and checkboxes).</p>
                      <p className='mb-2'>The method takes two string arguments; the id of the block div, and the class name of the block items children.</p>
                      <CodeBlockDemo code={tabCode}/>
                      <p style={{marginTop: '24px'}}>Call the method on page render, in order for the event listeners to be added as soon as the page loads.</p>
                      <p className='mb-2'>The method can be used to add keyboard interactions functionalities to all the interactive elements on a web page (check out the implementation example on this website) by calling the method like below:</p>
                      <CodeBlockDemo code={`Block.makeBlockAccessible(id-of-page-div, class-name-given-to-all-the-interactive-elements-of-the-page)`}/>
                    </>

                    <>
                      <p style={{marginTop: '80px'}}>
                        <b className='features-function'>Accordion.updateAccordionTriggerAriaAttributes:</b>
                        This method enables assistive technology support for accordions.
                      </p>
                      <p className='mt-2'>This feature helps visually impaired users to navigate interacting with the accordions, by informing the users about the current state, and purpose, of each of the accordion. The states are either expanded or not expanded.</p>
                      <p className='mt-2'>The method updates the aria-expanded attribute of the accordion toggle button.</p>
                      <p className='mt-2'>The method accepts 4 arguments; id of the accordion triggers parent container, the shared class of all the accordion triggers, an array of objects with information about each accordion in the collection, and the index position of the currently clicked trigger relative to the main accordion container and other trigger buttons.</p>
                      <CodeBlockDemo code={accordionCode}/>
                      <p>The method should be called with the new state after the display state for the corresponding accordion has been updated to true/false and the accordion content has become added to/removed from the DOM.</p>
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
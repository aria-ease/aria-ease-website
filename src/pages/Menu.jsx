import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import SlideOutNav from '../components/SlideOutNav'
import { useState, useEffect, useRef } from 'react'
import * as Block from 'aria-ease/block'
import HomeExampleMenu from '../components/menus/HomeExampleMenu'
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';


const firstMenuCode = `import { useRef, useEffect } from "react";
import * as Menu from "aria-ease/menu";

const HomeExampleMenu = () => {
  const menuRef = useRef();

  useEffect(() => {
    menuRef.current = Menu.makeMenuAccessible({
      menuId: "custom-menu",
      menuElementsClass: "profile-menu-item",
      triggerId: "display-button"
    });
  }, [])

  const toggleMenuDisplay = () => {
    const menuDiv = document.querySelector("#custom-menu");
    if (getComputedStyle(menuDiv).display === "none") {
      menuRef.current.openMenu();
    } else {
      menuRef.current.closeMenu();
    }
  };

  return (
    <div className="mt-2 mb-3">
      <button
        id="display-button"
        onClick={toggleMenuDisplay}
        aria-haspopup={true}
        aria-expanded={false}
        aria-controls="custom-menu"
        className="home-menu-example-trigger-button block-interactive"
      >
        Display Example Menu
      </button>
      <div id="custom-menu" role="menu" aria-labelledby="display-button" style={{display: "none", marginTop: "5px"}}>
        <button role="menuitem" className="profile-menu-item">One</button>
        <button role="menuitem" className="profile-menu-item">Two</button>
        <button role="menuitem" className="profile-menu-item">Three</button>
      </div>
    </div>
  )
}

export default HomeExampleMenu`


// eslint-disable-next-line react/prop-types
const Examples = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'menu'

  const [resultsVisible, setResultsVisible] = useState(false);
          
          const mainBlockCleanupRef = useRef(null);
        
          // Initialize main block on mount
          useEffect(() => {
            mainBlockCleanupRef.current = Block.makeBlockAccessible('inner-body-div', 'block-interactive');
            return () => {
              if (mainBlockCleanupRef.current) {
                mainBlockCleanupRef.current();
                mainBlockCleanupRef.current = null;
              }
            };
          }, []);
        
          // Clean up main block listeners when search is visible, re-enable when hidden
          useEffect(() => {
            if (resultsVisible) {
              if (mainBlockCleanupRef.current) {
                mainBlockCleanupRef.current();
                mainBlockCleanupRef.current = null;
              }
            } else {
              if (!mainBlockCleanupRef.current) {
                mainBlockCleanupRef.current = Block.makeBlockAccessible('inner-body-div', 'block-interactive');
              }
            }
          }, [resultsVisible]);

  return (
    <div id="inner-body-div" className='menu-example-page-div'>
        <ScrollTracker page={page}/>
        <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage} resultsVisible={resultsVisible} setResultsVisible={setResultsVisible}/>
        
        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className='side-body-div'>
                  <h1 className='component-example-heading'>Menu</h1>
                  <p className='mt-2'>A component that toggles display and has a list of interactive children items e.g dropdowns, combo boxes, slide out menu navigations.</p>

                  <div className='mt-10'>
                    <h4>Required ARIA Attributes</h4>
                    <p className='mt-2'>Menu trigger button require specific ARIA attributes to ensure proper accessibility:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>aria-haspopup</code>: Indicates that the trigger controls a menu popup.</li>
                      <li><code>aria-expanded</code>: Indicates the expanded state (&#39;true&#39; or &#39;false&#39;) of the menu popup.</li>
                      <li><code>aria-controls</code>: Identifies the element (or elements) whose contents or presence are controlled by the element on which this attribute is set.</li>
                      <li><code>aria-labelledby</code>: Creates a connection between the menu trigger and the menu popup that it controls. The id of the trigger button is the aria-labelledby attribute on the menu popup.</li>
                    </ul>
                  </div>

                  <div className='mt-10'>
                    <h4>Optional ARIA Attributes</h4>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>aria-label</code>: Provides a descriptive label for screen readers. Use only for non-text menu trigger.</li>
                    </ul>
                  </div>

                  <div className='example-each-ui-code-block-div mt-6'>
                    <h5 className='mb-1'>Buttons Menu</h5>
                    <p>This creates a focus trap within the displayed menu. The Arrow keys navigates the focus within the trap in a cycle. The Space and Enter keys &#34;clicks&#34; the interactive element. The Escape key closes the menu, and returns the focus back to the button that toggles the menu. The Tab key exits the trap.</p>

                    <HomeExampleMenu/>
                    <CodeBlockDemo code={firstMenuCode}/>
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

export default Examples
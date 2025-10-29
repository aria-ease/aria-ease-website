import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState, useEffect, useRef } from 'react';
import SlideOutNav from '../components/SlideOutNav'
import HomeExampleMenu from '../components/menus/HomeExampleMenu';
import * as Block from 'aria-ease/block';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';

const menuCode = `Menu.makeMenuAccessible({
  menuId: "custom-menu",
  menuElementsClass: "profile-menu-item",
  triggerId: "display-button"
})`
const tabCode = `Block.makeBlockAccessible('custom-tab', 'custom-tab-item');`


// eslint-disable-next-line react/prop-types
const Documentation = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'documentation'

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
    <div id="inner-body-div">
        <ScrollTracker page={page}/>
        <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage} resultsVisible={resultsVisible} setResultsVisible={setResultsVisible}/>
        
        <main className='page-body-div documentation-page'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={12} lg={9}>
                <div className='side-body-div'>
                  <div className='side-body-sections-div'>
                    <h1 className='introduction-heading'>Getting Started</h1>
                    <p className='mt-2'>Aria-Ease is an open-source utility library that provides utility functions for building production-ready accessible web applications, components and design systems.</p>
                    <p className='mt-2'>This is NOT a component library. The library simply provides utility functions that help to implements accessibility features.</p>
                  </div>
                  <section className='side-body-sections-div'>
                    <h2 className='black-white-text mt-20'>Installation</h2>
                    <p className='my-3'>Run the installation command in your project&#39;s root terminal using your package manager of choice:</p>
                    <div className='flex flex-col gap-3'>
                      <CodeBlockDemo code={'npm i aria-ease'}/>
                      <CodeBlockDemo code={'yarn add aria-ease'}/>
                    </div>
                    <p className='mt-4'>The use of the library as a module with NPM ensures UXProbe loads asynchroniously, by not blocking DOM rendering during <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript#script_loading_strategies" target="_blank" rel="noreferrer" className="text-blue-500 block-interactive underline">script loading</a>. This ensures a smooth user experience for end-users of the monitored application. <a className="text-blue-500 block-interactive underline" href="https://npmjs.com/package/aria-ease" target="_blank" rel="noreferrer">Check out the library in the NPM registry.</a></p>

                    <h2 className='black-white-text mt-20'>CDN</h2>
                    <p className='my-2'>You can use UXProbe by installing it via a Content Delivery Network (CDN). Once the CDN link is included, the library&#39;s functionalities will be available globally.</p>
                    <p className='mb-3'>Embed the CDN link within a <code>{`<script>`}</code> tag in the <code>{`<head>`}</code> or before the closing <code>{`</body>`}</code> tag of your HTML file. Placing it before the closing <code>{`</body>`}</code> is often recommended for performance, as it allows the HTML content to load before the script is executed.</p>
                    <CodeBlockDemo code={'<script src="https://cdn.jsdelivr.net/npm/aria-ease@latest/+esm"></script>'}/>
                  </section>
                  <section className='side-body-sections-div'>
                    <h2 className='black-white-text mt-20'>Usage</h2>
                    <>
                      <p className='mt-2'>
                        <b className='features-function'>Menu.makeMenuAccessible:</b>
                        This method adds keyboard interactions accessibility to a menu. 
                      </p>
                      <HomeExampleMenu/>
                      <p className='feature-function-info-text'>The method creates a focus trap within the menu and focus can be navigated using the Arrow keys and Tab key. When the menu opens, the first interactive element receives focus. The Escape key closes the menu and returns the focus back to the trigger button. The Enter and Space keys &quot;click&quot; the interactive element (currently supports buttons, links, radios and checkboxes).</p>
                      <p className='mt-2 mb-2'>The method takes an object argument. The object contains the id of the menu div, and the class name of the menu items children, and the id of the menu trigger button.</p>
                      <CodeBlockDemo code={menuCode} isLineNumber={true}/>
                      <p style={{marginTop: '24px'}}>The method should only be called after the menu has been added to the DOM.</p>
                    </>

                    <>
                      <p style={{marginTop: '50px'}}>
                        <b className='features-function'>Menu.openMenu():</b>
                        This method updates the aria attributes of the menu trigger button. The aria-expanded attribute of the trigger button is updated based on the current visibility of the menu. 
                      </p>
                      <p className='mb-2 mt-6'>Call this method to open a menu. It displays the menu and updates the aria-expanded of the menu trigger button to indicate that the menu is open.</p>
                      <CodeBlockDemo code={'Menu.openMenu();'}/>
                    </>

                    <>
                      <p style={{marginTop: '50px'}}>
                        <b className='features-function'>Menu.closeMenu():</b>
                        This method updates the aria attributes of the menu trigger button. The aria-expanded attribute of the trigger button is updated based on the current visibility of the menu. 
                      </p>
                      <p className='mb-2'>Call this method to close a menu. It hides the menu and updates the aria-expanded of the menu trigger button to indicate that the menu is closed.</p>
                      <CodeBlockDemo code={'Menu.closeMenu();'}/>
                    </>

                    <>
                      <p style={{marginTop: '50px'}}>
                        <b className='features-function'>Block.makeBlockAccessible:</b>
                        This method adds keyboard interactions accessibility to a block.
                      </p>
                      <p>A block can be headers, tabs, entire web pages (requires more diligence in DOM tree structuring and user experience design), interactive sliders and carousels e.t.c. Basically any component that is permanently displayed, unlike a menu that toggles display, and has a list of interactive children items.</p>
                      <p className='feature-function-info-text'>The method creates a focus trap within the block and focus can be navigated using the Arrow keys and Tab key. The Enter and Space keys &quot;click&quot; the interactive element (currently supports buttons, links, radios and checkboxes).</p>
                      <p className='mb-2'>The method takes two string arguments; the id of the block div, and the class name of the block items children.</p>
                      <CodeBlockDemo code={tabCode}/>
                      <p style={{marginTop: '24px'}}>Call the method on page render, in order for the event listeners to be added as soon as the page loads.</p>
                      <p className='mb-2'>The method can be used to add keyboard interactions functionalities to all the interactive elements on a web page (check out the implementation example on this website) by calling the method like below:</p>
                      <CodeBlockDemo code={`Block.makeBlockAccessible(id-of-page-div, class-name-given-to-the-interactive-elements);`}/>
                    </>
                  </section>
                  <div className='flex justify-end mt-[100px]'>
                    <a href='/examples/accordion' className='block-interactive next-link rounded-lg'>
                      <div className='flex flex-col px-4 py-3'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='text-blue-500 text-lg'>Accordion</span>
                      </div>
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </main>
        
        <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  )
}

export default Documentation
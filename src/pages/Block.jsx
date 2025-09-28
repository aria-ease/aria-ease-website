import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import SlideOutNav from '../components/SlideOutNav'
import { useState, useEffect, useRef } from 'react'
import TextInputBlock from '../components/tabs/TextInputBlock'
import * as Block from 'aria-ease/block'
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';


const firstBlockCode = `import { useEffect } from "react";
import * as Block from "aria-ease/block";

const App = () => {
  useEffect(() => {
    function initializeBlock() {
      Block.makeBlockAccessible("block-div", "block-interactive-items");
    }

    initializeBlock();
  },[])

  return (
    <div>
      <div id="block-div">
        <button className="block-interactive-items">One</button>
        <button className="block-interactive-items">Two</button>
        <button className="block-interactive-items">Three</button>
        <button className="block-interactive-items">Four</button>
      </div>
    </div>
  )
}

export default App`

const secondBlockCode = `import { useEffect } from "react";
import * as Block from "aria-ease/block";

const TextInputBlock = () => {
  useEffect(() => {
    function initializeBlock() {
      Block.makeBlockAccessible("text-input-block-div", "text-input-block-items");
    }

    initializeBlock();
  })

  return (
    <div id="text-input-block-div">
        <div className="each-text-input-block-div">
          <input type="text" placeholder="Name" className="text-input-block-items"></input>
        </div>
        <div className="each-text-input-block-div">
          <input type="text" placeholder="Email" className="text-input-block-items"></input>
        </div>
        <div className="each-text-input-block-div">
          <input type="text" placeholder="Phone" className="text-input-block-items"></input>
        </div>
    </div>
  )
}

export default TextInputBlock`

const dynamicBlockCode = `import { useEffect, useRef } from "react";
import * as Block from "aria-ease/block";

const mainBlockCleanupRef = useRef(null);

useEffect(() => {
  mainBlockCleanupRef.current = Block.makeBlockAccessible('inner-body-div', 'block-interactive');
  return () => {
    if (mainBlockCleanupRef.current) {
      mainBlockCleanupRef.current();
      mainBlockCleanupRef.current = null;
    }
  };
}, []);

useEffect(() => {
  if (dynamicState) {
    if (mainBlockCleanupRef.current) {
      mainBlockCleanupRef.current();
      mainBlockCleanupRef.current = null;
    }
  } else {
    if (!mainBlockCleanupRef.current) {
      mainBlockCleanupRef.current = Block.makeBlockAccessible('inner-body-div', 'block-interactive');
    }
  }
}, [dynamicState]);`

// eslint-disable-next-line react/prop-types
const BlockExample = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'tab';

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
    <div className='block-example-page-div' id="inner-body-div">
        <ScrollTracker page={page}/>
        <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage} resultsVisible={resultsVisible} setResultsVisible={setResultsVisible}/>
        
        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                  <div className='side-body-div'>
                      <h1 className='component-example-heading'>Block</h1>
                      <p className='mt-2'>A statically displayed component that has a list of related interractive children items e.g tabs, interactive sliders, carousels, and entire web pages.</p>

                      <div className='mt-4'>
                        <h4>Block Component Overview</h4>
                        <p className='mt-2'>The Block component creates an accessible focus management system that:</p>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Maintains focus within a designated container (entire pages even)</li>
                          <li>Provides consistent keyboard navigation patterns</li>
                          <li>Supports various interactive element types</li>
                          <li>Enhances screen reader navigation</li>
                        </ul>
                      </div>

                      <div className='mt-4'>
                        <h4>Keyboard Navigation</h4>
                        <ul className='list-disc ml-6 mt-2'>
                          <li><code>↑</code> / <code>←</code>: Move focus to previous item</li>
                          <li><code>↓</code> / <code>→</code>: Move focus to next item</li>
                          <li><code>Home</code>: Move focus to first item</li>
                          <li><code>End</code>: Move focus to last item</li>
                          <li><code>Tab</code>: Exit the focus trap</li>
                        </ul>
                      </div>

                      <div className='mt-4'>
                        <h4>Implementation Requirements</h4>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Container must have a unique ID</li>
                          <li>Interactive elements must share a common class</li>
                          <li>Elements should be semantically related</li>
                          <li>Container should have a logical tab order</li>
                        </ul>
                      </div>

                      <div className='mt-4'>
                        <h4>Best Practices</h4>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Group related interactive elements</li>
                          <li>Maintain consistent spacing between items</li>
                          <li>Provide visible focus indicators</li>
                          <li>Consider mobile touch targets (minimum 44x44px)</li>
                          <li>Ensure logical content order matches visual order</li>
                        </ul>
                      </div>

                      <div className='example-each-ui-code-block-div mt-6'>
                        <h5>Buttons Block</h5>
                        <p className='mt-2'>This creates a focus trap within the buttons tab block. The Arrow keys navigates the focus within the trap in a cycle. The Space and Enter keys &#34;clicks&#34; the interactive element. The Tab key exits the trap.</p>
                        <CodeBlockDemo code={firstBlockCode}/>
                      </div>

                      <div className='example-each-ui-code-block-div mt-6'>
                        <h5>Text Input Block</h5>
                        <p className='mt-2'>This creates a focus trap within the text input block. The Arrow keys navigates the focus within the trap in a cycle. The Tab key exits the trap.</p>
                        <TextInputBlock/>
                        <div className='mt-2'>
                          <CodeBlockDemo code={secondBlockCode}/>
                        </div>

                        <div className='mt-5'>
                          <h5>Dynamic Block</h5>
                          <p>Sometimes, you need to change which part of your UI contains an accessible block based on user interaction. For example, when a search overlay or modal appears, if there&#39;s a main page block, you should remove the main page block and create a new block for the overlay. This ensures keyboard navigation and focus are always trapped in the correct context, improving accessibility and user experience.</p>
                          <p className='mt-2'>The Block utility makes it easy to manage these dynamic blocks. You can create and destroy blocks as needed, making it a powerful tool for managing complex UI interactions, and ensuring that your UI remains accessible at all times.</p>
                          <p className='mt-2'>The Block utility returns a cleanup function that you can call to remove the block when it is not needed.</p>
                          <p className='mt-2'>Use a ref object to store the cleanup function returned by the <code>Block.makeBlockAccessible</code> method. The ref can then be used to call the cleanup function that was returned by the method. This function removes the event listeners that were added to make the block accessible for keyboard navigation.</p>
                          <CodeBlockDemo code={dynamicBlockCode}/>
                          <p className='mt-2'>After the cleanup function has been called on the previous block, and the event listeners removed, a new block can then be created with new event listeners.</p>
                          <p className='mt-2'>In the code snippet above, &#34;dynamicState&#34; is a state variable that determines when the dynamic block, e.g a modal, or search overlay, is currently active.</p>
                        </div>

                        <div className='mt-10'>
                        <h4>Common Use Cases</h4>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Form field groups</li>
                          <li>Interactive widgets (carousels, tabs)</li>
                          <li>Modal dialogs</li>
                          <li>Grid-based interfaces</li>
                          <li>Entire web pages</li>
                        </ul>
                      </div>

                      <div className='mt-4'>
                        <h4>Troubleshooting</h4>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Ensure unique IDs for containers</li>
                          <li>Verify all interactive elements share the specified class</li>
                          <li>Check for proper cleanup in component unmount</li>
                          <li>Test keyboard navigation in all directions</li>
                          <li>Verify focus trap behavior with screen readers</li>
                        </ul>
                      </div>
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

export default BlockExample
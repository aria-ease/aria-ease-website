import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import SlideOutNav from '../components/SlideOutNav'
import { useState, useEffect, useRef } from 'react'
import TextInputBlock from '../components/tabs/TextInputBlock'
import * as Block from 'aria-ease/block'
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';


const firstBlockCode = `import { useEffect } from "react";
import * as Block from "aria-ease/block";

const App = () => {
  useEffect(() => {
    const blockRef = Block.makeBlockAccessible({
      blockId: "block-div", 
      blockItemsClass: "block-interactive-items"
    });

    return () => blockRef.cleanup(); // Clean up on unmount
  },[]);

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
    const blockRef = Block.makeBlockAccessible({
      blockId: "text-input-block-div", 
      blockItemsClass: "text-input-block-items"
    });

    return () => blockRef.cleanup(); // Clean up on unmount
  }, []);

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

const mainBlockRef = useRef(null);

useEffect(() => {
  mainBlockRef.current = Block.makeBlockAccessible({
    blockId: "inner-body-div",
    blockItemsClass: "block-interactive"
  });
  
  return () => {
    if (mainBlockRef.current) {
      mainBlockRef.current.cleanup();
      mainBlockRef.current = null;
    }
  };
}, []);

useEffect(() => {
  if (dynamicState) {
    // Clean up main block when dynamic content appears
    if (mainBlockRef.current) {
      mainBlockRef.current.cleanup();
      mainBlockRef.current = null;
    }
  } else {
    // Re-initialize main block when dynamic content disappears
    if (!mainBlockRef.current) {
      mainBlockRef.current = Block.makeBlockAccessible({ blockId: 'inner-body-div', blockItemsClass: 'block-interactive' });
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
      mainBlockCleanupRef.current = Block.makeBlockAccessible({ blockId: 'inner-body-div', blockItemsClass: 'block-interactive' });
      return () => {
        if (mainBlockCleanupRef.current) {
          mainBlockCleanupRef.current.cleanup();
          mainBlockCleanupRef.current = null;
        }
      };
    }, []);
  
    // Clean up main block listeners when search is visible, re-enable when hidden
    useEffect(() => {
      if (resultsVisible) {
        if (mainBlockCleanupRef.current) {
          mainBlockCleanupRef.current.cleanup();
          mainBlockCleanupRef.current = null;
        }
      } else {
        if (!mainBlockCleanupRef.current) {
          mainBlockCleanupRef.current = Block.makeBlockAccessible({ blockId: 'inner-body-div', blockItemsClass: 'block-interactive' });
        }
      }
    }, [resultsVisible]);

  return (

    
    <div className='block-example-page-div' id="inner-body-div">
      <Helmet>
            <title>Block | Aria-Ease</title>
            <meta name="description" content="Learn about the Block component in Aria-Ease, which provides an accessible focus management system for related interactive children items like tabs, sliders, and carousels." />
          </Helmet>
          <a
        href="#main-content"
        className="skip-to-content-link absolute left-2 top-2 px-4 py-2 rounded-md"
        tabIndex={0}
      >
        Skip to Content
      </a>
        <ScrollTracker page={page}/>
        <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage} resultsVisible={resultsVisible} setResultsVisible={setResultsVisible}/>
        
        <main className='page-body-div' id="main-content">
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
                  <div className='side-body-div'>
                      <h1 className='component-example-heading'>Block</h1>
                      <p className='mt-2'>A statically displayed component that has a list of related interactive children items e.g tabs, interactive sliders, carousels, and entire web pages.</p>

                      <div className={`mt-6 p-4 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                        <h2 className={`font-semibold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>Bundle Size</h2>
                        <p className={`mt-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>The block component is tree-shakable and weighs approximately <strong>1.7KB</strong> when imported individually.</p>
                        <code className={`block mt-2 p-2 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100'} rounded text-sm`}>
                          <p>import * as Block from &quot;aria-ease/block&quot;;</p>
                          <p className='my-4'>or</p>
                          <p>import &#123; makeBlockAccessible &#125; from &quot;aria-ease/block&quot;;</p>
                        </code>
                      </div>

                      <div className='mt-10'>
                          <h3>Common Use Cases</h3>
                          <ul className='list-disc ml-6 mt-2'>
                            <li>Form field groups</li>
                            <li>Interactive widgets (carousels, tabs)</li>
                            <li>Modal dialogs</li>
                            <li>Grid-based interfaces</li>
                            <li>Entire web pages</li>
                          </ul>
                        </div>

                      <div className='mt-4'>
                        <h2>Block Component Overview</h2>
                        <p className='mt-2'>The Block component creates an accessible focus management system that:</p>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Maintains focus within a designated container</li>
                          <li>Provides consistent keyboard interaction patterns</li>
                          <li>Supports various interactive element types</li>
                          <li>Enhances screen reader navigation</li>
                        </ul>
                      </div>

                      <h3 className='mt-5'>Parameters:</h3>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>blockId</code> (string): ID of the block container</li>
                        <li><code>blockItemsClass</code> (string): Shared class for all block item</li>
                      </ul>

                      <h3 className='mt-5'>Returns:</h3>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>cleanup()</code>: Remove event listeners</li>
                        <li><code>refresh()</code>: Re-initialize block (useful for dynamic content)</li>
                      </ul>

                      <div className='mt-5'>
                        <h2>Keyboard Interaction</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li><code>↑</code> / <code>←</code>: Move focus to previous item</li>
                          <li><code>↓</code> / <code>→</code>: Move focus to next item</li>
                          <li><code>Home</code>: Move focus to first item</li>
                          <li><code>End</code>: Move focus to last item</li>
                          <li><code>Tab</code>: Exit the focus trap</li>
                        </ul>
                      </div>

                      <div className='mt-4'>
                        <h2>Implementation Requirements</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Container must have a unique ID</li>
                          <li>Interactive elements must share a common class</li>
                          <li>Elements should be semantically related</li>
                          <li>Container should have a logical tab order</li>
                        </ul>
                      </div>

                      <div className='mt-4'>
                        <h2>Best Practices</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Group related interactive elements</li>
                          <li>Maintain consistent spacing between items</li>
                          <li>Provide visible focus indicators</li>
                          <li>Consider mobile touch targets (minimum 44x44px)</li>
                          <li>Ensure logical content order matches visual order</li>
                          <li>Always call cleanup function when component unmounts</li>
                        </ul>
                      </div>

                      <div className={`mt-6 p-4 rounded-lg border-l-4 border-yellow-500 ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                        <h3 className={`font-semibold ${darkMode ? 'text-yellow-100' : 'text-yellow-900'}`}>⚠️ React StrictMode</h3>
                        <p className={`mt-2 ${darkMode ? 'text-yellow-100' : 'text-yellow-900'}`}>If using React StrictMode, be aware it intentionally calls effects twice in development. This can cause issues with imperative DOM manipulation. Either remove <code className={`px-1 py-0.5 ${darkMode ? 'bg-yellow-900 text-red-100' : 'bg-yellow-200 text-red-900'} rounded text-sm`}>&lt;React.StrictMode&gt;</code> in development, or use proper cleanup functions as shown in the examples above to prevent double-initialization.</p>
                      </div>

                      <div className='example-each-ui-code-block-div mt-6'>
                        <h3>Buttons Block</h3>
                        <p className='mt-2'>This creates a focus trap within the buttons tab block. The Arrow keys navigates the focus within the trap in a cycle. The Space and Enter keys &#34;clicks&#34; the interactive element. The Tab key exits the trap.</p>
                        <CodeBlockDemo code={firstBlockCode} isLineNumber={true}/>
                      </div>

                      <div className='example-each-ui-code-block-div mt-6'>
                        <h3>Text Input Block</h3>
                        <p className='mt-2'>This creates a focus trap within the text input block. The Arrow keys navigates the focus within the trap in a cycle. The Tab key exits the trap.</p>
                        <TextInputBlock/>
                        <div className='mt-2'>
                          <CodeBlockDemo code={secondBlockCode} isLineNumber={true}/>
                        </div>

                        <div className='mt-5'>
                          <h3>Switching Block Context</h3>
                          <p>Sometimes, you need to change which part of your UI contains an accessible block based on user interaction. For example, when a search overlay or modal appears, if there&#39;s a main page block, you should remove the main page block and create a new block for the overlay. This ensures keyboard interaction and focus are always trapped in the correct context, improving accessibility and user experience.</p>
                          <p className='mt-2'>The Block utility makes it easy to manage these dynamic blocks. You can create and destroy blocks as needed, making it a powerful tool for managing complex UI interactions, and ensuring that your UI remains accessible at all times.</p>
                          <p className='mt-2'>The Block utility returns a cleanup function that you can call to remove the block when it is not needed.</p>
                          <p className='mt-2'>Use a ref object to store the cleanup function returned by the <code>makeBlockAccessible(...)</code> method. The ref can then be used to call the cleanup function that was returned by the method. This function removes the event listeners that were added to make the block accessible for keyboard interaction.</p>
                          <CodeBlockDemo code={dynamicBlockCode} isLineNumber={true}/>
                          <p className='mt-2'>After the cleanup function has been called on the previous block, and the event listeners removed, a new block can then be created with new event listeners.</p>
                          <p className='mt-2'>In the code snippet above, &#34;dynamicState&#34; is a state variable that determines when the dynamic block, e.g a modal, or search overlay, is currently active.</p>
                        </div>

                        

                      <div className='mt-4'>
                        <h3>Troubleshooting</h3>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Ensure unique IDs for containers</li>
                          <li>Verify all interactive elements share the specified class</li>
                          <li>Check for proper cleanup in component unmount</li>
                          <li>Test keyboard interaction in all directions</li>
                          <li>Verify focus trap behavior with screen readers</li>
                        </ul>
                      </div>
                      </div>

                      

                    <div className='flex flex-wrap gap-4 py-4 mx-auto max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <a href='/examples/accordion' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Accordion</span>
                      </div>
                    </a>
                    <a href='/examples/checkbox' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Checkbox</span>
                      </div>
                      <ChevronRightCircleIcon/>
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

export default BlockExample
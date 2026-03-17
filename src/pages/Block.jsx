import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import SlideOutNav from '../components/SlideOutNav'
import { useState, useEffect, useRef } from 'react'
import * as Block from 'aria-ease/block'
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

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

                      <section className={`mt-6 p-4 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                        <h2 className={`font-semibold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>Bundle Size</h2>
                        <p className={`mt-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>The block component is tree-shakable and weighs approximately <strong>1.7KB</strong> when imported individually.</p>
                        <code className={`block mt-2 p-2 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100'} rounded text-sm`}>
                          <p>import * as Block from &quot;aria-ease/block&quot;;</p>
                          <p className='my-4'>or</p>
                          <p>import &#123; makeBlockAccessible &#125; from &quot;aria-ease/block&quot;;</p>
                        </code>
                      </section>

                      <section className='mt-10'>
                          <h2>Common Use Cases</h2>
                          <ul className='list-disc ml-6 mt-2'>
                            <li>Form field groups</li>
                            <li>Interactive widgets (carousels, tabs)</li>
                            <li>Modal dialogs</li>
                            <li>Grid-based interfaces</li>
                            <li>Entire web pages</li>
                          </ul>
                        </section>

                      <section className='mt-10'>
                        <h2>Block Component Overview</h2>
                        <p className='mt-2'>The Block component creates an accessible focus management system that:</p>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Maintains focus within a designated container</li>
                          <li>Provides consistent keyboard interaction patterns</li>
                          <li>Supports various interactive element types</li>
                          <li>Enhances screen reader navigation</li>
                        </ul>
                      </section>

                      <section className='mt-10'>
                        <h2 className='mt-5'>Parameters:</h2>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>blockId</code> (string): ID of the block container</li>
                        <li><code>blockItemsClass</code> (string): Shared class for all block item</li>
                      </ul>
                      </section>

                  <section className='mt-10'>
                    <h2 className='mt-5'>Returns:</h2>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>cleanup()</code>: Remove event listeners</li>
                        <li><code>refresh()</code>: Re-initialize block (useful for dynamic content)</li>
                      </ul>
                  </section>

                  <section className='mt-10'>
                    <h2>Keyboard Interaction</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li><code>↑</code> / <code>←</code>: Move focus to previous item</li>
                          <li><code>↓</code> / <code>→</code>: Move focus to next item</li>
                          <li><code>Home</code>: Move focus to first item</li>
                          <li><code>End</code>: Move focus to last item</li>
                          <li><code>Tab</code>: Exit the focus trap</li>
                        </ul>
                  </section>

                  <section className='mt-10'>
                    <h2>Implementation Requirements</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Container must have a unique ID</li>
                          <li>Interactive elements must share a common class</li>
                          <li>Elements should be semantically related</li>
                          <li>Container should have a logical tab order</li>
                        </ul>
                  </section>

                      <section className='mt-10'>
                        <h2>Best Practices</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Group related interactive elements</li>
                          <li>Maintain consistent spacing between items</li>
                          <li>Provide visible focus indicators</li>
                          <li>Consider mobile touch targets (minimum 44x44px)</li>
                          <li>Ensure logical content order matches visual order</li>
                          <li>Always call cleanup function when component unmounts</li>
                        </ul>
                      </section>

                      <section className={`mt-10 p-4 rounded-lg border-l-4 border-yellow-500 ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                        <h2 className={`font-semibold ${darkMode ? 'text-yellow-100' : 'text-yellow-900'}`}>⚠️ React StrictMode</h2>
                        <p className={`mt-2 ${darkMode ? 'text-yellow-100' : 'text-yellow-900'}`}>If using React StrictMode, be aware it intentionally calls effects twice in development. This can cause issues with imperative DOM manipulation. Either remove <code className={`px-1 py-0.5 ${darkMode ? 'bg-yellow-900 text-red-100' : 'bg-yellow-200 text-red-900'} rounded text-sm`}>&lt;React.StrictMode&gt;</code> in development, or use proper cleanup functions as shown in the examples above to prevent double-initialization.</p>
                      </section>

                       <section className='mt-10'>
                        <h2>Troubleshooting</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Ensure unique IDs for containers</li>
                          <li>Verify all interactive elements share the specified class</li>
                          <li>Check for proper cleanup in component unmount</li>
                          <li>Test keyboard interaction in all directions</li>
                          <li>Verify focus trap behavior with screen readers</li>
                        </ul>
                      </section>

                      

                    <div className='flex flex-wrap gap-4 py-4 mx-auto max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <a href='/utilities/accordion' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Accordion</span>
                      </div>
                    </a>
                    <a href='/utilities/checkbox' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
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
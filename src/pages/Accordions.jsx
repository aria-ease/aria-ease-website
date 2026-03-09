import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import SlideOutNav from '../components/SlideOutNav'
import * as Block from 'aria-ease/block'
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import { Link } from 'react-router-dom';
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';


const accordionHTML = `<div id="faq-div" data-test-id="accordion-group">
  <button className="dropdown-button" data-test-id="accordion-trigger">
    <span>How do I make an appointment?</span>
    {openStates[0] ? 
      <img src={openeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img> :
      <img src={closeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img>
    }
  </button>
  <div className="accordion-panel">
    <p>If you would like to make an appointment with any one of our practitioners, please contact our reception staff. Alternatively you can book an appointment online.</p>
  </div>

  <button className="dropdown-button" data-test-id="accordion-trigger">
    <span>How do I get a copy of my record?</span>
      {openStates[1] ? 
        <img src={openeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img> :
        <img src={closeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img>
      }
  </button>
  <div className="accordion-panel">
    <p>If you would like to get a copy of your record, please contact our customer support team. Alternatively you can come into the hospital.</p>
  </div>

  <button className="dropdown-button" data-test-id="accordion-trigger">
    <span>Is there a charge for extra copies?</span>
    {openStates[2] ? 
      <img src={openeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img> :
      <img src={closeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img>
    }
  </button>
  <div className="accordion-panel">
    <p>The first copy is free and subsequent copies cost $1 per copy. This cost covers printing and mailing.</p>
  </div>
</div>`

const basicSetup = `const accordionRef = useRef(null);

const [openStates, setOpenStates] = useState(Array(3).fill(false)); // Track open state for each panel

useEffect(() => {
  // Initialize accordion with automatic state management
  accordionRef.current = Accordion.makeAccordionAccessible({ //makeAccordionAccessible({})
    accordionId: "faq-div",
    triggersClass: "dropdown-button",
    panelsClass: "accordion-panel",
    allowMultipleOpen: false, // Only one panel open at a time
    callback: {
      onExpand: (index) => {
        // Callback when a panel expands, you can use this to update state or perform side effects like changing icons
        setOpenStates(prev => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });
      },
      onCollapse: (index) => {
        // Callback when a panel collapses, you can use this to update state or perform side effects like changing icons
        setOpenStates(prev => {
          const newStates = [...prev];
          newStates[index] = false;
          return newStates;
        });
      }
    }
  });

  // Cleanup on unmount
  return () => {
    if (accordionRef.current) {
      accordionRef.current.cleanup();
    }
  };
}, []);`


// eslint-disable-next-line react/prop-types
const Accordions = ({darkMode, setDarkMode}) => {
  const page = 'accordions'
  const[showDropdownPage, setShowDropdownPage] = useState(false);
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

    
    <div id="inner-body-div">
      <Helmet>
        <title>Accordion | Aria-Ease</title>
        <meta name="description" content="Learn how to use the Accordion component for accessible expandable and collapsible content sections. Includes ARIA attributes and usage examples." />
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
                  <h1 className='component-example-heading'>Accordion</h1>
                  <p className='mt-2'>A vertically stacked component that expands and collapses to reveal and hide section(s) of content respectively. It is used to organize content sections that expand/collapse. Typically used for FAQs, multi-step forms e.t.c. The difference between this and a menu is that a menu has a dropdown or options list of actionable interactive items, with the first item being focused when the menu is opened. <Link className='underline block-interactive' to='/examples/menu'>Learn about menu component here.</Link></p>

                  <section className={`mt-6 p-4 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <h2 className={`font-semibold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>Bundle Size</h2>
                    <p className={`mt-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>The accordion component is tree-shakable and weighs approximately <strong>6.5KB</strong> when imported individually.</p>
                    <code className={`block mt-2 p-2 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100'} rounded text-sm`}>
                      <p>import * as Accordion from &quot;aria-ease/accordion&quot;;</p>
                      <p className='my-4'>or</p>
                      <p>import &#123; makeAccordionAccessible &#125; from &quot;aria-ease/accordion&quot;;</p>  
                    </code>
                  </section>

                  <section className='mt-10'>
                    <h2>Features</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>✨ Automatic ARIA attribute management</li>
                      <li>⌨️ Built-in keyboard interaction (Arrow keys, Home, End, Enter, Space)</li>
                      <li>🔧 Programmatic control methods</li>
                      <li>🎯 Single or multiple panel expansion support</li>
                      <li>🧹 Automatic cleanup on unmount</li>
                    </ul>
                  </section>

                  <section className='mt-10'>
                    <h2>Common Use Cases</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>FAQs: Organize frequently asked questions with expandable answers.</li>
                      <li>Multi-step Forms: Break complex forms into manageable sections.</li>
                      <li>Content Organization: Group related content that can be expanded/collapsed.</li>
                      <li>Navigation Menus: Create vertical navigation with expandable submenus.</li>
                      <li>Product Details: Show/hide additional information on product pages.</li>
                    </ul>
                  </section>

                  <section className='mt-10'>
                    <h2>WAI-ARIA Roles, States, and Properties</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>The title of each accordion header is contained in an element with role button.</li>
                      <li>If the accordion panel associated with an accordion header is visible, the header button element has aria-expanded set to true. If the panel is not visible, aria-expanded is set to false.</li>
                      <li>The accordion header button element has aria-controls set to the ID of the element containing the accordion panel content.</li>
                      <li>If the accordion panel associated with an accordion header is visible, and if the accordion does not permit the panel to be collapsed, the header button element has aria-disabled set to true.</li>
                      <li>Optionally, each element that serves as a container for panel content has role region and aria-labelledby with a value that refers to the button that controls display of the panel.
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Role region is especially helpful to the perception of structure by screen reader users when panels contain heading elements or a nested accordion.</li>
                          <li>Avoid using the region role in circumstances that create landmark region proliferation, e.g., in an accordion that contains more than approximately 6 panels that can be expanded at the same time.</li>
                        </ul>
                      </li>
                    </ul>
                  </section>

                  <section className='mt-10'>
                    <h2>What the Utility Handles Automatically</h2>
                    <p className='mt-2'>The library automatically manages these ARIA attributes:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>aria-expanded</code>: Indicates the expanded state (automatically managed)</li>
                      <li><code>aria-controls</code>: Links trigger to panel (automatically generated)</li>
                      <li><code>role=&quot;region&quot;</code>: Applied to panels (automatically set)</li>
                      <li><code>aria-labelledby</code>: Links panel to trigger (automatically set)</li>
                    </ul>
                  </section>

                  <section className='mt-10'>
                    <h2 className='break-words'>makeAccordionAccessible()</h2>
                    <p className='mt-2'>The <code>makeAccordionAccessible()</code> method creates a fully accessible accordion with automatic state management, keyboard interaction, and ARIA attribute handling. No manual state tracking required!</p>

                    <div className={`mt-6 p-4 rounded-lg border-l-4 border-green-500 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <h3 className={`font-semibold ${darkMode ? 'text-green-100' : 'text-green-900'}`}>✨ Key Features</h3>
                      <ul className={`list-disc ml-4 mt-2 ${darkMode ? 'text-green-100' : 'text-green-900'}`}>
                        <li>Automatic ARIA attribute management (aria-expanded, aria-controls, roles)</li>
                        <li>Complete keyboard interaction following W3C APG specifications</li>
                        <li>Built-in mouse support with click handling</li>
                        <li>Focus management</li>
                        <li>Event callbacks for expanded/collapse</li>
                        <li>No manual state management required</li>
                      </ul>
                    </div>
                  </section>

                  <section className='mt-10'>
                    <h2>Parameters:</h2>
                  <ul className='list-disc ml-6 mt-2'>
                    <li><code>accordionId</code> (string): ID of the accordion container</li>
                    <li><code>triggersClass</code> (string): Shared class for all trigger buttons</li>
                    <li><code>panelsClass</code> (string): Shared class for all panels</li>
                    <li><code>allowMultipleOpen</code> (boolean, optional): Allow multiple panels open (default: false)</li>
                  </ul>
                  </section>

                  <section className='mt-10'>
                    <h2>Returns:</h2>
                  <ul className='list-disc ml-6 mt-2'>
                    <li><code>expandItem(index)</code>: Expand specific panel</li>
                    <li><code>collapseItem(index)</code>: Collapse specific panel</li>
                    <li><code>toggleItem(index)</code>: Toggle specific panel</li>
                    <li><code>cleanup()</code>: Remove event listeners</li>
                    <li><code>refresh()</code>: Re-initialize accordion (useful for dynamic content)</li>
                  </ul>
                  </section>

                  <section className='mt-10'>
                    
                      <p className='mb-2'>Import the utility:</p>
                      <CodeBlockDemo code={'import * as Accordion from "aria-ease/accordion";'}/>

                      <p className='mb-2 mt-6'>Basic setup with callbacks:</p>
                      <CodeBlockDemo code={basicSetup} isLineNumber={true}/>

                      <p className='mb-2 mt-6'>Minimal HTML structure (no ARIA attributes needed):</p>
                      <CodeBlockDemo code={accordionHTML} isLineNumber={true}/>
              
                  </section>

                  <section className='mt-10'>
                    <h2>Keyboard Interaction</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>Enter</code> / <code>Space</code>: Toggle accordion panel</li>
                      <li><code>↓</code>: Focus next trigger</li>
                      <li><code>↑</code>: Focus previous trigger</li>
                      <li><code>Home</code>: Focus first trigger</li>
                      <li><code>End</code>: Focus last trigger</li>
                    </ul>
                  </section>

                  <section className='mt-10'>
                    <h2>Best Practices</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Use descriptive button text that clearly indicates the content being revealed</li>
                      <li>Ensure proper ARIA attributes are always in sync with visual state</li>
                      <li>Maintain logical tab order for accordion triggers</li>
                      <li>Consider allowing multiple panels to be open simultaneously for better UX</li>
                      <li>Provide visible focus indicators for keyboard interaction</li>
                    </ul>
                  </section>

                  <div className='flex flex-wrap gap-4 py-4 mx-auto max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <a href='/examples' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Examples</span>
                      </div>
                    </a>
                    <a href='/examples/block' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end gap-2'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Block</span>
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

export default Accordions
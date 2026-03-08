import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import * as Block from 'aria-ease/block';
import SlideOutNav from '../components/SlideOutNav';
import SideNav from '../components/SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import { Link } from 'react-router-dom';
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';


// eslint-disable-next-line react/prop-types
const Toggle = ({darkMode, setDarkMode}) => {
    const page = 'toggle-button';
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

  const importGroupToggles = 'import { makeToggleAccessible } from "aria-ease/toggle";';
  const toggleSetup = `useEffect(() => {
  const toggleInstance = makeToggleAccessible({
    toggleId: 'toggle-div',
    togglesClass: 'group-toggle-button',
    isSingleToggle: false  // Set to true for single toggle button
  });

  // Clean up on unmount
  return () => toggleInstance.cleanup();
}, []);`;
  const singleToggleSetup = `// For a single toggle button:
const toggleInstance = makeToggleAccessible({
  toggleId: 'mute-toggle',  // The button's id
  isSingleToggle: true      // Default is true
});`;
  const apiMethods = `// Available methods:
toggleInstance.toggleButton(index)       // Toggle button at index
toggleInstance.setPressed(index, pressed) // Set specific state
toggleInstance.getPressedStates()        // Returns [true, false, false]
toggleInstance.getPressedIndices()       // Returns [0]
toggleInstance.cleanup()                 // Remove all listeners`;

const togglesComponent = `<div id='toggle-div'>
  <button className='group-toggle-button block-interactive-items py-2 px-3 mt-3 text-sm rounded-md' aria-pressed={toggleButtonsState[0].pressed} onClick={() => handlePress(0)}>Mute notification</button>
  <button className='group-toggle-button block-interactive-items py-2 px-3 mt-3 text-sm rounded-md' aria-pressed={toggleButtonsState[1].pressed} onClick={() => handlePress(1)}>Dark mode</button>
  <button className='group-toggle-button block-interactive-items py-2 px-3 mt-3 text-sm rounded-md' aria-pressed={toggleButtonsState[2].pressed} onClick={() => handlePress(2)}>Enable 2FA</button>
</div>`;


  return (
   
    
    <div id="inner-body-div">
      <Helmet>
            <title>Toggle | Aria-Ease</title>
            <meta name="description" content="Learn how to use the Toggle component for accessible toggle buttons in user interfaces. Includes ARIA attributes and usage examples." />
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
                  <h1 className='component-example-heading'>Toggle</h1>
                  <p className='mt-2'>Toggle buttons are components that require a full press-and-release cycle to toggle a value. It is similar but not identical to a checkbox. <Link className='underline block-interactive' to='/examples/checkbox'>Learn about checkbox component here.</Link></p>

                  <section className={`mt-6 p-4 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <h2 className={`font-semibold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>Bundle Size</h2>
                    <p className={`mt-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>The toggle component is tree-shakable and weighs approximately <strong>6.0KB</strong> when imported individually.</p>
                    <code className={`block mt-2 p-2 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100'} rounded text-sm`}>
                      <p>import * as Toggle from &quot;aria-ease/toggle&quot;;</p>
                      <p className='my-4'>or</p>
                      <p>import &#123; makeToggleAccessible &#125; from &quot;aria-ease/toggle&quot;;</p>
                    </code>
                  </section>

                  <section className='mt-10'>
                    <h2>Features</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>✨ Automatic ARIA attribute management</li>
                      <li>⌨️ Built-in keyboard interaction (Space, Enter)</li>
                      <li>🔧 Programmatic control methods</li>
                      <li>🧹 Automatic cleanup on unmount</li>
                    </ul>
                  </section>

                  <section className='mt-10'>
                    <h2>Common Use Cases</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Feature toggles (enable/disable functionality)</li>
                      <li>Preference settings (dark mode, notifications)</li>
                      <li>State controls (mute/unmute, show/hide)</li>
                      <li>Mode switches (edit/view, private/public)</li>
                    </ul>
                  </section>

                  <section className='mt-10'>
                    <h2>WAI-ARIA Roles, States, and Properties</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>The button has an accessible label. By default, the accessible name is computed from any text content inside the button element. However, it can also be provided with aria-labelledby or aria-label.</li>
                      <li>If a description of the button&#39;s function is present, the button element has aria-describedby set to the ID of the element containing the description.</li>
                      <li>When the action associated with a button is unavailable, the button has aria-disabled set to true.</li>
                      <li>Toggle button has an aria-pressed state. When the button is toggled on, the value of this state is true, and when toggled off, the state is false.</li>
                    </ul>
                  </section>

                  <section className='mt-10'>
                    <h2>What the Utility Handles Automatically</h2>
                    <p className='mt-2'>The <code>makeToggleAccessible</code> utility automatically sets and manages all required ARIA attributes:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>aria-pressed</code> - dynamically updates when button is toggled on or off</li>
                    </ul>
                    
                    <p className='mt-2'>You only need to provide the HTML structure with IDs and class names.</p>
                  </section>



                  <section className='mt-10'>
                    <h2>makeToggleAccessible()</h2>
                    <p className='mt-2'>The <code>makeToggleAccessible()</code> function automatically manages toggle button accessibility for both single toggles and toggle groups, including ARIA attributes and keyboard interactions.</p>
                    <p className='mt-2'>This function handles all toggle button complexity including aria-pressed attributes, keyboard interaction, and focus management. It supports both individual toggle buttons and groups of toggle buttons.</p>

                    <div className={`mt-6 p-4 rounded-lg border-l-4 border-green-500 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <h3 className={`font-semibold ${darkMode ? 'text-green-100' : 'text-green-900'}`}>✨ Key Features</h3>
                      <ul className={`list-disc ml-6 mt-2 ${darkMode ? 'text-green-100' : 'text-green-900'}`}>
                        <li>Automatic aria-pressed management</li>
                        <li>Built-in keyboard interaction (Enter, Space, Arrow keys for groups)</li>
                        <li>Supports single toggle or toggle groups</li>
                        <li>State query methods (getPressedStates, getPressedIndices)</li>
                        <li>No manual state management required</li>
                      </ul>
                    </div>
                  </section>

                  <section className='mt-10'>
                    <h2>Keyboard Interaction</h2>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>Enter</code> / <code>Space</code> - Toggle pressed state</li>
                      </ul>
                  </section>

                  <section className='mt-10'>
                    <p className='mb-2'>Import the function:</p>
                      <CodeBlockDemo code={importGroupToggles}/>

                      <p className='mb-2 mt-6'>For a group of toggle buttons:</p>
                      <CodeBlockDemo code={toggleSetup} isLineNumber={true}/>

                      <p className='mb-2 mt-6'>For a single toggle button:</p>
                      <CodeBlockDemo code={singleToggleSetup} isLineNumber={true}/>

                      <p className='mb-2 mt-6'>Create your toggle markup:</p>
                      <CodeBlockDemo code={togglesComponent} isLineNumber={true}/>

                      <p className='mb-2 mt-6'>Available API methods:</p>
                      <CodeBlockDemo code={apiMethods} isLineNumber={true}/>
                  </section>

                  <section className='mt-10'>
                    <h2>Common Pitfalls to Avoid</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Use aria-label for only non-text toggle buttons</li>
                      <li>When used, don&#39;t change the aria-label based on toggle state</li>
                      <li>Don&#39;t rely solely on color to indicate toggle state</li>
                      <li>Don&#39;t disable keyboard interaction between toggle buttons in a group</li>
                    </ul>
                  </section>

                    <div className='flex flex-wrap gap-4 py-4 mx-auto max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <a href='/examples/tabs' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Tabs</span>
                      </div>
                    </a>
                    <a href='/audit' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Runtime Audit</span>
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

export default Toggle
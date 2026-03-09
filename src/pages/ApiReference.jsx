import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState, useEffect, useRef } from 'react';
import SlideOutNav from '../components/SlideOutNav';
import * as Block from 'aria-ease/block';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line react/prop-types
const ApiReference = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'api';
  const [resultsVisible, setResultsVisible] = useState(false);
  const mainBlockCleanupRef = useRef(null);

  useEffect(() => {
    mainBlockCleanupRef.current = Block.makeBlockAccessible({ blockId: 'inner-body-div', blockItemsClass: 'block-interactive' });
    return () => {
      if (mainBlockCleanupRef.current) {
        mainBlockCleanupRef.current.cleanup();
        mainBlockCleanupRef.current = null;
      }
    };
  }, []);

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
            <title>API Reference | Aria-Ease</title>
            <meta name="description" content="Complete reference for all Aria-Ease components and their methods." />
          </Helmet>
          <a
        href="#main-content"
        className="skip-to-content-link absolute left-2 top-2 px-4 py-2 rounded-md"
        tabIndex={0}
      >
        Skip to Content
      </a>
      <ScrollTracker page={page}/>
      <Header 
        page={page} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        showDropdownPage={showDropdownPage} 
        setShowDropdownPage={setShowDropdownPage} 
        resultsVisible={resultsVisible} 
        setResultsVisible={setResultsVisible}
      />
      
      <main className='page-body-div' id="main-content">
        <Container fluid>
          <Row>
            <SideNav page={page}/>
            <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
              <div className='side-body-div'>
                <h1 className='introduction-heading'>API Reference</h1>
                <p className='mt-2'>Complete reference for all Aria-Ease components and their methods.</p>

                {/* Menu API */}
                <section className='mt-10'>
                  <h2 className='text-3xl font-bold mb-4'>Menu</h2>
                  <p className='mb-6'>Create accessible dropdown menus with keyboard interaction and focus management.</p>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>Import</h3>
                    <CodeBlockDemo code={`import * as Menu from "aria-ease/menu";`}/>
                  </div>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>makeMenuAccessible(config)</h3>
                    <p className='mb-4'>Adds keyboard interactions and ARIA attributes to a menu component.</p>
                    
                    <h4 className='font-semibold mb-2'>Parameters</h4>
                    <div className='overflow-x-auto mb-4'>
                      <table className='w-full border-collapse border border-gray-300 dark:border-gray-600'>
                        <thead className='bg-gray-100 dark:bg-gray-800'>
                          <tr>
                            <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white'>Property</th>
                            <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white'>Type</th>
                            <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white'>Required</th>
                            <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white'>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>menuId</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>string</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Yes</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>The ID attribute of the menu container element</td>
                          </tr>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>menuItemsClass</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>string</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Yes</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Shared class name of all menu items</td>
                          </tr>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>triggerId</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>string</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Yes</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>The ID attribute of the trigger button</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className='font-semibold mb-2'>Returns</h4>
                    <p className='mb-2'>Object with the following methods:</p>
                    <div className='overflow-x-auto mb-4'>
                      <table className='w-full border-collapse border border-gray-300 dark:border-gray-600'>
                        <thead className='bg-gray-100 dark:bg-gray-800'>
                          <tr>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Method</th>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Returns</th>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>cleanup()</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>void</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Removes all event listeners and cleans up resources</td>
                          </tr>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>openMenu()</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>void</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Programmatically opens the menu</td>
                          </tr>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>closeMenu()</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>void</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Programmatically closes the menu</td>
                          </tr>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>refresh()</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>void</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Refreshes menu items cache after dynamic changes</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className='font-semibold mb-2'>Example</h4>
                    <CodeBlockDemo code={`import { useEffect, useRef } from "react";
import * as Menu from "aria-ease/menu";

function UserMenu() {
  const menuRef = useRef(null);

  useEffect(() => {
    menuRef.current = Menu.makeMenuAccessible({
      menuId: "user-menu",
      menuItemsClass: "user-menu-item",
      triggerId: "user-menu-trigger"
    });

    return () => menuRef.current.cleanup();
  }, []);

  const handleAddItem = () => {
    // After adding items dynamically
    menuRef.current.refresh();
  };

  return (
    <>
      <button id="user-menu-trigger">Profile</button>
      <div id="user-menu" hidden>
        <a href="/profile" className="user-menu-item">Settings</a>
        <a href="/logout" className="user-menu-item">Logout</a>
      </div>
    </>
  );
}`} isLineNumber={true}/>
                  </div>

                  <div className='mt-6 p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50'>
                    <h4 className='font-semibold text-blue-900'>Keyboard Interactions</h4>
                    <ul className='mt-2 list-disc ml-6 text-blue-900'>
                      <li><code className='text-blue-900'>↑/↓</code> - Navigate menu items</li>
                      <li><code className='text-blue-900'>Enter/Space</code> - Activate menu item</li>
                      <li><code className='text-blue-900'>Escape</code> - Close menu and return focus</li>
                      <li><code className='text-blue-900'>Tab</code> - Exit menu</li>
                    </ul>
                  </div>
                </section>

                {/* Block API */}
                <section className='mt-[100px]'>
                  <h2 className='text-3xl font-bold mb-4'>Block</h2>
                  <p className='mb-6'>Create accessible focus management for groups of interactive elements.</p>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>Import</h3>
                    <CodeBlockDemo code={`import * as Block from "aria-ease/block";`}/>
                  </div>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>makeBlockAccessible(config)</h3>
                    <p className='mb-4'>Adds keyboard interaction to a block of related interactive elements.</p>
                    
                    <h4 className='font-semibold mb-2'>Parameters</h4>
                    <div className='overflow-x-auto mb-4'>
                      <table className='w-full border-collapse border border-gray-300 dark:border-gray-600'>
                        <thead className='bg-gray-100 dark:bg-gray-800'>
                          <tr>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Parameter</th>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Type</th>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Required</th>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>blockId</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>string</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Yes</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>The ID attribute of the block container element</td>
                          </tr>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>blockItemsClass</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>string</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Yes</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Shared class name of all block items</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className='font-semibold mb-2'>Returns</h4>
                    <p className='mb-2'>Object with the following methods:</p>
                    <div className='overflow-x-auto mb-4'>
                      <table className='w-full border-collapse border border-gray-300 dark:border-gray-600'>
                        <thead className='bg-gray-100 dark:bg-gray-800'>
                          <tr>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Method</th>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Returns</th>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>cleanup()</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>void</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Removes event listeners and cleans up resources</td>
                          </tr>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>refresh()</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>void</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Refreshes block items cache after dynamic changes</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className='font-semibold mb-2'>Example</h4>
                    <CodeBlockDemo code={`import { useEffect, useRef } from "react";
import * as Block from "aria-ease/block";

function TabGroup() {
  const blockRef = useRef(null);

  useEffect(() => {
    blockRef.current = Block.makeBlockAccessible({
      blockId: "tab-group",
      blockItemsClass: "tab-button"
    });

    return () => {
      if (blockRef.current) {
        blockRef.current.cleanup();
      }
    };
  }, []);

  return (
    <div id="tab-group">
      <button className="tab-button">Home</button>
      <button className="tab-button">About</button>
      <button className="tab-button">Contact</button>
    </div>
  );
}`} isLineNumber={true}/>
                  </div>

                  <div className='mt-6 p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50'>
                    <h4 className='font-semibold text-blue-900'>Keyboard Interactions</h4>
                    <ul className='mt-2 text-blue-900 list-disc ml-6'>
                      <li><code className='text-blue-900'>↑/← ↓/→</code> - Navigate between items</li>
                      <li><code className='text-blue-900'>Home</code> - Move to first item</li>
                      <li><code className='text-blue-900'>End</code> - Move to last item</li>
                      <li><code className='text-blue-900'>Tab</code> - Exit focus trap</li>
                    </ul>
                  </div>
                </section>


                {/* Testing API */}
                <section className='mt-[100px]'>
                  <h2 className='text-3xl font-bold mb-4'>Testing</h2>
                  <p className='mb-6'>Automated accessibility testing with contract validation.</p>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>Import</h3>
                    <CodeBlockDemo code={`import { testUiComponent } from "aria-ease/test";`}/>
                  </div>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>testUiComponent(componentName, component, url?)</h3>
                    <p className='mb-4'>Runs axe-core accessibility tests and contract tests.</p>
                    
                    <h4 className='font-semibold mb-2'>Parameters</h4>
                    <div className='overflow-x-auto mb-4'>
                      <table className='w-full border-collapse border border-gray-300 dark:border-gray-600'>
                        <thead className='bg-gray-100 dark:bg-gray-800'>
                          <tr>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Parameter</th>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Type</th>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Required</th>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>componentName</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>string</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Yes</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Component type: &#34;menu&#34;, &#34;accordion&#34;, &#34;block&#34;, etc.</td>
                          </tr>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>component</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>HTMLElement</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>No</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>The rendered component container for fast static test using JSDOM</td>
                          </tr>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>url</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>string</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>No</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>URL for full E2E testing with Playwright</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className='font-semibold mb-2'>Returns</h4>
                    <p className='mb-2'>Promise resolving to test results object:</p>
                    <div className='overflow-x-auto mb-4'>
                      <table className='w-full border-collapse border border-gray-300 dark:border-gray-600'>
                        <thead className='bg-gray-100 dark:bg-gray-800'>
                          <tr>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Property</th>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Type</th>
                            <th className={`border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white`}>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>violations</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Array</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Array of accessibility violations</td>
                          </tr>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>raw</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Object</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Full axe-core results</td>
                          </tr>
                          <tr>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>contract</code></td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Object</td>
                            <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Contract test results</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                <div className='flex flex-wrap gap-4 py-4 mx-auto max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <a href='/docs' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Getting Started</span>
                      </div>
                    </a>
                    <a href='/migration' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Migration Guide</span>
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
  );
};

export default ApiReference;
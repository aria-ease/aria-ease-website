import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState, useEffect, useRef } from 'react';
import SlideOutNav from '../components/SlideOutNav';
import * as Block from 'aria-ease/block';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import CalloutPanel from '../components/CalloutPanel';
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
      
      <main className='page-body-div documentation-page section-tone-a' id="main-content">
        <Container fluid>
          <Row>
            <SideNav page={page}/>
            <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
              <div className='side-body-div docs-flow'>
                <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                  <span className='docs-kicker black-grey-text'>Reference</span>
                  <h1 className='introduction-heading black-white-text'>API <span className='text-gradient'>Reference</span></h1>
                  <p className='mt-2 docs-intro-copy'>Complete reference for all Aria-Ease components and their methods.</p>
                </div>

                {/* Menu API */}
                <section className='side-body-sections-div tone-card tone-card-base docs-section-card'>
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
                    <div className='docs-table-wrap mb-4'>
                      <table className='docs-table'>
                        <thead className='docs-thead'>
                          <tr>
                            <th className='docs-th'>Property</th>
                            <th className='docs-th'>Type</th>
                            <th className='docs-th'>Required</th>
                            <th className='docs-th'>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='docs-td'><code>menuId</code></td>
                            <td className='docs-td'>string</td>
                            <td className='docs-td'>Yes</td>
                            <td className='docs-td'>The ID attribute of the menu container element</td>
                          </tr>
                          <tr>
                            <td className='docs-td'><code>menuItemsClass</code></td>
                            <td className='docs-td'>string</td>
                            <td className='docs-td'>Yes</td>
                            <td className='docs-td'>Shared class name of all menu items</td>
                          </tr>
                          <tr>
                            <td className='docs-td'><code>triggerId</code></td>
                            <td className='docs-td'>string</td>
                            <td className='docs-td'>Yes</td>
                            <td className='docs-td'>The ID attribute of the trigger button</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className='font-semibold mb-2'>Returns</h4>
                    <p className='mb-2'>Object with the following methods:</p>
                    <div className='docs-table-wrap mb-4'>
                      <table className='docs-table'>
                        <thead className='docs-thead'>
                          <tr>
                            <th className='docs-th'>Method</th>
                            <th className='docs-th'>Returns</th>
                            <th className='docs-th'>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='docs-td'><code>cleanup()</code></td>
                            <td className='docs-td'>void</td>
                            <td className='docs-td'>Removes all event listeners and cleans up resources</td>
                          </tr>
                          <tr>
                            <td className='docs-td'><code>openMenu()</code></td>
                            <td className='docs-td'>void</td>
                            <td className='docs-td'>Programmatically opens the menu</td>
                          </tr>
                          <tr>
                            <td className='docs-td'><code>closeMenu()</code></td>
                            <td className='docs-td'>void</td>
                            <td className='docs-td'>Programmatically closes the menu</td>
                          </tr>
                          <tr>
                            <td className='docs-td'><code>refresh()</code></td>
                            <td className='docs-td'>void</td>
                            <td className='docs-td'>Refreshes menu items cache after dynamic changes</td>
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

                  <CalloutPanel tone='info' title='Keyboard Interactions' className='mt-6'>
                    <ul className='mt-2 list-disc ml-6'>
                      <li><code>↑/↓</code> - Navigate menu items</li>
                      <li><code>Enter/Space</code> - Activate menu item</li>
                      <li><code>Escape</code> - Close menu and return focus</li>
                      <li><code>Tab</code> - Exit menu</li>
                    </ul>
                  </CalloutPanel>
                </section>

                {/* Block API */}
                <section className='side-body-sections-div tone-card tone-card-alt docs-section-card'>
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
                    <div className='docs-table-wrap mb-4'>
                      <table className='docs-table'>
                        <thead className='docs-thead'>
                          <tr>
                            <th className='docs-th'>Parameter</th>
                            <th className='docs-th'>Type</th>
                            <th className='docs-th'>Required</th>
                            <th className='docs-th'>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='docs-td'><code>blockId</code></td>
                            <td className='docs-td'>string</td>
                            <td className='docs-td'>Yes</td>
                            <td className='docs-td'>The ID attribute of the block container element</td>
                          </tr>
                          <tr>
                            <td className='docs-td'><code>blockItemsClass</code></td>
                            <td className='docs-td'>string</td>
                            <td className='docs-td'>Yes</td>
                            <td className='docs-td'>Shared class name of all block items</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className='font-semibold mb-2'>Returns</h4>
                    <p className='mb-2'>Object with the following methods:</p>
                    <div className='docs-table-wrap mb-4'>
                      <table className='docs-table'>
                        <thead className='docs-thead'>
                          <tr>
                            <th className='docs-th'>Method</th>
                            <th className='docs-th'>Returns</th>
                            <th className='docs-th'>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='docs-td'><code>cleanup()</code></td>
                            <td className='docs-td'>void</td>
                            <td className='docs-td'>Removes event listeners and cleans up resources</td>
                          </tr>
                          <tr>
                            <td className='docs-td'><code>refresh()</code></td>
                            <td className='docs-td'>void</td>
                            <td className='docs-td'>Refreshes block items cache after dynamic changes</td>
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

                  <CalloutPanel tone='info' title='Keyboard Interactions' className='mt-6'>
                    <ul className='mt-2 list-disc ml-6'>
                      <li><code>↑/← ↓/→</code> - Navigate between items</li>
                      <li><code>Home</code> - Move to first item</li>
                      <li><code>End</code> - Move to last item</li>
                      <li><code>Tab</code> - Exit focus trap</li>
                    </ul>
                  </CalloutPanel>
                </section>


                {/* Testing API */}
                <section className='side-body-sections-div tone-card tone-card-base docs-section-card'>
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
                    <div className='docs-table-wrap mb-4'>
                      <table className='docs-table'>
                        <thead className='docs-thead'>
                          <tr>
                            <th className='docs-th'>Parameter</th>
                            <th className='docs-th'>Type</th>
                            <th className='docs-th'>Required</th>
                            <th className='docs-th'>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='docs-td'><code>componentName</code></td>
                            <td className='docs-td'>string</td>
                            <td className='docs-td'>Yes</td>
                            <td className='docs-td'>Component type: &#34;menu&#34;, &#34;accordion&#34;, &#34;block&#34;, etc.</td>
                          </tr>
                          <tr>
                            <td className='docs-td'><code>component</code></td>
                            <td className='docs-td'>HTMLElement</td>
                            <td className='docs-td'>No</td>
                            <td className='docs-td'>The rendered component container for fast static test using JSDOM</td>
                          </tr>
                          <tr>
                            <td className='docs-td'><code>url</code></td>
                            <td className='docs-td'>string</td>
                            <td className='docs-td'>No</td>
                            <td className='docs-td'>URL for full E2E testing with Playwright</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h4 className='font-semibold mb-2'>Returns</h4>
                    <p className='mb-2'>Promise resolving to test results object:</p>
                    <div className='docs-table-wrap mb-4'>
                      <table className='docs-table'>
                        <thead className='docs-thead'>
                          <tr>
                            <th className='docs-th'>Property</th>
                            <th className='docs-th'>Type</th>
                            <th className='docs-th'>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className='docs-td'><code>violations</code></td>
                            <td className='docs-td'>Array</td>
                            <td className='docs-td'>Array of accessibility violations</td>
                          </tr>
                          <tr>
                            <td className='docs-td'><code>raw</code></td>
                            <td className='docs-td'>Object</td>
                            <td className='docs-td'>Full axe-core results</td>
                          </tr>
                          <tr>
                            <td className='docs-td'><code>contract</code></td>
                            <td className='docs-td'>Object</td>
                            <td className='docs-td'>Contract test results</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 justify-between mt-[100px]'>
                  <a href='/docs' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Getting Started</span>
                      </div>
                    </a>
                    <a href='/migration' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
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
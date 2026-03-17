import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState, useEffect, useRef } from 'react';
import SlideOutNav from '../components/SlideOutNav'
import * as Block from 'aria-ease/block';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const menuCode = `import * as Menu from "aria-ease/menu";

const menuRef = useRef();

useEffect(() => {
  menuRef.current = Menu.makeMenuAccessible({
    menuId: "custom-menu",
    menuItemsClass: "profile-menu-item",
    triggerId: "display-button"
  });

  return () => menuRef.current.cleanup(); // Clean up on unmount
}, []);`
const tabCode = `import * as Block from "aria-ease/block";

const { cleanup } = Block.makeBlockAccessible({
  blockId: 'custom-tab',
  blockItemsClass: 'custom-tab-item'
});

// Clean up when component unmounts
cleanup();`


// eslint-disable-next-line react/prop-types
const Documentation = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'documentation'

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
            <title>Documentation | Aria-Ease</title>
            <meta name="description" content="Comprehensive documentation for Aria-Ease, an open-source accessibility utility library. Learn how to implement accessible web components with ease." />
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
        
        <main className='page-body-div documentation-page' id="main-content">
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
                <div className='side-body-div'>
                  <div className='side-body-sections-div'>
                    <h1 className='introduction-heading'>Getting Started</h1>
                    <p className='mt-2'>Aria-Ease is an open-source utility library that provides utility functions for building production-ready accessible web applications, custom ARIA components and design systems.</p>
                    <p className='mt-2'>This is NOT a component library. The library simply provides utility functions that help to implements accessibility features.</p>
                  </div>
                  <section className='side-body-sections-div'>
                    <h2 className='black-white-text mt-20'>Installation</h2>
                    <p className='my-3'>Run the installation command in your project&#39;s root terminal using your package manager of choice:</p>
                    <div className='flex flex-col gap-3'>
                      <CodeBlockDemo code={'npm i aria-ease'}/>
                      <CodeBlockDemo code={'yarn add aria-ease'}/>
                    </div>
                    <p className='mt-4'>The use of the library as a module with NPM ensures UXProbe loads asynchroniously, by not blocking DOM rendering during <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript#script_loading_strategies" target="_blank" rel="noreferrer" className="text-link-contrast block-interactive underline">script loading</a>. This ensures a smooth user experience for end-users of the monitored application. <a className="text-link-contrast block-interactive underline" href="https://npmjs.com/package/aria-ease" target="_blank" rel="noreferrer">Check out the library in the NPM registry.</a></p>

                    <h2 className='black-white-text mt-20'>CDN</h2>
                    <p className='my-2'>You can use Aria-Ease in vanilla HTML via CDN using ES module imports. This allows you to import only the components you need.</p>
                    <p className='mb-3'>Use a <code>{`<script type="module">`}</code> tag to import components. Place it in the <code>{`<head>`}</code> or before the closing <code>{`</body>`}</code> tag.</p>
                    
                    <div className='mt-4'>
                      <h3 className='text-lg font-semibold mb-2'>Menu Example</h3>
                      <CodeBlockDemo code={`<script type="module">
  import * as Menu from "https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/menu/index.js";

  const menu = Menu.makeMenuAccessible({
    menuId: "dropdown-menu",
    menuItemsClass: "menu-item",
    triggerId: "menu-button"
  });
</script>`} isLineNumber={true}
                      />
                    </div>

                    <div className='mt-6'>
                      <h3 className='text-lg font-semibold mb-2'>Other Components</h3>
                      <p className='mb-2'>Import other components using their specific paths:</p>
                      <CodeBlockDemo code={`// Block
import * as Block from 'https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/block/index.js';

// Accordion
import * as Accordion from 'https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/accordion/index.js';

// Checkbox
import * as Checkbox from 'https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/checkbox/index.js';

// Radio
import * as Radio from 'https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/radio/index.js';

// Toggle
import * as Toggle from 'https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/toggle/index.js';`} isLineNumber={true}
                      />
                    </div>
                  </section>
                  <section className='side-body-sections-div'>
                    <h2 className='black-white-text mt-20'>Usage</h2>
                    <>
                      <p className='mt-2'>
                        <b className='features-function'>Menu.makeMenuAccessible:</b>
                        This method adds keyboard interactions accessibility to a custom menu. 
                      </p>
                      <p className='feature-function-info-text'>The method creates a focus trap within the menu and focus can be navigated using the Arrow keys and Tab key. When the menu opens, the first interactive element receives focus. The Escape key closes the menu and returns the focus back to the trigger button. The Enter and Space keys &quot;click&quot; the interactive element (currently supports buttons, links, radios and checkboxes).</p>
                      <p className='mt-2 mb-2'>The method takes an object argument with three properties:</p>
                      <ul className='list-disc ml-6 mt-2 mb-3'>
                        <li><code>menuId</code>: The id of the menu div</li>
                        <li><code>menuItemsClass</code>: The class name of the menu items children</li>
                        <li><code>triggerId</code>: The id of the menu trigger button</li>
                      </ul>
                      <p className='mb-2'>The method returns an object with four methods: <code>cleanup()</code>, <code>openMenu()</code>, <code>closeMenu()</code>, and <code>refresh()</code>.</p>
                      <CodeBlockDemo code={menuCode} isLineNumber={true}/>
                      <p style={{marginTop: '24px'}}>The method should only be called after the menu has been added to the DOM. Always call <code>cleanup()</code> when the component unmounts to prevent memory leaks.</p>
                    </>

                    <>
                      <p style={{marginTop: '50px'}}>
                        <b className='features-function'>menuRef.current.openMenu():</b>
                        This method programmatically opens the menu and updates ARIA attributes. 
                      </p>
                      <p className='mb-2 mt-6'>Call this method to open a menu. It displays the menu and updates the aria-expanded attribute of the menu trigger button to indicate that the menu is open.</p>
                      <CodeBlockDemo code={'menuRef.current.openMenu();'}/>
                    </>

                    <>
                      <p style={{marginTop: '50px'}}>
                        <b className='features-function'>menuRef.current.closeMenu():</b>
                        This method programmatically closes the menu and updates ARIA attributes. 
                      </p>
                      <p className='mb-2'>Call this method to close a menu. It hides the menu and updates the aria-expanded attribute of the menu trigger button to indicate that the menu is closed.</p>
                      <CodeBlockDemo code={'menuRef.current.closeMenu();'}/>
                      
                      <p style={{marginTop: '50px'}}>
                        <b className='features-function'>menuRef.current.refresh():</b>
                        This method refreshes the internal cache of menu items. 
                      </p>
                      <p className='mb-2'>Call this method when you dynamically add or remove menu items. This ensures the keyboard interaction correctly handles the updated menu structure.</p>
                      <CodeBlockDemo code={'menuRef.current.refresh();'}/>
                      
                      <p style={{marginTop: '50px'}}>
                        <b className='features-function'>menuRef.current.cleanup():</b>
                        This method removes all event listeners and cleans up resources. 
                      </p>
                      <p className='mb-2'>Always call this method when your component unmounts to prevent memory leaks. This is essential for proper resource management.</p>
                      <CodeBlockDemo code={'return () => menuRef.current.cleanup();'}/>
                    </>

                    <>
                      <p style={{marginTop: '50px'}}>
                        <b className='features-function'>Block.makeBlockAccessible:</b>
                        This method adds keyboard interactions accessibility to a block.
                      </p>
                      <p>A block can be headers, tabs, entire web pages (requires more diligence in DOM tree structuring and user experience design), interactive sliders and carousels e.t.c. Basically any component that is permanently displayed, unlike a menu that toggles display, and has a list of interactive children items.</p>
                      <p className='feature-function-info-text'>The method creates a focus trap within the block and focus can be navigated using the Arrow keys and Tab key. The Enter and Space keys &quot;click&quot; the interactive element (currently supports buttons, links, radios and checkboxes).</p>
                      <p className='mb-2'>The method takes an object argument with two properties:</p>
                      <ul className='list-disc ml-6 mt-2 mb-3'>
                        <li><code>blockId</code>: The id of the block div</li>
                        <li><code>blockItemsClass</code>: The class name of the block items children</li>
                      </ul>
                      <p className='mb-2'>The method returns an object with two methods: <code>cleanup()</code>, and <code>refresh()</code>.</p>
                      <CodeBlockDemo code={tabCode} isLineNumber={true}/>
                      <p style={{marginTop: '24px'}}>Call the method on page render, in order for the event listeners to be added as soon as the page loads. Always call the cleanup function to prevent memory leaks. The refresh method can be called after an element has been dynamically added/removed from the block.</p>
                      <p className='mb-2 mt-4'>The method can be used to add keyboard interactions functionalities to all the interactive elements on a web page (check out the implementation example on this website):</p>
                      <CodeBlockDemo code={`const { cleanup } = Block.makeBlockAccessible({
  blockId: 'page-div',
  blockItemsClass: 'interactive-items'
});

// Later, when cleaning up
cleanup();`} isLineNumber={true}/>
                    </>
                  </section>

                  <section className='side-body-sections-div'>
                    <h2 className='black-white-text mt-20'>Testing Your Components</h2>
                    <p className='my-3'>Aria-Ease includes a built-in testing framework for automated accessibility validation. The <code>testUiComponent(...)</code> function runs both axe-core static tests and contract tests to ensure your custom ARIA components meet WCAG guidelines.</p>

                    <div className='mt-6'>
                      <h3 className='text-lg font-semibold'>Contract Testing</h3>
                      <p className='mt-2'>Contract tests verify that your components follow APG guidelines for custom ARIA components by testing keyboard interactions, focus management, and ARIA attribute updates. These tests run in two modes:</p>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><strong>jsdom mode (Fast):</strong> Tests static functionality without browser overhead</li>
                        <li><strong>Playwright mode (Complete):</strong> Tests full keyboard interactions in a real browser</li>
                      </ul>
                    </div>

                    <div className='mt-6'>
                      <h3 className='text-lg font-semibold'>Basic Usage</h3>
                      <CodeBlockDemo code={`
                        import { describe, test, afterAll } from "vitest";
import { testUiComponent, cleanupTests } from "aria-ease/test";
import { render } from "@testing-library/react";
import ShopifyUserMenu from "../src/components/menus/ShopifyUserMenu";


afterAll(async () => {
  await cleanupTests();
});

describe("Shopify User Menu Accessibility Test", () => {
  test("renders Shopify user menu without accessibility violation(s)", async () => {
    await testUiComponent(
      "menu", 
      null, 
      "http://localhost:5173/test-harness?component=menu"
    ); // For full component interaction test. Uses Playwright to test interaction and behaviors
  });
});

describe("Shopify User Menu Accessibility Test", () => {
  test("renders Shopify user menu without accessibility violation(s)", async () => {
    const { container } = render(<ShopifyUserMenu/>)
    await testUiComponent(
      "menu", 
      container,
      null
    ); // For fast limited static tests. Doesn't test for interaction and behaviors
  });
});`} 
                        isLineNumber={true}
                      />
                    </div>

                    <div className='mt-6'>
                      <h3 className='text-lg font-semibold'>Testing Options</h3>
                      <p className='mt-2'>The <code>testUiComponent(...)</code> function accepts three parameters:</p>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>componentName</code>: The component type to test (e.g., &#34;menu&#34;, &#34;accordion&#34;, &#34;block&#34;)</li>
                        <li><code>component</code> (optional): The rendered component container (HTMLElement). For jsdom-only tests</li>
                        <li><code>url</code> (recommended): URL for full Playwright E2E tests. Omit for jsdom-only tests</li>
                      </ul>
                    </div>

                    <div className='mt-6'>
                      <h3 className='text-lg font-semibold'>Test Results</h3>
                      <p className='mt-2'>The function returns an object with:</p>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>violations</code>: Array of axe-core accessibility violations</li>
                        <li><code>raw</code>: Full axe-core results object</li>
                        <li><code>contract</code>: Contract test results with passes and failures</li>
                      </ul>
                    </div>

                    <div className='mt-6 p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50'>
                      <p className='text-yellow-900'><strong>Note:</strong> For Playwright tests, ensure your development server is running before executing tests.</p>
                    </div>
                  </section>

                  <section className='side-body-sections-div'>
                    <h2 className='black-white-text mt-20'>Bundle Size & Tree-Shaking</h2>
                    <p className='my-3'>Aria-Ease is designed to be lightweight and tree-shakable. Always import individual component utility for optimal bundle size:</p>

                    <div className='mt-4'>
                      <CodeBlockDemo code={`// ✅ Good - only imports menu code (~3.7KB)\nimport * as Menu from "aria-ease/menu";\n\n// ✅ Good - only imports block code (~1.7KB)\nimport * as Block from "aria-ease/block";\n\n// ❌ Avoid - imports everything (~416KB)\nimport * as Menu from "aria-ease";`} isLineNumber={true}/>
                    </div>

                    <div className='mt-6'>
                      <h3 className='text-lg font-semibold'>Component Sizes</h3>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>aria-ease/accordion</code>: ~1.5KB</li>
                        <li><code>aria-ease/checkbox</code>: ~1.6KB</li>
                        <li><code>aria-ease/radio</code>: ~1.6KB</li>
                        <li><code>aria-ease/toggle</code>: ~1.4KB</li>
                        <li><code>aria-ease/menu</code>: ~3.7KB</li>
                        <li><code>aria-ease/block</code>: ~1.7KB</li>
                      </ul>
                    </div>
                  </section>

                  <div className='flex flex-wrap gap-4 py-4 mx-auto max-w-7xl md:py-12 mt-[100px] justify-end'>
                    <a href='/api' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>API Reference</span>
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

export default Documentation
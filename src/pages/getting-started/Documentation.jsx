import { useState } from 'react';
import SlideOutNav from '../../components/SlideOutNav'
import CodeBlockDemo from '../../components/CodeBlock';
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import CalloutPanel from '../../components/CalloutPanel';
import DocsFrame from '../../components/DocsFrame';
import Terminal from '../../components/Terminal';
import { Link } from 'react-router-dom';

const menuCode = `
import * as Menu from "aria-ease/menu";

const menuRef = useRef();

useEffect(() => {
  menuRef.current = Menu.makeMenuAccessible({
    menuId: "custom-menu",
    menuItemsClass: "profile-menu-item",
    triggerId: "display-button",
    callback: {
      onExpandedChange: (expanded) => {
        // Do something when 
        console.log(expanded);
      }
    }
  });

  return () => menuRef.current.cleanup(); // Clean up on unmount
}, []);`

const blockCode = `
import * as Block from "aria-ease/block";

const { cleanup } = Block.makeBlockAccessible({
  blockId: 'custom-tab',
  blockItemsClass: 'custom-tab-item'
});

// Clean up when component unmounts
cleanup();`

const menuCDNCode = `
<script type="module">
  import * as Menu from "https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/menu/index.js";

  const menu = Menu.makeMenuAccessible({
    menuId: "dropdown-menu",
    menuItemsClass: "menu-item",
    triggerId: "menu-button",
    callback: {
      onExpandedChange: (expanded) => {
        // Do something when 
        console.log(expanded);
      }
    }
  });
</script>`

const otherCDNCode = `
// Block
import * as Block from 'https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/block/index.js';

// Accordion
import * as Accordion from 'https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/accordion/index.js';

// Checkbox
import * as Checkbox from 'https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/checkbox/index.js';

// Radio
import * as Radio from 'https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/radio/index.js';

// Toggle
import * as Toggle from 'https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/toggle/index.js';`

const importsCode = `
// ✅ Good - only imports menu code (~5.05KB)
import * as Menu from "aria-ease/menu";
 
// ✅ Good - only imports block code (~1.83KB)
import * as Block from "aria-ease/block";

// ❌ Avoid - imports everything (~544KB)
import * as Menu from "aria-ease";`

const contractTestingCode = `
import { describe, test, afterAll } from "vitest";
import { testUiComponent, cleanupTests } from "aria-ease/test";


afterAll(async () => {
  await cleanupTests();
});

describe("Menu WAI-ARIA Accessibility Test", () => {
  test("Menu meets Aria-Ease's baseline for WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("menu", "http://localhost:5173/test-harness?component=menu", { strictness: "balanced" });
  });
});

describe("Combobox with Listbox popup WAI-ARIA Accessibility Test", () => {
  test("Combobox with Listbox popup meets Aria-Ease's baseline for WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("combobox", "http://localhost:5173/test-harness?component=combobox");
  });
});
`

// eslint-disable-next-line react/prop-types
const Documentation = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'documentation';
          
  return (

    
    <div id="inner-body-div">
      <Helmet>
        <title>Getting Started | Aria-Ease</title>
        <meta name="description" content="Comprehensive documentation for Aria-Ease, an open-source accessibility utility library. Learn how to implement accessible web components with ease." />
        <meta name="keywords" content="aria-ease, documentation, getting started, accessible web components, JavaScript library, accessibility utilities" />
        <meta name="og:title" content="Getting Started | Aria-Ease" />
        <meta name="og:description" content="Comprehensive documentation for Aria-Ease, an open-source accessibility utility library. Learn how to implement accessible web components with ease." />
        <meta name="og:url" content="https://ariaease.site/getting-started" />
        <meta name="twitter:title" content="Getting Started | Aria-Ease" />
        <meta name="twitter:description" content="Comprehensive documentation for Aria-Ease, an open-source accessibility utility library. Learn how to implement accessible web components with ease." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <DocsFrame
        page={page}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showDropdownPage={showDropdownPage}
        setShowDropdownPage={setShowDropdownPage}
      >
        <div className='side-body-div docs-flow'>
                  <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                    <span className='docs-kicker black-grey-text'>Getting Started</span>
                    <h1 className='introduction-heading black-white-text'>Getting Started with <span className='text-gradient'>Aria-Ease</span></h1>
                    <p className='mt-2'>Aria-Ease is an accessibility infrastructure for frontend engineering lifecycles. It bundles static audit, reusable baseline component utilities, automated component behavior testing, and CI/CD integration, in one lightweight, DX-friendly system. It helps developers and teams define, validate, and enforce accessibility behavior. Plus it&#39;s free and open source.</p>
                  </div>
                  <section className='side-body-sections-div docs-section-card'>
                    <h2>Installing Aria-Ease</h2>
                    <p className='my-3'>Run any of these commands to install Aria-Ease into an existing project</p>
                    <div className='flex flex-col gap-3'>
                      <CodeBlockDemo code={'npm i aria-ease'}/>
                      <CodeBlockDemo code={'yarn add aria-ease'}/>
                    </div>
                    <p className='mt-4'>The use of the library as a module with NPM ensures Aria-Ease loads asynchroniously, by not blocking DOM rendering during <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript#script_loading_strategies" target="_blank" rel="noreferrer" className="text-link-contrast block-interactive underline">script loading</a>.</p>

                    <h2 className='black-white-text mt-5'>CDN</h2>
                    <p className='my-2'>You can use Aria-Ease in vanilla HTML via CDN using ES module imports. This allows you to import only the component utility you need.</p>
                    <p className='mb-3'>Use a <code>{`<script type="module">`}</code> tag to import components. Place it in the <code>{`<head>`}</code> or before the closing <code>{`</body>`}</code> tag.</p>
                    
                    <div className='mt-4'>
                      <h3 className='text-lg font-semibold mb-2'>Menu CDN JS</h3>
                      <Terminal title={"MenuCDN.js"} darkMode={darkMode} lang={'js'}>
                        {menuCDNCode}
                      </Terminal>
                    </div>

                    <div className='mt-6'>
                      <h3 className='text-lg font-semibold mb-2'>Other Components</h3>
                      <p className='mb-2'>Import other components using their specific paths:</p>
                      <Terminal title={"OtherComponentsCDN.js"} darkMode={darkMode} lang={'js'}>
                        {otherCDNCode}
                      </Terminal>
                    </div>
                  </section>
                  <section className='side-body-sections-div docs-section-card'>
                    <h2>Create Menu Component</h2>
                    <>
                      <p className='mt-3'>
                        <b className='black-white-text mr-[5px]'>Menu.makeMenuAccessible:</b>
                        This method adds keyboard interactions accessibility to a custom menu. 
                      </p>
                      <p className='mt-2'>The method creates a focus trap within the menu and focus can be navigated using the Arrow keys and Tab key. When the menu opens, the first interactive element receives focus. The Escape key closes the menu and returns the focus back to the trigger button. The Enter and Space keys &quot;click&quot; the interactive element (currently supports buttons, links, radios and checkboxes).</p>
                      <p className='mt-2 mb-2'>The method takes an object argument with three properties:</p>
                      <ul className='list-disc ml-6 mt-2 mb-3'>
                        <li><code>menuId</code>: The id of the menu div</li>
                        <li><code>menuItemsClass</code>: The class name of the menu items children</li>
                        <li><code>triggerId</code>: The id of the menu trigger button</li>
                      </ul>
                      <p className='mb-2'>The method returns an object with four methods: <code>cleanup()</code>, <code>openMenu()</code>, <code>closeMenu()</code>, and <code>refresh()</code>.</p>
                      <Terminal title={"Menu.jsx"} darkMode={darkMode} lang={'js'}>
                        {menuCode}
                      </Terminal>
                      <p style={{marginTop: '24px'}}>The method should only be called after the menu has been added to the DOM. Always call <code>cleanup()</code> when the component unmounts to prevent memory leaks.</p>
                    </>

                    <>
                      <p style={{marginTop: '50px'}}>
                        <b className='black-white-text mr-[5px]'>menuRef.current.openMenu():</b>
                        This method programmatically opens the menu and updates ARIA attributes. 
                      </p>
                      <p className='mb-2 mt-6'>Call this method to open a menu. It displays the menu and updates the aria-expanded attribute of the menu trigger button to indicate that the menu is open.</p>
                      <CodeBlockDemo code={'menuRef.current.openMenu();'}/>
                    </>

                    <>
                      <p style={{marginTop: '50px'}}>
                        <b className='black-white-text mr-[5px]'>menuRef.current.closeMenu():</b>
                        This method programmatically closes the menu and updates ARIA attributes. 
                      </p>
                      <p className='mb-2'>Call this method to close a menu. It hides the menu and updates the aria-expanded attribute of the menu trigger button to indicate that the menu is closed.</p>
                      <CodeBlockDemo code={'menuRef.current.closeMenu();'}/>
                      
                      <p style={{marginTop: '50px'}}>
                        <b className='black-white-text mr-[5px]'>menuRef.current.refresh():</b>
                        This method refreshes the internal cache of menu items. 
                      </p>
                      <p className='mb-2'>Call this method when you dynamically add or remove menu items. This ensures the keyboard interaction correctly handles the updated menu structure.</p>
                      <CodeBlockDemo code={'menuRef.current.refresh();'}/>
                      
                      <p style={{marginTop: '50px'}}>
                        <b className='black-white-text mr-[5px]'>menuRef.current.cleanup():</b>
                        This method removes all event listeners and cleans up resources. 
                      </p>
                      <p className='mb-2'>Always call this method when your component unmounts to prevent memory leaks. This is essential for proper resource management.</p>
                      <CodeBlockDemo code={'return () => menuRef.current.cleanup();'}/>
                    </>

                    <>
                      <p style={{marginTop: '50px'}}>
                        <b className='black-white-text mr-[5px]'>Block.makeBlockAccessible:</b>
                        This method adds keyboard interactions accessibility to a block.
                      </p>
                      <p>A block can be headers, tabs, entire web pages (requires more diligence in DOM tree structuring and user experience design), interactive sliders and carousels e.t.c. Basically any component that is permanently displayed, unlike a menu that toggles display, and has a list of interactive children items.</p>
                      <p className='mt-5'>The method creates a focus trap within the block and focus can be navigated using the Arrow keys and Tab key. The Enter and Space keys &quot;click&quot; the interactive element (currently supports buttons, links, radios and checkboxes).</p>
                      <p className='mb-2'>The method takes an object argument with two properties:</p>
                      <ul className='list-disc ml-6 mt-2 mb-3'>
                        <li><code>blockId</code>: The id of the block div</li>
                        <li><code>blockItemsClass</code>: The class name of the block items children</li>
                      </ul>
                      <p className='mb-2'>The method returns an object with two methods: <code>cleanup()</code>, and <code>refresh()</code>.</p>
                      <Terminal title={"Block.jsx"} darkMode={darkMode} lang={'js'}>
                        {blockCode}
                      </Terminal>
                      <p style={{marginTop: '24px'}}>Call the method on page render, in order for the event listeners to be added as soon as the page loads. Always call the cleanup function to prevent memory leaks. The refresh method can be called after an element has been dynamically added/removed from the block.</p>
                    </>
                  </section>

                  <section className='side-body-sections-div docs-section-card'>
                    <h2>Testing Your Component</h2>
                    <p className='my-3'>Aria-Ease includes a built-in testing framework for deterministic component behavior validation. The <code>testUiComponent(...)</code> function runs contract tests to ensure your components meet your team&#39;s accessibility policy and doesn&#39;t regress.</p>

                    <div className='mt-6'>
                      <h3 className='text-lg font-semibold'>Contract Testing</h3>
                      <p className='mt-2'>Contract tests verify that your components follow your accessibility policy for deterministic behaviors like keyboard interactions, focus management, and ARIA attribute updates.</p>
                    </div>

                    <div className='mt-6'>
                      <h3 className='text-lg font-semibold mb-2'>Basic Usage</h3>
                      <Terminal title={"ariaease.test.js"} darkMode={darkMode} lang={'js'}>
                        {contractTestingCode}
                      </Terminal>
                    </div>

                    <div className='mt-6'>
                      <h3 className='text-lg font-semibold'>Testing Options</h3>
                      <p className='mt-2'>The <code>testUiComponent(...)</code> function accepts three parameters:</p>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>componentName</code>: The component type to test (e.g., &#34;menu&#34;, &#34;accordion&#34;, &#34;combobox&#34;)</li>
                        <li><code>url</code>: URL of the component&#39;s test harness page</li>
                        <li><code>options</code> (optional): Component specific configuration (e.g., strictness)</li>
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

                    <CalloutPanel tone='yellow' className='mt-6'>
                      <p><strong>Note:</strong> For Playwright tests, ensure your development server is running before executing tests.</p>
                    </CalloutPanel>

                    
                  </section>

                  <section className='side-body-sections-div docs-section-card'>
                    <h2>Bundle Size & Tree-Shaking</h2>
                    <p className='my-3'>Aria-Ease is designed to be lightweight and tree-shakable. Always import individual component utility for optimal bundle size:</p>

                    <div className='mt-4'>
                      <Terminal title={"ES Module Imports for Optimal Bundle Size"} darkMode={darkMode} lang={'js'}>
                        {importsCode}
                      </Terminal>
                    </div>

                    <div className='mt-6'>
                      <h3 className='text-lg font-semibold'>Component Utility Sizes</h3>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>aria-ease/accordion</code>: ~2.98KB</li>
                        <li><code>aria-ease/checkbox</code>: ~1.86KB</li>
                        <li><code>aria-ease/radio</code>: ~1.81KB</li>
                        <li><code>aria-ease/toggle</code>: ~2KB</li>
                        <li><code>aria-ease/menu</code>: ~5.05KB</li>
                        <li><code>aria-ease/block</code>: ~1.83KB</li>
                        <li><code>aria-ease/tabs</code>: ~4.32KB</li>
                        <li><code>aria-ease/combobox</code>: ~4.46KB</li>
                      </ul>
                    </div>
                  </section>

                  <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-end'>
                    <Link to='/api' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>API Reference</span>
                      </div>
                      <ChevronRightCircleIcon/>
                    </Link>
                  </div>
                </div>
      </DocsFrame>
        
        <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>

  )
}

export default Documentation
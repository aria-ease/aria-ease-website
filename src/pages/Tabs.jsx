import { useState, useEffect, useRef } from 'react';
import HorizontalTabs from '../components/tabs/HorizontalTabs';
import VerticalTabs from '../components/tabs/VerticalTabs';
import CodeBlock from '../components/CodeBlock.jsx';
import ScrollTracker from '../components/ScrollTracker.js';
import * as Block from 'aria-ease/block';
import Header from '../components/Header.jsx';
import SlideOutNav from '../components/SlideOutNav.jsx';
import SideNav from '../components/SideNav.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { ChevronRightCircleIcon } from 'lucide-react';
import CodeBlockDemo from '../components/CodeBlock.jsx';
import CalloutPanel from '../components/CalloutPanel';


// eslint-disable-next-line react/prop-types
const Tabs = ({ darkMode, setDarkMode }) => {
  const page = 'tabs';
  const [showDropdownPage, setShowDropdownPage] = useState(false);
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

  const importTabs = "import * as Tabs from 'aria-ease/tabs';";

  const basicSetup = `const tabsRef = useRef(null);

useEffect(() => {
  tabsRef.current = Tabs.makeTabsAccessible({
    tabListId: "product-tabs",
    tabsClass: "product-tab",
    tabPanelsClass: "product-panel",
    orientation: "horizontal", // or "vertical"
    activateOnFocus: true, // automatic activation (default: true)
    callback: {
        onTabChange: (activeIndex, previousIndex) => {
        console.log(\`Tab changed from \${previousIndex} to \${activeIndex}\`);
        // Use this to track tab changes, update analytics, load content, etc.
        },
        onContextMenu: (tabIndex) => {
        console.log(\`Context menu opened for tab \${tabIndex}\`);
        // Handle right-click (MacOS) or Shift+F10 (Windows) on tabs
        // Show custom context menu, tab options, etc.
        }
    }
  });

  return () => {
    if (tabsRef.current) {
      tabsRef.current.cleanup();
    }
  };
}, []);`;

  

  const horizontalHTML = `<div>
  <div id="product-tabs" aria-label="Product Info">
    <button class="product-tab">Overview</button>
    <button class="product-tab">Features</button>
    <button class="product-tab">Pricing</button>
  </div>
  
  <div class="product-panel">
    <h2>Product Overview</h2>
    <p>Overview content here...</p>
  </div>
  
  <div class="product-panel">
    <h2>Key Features</h2>
    <ul>
      <li>Feature 1</li>
      <li>Feature 2</li>
    </ul>
  </div>
  
  <div class="product-panel">
    <h2>Pricing</h2>
    <p>Pricing details...</p>
  </div>
</div>`;

  const verticalHTML = `<div class="flex gap-5">
  <div id="settings-tabs" aria-label="Settings">
    <button class="settings-tab">Profile</button>
    <button class="settings-tab">Notifications</button>
    <button class="settings-tab">Security</button>
  </div>
  
  <div>
    <div class="settings-panel">
      <h2>Profile Settings</h2>
      <form><!-- Profile form --></form>
    </div>
    
    <div class="settings-panel">
      <h2>Notification Preferences</h2>
      <!-- Notification options -->
    </div>
    
    <div class="settings-panel">
      <h2>Security Settings</h2>
      <form><!-- Security form --></form>
    </div>
  </div>
</div>`;

  const manualActivation = `Tabs.makeTabsAccessible({
  tabListId: "manual-tabs",
  tabsClass: "manual-tab",
  tabPanelsClass: "manual-panel",
  orientation: "horizontal",
  activateOnFocus: false, // Manual activation mode
  // With manual activation:
  // - Arrow keys move focus but don't activate tabs
  // - User must press Enter or Space to activate the focused tab
  // - Useful for tabs with heavy content that shouldn't load until explicitly selected
});`;

  const refreshExample = `const tabsRef = useRef(null);

// Initialize tabs
tabsRef.current = Tabs.makeTabsAccessible({
  tabListId: "dynamic-tabs",
  tabsClass: "dynamic-tab",
  tabPanelsClass: "dynamic-panel"
});

// Later, after dynamically adding/removing tabs:
function addNewTab() {
  const tabList = document.getElementById("dynamic-tabs");
  const newTab = document.createElement("button");
  newTab.className = "dynamic-tab";
  newTab.textContent = "New Tab";
  tabList.appendChild(newTab);
  
  const newPanel = document.createElement("div");
  newPanel.className = "dynamic-panel";
  newPanel.textContent = "New panel content";
  document.body.appendChild(newPanel);
  
  // Refresh to pick up the new tab/panel
  if (tabsRef.current) {
    tabsRef.current.refresh();
  }
}`;

  const activateTabExample = `const tabsRef = useRef(null);

tabsRef.current = Tabs.makeTabsAccessible({
  tabListId: "product-tabs",
  tabsClass: "product-tab",
  tabPanelsClass: "product-panel"
});

// Programmatically activate a specific tab
function goToReviews() {
  if (tabsRef.current) {
    tabsRef.current.activateTab(3); // Activate 4th tab (0-indexed)
  }
}`;

  return (
    <div id="inner-body-div">
      <Helmet>
            <title>Combobox | Aria-Ease</title>
            <meta name="description" content="Explore how to use the Aria-Ease combobox utility for building accessible comboboxes with complete keyboard interaction, focus management, and ARIA attributes." />
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

        <main className="page-body-div documentation-page section-tone-a" id="main-content">
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
                <div className='side-body-div docs-flow'>
                  <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                    <span className='docs-kicker black-grey-text'>Documentation</span>
                    <h1 className='introduction-heading black-white-text'>Tabs <span className='text-gradient'>Utility</span></h1>
                    <p className='mt-2 docs-intro-copy'>Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time. Each tab panel has an associated tab element, that when activated, displays the panel. The list of tab elements is arranged along one edge of the currently displayed panel, most commonly the top edge.</p>
                  </div>

                  <CalloutPanel title='Bundle Size' tone='info'>
                    <p className='mt-2'>The tabs component is tree-shakable and weighs approximately <strong>32KB</strong> when imported individually.</p>
                    <code className='block mt-2 p-2 text-sm'>
                      <p>import * as Tabs from &quot;aria-ease/tabs&quot;;</p>
                      <p className='my-4'>or</p>
                      <p>import &#123; makeTabsAccessible &#125; from &quot;aria-ease/tabs&quot;;</p>
                    </code>
                  </CalloutPanel>
                  
                  <section>
                    <h2>Features</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>✨ Automatic ARIA attribute management</li>
                      <li>⌨️ Built-in keyboard interaction (Arrow keys, Home, End, Enter, Space)</li>
                      <li>🔧 Programmatic control methods</li>
                      <li>🧹 Automatic cleanup on unmount</li>
                      <li>🔄 Horizontal and vertical tab support</li>
                    </ul>
                  </section>

                  <section>
                      <h2>Common Use Cases</h2>
                      <ul className='list-disc ml-6 mt-2'>
                        <li>Content organization: Group related content into separate panels for better readability.</li>
                        <li>Dashboard interfaces: Use tabs to switch between different views or data sets.</li>
                        <li>Settings pages: Organize settings into categories for easier navigation.</li>
                        <li>Mobile interfaces: Save screen space by using tabs to toggle between content sections.</li>
                        <li>Forms with multiple steps: Use tabs to break down complex forms into manageable sections.</li>
                      </ul>
                  </section>

                  <section>
                    <h2>WAI-ARIA Roles, States, and Properties</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>The element that serves as the container for the set of tabs has role tablist.</li>
                      <li>Each element that serves as a tab has role tab and is contained within the element with role tablist.</li>
                      <li>Each element that contains the content panel for a tab has role tabpanel.</li>
                      <li>If the tab list has a visible label, the element with role tablist has aria-labelledby set to a value that refers to the labelling element. Otherwise, the tablist element has a label provided by aria-label.</li>
                      <li>Each element with role tab has the property aria-controls referring to its associated tabpanel element.</li>
                      <li>The active tab element has the state aria-selected set to true and all other tab elements have it set to false.</li>
                      <li>Each element with role tabpanel has the property aria-labelledby referring to its associated tab element.</li>
                      <li>If a tab element has a popup menu, it has the property aria-haspopup set to either menu or true.</li>
                      <li>If the tablist element is vertically oriented, it has the property aria-orientation set to vertical. The default value of aria-orientation for a tablist element is horizontal.</li>
                    </ul>
                  </section>

                  <section>
                    <h2>What the Utility Handles Automatically</h2>
                    <p className='mt-2'>The <code>makeTabsAccessible</code> utility automatically sets and manages all required ARIA attributes:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>role=&quot;tablist&quot;</code> on the tabs container element</li>
                      <li><code>role=&quot;tab&quot;</code> on each tab element</li>
                      <li><code>role=&quot;tabpanel&quot;</code> on each tab panel element</li>
                      <li><code>aria-controls</code> - links each tab to its corresponding panel</li>
                      <li><code>aria-selected</code> - marks the currently selected/focused option</li>
                      <li><code>display</code> - toggles the display of the corresponding tab panel</li>
                    </ul>
                    
                    <p className='mt-2'>You only need to provide the HTML structure with IDs and class names.</p>
                  </section>

                  

                  <section>
                    <h2 className='break-words'>makeTabsAccessible</h2>
                    <p className='mt-2'>The <code>makeTabsAccessible(...)</code> method is your one-stop solution for accessible tabs.</p>
                    <p className='mt-2'>This function handles all tab complexity - you provide clean HTML with IDs and class names, and it manages ARIA attributes, keyboard interactions, mouse support, and focus behavior. You no longer need to manually set aria-selected, aria-controls, aria-labelledby, or manage focus.</p>

                    <CalloutPanel title='Key Features' tone='success' className='mt-6' titleAs='h3'>
                      <ul className='list-disc ml-4 mt-2'>
                        <li>Automatic ARIA attribute management (aria-selected, aria-controls, roles)</li>
                        <li>Complete keyboard interaction following W3C APG specifications</li>
                        <li>Built-in mouse support with hover and click handling</li>
                        <li>Focus management pattern</li>
                        <li>Event callbacks for tab changes and context menu</li>
                        <li>No manual state management required</li>
                        </ul>
                      </CalloutPanel>
                  </section>

                  <section>
                    <h2>Configuration Options</h2>
                    <ul className='list-disc ml-6 mt-2'>
                        <li><code>tabListId</code>: ID of the tab list element (required)</li>
                        <li><code>tabsClass</code>: Shared class name for all tab elements (required)</li>
                        <li><code>tabPanelsClass</code>:  Shared class name for all tab panel elements (required)</li>
                        <li><code>orientation</code>: &quot;horizontal&quot; (default) or &quot;vertical&quot;</li>
                        <li><code>activateOnFocus</code>: If true, focusing a tab with keyboard will also activate it (default: false)</li>
                        <li><code>callback.onTabChange</code>: Optional callback function that receives activeIndex and previousIndex whenever the active tab changes</li>
                    </ul>
                  </section>

                  <section>
                    <h2>Returns:</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>cleanup()</code>: Remove event listeners</li>
                      <li><code>refresh()</code>: Re-initialize combobox (useful for dynamic content)</li>
                      <li><code>activateTab(index)</code>: Activate a specific tab by index (0-based)</li>
                    </ul>
                  </section>

                  <section>
                    <p className='mb-2'>Import the utility:</p>
                      <CodeBlockDemo code={importTabs}/>

                      <p className='mb-2 mt-6'>Basic setup with callbacks:</p>
                      <CodeBlockDemo code={basicSetup} isLineNumber={true}/>


                      <p className='mb-2 mt-6'>Minimal HTML structure (no ARIA attributes needed):</p>
                      <CodeBlockDemo code={horizontalHTML} isLineNumber={true}/>
                      
                      <CalloutPanel tone='success' className='mt-4'>
                        <p>
                          <strong>Notice:</strong> You don&#39;t need to add <code>role</code>, <code>aria-selected</code>, <code>aria-controls</code>, or any other ARIA attributes manually. The utility sets everything automatically.
                        </p>
                      </CalloutPanel>
                  </section>

                  <section>
                        <h2>Manual Activation Mode</h2>
                        <p className='mb-2'>
                            By default, tabs activate automatically when focused (activateOnFocus: true). For tabs with
                            heavy content or when you want users to explicitly confirm their selection, use manual activation mode.
                        </p>
                        <CodeBlock code={manualActivation} language='javascript' />
                    </section>

                    {/* Programmatic Control */}
                    <section>
                        <h2 className='mb-1'>Programmatic Control</h2>
                        <p className='mb-2'>
                            Use the returned instance methods to control tabs programmatically.
                        </p>
                        <CodeBlock code={activateTabExample} language='javascript' />
                        </section>

                        {/* Dynamic Tabs */}
                        <section>
                        <h2 className='mb-1'>Dynamic Tabs</h2>
                        <p className='mb-2'>
                            If you add or remove tabs dynamically, call refresh() to update the library&#39;s internal state.
                        </p>
                        <CodeBlock code={refreshExample} language='javascript' />
                    </section>

                  <section>
                    <h2>Keyboard Interaction (Built-in)</h2>
                    <p className='mt-2'>The utility provides complete keyboard support following W3C APG specifications:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>↓</code>: Moves focus to next tab (vertical orientation)</li>
                      <li><code>↑</code>: Moves focus to previous tab (vertical orientation)</li>
                      <li><code>→</code>: Moves focus to next tab (horizontal orientation)</li>
                      <li><code>←</code>: Moves focus to previous tab (horizontal orientation)</li>
                      <li><code>Home</code>: Moves focus to first tab</li>
                      <li><code>End</code>: Moves focus to last tab</li>
                      <li><code>Enter</code>: Selects and activates the focused tab</li>
                      <li><code>Tab</code>: Moves focus to the tab panel the tab controls</li>
                    </ul>
                  </section>

                  <section>
                    <h2>What You Need to Provide</h2>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><strong>HTML structure</strong>: Input, listbox container, and option elements with IDs/classes</li>
                        <li><strong>Styling</strong>: Visual appearance (colors, sizing, positioning)</li>
                        <li><strong>Filtering logic</strong>: If you want to filter options as user types (show/hide based on input)</li>
                        <li><strong>Data fetching</strong>: Loading options from API if needed</li>
                        <li><strong>Label</strong>: Accessible label for the input (<code>&lt;label&gt;</code> or <code>aria-label</code>)</li>
                      </ul>
                  </section>
                  
                        {/* Best Practices */}
                        <section>
                        <h2 className='mb-3'>Best Practices</h2>
                        <ul className='list-disc ml-6 space-y-2'>
                            <li>
                            <strong>Use meaningful labels:</strong> Provide clear, descriptive text for each tab button.
                            </li>
                            <li>
                            <strong>Provide aria-label for tab list:</strong> Add an aria-label to the tab list container
                            to describe the purpose of the tabs (e.g., &#34;Product Information&#34;).
                            </li>
                            <li>
                            <strong>Match tab count with panel count:</strong> Ensure you have exactly one panel for each tab.
                            </li>
                            <li>
                            <strong>Use unique IDs:</strong> If tabs/panels don&#39;t have IDs, the library generates them automatically,
                            but providing your own IDs is recommended for better control.
                            </li>
                            <li>
                            <strong>Choose appropriate orientation:</strong> Use horizontal tabs for top navigation,
                            vertical tabs for side navigation or settings interfaces.
                            </li>
                            <li>
                            <strong>Consider activation mode:</strong> Use automatic activation (default) for lightweight content,
                            manual activation for tabs with heavy content that requires loading.
                            </li>
                            <li>
                            <strong>Add context menu support:</strong> If your tabs support right-click actions,
                            implement the onContextMenu callback and set aria-haspopup=&#34;menu&#34; on tab buttons.
                            </li>
                            <li>
                            <strong>Call cleanup on unmount:</strong> Always call cleanup() when the component unmounts
                            to prevent memory leaks.
                            </li>
                            <li>
                            <strong>Call refresh after dynamic changes:</strong> If you add/remove tabs dynamically,
                            call refresh() to update the library&#39;s internal state.
                            </li>
                        </ul>
                        </section>

                        {/* Common Issues */}
                        <section>
                            <h2 className='mb-2'>Common Issues</h2>
                            <div className='space-y-4'>
                                <div>
                                <h3 className='font-semibold mb-1'>Tab/panel count mismatch</h3>
                                <p className=''>
                                    Make sure you have exactly one panel for each tab. The library validates this and
                                    shows an error in the console if counts don&#39;t match.
                                </p>
                                </div>
                                <div>
                                <h3 className='font-semibold mb-1'>Navigation not working</h3>
                                <p className=''>
                                    Check that you&#39;re using the correct arrow keys for your orientation: Left/Right for
                                    horizontal tabs, Up/Down for vertical tabs.
                                </p>
                                </div>
                                <div>
                                <h3 className='font-semibold mb-1'>Panels not hiding/showing</h3>
                                <p className=''>
                                    The library uses the hidden attribute to control panel visibility. Make sure your
                                    CSS doesn&#39;t override [hidden] with display: block.
                                </p>
                                </div>
                                <div>
                                <h3 className='font-semibold mb-1'>Context menu not working</h3>
                                <p className=''>
                                    Make sure you&#39;ve provided the onContextMenu callback in the configuration. Also,
                                    you can trigger it with right-click or Shift + F10.
                                </p>
                                </div>
                            </div>
                        </section>

                        {/* Resources */}
                        <section>
                        <h2 className='mb-2'>Resources</h2>
                        <ul className='list-disc ml-6 space-y-2'>
                            <li>
                            <a
                                href='https://www.w3.org/WAI/ARIA/apg/patterns/tabs/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-blue-800 underline'
                            >
                                WAI-ARIA Tabs Pattern
                            </a>
                            </li>
                            <li>
                            <a
                                href='https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-blue-800 underline'
                            >
                                ARIA Authoring Practices - Tabpanel
                            </a>
                            </li>
                            <li>
                            <a
                                href='https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-blue-800 underline'
                            >
                                MDN: ARIA tab role
                            </a>
                            </li>
                        </ul>
                        </section>

                    <section>
                      <h2>Accessibility Testing</h2>
                      <p className='mt-2'>The tabs utility includes built-in contract testing:</p>
                      <ul className='list-disc ml-6 mt-2'>
                        <li>Run <code>npx aria-ease test</code> to validate your implementation</li>
                        <li>Tests verify all ARIA attributes are correctly set</li>
                        <li>Validates keyboard interaction patterns</li>
                        <li>Checks focus management and tab activation</li>
                        <li>Runs in real browser (Playwright) modes</li>
                      </ul>
                    </section>
     

                  <section>
                    <h2>Visual Design Best Practices</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Minimum touch target size for tabs: 44x44 pixels</li>
                      <li>Clear focus indicators with high contrast on both tabs and tab panels</li>
                      <li>Visible hover and selected states that are distinct</li>
                      <li>Loading indicators when fetching tab content dynamically</li>
                    </ul>
                  </section>
                  

                  <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <a href='/utilities/radio' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Radio</span>
                      </div>
                    </a>
                    <a href='/utilities/toggle-button' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Toggle Button</span>
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

export default Tabs;
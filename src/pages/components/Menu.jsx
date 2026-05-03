import SlideOutNav from '../../components/SlideOutNav'
import { useState } from 'react'
import CalloutPanel from '../../components/CalloutPanel';
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import DocsFrame from '../../components/DocsFrame';
import Terminal from '../../components/Terminal';
import { Link } from 'react-router-dom';



const firstMenuCode = `
import { useRef, useEffect } from "react";
import * as Menu from "aria-ease/menu";

const HomeExampleMenu = () => {
  const menuRef = useRef();

  useEffect(() => {
    menuRef.current = Menu.makeMenuAccessible({
      menuId: "custom-menu",
      menuItemsClass: "profile-menu-item",
      triggerId: "display-button"
    });

    return () => {
      if (menuRef.current) {
        menuRef.current.cleanup();
        menuRef.current = null;
      }
    };
  }, [])

  return (
    <div className="mt-2 mb-3">
      <button
        id="display-button"
        className="home-menu-example-trigger-button"
        aria-label="Home example menu"
      >
        Display Example Menu
      </button>
      <div id="custom-menu">
        <button className="profile-menu-item">One</button>
        <button className="profile-menu-item">Two</button>
        <button className="profile-menu-item">Three</button>
      </div>
    </div>
  )
}

export default HomeExampleMenu`

const withCallback = `
menuRef.current = Menu.makeMenuAccessible({
  menuId: "custom-menu",
  menuItemsClass: "profile-menu-item",
  triggerId: "display-button",
  callback: {
    onExpandedChange: (expanded) => {
      // Do something when menu opens/closes
      console.log(expanded);
    }
  }
});`

const submenuSupport = `
<button className="menu-item" data-submenu-id="submenu-id">
  Item with Submenu ›
</button>
<div id="submenu-id" style={{display: "none"}}>
  <button className="menu-item">Submenu Item 1</button>
  <button className="menu-item">Submenu Item 2</button>
</div>`

const dynamicMenuItems = `
// After adding/removing menu items
menuRef.current.refresh();`

// eslint-disable-next-line react/prop-types
const Examples = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'menu'

  return (
 
    
    <div id="inner-body-div" className='menu-example-page-div'>
      <Helmet>
            <title>Menu | Aria-Ease</title>
            <meta name="description" content="Explore how to use the Aria-Ease menu utility for building accessible menus with complete keyboard interaction, focus management, and ARIA attributes." />
            <meta name="keywords" content="menu utility, accessible menus, ARIA attributes, keyboard interaction, focus management, React menu example" />
            <meta name="og:title" content="Menu | Aria-Ease" />
            <meta name="og:description" content="Explore how to use the Aria-Ease menu utility for building accessible menus with complete keyboard interaction, focus management, and ARIA attributes." />
            <meta name="og:url" content="https://ariaease.site/components/menu" />
            <meta name="twitter:title" content="Menu | Aria-Ease" />
            <meta name="twitter:description" content="Explore how to use the Aria-Ease menu utility for building accessible menus with complete keyboard interaction, focus management, and ARIA attributes." />
            <meta name="twitter:card" content="summary_large_image" />
          </Helmet>
          
        <DocsFrame
        
        page={page}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showDropdownPage={showDropdownPage}
        setShowDropdownPage={setShowDropdownPage}>
          <div className='side-body-div docs-flow'>
                  <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                    <span className='docs-kicker black-grey-text'>Component</span>
                    <h1 className='introduction-heading black-white-text'>Menu <span className='text-gradient'>Component</span></h1>
                    <p className='mt-2'>A menu is a widget that offers a list of choices or actions to the user, typically appearing when a user clicks a button or trigger. Menus provide keyboard interaction, focus management, and can support nested submenus. Unlike navigation landmarks that help users move between pages, menus present application commands or contextual actions that execute immediately when selected.</p>
                  </div>

                  <CalloutPanel title='Bundle Size' tone='info'>
                    <p className='mt-2'>The menu component is tree-shakable and weighs approximately <strong>28KB</strong> when imported individually.</p>
                    <code className='block mt-2 p-2 text-sm'>
                      <p>import * as Menu from &quot;aria-ease/menu&quot;;</p>
                      <p className='my-4'>or</p>
                      <p>import &#123; makeMenuAccessible &#125; from &quot;aria-ease/menu&quot;;</p>
                    </code>
                  </CalloutPanel>

                  <section>
                    <h2>Features</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>✨ Automatic ARIA attribute management</li>
                      <li>⌨️ Built-in keyboard interaction (Arrow keys, Tab, Shift + Tab, Enter, Space, Home, End)</li>
                      <li>🔧 Programmatic control methods</li>
                      <li>🧹 Automatic cleanup on unmount</li>
                    </ul>
                  </section>

                  <section>
                    <h2>Common Use Cases</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Application commands (File, Edit, View menus)</li>
                          <li>Context menus (right-click actions)</li>
                          <li>Dropdown action lists (user profile menu, more options)</li>
                          <li>Settings and preferences selections</li>
                          <li>Multi-level navigation with submenus</li>
                        </ul>
                  </section>
                  <section>
                    <h2>Menu vs. Navigation</h2>
                        <p className='mt-2'>Important distinction for proper ARIA usage:</p>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Use <code>role=&quot;menu&quot;</code> for application actions that execute immediately</li>
                          <li>Don&#39;t use menu for site navigation - use <code>&lt;nav&gt;</code> instead</li>
                          <li>Menu items typically trigger JavaScript actions or commands</li>
                          <li>Navigation links typically load new pages or sections</li>
                        </ul>
                  </section>

                  <section>
                    <h2>WAI-ARIA Roles, States, and Properties</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>The menu container has role menu.</li>
                      <li>Each selectable item in the menu has role menuitem, menuitemcheckbox, or menuitemradio.</li>
                      <li>The button that opens the menu has aria-haspopup set to true or menu.</li>
                      <li>The button that opens the menu has aria-expanded set to true when the menu is open and false when closed.</li>
                      <li>The button has aria-controls set to the ID of the menu container.</li>
                      <li>Menu items have tabindex set to -1 to enable proper focus management.</li>
                      <li>If a menu item opens a submenu, it has aria-haspopup set to true or menu and aria-controls referencing the submenu ID.</li>
                      <li>Optionally, the menu has aria-labelledby referencing the trigger button for an accessible name.</li>
                    </ul>
                  </section>

                  <section>
                    <h2>What the Utility Handles Automatically</h2>
                    <p className='mt-2'>The <code>makeMenuAccessible</code> utility automatically sets and manages all required ARIA attributes:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>role=&quot;menu&quot;</code> on the menu container</li>
                      <li><code>role=&quot;menuitem&quot;</code> on each menu item</li>
                      <li><code>aria-haspopup=&quot;true&quot;</code> on the trigger button</li>
                      <li><code>aria-expanded</code> - dynamically updates when menu opens/closes</li>
                      <li><code>aria-controls</code> - links trigger to menu</li>
                      <li><code>tabindex=&quot;-1&quot;</code> on menu items for proper focus management</li>
                    </ul>
                    
                    <p className='mt-1'>You only need to provide the HTML structure with IDs and class names - the utility handles all ARIA attributes.</p>
                  </section>

                  <section>
                    <h2 className='mt-10 break-words'>makeMenuAccessible()</h2>
                  <p className='mt-2'>The <code>makeMenuAccessible()</code> function automatically manages all aspects of menu accessibility, including ARIA attributes, keyboard interaction, focus management, and submenu support.</p>
                  <p className='mt-2'>This function handles all menu complexity - you provide clean HTML with IDs and class names, and it manages all the ARIA attributes, keyboard interactions, and focus behavior. You no longer need to manually set aria-expanded, aria-controls, or manage focus.</p>

                  <CalloutPanel title='Key Features' tone='success' className='mt-6' titleAs='h3'>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Automatic ARIA attribute management (aria-expanded, aria-controls, roles)</li>
                      <li>Complete keyboard interaction following W3C APG specifications</li>
                      <li>Built-in submenu support with automatic detection</li>
                      <li>Focus management and focus trap within menus</li>
                      <li>Click outside detection support via callbacks</li>
                      <li>No manual state management required</li>
                    </ul>
                  </CalloutPanel>
                  </section>

                  <section>
                    <h2>Configuration Options</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>menuId</code>: ID of the menu container element (required)</li>
                      <li><code>menuItemsClass</code>: Shared class name for all menu items (required)</li>
                      <li><code>triggerId</code>: ID of the button that opens/closes the menu (required)</li>
                    </ul>
                  </section>

                  <section>
                    <h2>Programmatic Control</h2>
                    <p className='mt-2'>The utility returns methods for programmatic control:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>openMenu()</code>: Opens the menu and focuses first item</li>
                      <li><code>closeMenu()</code>: Closes menu and returns focus to trigger</li>
                      <li><code>refresh()</code>: Refreshes cached menu items (call after dynamically adding/removing items)</li>
                      <li><code>cleanup()</code>: Removes event listeners and closes menu (call on unmount)</li>
                    </ul>
                  </section>


                  <section>
                    <h2>Submenu Support</h2>
                    <p className='mt-2'>
                      The utility automatically detects and manages submenus, including wiring and updating
                      the appropriate ARIA attributes for submenu triggers:
                    </p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>→</code> on item with submenu: Opens submenu and focuses first item</li>
                      <li><code>←</code> in submenu: Closes submenu and returns focus to parent item</li>
                      <li>Recursive initialization - submenus can have their own submenus</li>
                      <li>Automatic cleanup of submenu event listeners</li>
                      <li>Focus isolation - each menu level only manages its direct children</li>
                    </ul>
                    
                    <p className='mt-4 mb-1'>To create a submenu:</p>
                    <ul className='list-disc ml-6 mt-2 mb-1'>
                      <li>Add <code>data-submenu-id</code> attribute to the menu item that controls the submenu</li>
                      <li>Set <code>data-submenu-id</code> to match the <code>id</code> of the submenu container element</li>
                      <li>Ensure the submenu menu items share a class name with the menu items of the parent menu</li>
                      <li>
                        You do not need to manually set <code>aria-haspopup</code> or <code>aria-controls</code> on submenu
                        triggers; Aria-Ease uses <code>data-submenu-id</code> as the discovery hook and will set and manage
                        those ARIA attributes automatically.
                      </li>
                      <li>
                         You do not need to manually set <code>aria-haspopup</code> or <code>aria-controls</code> on submenu
                         triggers; Aria-Ease uses <code>data-submenu-id</code> as the discovery hook and will set and manage
                         those ARIA attributes automatically.
                       </li>
                    </ul>
                    <Terminal darkMode={darkMode} title="Submenu Markup Example" lang="html">{submenuSupport}</Terminal>
                  </section>
                  <section>
                    <h2>Focus Management</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>First menu item automatically receives focus when menu opens</li>
                      <li>Menu items use a roving <code>tabindex</code> (toggling between <code>0</code> and <code>-1</code>) so Tab exits the menu while arrow keys move focus between items</li>
                      <li>Focus returns to trigger button when menu closes</li>
                      <li>Proper focus on submenu open/close</li>
                      <li>Keyboard and mouse interactions work seamlessly together</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className='mb-1'>Basic Menu Example</h2>
                    <p className='mb-2'>Notice the clean HTML - no ARIA attributes needed on menu items or container. Just IDs and class names:</p>
                    <Terminal darkMode={darkMode} title="Menu Example Code" lang="js">{firstMenuCode}</Terminal>

                    <p className='mb-2 mt-6'>Add event callbacks to respond to user actions:</p>
                    <Terminal darkMode={darkMode} title="Menu with Callback Example" lang="js">{withCallback}</Terminal>
                    
                    <CalloutPanel tone='success' className='mt-4'>
                      <p>
                        <strong>Notice:</strong> The HTML doesn&#39;t include <code>role</code>, <code>aria-haspopup</code>, <code>aria-expanded</code>, or <code>aria-controls</code>. The utility adds them automatically.
                      </p>
                    </CalloutPanel>
                  </section>

                  <section>
                    <h2>Dynamic Menu Items</h2>
                    <p className='my-2'>If you need to dynamically add or remove menu items after initialization, use the <code>refresh()</code> method:</p>
                    <Terminal darkMode={darkMode} title="Dynamic Menu Items Example" lang="js">{dynamicMenuItems}</Terminal>
                    <p className='mt-2'>This refreshes the internal cache and ensures keyboard interaction works correctly with the updated menu structure.</p>
                  </section>

                  <section>
                    <h2>Keyboard Interaction</h2>
                    <p className='mt-2'>Complete keyboard support following W3C APG specifications:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>↓</code> - Moves focus to next menu item (wraps to first)</li>
                      <li><code>↑</code> - Moves focus to previous menu item (wraps to last)</li>
                      <li><code>→</code> - Opens submenu if focused item has submenu</li>
                      <li><code>←</code> - Moves focus to previous menu item if not in submenu; closes submenu if in submenu, moves focus back to parent item</li>
                      <li><code>Home</code> - Moves focus to first menu item</li>
                      <li><code>End</code> - Moves focus to last menu item</li>
                      <li><code>Enter</code> / <code>Space</code> - Activates the focused menu item</li>
                      <li><code>Escape</code> - Closes menu and returns focus to trigger</li>
                      <li><code>Tab</code> / <code>Shift+Tab</code> - Closes menu and moves focus out</li>
                    </ul>
                  </section>

                  <section>
                    <h2>What You Need to Provide</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><strong>HTML structure</strong>: Trigger button, menu container, and menu items with IDs/classes</li>
                      <li><strong>Styling</strong>: Visual appearance (colors, spacing, positioning, open/close animations)</li>
                      <li><strong>Click handlers</strong>: What happens when menu items are clicked/activated</li>
                      <li><strong>Toggle logic</strong>: When to call <code>openMenu()</code> and <code>closeMenu()</code></li>
                    </ul>
                  </section>

                  <CalloutPanel tone="yellow" title="⚠️ Important: React StrictMode">
                      <p className='mt-2'>If using React StrictMode, be aware it intentionally calls effects twice in development. To prevent double-initialization:</p>
                      <ul className='list-disc ml-6 mt-2'>
                        <li>Either remove <code>&lt;React.StrictMode&gt;</code> in development</li>
                        <li>Or use proper cleanup functions as shown in the example above</li>
                      </ul>
                  </CalloutPanel>

                  <section>
                    <h2>Supported Menu Item Types</h2>
                    <p className='mt-2'>The utility supports all three menu item roles defined by W3C APG:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>role=&quot;menuitem&quot;</code>: Standard menu actions (default, auto-set)</li>
                      <li><code>role=&quot;menuitemradio&quot;</code>: Mutually exclusive selections</li>
                      <li><code>role=&quot;menuitemcheckbox&quot;</code>: Independent toggleable options</li>
                    </ul>
                    <p className='mt-2'>The utility automatically detects and navigates through all three types.</p>
                  </section>

                  

                  <section>
                    <h2>Accessibility Testing</h2>
                    <p className='mt-2'>The menu utility includes built-in contract testing:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Run <code>npx aria-ease test</code> to validate your implementation</li>
                      <li>Tests verify all ARIA attributes are correctly set</li>
                      <li>Validates keyboard interaction patterns</li>
                      <li>Checks focus management and menu open/close behavior</li>
                      <li>Runs in both jsdom and real browser (Playwright) modes</li>
                    </ul>
                  </section>

                  <section>
                    <h2>Visual Design Best Practices</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Minimum touch target size for menu items: 44x44 pixels</li>
                      <li>Clear focus indicators with high contrast</li>
                      <li>Visible hover and focus states that are distinct</li>
                      <li>Appropriate z-index to ensure menu appears above other content</li>
                      <li>Consider adding subtle shadows or borders to distinguish menu from background</li>
                      <li>Submenu indicators (› or ▶) to show which items have submenus</li>
                    </ul>
                  </section>

                    <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <Link to='/components/combobox' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Combobox Component</span>
                      </div>
                    </Link>
                    <Link to='/components/radio' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Radio Component</span>
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

export default Examples
import DocsFrame from "../../components/DocsFrame";
import { useState } from 'react';
import SlideOutNav from "../../components/SlideOutNav";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRightCircleIcon } from "lucide-react";
import Terminal from "../../components/Terminal";

const mainFocusedState =  `
"main.focused": {
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: () => [
        { type: "focus", target: "main" }
      ]
    }
  ],
    assertion: isMainFocused
}`

const mainNotFocusedState = `
"main.blurred": {
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: () => []
    }
  ],
  assertion: isMainBlurred
}`

const popupOpenState = `
"menupopup.open": {
  setup: [
    {
      when: ["keyboard"],
      steps: () => [
        { type: "keypress", target: "main", key: "Enter" }
      ]
    },
    {
      when: ["pointer"],
      steps: () => [
        { type: "click", target: "main" }
      ]
    }
  ],
  assertion: isMenuPopupOpen
}`

const popupClosedState = `
"menupopup.closed": {
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: () => [] //component resets between tests, so no setup necessary
    }
  ],
  assertion: isMenuPopupClosed
}`

const activeItemState = `
"menuitem.focused": {
  requires: ["menupopup.open"],
  setup: [
    {
      when: ["keyboard"],
      steps: (arg: { relativeTarget?: string | number } = {}) => [
        { type: "focus", target: "relative", relativeTarget: arg.relativeTarget }
      ]
    }
  ],
  assertion: (arg: { relativeTarget?: string | number } = {}) => isItemActive(arg.relativeTarget as string | number)
}`

const submenuPopupOpenState = `
"submenupopup.open": {
  requires: ["menupopup.open"],
  setup: [
    {
      when: ["keyboard"],
      steps: () => [
        { type: "keypress", target: "submenuTrigger", key: "ArrowRight" }
      ]
    },
    {
  when: ["pointer"],
      steps: () => [
        { type: "click", target: "submenuTrigger" }
      ]
    }
  ],
  assertion: isSubmenuPopupOpen
}`

const submenuPopupClosedState = `
"submenupopup.closed": {
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: () => [] //component resets between tests, so no setup necessary
    }
  ],
  assertion: isSubmenuPopupClosed 
}`

const submenuTriggerFocusedState = `
"submenutrigger.focused": {
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: () => [
        { type: "focus", target: "submenuTrigger" }
      ]
    }
  ],
  assertion: isSubmenuTriggerFocused
}`

const submenuTriggerBlurredState = `
"submenutrigger.blurred": {
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: () => []
    }
  ],
  assertion: isSubmenuTriggerBlurred
}`

const submenuActiveItemState = `
"submenuitem.focused": {
  requires: ["submenupopup.open"],
  setup: [
    {
      when: ["keyboard"],
      steps: (arg: { relativeTarget?: string | number } = {}) => {
        // Focus trigger, ArrowRight to open, then ArrowDown N times
        let steps = [
          { type: "focus", target: "submenuTrigger" },
          { type: "keypress", target: "submenuTrigger", key: "ArrowRight" }
        ];
        if (typeof arg.relativeTarget === "number") {
          steps = steps.concat(
            Array.from({ length: arg.relativeTarget }, () => ({
              type: "keypress",
              target: "submenuItems",
              key: "ArrowDown"
            }))
          );
        }
        if (arg.relativeTarget === "first") {
          steps = steps.concat({ type: "keypress", target: "submenuItems", key: "ArrowDown" })
        }
        if (arg.relativeTarget === "last") {
          steps = steps.concat({ type: "keypress", target: "submenuItems", key: "ArrowUp" })
        }
        return steps;
      }
    },
    {
      when: ["pointer"],
      steps: (arg: { relativeTarget?: string | number } = {}) => [
        { type: "click", target: "submenuTrigger" },
        { type: "click", target: "relative", relativeTarget: arg.relativeTarget }
      ]
    }
  ],
  assertion: (arg: { relativeTarget?: string | number } = {}) => isSubmenuItemActive(arg.relativeTarget as string | number)
}`


// eslint-disable-next-line react/prop-types
const MenuContract = ({ darkMode, setDarkMode }) => {
    const[showDropdownPage, setShowDropdownPage] = useState(false);
    const page = 'menu-contract';

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Menu Contract | Aria-Ease</title>
        <meta name="description" content="Documentation for the menu Contract, defining required selectors, ARIA attributes, and behaviors for accessible menu implementations." />
        <meta name="keywords" content="menu contract, ARIA menu, accessible menu, WAI-ARIA patterns, web accessibility, frontend development, UI components" />
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
            <span className='docs-kicker black-grey-text'>CONTRACTS</span>
            <h1 className='introduction-heading black-white-text'>Menu <span className='text-gradient'>Contract</span></h1>
            <p className='mt-2'>This page documents the <b>Menu Contract</b> for accessible, ARIA-compliant menu implementations. It covers required selectors, ARIA attributes, and dynamic behaviors, based on <a href="https://www.w3.org/WAI/ARIA/apg/patterns/menubar/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Authoring Practices</a> and WCAG 2.2 AA.</p>
            <p className='mt-2'>The contract is written using the fluent, expressive DSL, and compiled to JSON. <Link to="/dsl/overview" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>Learn more about DSL here.</Link></p>
          </div>

          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">Selectors</h2>
            <ul className="docs-list mt-2">
              <li className="mb-4">
                <b>main</b>: <code>[aria-controls][aria-haspopup][aria-expanded]:not([role=&#39;menuitem&#39;])</code><br/>
                <span className="docs-note">The root interactive element for the menu. This element manages focus, keyboard events, and ARIA attributes like <code>aria-expanded</code> and <code>aria-controls</code>.</span>
              </li>
              <li className="mb-4">
                <b>popup</b>: <code>[role=menu]</code><br/>
                <span className="docs-note">The container element for the menu items. This popup appears when the menu is opened and contains all menu items, including submenus if present. It must have <code>role=&#34;menu&#34;</code> for assistive technology to recognize it as a menu container.</span>
              </li>
              <li className="mb-4">
                <b>items</b>: <code>[role=menuitem], [role=menuitemradio], [role=menuitemcheckbox]</code><br/>
                <span className="docs-note">All actionable items within the menu popup. These can be standard menu items, radio menu items, or checkbox menu items. Each must have the appropriate ARIA role to communicate its type and state to assistive technology.</span>
              </li>
              <li className="mb-4">
                <b>submenuTrigger</b>: <code>[role=menu] [role=menuitem][aria-haspopup=true]</code><br/>
                <span className="docs-note">A menu item that opens a submenu. It must have <code>aria-haspopup=&#34;true&#34;</code> to indicate that it controls the visibility of a submenu. Activating this item (via keyboard or pointer) opens the associated submenu.</span>  
              </li>
              <li className="mb-4">
                <b>submenu</b>: <code>[role=menu] [role=menu]</code><br/>
                <span className="docs-note">A nested menu container that appears when a submenu trigger is activated. This element also has <code>role=&#34;menu&#34;</code> and is a child of the main menu popup, representing a hierarchical menu structure.</span>
              </li>
              <li className="mb-4">
                <b>submenuItems</b>: <code>[role=menu] [role=menu] &gt; [role=menuitem]</code><br/>
                <span className="docs-note">The actionable items within a submenu. These are direct children of the submenu container and must have the appropriate menu item roles to ensure correct keyboard navigation and accessibility.</span>
              </li>
              <li>
                <b>relative</b>: <code>[role=menuitem], [role=menuitemradio], [role=menuitemcheckbox]</code><br/>
                <span className="docs-note">A collection of sibling elements that can be interacted with. In a menu those are menuitem, menuitemradio, or menuitemcheckbox.</span>
              </li>
            </ul>
          </section>
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">States</h2>
            <p>These are the collection of states that help define the expected behaviors and ARIA attributes of a menu. Each state describes a particular UI or accessibility condition, how to set it up, and what should be asserted. Some states have an empty setup array—this is intentional, as the component is reset between tests and no additional steps are needed to reach that state. The <b>relativeTarget</b> argument is used for states that depend on a specific element, such as activating a particular menu item.</p>
            <div className="mt-[20px]">
              <h3><code>menupopup.open</code></h3>
              <p className="my-2">This state represents the menu popup being open and visible to the user. The setup simulates opening the popup either by keyboard (Enter on the trigger button) or by pointer (clicking the button). The assertion checks that the popup is visible and that <code>aria-expanded</code> is <code>true</code> on the main element.</p>
              <Terminal darkMode={darkMode} title="Menu Popup Open State" lang="javascript">{popupOpenState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>menupopup.closed</code></h3>
              <p className="my-2">This state represents the menu popup being closed and not visible. The setup is empty because the default state after reset is closed. The assertion checks that the popup is not visible, <code>aria-expanded</code> is <code>false</code>.</p>
              <Terminal darkMode={darkMode} title="Menu Popup Closed State" lang="javascript">{popupClosedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>main.focused</code></h3>
              <p className="my-2">This state ensures that the menu main element is focused. The setup focuses the main element using either keyboard or pointer. The assertion checks that the main element has focus.</p>
              <Terminal darkMode={darkMode} title="Main Focused State" lang="javascript">{mainFocusedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>main.blurred</code></h3>
              <p className="my-2">This state ensures that the menu main element is not focused. The setup is empty because, after reset, the main element is not focused. The assertion checks that the main element does not have focus.</p>
              <Terminal darkMode={darkMode} title="Main Blurred State" lang="javascript">{mainNotFocusedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>menuitem.focused</code></h3>
              <p className="my-2">
                This state represents a menu item receiving focus within the open menu popup. The setup focuses a specific menu item, either by keyboard navigation or programmatically, using the <b>relativeTarget</b> argument to specify which item (by index or identifier). This is essential for keyboard accessibility, ensuring users can navigate between items using arrow keys. The assertion checks that the correct menu item is focused.
              </p>
              <Terminal darkMode={darkMode} title="Menu Item Focused State" lang="javascript">{activeItemState}</Terminal>
            </div>
            
            <div className="mt-[50px]">
              <h3><code>submenupopup.open</code></h3> 
              <p className="my-2">
                This state represents a submenu popup being open and visible. The setup simulates opening the submenu, either by pressing <kbd>ArrowRight</kbd> on a submenu trigger (keyboard) or clicking the submenu trigger (pointer). This is a key part of hierarchical menus, allowing users to access nested options. The assertion checks that the submenu popup is visible and that the trigger has <code>aria-expanded</code> set to <code>true</code>.
              </p>
              <Terminal darkMode={darkMode} title="Submenu Popup Open State" lang="javascript">{submenuPopupOpenState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>submenupopup.closed</code></h3> 
              <p className="my-2">
                This state represents a submenu popup being closed and not visible. The setup is empty because, after reset or when the submenu is not triggered, it remains closed. The assertion checks that the submenu popup is not visible and that the submenu trigger has <code>aria-expanded</code> set to <code>false</code>.
              </p>
              <Terminal darkMode={darkMode} title="Submenu Popup Closed State" lang="javascript">{submenuPopupClosedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>submenutrigger.focused</code></h3>
              <p className="my-2">
                This state represents a submenu trigger (a menu item that opens a submenu) being focused. The setup focuses the submenu trigger using keyboard or pointer. This is important for enabling keyboard users to open submenus with <kbd>ArrowRight</kbd> or <kbd>Enter</kbd>. The assertion checks that the submenu trigger is focused and ready to open its submenu.
              </p>
              <Terminal darkMode={darkMode} title="Submenu Trigger Focused State" lang="javascript">{submenuTriggerFocusedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>submenutrigger.blurred</code></h3>
              <p className="my-2">
                This state represents a submenu trigger not being focused. The setup is empty because, after reset or when focus moves away, the submenu trigger is not focused. The assertion checks that the submenu trigger does not have focus, ensuring correct focus management and preventing accidental submenu activation.
              </p>
              <Terminal darkMode={darkMode} title="Submenu Trigger Blurred State" lang="javascript">{submenuTriggerBlurredState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>submenuitem.focused</code></h3>
              <p className="my-2">
                This state represents a submenu item being focused within an open submenu popup. The setup focuses a specific submenu item, using keyboard navigation (such as <kbd>ArrowDown</kbd> or <kbd>ArrowUp</kbd>) or pointer, and can use the <b>relativeTarget</b> argument to specify which item. This ensures users can navigate and interact with submenu items just as with top-level menu items. The assertion checks that the correct submenu item is focused.
              </p>
              <Terminal darkMode={darkMode} title="Submenu Item Focused State" lang="javascript">{submenuActiveItemState}</Terminal>
            </div>
          </section>
          
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">References</h2>
            <ul className="docs-list mt-2">
              <li className="mb-2"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/menubar/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Menu Pattern</a></li>
              <li><a href="https://www.w3.org/WAI/WCAG22/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WCAG 2.2 AA</a></li>
            </ul>
          </section>

          <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <Link to='/contracts/combobox' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Combobox Contract</span>
                      </div>
                    </Link>
                    <Link to='/contracts/tabs' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Tabs Contract</span>
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

export default MenuContract
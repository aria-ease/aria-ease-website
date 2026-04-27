import DocsFrame from "../../components/DocsFrame";
import { useState } from 'react';
import SlideOutNav from "../../components/SlideOutNav";
import { Link } from "react-router-dom";
import { ChevronRightCircleIcon } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Terminal from '../../components/Terminal';


const popupOpenState = `
"comboboxpopup.open": {
  setup: [
    {
      when: ["keyboard", "textInput"],
      steps: () => [
        { type: "keypress", target: "input", key: "ArrowDown" }
      ]
    },
    {
      when: ["pointer"],
      steps: () => [
        { type: "click", target: "button" }
      ]
    }
  ],
  assertion: isComboboxOpen
}`

const popupClosedState = `
"comboboxpopup.closed": {
  setup: [
    {
      when: ["keyboard", "pointer],
      steps: () => []
    }
  ],
  assertion: [...isComboboxClosed(), ...isActiveDescendantEmpty()]
}`

const mainFocusedState = `
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
  assertion: isMainNotFocused
}`

const inputFilledState = `
"input.filled": {
  setup: [
    {
      when: ["keyboard", "textInput"],
      steps: () => [
        { type: "type", target: "input", value: "test" }
      ]
    }
  ],
  assertion: isInputFilled
}`

const inputNotFilledState = `
"input.empty": {
  setup: [
    {
      when: ["keyboard", "textInput"],
      steps: () => [
        { type: "type", target: "input", value: "" }
      ]
    }
  ],
  assertion: isInputNotFilled
}`

const activeItemState = `
"option.active": {
  requires: ["comboboxpopup.open"],
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: (arg: { relativeTarget } = {}) => {
        // Start at first, then ArrowDown N-1 times to reach index N
        if (typeof arg.relativeTarget === "number") {
          return Array.from({ length: arg.relativeTarget }, () => ({
            type: "keypress",
            target: "main",
            key: "ArrowDown"
          }));
        }
        if (arg.relativeTarget === "first") {
          return [{ type: "keypress", target: "main", key: "ArrowDown" }];
        }
        if (arg.relativeTarget === "last") {
          return [
            { type: "keypress", target: "main", key: "ArrowDown" },
            { type: "keypress", target: "main", key: "ArrowUp" }
          ]
        };
        return [];
      }
    }
  ],
  assertion: (arg: { relativeTarget?: string | number } = {}) => isActiveDescendant(arg.relativeTarget)
}`

const activeDescendantNotEmptyState = `
"activedescendant.set": {
  requires: [],
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: () => []
    }
  ],
  assertion: isActiveDescendantNotEmpty
}
  
function isActiveDescendantNotEmpty() {
  return [
    {
      target: "main",
      assertion: "toHaveAttribute",
      attribute: "aria-activedescendant",
      expectedValue: "!empty",
      failureMessage: "Expected aria-activedescendant on main to not be empty."
    }
  ]
}`

const activeDescendantEmptyState = `
"activedescendant.unset": {
  requires: [],
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: () => []
    }
  ],
  assertion: isActiveDescendantEmpty
}
  
function isActiveDescendantEmpty() {
  return [
    {
      target: "main",
      assertion: "toHaveAttribute",
      attribute: "aria-activedescendant",
      expectedValue: "",
      failureMessage: "Expected aria-activedescendant on main to be empty."
    }
  ]
}`

const selectedItem = `
"option.selected": {
  requires: ["comboboxpopup.open"],
  setup: [
    {
      when: ["keyboard"],
      steps: (arg: { relativeTarget } = {}) => [
        { type: "keypress", target: "relative", key: "Enter", relativeTarget: arg.relativeTarget }
      ]
    },
    {
      when: ["pointer"],
      steps: (arg: { relativeTarget } = {}) => [
        { type: "click", target: "relative", relativeTarget: arg.relativeTarget }
      ]
    }
  ],
  assertion: (arg: { relativeTarget } = {}) => isAriaSelected(arg.relativeTarget)
}`

// eslint-disable-next-line react/prop-types
const ComboboxContract = ({ darkMode, setDarkMode }) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'combobox-contract';

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Combobox Contract | Aria-Ease</title>
        <meta name="description" content="Documentation for the Combobox Contract, defining required selectors, ARIA attributes, and behaviors for accessible combobox implementations." />
        <meta name="keywords" content="combobox contract, ARIA combobox, accessible combobox, WAI-ARIA patterns, web accessibility, frontend development, UI components" />
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
            <h1 className='introduction-heading black-white-text'>Combobox <span className='text-gradient'>Contract</span></h1>
            <p className='mt-2'>This page documents the <b>Combobox Contract</b> for accessible, ARIA-compliant combobox implementations. It covers required selectors, ARIA attributes, and dynamic behaviors, based on <a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Authoring Practices</a> and WCAG 2.2 AA.</p>
            <p className='mt-2'>The contract is written using the fluent, expressive DSL, and compiled to JSON. <Link to="/dsl/overview" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>Learn more about DSL here.</Link></p>
          </div>
          
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">Selectors</h2>
            <ul className="docs-list mt-2">
              <li className="mb-4">
                <b>main</b>: <code>[role=combobox]</code><br/>
                <span className="docs-note">The root interactive element for the combobox. In most implementations, this is the <code>&lt;input&gt;</code> itself, but in select-only comboboxes (where the user cannot type), <b>main</b> may be a <code>&lt;button&gt;</code> with <code>role=&#34;combobox&#34;</code>. This element manages focus, keyboard events, and ARIA attributes like <code>aria-expanded</code> and <code>aria-controls</code>.</span>
              </li>
              <li className="mb-4">
                <b>input</b>: <code>[role=combobox]</code><br/>
                <span className="docs-note">The text input for user entry. In most cases, <b>input</b> and <b>main</b> are the same element (the <code>&lt;input role=&#34;combobox&#34;&gt;</code>). In select-only comboboxes, there may be no text input at all, and <b>main</b> is a button that hides/displays the popup.</span>
              </li>
              <li className="mb-4">
                <b>button</b>: <code>button[tabindex=&#34;-1&#34;]</code><br/>
                <span className="docs-note">This is the toggle button <i>beside</i> a combobox input, used to open/close the popup. It is <b>not</b> focusable by tab (hence <code>tabindex=&#34;-1&#34;</code>), but is accessible by pointer. 
                <br></br><b>Important:</b> In select-only comboboxes, the button <i>itself</i> is the <b>main</b> element and does <b>not</b> have <code>tabindex=&#34;-1&#34;</code>. Only use this selector for the auxiliary toggle button next to a text input, not for the main button in select-only comboboxes.</span>
                <ul className="docs-list docs-list-nested mt-1">
                  <li><b>Example 1 (autocomplete):</b> <code>&lt;input role=&#34;combobox&#34;&gt;&lt;button tabindex=&#34;-1&#34;&gt;▼&lt;/button&gt;</code></li>
                  <li><b>Example 2 (select-only):</b> <code>&lt;button role=&#34;combobox&#34;&gt;Choose...&lt;/button&gt;</code> <span className="docs-note">(no <code>tabindex=&#34;-1&#34;</code>)</span></li>
                </ul>
              </li>
              <li className="mb-4">
                <b>options</b>: <code>[role=option]</code><br/>
                <span className="docs-note">Each selectable item in the popup. In our current example, a listbox popup. These must be direct or indirect children of the popup container (<b>popup</b>).</span>
              </li>
              <li className="mb-4">
                <b>popup</b>: <code>[role=listbox]</code><br/>
                <span className="docs-note">The container for the options. This element is shown/hidden as the user interacts with the combobox. It must have a unique <code>id</code> referenced by <code>aria-controls</code> on <b>main</b>.</span>
              </li>
              <li>
                <b>relative</b>: <code>[role=option]</code><br/>
                <span className="docs-note">A collection of sibling elements that can be interacted with. In a combobox those are options, gridcells, or treeitems.</span>
              </li>
            </ul>
            <div className="docs-callout mt-4">
              <b>Selector summary:</b> Always check the combobox pattern you are implementing. If your combobox has a text input and a button, the button should have <code>tabindex=&#34;-1&#34;</code> and <b>main</b> is the input. If your combobox is select-only, the button is <b>main</b> and does <b>not</b> have <code>tabindex=&#34;-1&#34;</code>.
            </div>
          </section>
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">States</h2>
            <p>These are the collection of states that help define the expected behaviors and ARIA attributes of a combobox. Each state describes a particular UI or accessibility condition, how to set it up, and what should be asserted. Some states have an empty setup array—this is intentional, as the component is reset between tests and no additional steps are needed to reach that state. The <b>relativeTarget</b> argument is used for states that depend on a specific option or element, such as selecting or activating a particular option.</p>
            <div className="mt-[20px]"> {/* Each section should talk about what it's state. What it is. What it does. Why some have empty setup (it's because the component resets in between tests). What is relative target */}
              <h3><code>comboboxpopup.open</code></h3>
              <p className="my-2">This state represents the combobox popup being open and visible to the user. The setup simulates opening the popup either by keyboard (ArrowDown on the input) or by pointer (clicking the button). The assertion checks that the popup is visible and that <code>aria-expanded</code> is <code>true</code> on the main element.</p>
              <Terminal darkMode={darkMode} title="Popup Open State" lang="javascript">{popupOpenState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>comboboxpopup.closed</code></h3>
              <p className="my-2">This state represents the combobox popup being closed and not visible. The setup is empty because the default state after reset is closed. The assertion checks that the popup is not visible, <code>aria-expanded</code> is <code>false</code>, and <code>aria-activedescendant</code> is empty.</p>
              <Terminal darkMode={darkMode} title="Popup Closed State" lang="javascript">{popupClosedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>main.focused</code></h3>
              <p className="my-2">This state ensures that the main combobox element is focused. The setup focuses the main element using either keyboard or pointer. The assertion checks that the main element has focus.</p>
              <Terminal darkMode={darkMode} title="Main Focused State" lang="javascript">{mainFocusedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>main.blurred</code></h3>
              <p className="my-2">This state ensures that the main combobox element is not focused. The setup is empty because, after reset, the main element is not focused. The assertion checks that the main element does not have focus.</p>
              <Terminal darkMode={darkMode} title="Main Not Focused State" lang="javascript">{mainNotFocusedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>input.filled</code></h3>
              <p className="my-2">This state represents the input being filled with text. The setup types the value <code>test</code> into the input using keyboard or text input. The assertion checks that the input value is <code>test</code>.</p>
              <Terminal darkMode={darkMode} title="Input Filled State" lang="javascript">{inputFilledState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>input.empty</code></h3>
              <p className="my-2">This state represents the input being empty. The setup types an empty string into the input. The assertion checks that the input value is empty.</p>
              <Terminal darkMode={darkMode} title="Input Not Filled State" lang="javascript">{inputNotFilledState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>option.active</code></h3> 
              <p className="my-2">This state represents a specific option being active (highlighted) in the popup. The setup uses keyboard or pointer to move to the desired option, determined by the <b>relativeTarget</b> argument (e.g., index, &#34;first&#34;, or &#34;last&#34;). The assertion checks that <code>aria-activedescendant</code> on the main element matches the id of the active option.</p>
              <Terminal darkMode={darkMode} title="Active Option State" lang="javascript">{activeItemState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>option.selected</code></h3> 
              <p className="my-2">This state represents an option being selected. The setup simulates selecting an option using keyboard (Enter) or pointer (click), targeting the option specified by <b>relativeTarget</b>. The assertion checks that the option has <code>aria-selected</code> set to <code>true</code>.</p>
              <Terminal darkMode={darkMode} title="Selected Option State" lang="javascript">{selectedItem}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>activedescendant.unset</code></h3> 
              <p className="my-2">This state asserts that <code>aria-activedescendant</code> on the main element is empty, meaning no option is currently active. The setup is empty because this is the default state after reset.</p>
              <Terminal darkMode={darkMode} title="Active Descendant Empty State" lang="javascript">{activeDescendantEmptyState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>activedescendant.set</code></h3>
              <p className="my-2">This state asserts that <code>aria-activedescendant</code> on the main element is not empty, meaning some option is currently active. The setup is empty because the test context will have already activated an option. The assertion checks that <code>aria-activedescendant</code> is not empty.</p>
              <Terminal darkMode={darkMode} title="Active Descendant Not Empty State" lang="javascript">{activeDescendantNotEmptyState}</Terminal>
            </div>
          </section>
          
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">References</h2>
            <ul className="docs-list mt-2">
              <li className="mb-2"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Combobox Pattern</a></li>
              <li><a href="https://www.w3.org/WAI/WCAG22/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WCAG 2.2 AA</a></li>
            </ul>
          </section>

          <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
            <Link to='/contracts/accordion' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
              <ChevronRightCircleIcon className='rotate-180'/>
              <div className='flex flex-col w-full'>
                <span className='text-sm black-white-text'>Prev</span>
                <span className='next-link-text text-md'>Accordion Contract</span>
              </div>
            </Link>
            <Link to='/contracts/menu' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
              <div className='flex flex-col w-full items-end'>
                <span className='text-sm black-white-text'>Next</span>
                <span className='next-link-text text-md'>Menu Contract</span>
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

export default ComboboxContract
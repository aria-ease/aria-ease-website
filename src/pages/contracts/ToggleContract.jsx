import DocsFrame from "../../components/DocsFrame";
import { useState } from 'react';
import SlideOutNav from "../../components/SlideOutNav";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRightCircleIcon } from "lucide-react";
import Terminal from "../../components/Terminal";

const togglePressedState = `
"toggle.pressed": {
  setup: [
    {
      when: ["keyboard"],
      steps: (arg: { relativeTarget?: string | number }) => [
          { type: "keypress", target: "relative", relativeTarget: arg.relativeTarget, key: "Enter" }
      ]
    },
    {
      when: ["pointer"],
      steps: (arg: { relativeTarget?: string | number }) => [
          { type: "click", target: "relative", relativeTarget: arg.relativeTarget, }
      ]
    }
  ],
  assertion: (arg: { relativeTarget?: string | number } = {}) => isTogglePressed(arg.relativeTarget as string | number)
}
  
function isTogglePressed(relativeTarget: string | number) {
  return [
    {
      target: "relative",
      relativeTarget,
      assertion: "toHaveAttribute",
      attribute: "aria-pressed",
      expectedValue: "true",
      failureMessage: "Expected toggle to have aria-pressed='true' when pressed."
    }
  ]
},`

const toggleUnpressedState = `
"toggle.unpressed": {
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: () => []
    }
  ],
  assertion: (arg: { relativeTarget?: string | number } = {}) => isToggleUnpressed(arg.relativeTarget as string | number)
}
  
function isToggleUnpressed(relativeTarget: string | number) {
  return [
    {
      target: "relative",
      relativeTarget,
      assertion: "toHaveAttribute",
      attribute: "aria-pressed",
      expectedValue: "false",
      failureMessage: "Expected toggle to have aria-pressed='false' when unpressed."
    }
  ]  
}`

const toggleFocusedState = `
"toggle.focused": {
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: (arg: { relativeTarget?: string | number }) => [
        { type: "focus", target: "relative", relativeTarget: arg.relativeTarget }
      ]
    }
  ],
  assertion: (arg: { relativeTarget?: string | number } = {}) => isToggleFocused(arg.relativeTarget as string | number)
}
  
function isToggleFocused(relativeTarget: string | number) {
  return  [
    {
      target: "relative",
      assertion: "toHaveFocus",
      relativeTarget,
      failureMessage: 'Expected toggle at position/index to have focus.'
    }
  ]
}`

// eslint-disable-next-line react/prop-types
const ToggleContract = ({ darkMode, setDarkMode }) => {
    const[showDropdownPage, setShowDropdownPage] = useState(false);
    const page = 'toggle-contract';

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Toggle Contract | Aria-Ease</title>
        <meta name="description" content="Documentation for the toggle Contract, defining required selectors, ARIA attributes, and behaviors for accessible toggle implementations." />
        <meta name="keywords" content="toggle contract, ARIA toggle, accessible toggle, WAI-ARIA patterns, web accessibility, frontend development, UI components" />
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
            <h1 className='introduction-heading black-white-text'>Toggle <span className='text-gradient'>Contract</span></h1>
            <p className='mt-2'>This page documents the <b>Toggle Contract</b> for accessible, ARIA-compliant toggle implementations. It covers required selectors, ARIA attributes, and dynamic behaviors, based on <a href="https://www.w3.org/WAI/ARIA/apg/patterns/toggle/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Authoring Practices</a> and WCAG 2.2 AA.</p>
            <p className='mt-2'>The contract is written using the fluent, expressive DSL, and compiled to JSON. <Link to="/dsl/overview" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>Learn more about DSL here.</Link></p>
          </div>

          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">Selectors</h2>
            <ul className="docs-list mt-2">
              <li className="mb-4">
                <b>main</b>: <code>button[aria-pressed]</code><br/>
                <span className="docs-note">The root interactive element for the toggle component. This element acts as the container for the toggle and manages keyboard navigation between it and other elements. It must have <code>role=&#34;button&#34;</code> so that assistive technology recognizes it as a button. The <b>main</b> selector is used to set focus, handle arrow key navigation, and coordinate ARIA attributes such as <code>aria-pressed</code> and <code>aria-label</code> for accessibility. Only one toggle should be present per toggle group.</span>
              </li>
              <li className="mb-4">
                <b>toggle</b>: <code>button[aria-pressed]</code><br/>
                <span className="docs-note">An individual toggle button within the toggle group. Each toggle must have <code>role=&#34;button&#34;</code> and <code>aria-pressed</code> attributes for accessibility. Toggles are used to switch between two states (on and off).</span>
              </li>
              <li>
                <b>relative</b>: <code>button[aria-pressed]</code><br/>
                <span className="docs-note">A collection of sibling elements that can be interacted with. In a toggle component this is a toggle button.</span>
              </li>
            </ul>
          </section>
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">States</h2>
            <p>These are the collection of states that help define the expected behaviors and ARIA attributes of a toggle component. Each state describes a particular UI or accessibility condition, how to set it up, and what should be asserted. The <b>relativeTarget</b> argument is used for states that depend on a specific element, such as activating a particular toggle.</p>
            <div className="mt-[20px]">
              <h3><code>toggle.pressed</code></h3>
              <p className="my-2">
                This state represents a toggle being pressed (active). The setup simulates pressing a toggle either by keyboard (using space or enter) or by pointer (clicking the toggle), using the <b>relativeTarget</b> argument to specify which toggle to press. The assertion checks that the toggle has <code>aria-pressed=&#34;true&#34;</code> and is included in the tab order. This state is essential for ensuring the toggle functions correctly with both keyboard and pointer interaction.
              </p>
              <Terminal darkMode={darkMode} title="Popup Open State" lang="javascript">{togglePressedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>toggle.unpressed</code></h3>
              <p className="my-2">
                This state represents a toggle being unpressed (inactive). The setup simulates unpressing a toggle either by keyboard (using space or enter) or by pointer (clicking the toggle), using the <b>relativeTarget</b> argument to specify which toggle to unpress. The assertion checks that the toggle has <code>aria-pressed=&#34;false&#34;</code> and is included in the tab order. This state is essential for ensuring the toggle functions correctly with both keyboard and pointer interaction.
              </p>
              <Terminal darkMode={darkMode} title="Popup Closed State" lang="javascript">{toggleUnpressedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>toggle.focused</code></h3>
              <p className="my-2">
                This state represents a toggle being focused. The setup simulates focusing a toggle using either keyboard or pointer interaction, using the <b>relativeTarget</b> argument to specify which toggle to focus. The assertion checks that the toggle receives focus correctly. This state is important for ensuring that the toggle is accessible and can be navigated to and activated by keyboard users.
              </p>
              <Terminal darkMode={darkMode} title="Popup Closed State" lang="javascript">{toggleFocusedState}</Terminal>
            </div>
          </section>
          
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">References</h2>
            <ul className="docs-list mt-2">
              <li className="mb-2"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/toggle/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Toggle Pattern</a></li>
              <li><a href="https://www.w3.org/WAI/WCAG22/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WCAG 2.2 AA</a></li>
            </ul>
          </section>

          <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
            <Link to='/contracts/tabs' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
              <ChevronRightCircleIcon className='rotate-180'/>
              <div className='flex flex-col w-full'>
                <span className='text-sm black-white-text'>Prev</span>
                <span className='next-link-text text-md'>Tabs Contract</span>
              </div>
            </Link>
            <Link to='/changelog' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
              <div className='flex flex-col w-full items-end'>
                <span className='text-sm black-white-text'>Next</span>
                <span className='next-link-text text-md'>Changelog</span>
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

export default ToggleContract
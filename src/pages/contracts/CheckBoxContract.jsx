import DocsFrame from "../../components/DocsFrame";
import { useState } from 'react';
import SlideOutNav from "../../components/SlideOutNav";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRightCircleIcon } from "lucide-react";
import Terminal from "../../components/Terminal";



const checkboxCheckedState = `
"checkbox.checked": {
  setup: [
    {
      when: ["keyboard"],
      steps: (arg: { relativeTarget?: string | number }) => [
        { type: "keypress", target: "relative", relativeTarget: arg.relativeTarget, key: "Space" }
      ]
    },
    {
      when: ["pointer"],
      steps: (arg: { relativeTarget?: string | number }) => [
        { type: "click", target: "relative", relativeTarget: arg.relativeTarget, }
      ]
    }
  ],
  assertion: (arg: { relativeTarget?: string | number } = {}) => isCheckboxChecked(arg.relativeTarget as string | number)
}
  
function isCheckboxChecked(relativeTarget: string | number) {
  return [
    {
      target: "relative",
      relativeTarget,
      assertion: "toHaveAttribute",
      attribute: "aria-checked",
      expectedValue: "true",
      failureMessage: "Expected checkbox to have aria-checked='true' when checked."
    }
  ]
}`

const checkboxUncheckedState = `
"checkbox.unchecked": {
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: () => []
    }
  ],
  assertion: (arg: { relativeTarget?: string | number } = {}) => isCheckboxUnChecked(arg.relativeTarget as string | number)
}
  
function isCheckboxUnChecked(relativeTarget: string | number) {
  return [
    {
      target: "relative",
      relativeTarget,
      assertion: "toHaveAttribute",
      attribute: "aria-checked",
      expectedValue: "false",
      failureMessage: "Expected checkbox to have aria-checked='false' when unchecked."
    }
  ]  
}`

// eslint-disable-next-line react/prop-types
const CheckboxContract = ({ darkMode, setDarkMode }) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'checkbox-contract';

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Checkbox Contract | Aria-Ease</title>
        <meta name="description" content="Documentation for the checkbox Contract, defining required selectors, ARIA attributes, and behaviors for accessible checkbox implementations." />
        <meta name="keywords" content="checkbox contract, ARIA checkbox, accessible checkbox, WAI-ARIA patterns, web accessibility, frontend development, UI components" />
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
            <h1 className='introduction-heading black-white-text'>Checkbox <span className='text-gradient'>Contract</span></h1>
            <p className='mt-2'>This page documents the <b>Checkbox Contract</b> for accessible, ARIA-compliant checkbox implementations. It covers required selectors, ARIA attributes, and dynamic behaviors, based on <a href="https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Authoring Practices</a> and WCAG 2.2 AA.</p>
            <p className='mt-2'>The contract is written using the fluent, expressive DSL, and compiled to JSON. <Link to="/dsl/overview" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>Learn more about DSL here.</Link></p>
          </div>

          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">Selectors</h2>
            <ul className="docs-list mt-2">
              <li className="mb-4">
                <b>main</b>: <code>[role=group]</code><br/>
                <span className="docs-note">The container element for the checkbox group. This element should have <code>role=&#34;group&#34;</code> and group all checkbox options together for accessibility and keyboard navigation.</span>
              </li>
              <li className="mb-4">
                <b>checkbox</b>: <code>[role=checkbox]</code><br/>
                <span className="docs-note">Each individual checkbox option. Should have <code>role=&#34;checkbox&#34;</code> and support <code>aria-checked</code> to indicate selection state.</span>
              </li>
              <li className="mb-4">
                <b>relative</b>: <code>[role=checkbox]</code><br/>
                <span className="docs-note">A collection of sibling checkbox elements that can be interacted with.</span>
              </li>
            </ul>
          </section>
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">States</h2>
            <p>These are the collection of states that help define the expected behaviors and ARIA attributes of a checkbox component. Each state describes a particular UI or accessibility condition, how to set it up, and what should be asserted. The <b>relativeTarget</b> argument is used for states that depend on a specific element, such as checking a particular checkbox.</p>
            <div className="mt-[20px]">
              <h3><code>checkbox.checked</code></h3>
              <p className="my-2">
                The <code>checkbox.checked</code> state describes a checkbox element that is currently selected (checked). This state can be activated by keyboard (pressing <kbd>Space</kbd> when focused) or by pointer (clicking the checkbox). The assertion checks that <code>aria-checked</code> is <code>true</code> for the checked checkbox.
              </p>
              <Terminal darkMode={darkMode} title="Checkbox Checked State" lang="javascript">{checkboxCheckedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>checkbox.unchecked</code></h3>
              <p className="my-2">
                The <code>checkbox.unchecked</code> state describes a checkbox element that is not selected (unchecked). No setup is required for this state, and the assertion checks that <code>aria-checked</code> is <code>false</code> for the checkbox.
              </p>
              <Terminal darkMode={darkMode} title="Checkbox Unchecked State" lang="javascript">{checkboxUncheckedState}</Terminal>
            </div>
          </section>
          
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">References</h2>
            <ul className="docs-list mt-2">
              <li className="mb-2"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Checkbox Pattern</a></li>
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
            <Link to='/contracts/combobox' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
              <div className='flex flex-col w-full items-end'>
                <span className='text-sm black-white-text'>Next</span>
                <span className='next-link-text text-md'>Combobox Contract</span>
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

export default CheckboxContract
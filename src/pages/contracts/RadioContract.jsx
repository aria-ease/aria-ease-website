import DocsFrame from "../../components/DocsFrame";
import { useState } from 'react';
import SlideOutNav from "../../components/SlideOutNav";
import { Helmet } from "react-helmet-async";
import Terminal from "../../components/Terminal";
import { Link } from "react-router-dom";
import { ChevronRightCircleIcon } from "lucide-react";


const radioCheckedState = `
"radio.checked": {
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
  assertion: (arg: { relativeTarget?: string | number } = {}) => isRadioChecked(arg.relativeTarget as string | number)
}
  
function isRadioChecked(relativeTarget: string | number) {
  return [
    {
      target: "relative",
      relativeTarget,
      assertion: "toHaveAttribute",
      attribute: "aria-checked",
      expectedValue: "true",
      failureMessage: "Expected radio to have aria-checked='true' when checked."
    }
  ]
}`

const radioUncheckedState = `
"radio.unchecked": {
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: () => []
    }
  ],
  assertion: (arg: { relativeTarget?: string | number } = {}) => isRadioUnChecked(arg.relativeTarget as string | number)
}
  
function isRadioUnChecked(relativeTarget: string | number) {
  return [
    {
      target: "relative",
      relativeTarget,
      assertion: "toHaveAttribute",
      attribute: "aria-checked",
      expectedValue: "false",
      failureMessage: "Expected radio to have aria-checked='false' when unchecked."
    }
  ]  
}`


// eslint-disable-next-line react/prop-types
const RadioContract = ({ darkMode, setDarkMode }) => {
    const[showDropdownPage, setShowDropdownPage] = useState(false);
    const page = 'radio-contract';

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Radio Contract | Aria-Ease</title>
        <meta name="description" content="Documentation for the radio Contract, defining required selectors, ARIA attributes, and behaviors for accessible radio implementations." />
        <meta name="keywords" content="radio contract, ARIA radio, accessible radio, WAI-ARIA patterns, web accessibility, frontend development, UI components" />
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
            <h1 className='introduction-heading black-white-text'>Radio <span className='text-gradient'>Contract</span></h1>
            <p className='mt-2'>This page documents the <b>radio Contract</b> for accessible, ARIA-compliant radio implementations. It covers required selectors, ARIA attributes, and dynamic behaviors, based on <a href="https://www.w3.org/WAI/ARIA/apg/patterns/radio/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Authoring Practices</a> and WCAG 2.2 AA.</p>
            <p className='mt-2'>The contract is written using the fluent, expressive DSL, and compiled to JSON. <Link to="/dsl/overview" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>Learn more about DSL here.</Link></p>
          </div>

          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">Selectors</h2>
            <ul className="docs-list mt-2">
              <li className="mb-4">
                <b>main</b>: <code>[role=radiogroup]</code><br/>
                <span className="docs-note">The container element for the radio group. This element should have <code>role=&#34;radiogroup&#34;</code> and group all radio options together for accessibility and keyboard navigation.</span>
              </li>
              <li className="mb-4">
                <b>radio</b>: <code>[role=radio]</code><br/>
                <span className="docs-note">Each individual radio option. Should have <code>role=&#34;radio&#34;</code> and support <code>aria-checked</code> to indicate selection state.</span>
              </li>
              <li className="mb-4">
                <b>relative</b>: <code>[role=radio]</code><br/>
                <span className="docs-note">A collection of sibling radio elements that can be interacted with.</span>
              </li>
            </ul>
          </section>
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">States</h2>
            <p>These are the collection of states that help define the expected behaviors and ARIA attributes of a radio component. Each state describes a particular UI or accessibility condition, how to set it up, and what should be asserted. The <b>relativeTarget</b> argument is used for states that depend on a specific element, such as checking a particular radio button.</p>
            <div className="mt-[20px]">
              <h3><code>radio.checked</code></h3>
              <p className="my-2">
                The <code>radio.checked</code> state describes a radio element that is currently selected. This state can be activated by keyboard (pressing <kbd>Space</kbd> when focused) or by pointer (clicking the radio). The assertion checks that <code>aria-checked</code> is <code>true</code> for the selected radio.
              </p>
              <Terminal darkMode={darkMode} title="Radio Checked State" lang="javascript">{radioCheckedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>radio.unchecked</code></h3>
              <p className="my-2">
                The <code>radio.unchecked</code> state describes a radio element that is not selected. No setup is required for this state, and the assertion checks that <code>aria-checked</code> is <code>false</code> for the radio.
              </p>
              <Terminal darkMode={darkMode} title="Radio Unchecked State" lang="javascript">{radioUncheckedState}</Terminal>
            </div>
          </section>
          
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">References</h2>
            <ul className="docs-list mt-2">
              <li className="mb-2"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/radio/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Radio Pattern</a></li>
              <li><a href="https://www.w3.org/WAI/WCAG22/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WCAG 2.2 AA</a></li>
            </ul>
          </section>

          <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
            <Link to='/contracts/menu' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
              <ChevronRightCircleIcon className='rotate-180'/>
              <div className='flex flex-col w-full'>
                <span className='text-sm black-white-text'>Prev</span>
                <span className='next-link-text text-md'>Menu Contract</span>
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

export default RadioContract
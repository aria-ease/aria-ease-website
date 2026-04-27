import DocsFrame from "../../components/DocsFrame";
import { useState } from 'react';
import SlideOutNav from "../../components/SlideOutNav";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRightCircleIcon } from "lucide-react";
import Terminal from "../../components/Terminal";


const panelExpandedState = `
"panel.expanded": {
  setup: [
    {
      when: ["keyboard", "pointer"],
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
  assertion: (arg: { relativeTarget?: string | number } = {}) => isPanelExpanded(arg.relativeTarget as string | number)
}
  
function isPanelExpanded(relativeTarget: string | number) {
  return [
    {
      target: "panel",
      assertion: "toBeVisible",
      controlledBy: { target: "relative", relativeTarget },
      failureMessage: 'Expected panel controlled by the relative target N trigger to be visible.'
    },
    {
      target: "relative",
      relativeTarget,
      assertion: "toHaveAttribute",
      attribute: "aria-expanded",
      expectedValue: "true",
      failureMessage: "Expected trigger to have aria-expanded='true' when panel expands."
    }
  ]
}`

const panelCollapsedState = `
"panel.collapsed": {
  setup: [
    {
      when: ["keyboard", "pointer"],
      steps: () => []
    }
  ],
  assertion: (arg: { relativeTarget?: string | number } = {}) => isPanelCollapsed(arg.relativeTarget as string | number)
}

function isPanelCollapsed(relativeTarget: string | number) {
  return [
    {
      target: "panel",
      assertion: "notToBeVisible",
      controlledBy: { target: "relative", relativeTarget },
      failureMessage: 'Expected panel controlled by the relative target N trigger not to be visible.'
    },
    {
      target: "relative",
      relativeTarget,
      assertion: "toHaveAttribute",
      attribute: "aria-expanded",
      expectedValue: "false",
      failureMessage: "Expected trigger to have aria-expanded='false' when panel collapses."
    }
  ]
}
`

// eslint-disable-next-line react/prop-types
const AccordionContract = ({ darkMode, setDarkMode }) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'accordion-contract';

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Accordion Contract | Aria-Ease</title>
        <meta name="description" content="Documentation for the Accordion Contract, defining required selectors, ARIA attributes, and behaviors for accessible accordion implementations." />
        <meta name="keywords" content="accordion contract, ARIA accordion, accessible accordion, WAI-ARIA patterns, web accessibility, frontend development, UI components" />
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
            <h1 className='introduction-heading black-white-text'>Accordion <span className='text-gradient'>Contract</span></h1>
            <p className='mt-2'>This page documents the <b>Accordion Contract</b> for accessible, ARIA-compliant accordion implementations. It covers required selectors, ARIA attributes, and dynamic behaviors, based on <a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Authoring Practices</a> and WCAG 2.2 AA.</p>
            <p className='mt-2'>The contract is written using the fluent, expressive DSL, and compiled to JSON. <Link to="/dsl/overview" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>Learn more about DSL here.</Link></p>
          </div>

          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">Selectors</h2>
            <ul className="docs-list mt-2">
              <li className="mb-4">
                <b>main</b>: <code>[aria-controls][aria-expanded]</code><br/>
                <span className="docs-note">The main accordion container element. It manages the overall state and structure of the accordion, and should have <code>aria-controls</code> and <code>aria-expanded</code> attributes for accessibility.</span>
              </li>
              <li className="mb-4">
                <b>trigger</b>: <code>[aria-controls][aria-expanded]</code><br/>
                <span className="docs-note">The interactive element (usually a button) that toggles the visibility of the associated panel. Must have <code>aria-controls</code> pointing to the panel and <code>aria-expanded</code> reflecting its state.</span>
              </li>
              <li className="mb-4">
                <b>panel</b>: <code>[role=&#39;region&#39;][aria-labelledby]</code><br/>
                <span className="docs-note">The content region that is shown or hidden when its trigger is activated. Should have <code>role=&#39;region&#39;</code> and <code>aria-labelledby</code> referencing the trigger.</span>
              </li>
              <li>
                <b>relative</b>: <code>[aria-controls][aria-expanded]</code><br/>
                <span className="docs-note">A collection of sibling trigger elements that can be interacted with. In an accordion, these are the triggers for each panel, used for relative state assertions and actions.</span>
              </li>
            </ul>
          </section>
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">States</h2>
            <p>These are the collection of states that help define the expected behaviors and ARIA attributes of an accordion. Each state describes a particular UI or accessibility condition, how to set it up, and what should be asserted. Some states have an empty setup array—this is intentional, as the component is reset between tests and no additional steps are needed to reach that state. The <b>relativeTarget</b> argument is used for states that depend on a specific option or element, such as expanding/collapsing a particular panel.</p>
            <div className="mt-[20px]"> {/* Each section should talk about what it's state. What it is. What it does. Why some have empty setup (it's because the component resets in between tests). What is relative target */}
              <h3><code>panel.expanded</code></h3>
              <p className="my-2">
                This state represents a panel that is currently expanded and visible to the user. When a panel is expanded, its associated trigger should have <code>aria-expanded=&#34;true&#34;</code> and the panel itself should be visible in the DOM. The <b>panel.expanded</b> state is typically reached by interacting with a trigger element, either via keyboard (e.g., pressing <kbd>Enter</kbd> or <kbd>Space</kbd>) or mouse click. This state is essential for ensuring that assistive technologies can accurately convey the expanded/collapsed status to users. The test setup simulates user interaction, and the assertions verify both the visibility of the panel and the correct ARIA attributes on the trigger.
              </p>
              <Terminal darkMode={darkMode} title="Panel Expanded State" lang="javascript">{panelExpandedState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>panel.collapsed</code></h3>
              <p className="my-2">
                This state represents a panel that is currently collapsed and hidden from the user. In the <b>panel.collapsed</b> state, the panel should not be visible in the DOM, and its associated trigger must have <code>aria-expanded=&#34;false&#34;</code>. This state is reached either by default (when the accordion is initialized) or after toggling a trigger to collapse the panel. The test setup is intentionally empty because the component resets between tests, ensuring a clean state. Assertions confirm that the panel is hidden and the ARIA attributes reflect the collapsed state, which is critical for accessibility and expected user experience.
              </p>
              <Terminal darkMode={darkMode} title="Panel Collapsed State" lang="javascript">{panelCollapsedState}</Terminal>
            </div>
          </section>
          
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">References</h2>
            <ul className="docs-list mt-2">
              <li className="mb-2"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Accordion Pattern</a></li>
              <li><a href="https://www.w3.org/WAI/WCAG22/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WCAG 2.2 AA</a></li>
            </ul>
          </section>

          <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
            <Link to='/contracts/dsl' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
              <ChevronRightCircleIcon className='rotate-180'/>
              <div className='flex flex-col w-full'>
                <span className='text-sm black-white-text'>Prev</span>
                <span className='next-link-text text-md'>Contract DSL</span>
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

export default AccordionContract
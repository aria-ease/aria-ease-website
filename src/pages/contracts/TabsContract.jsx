import DocsFrame from "../../components/DocsFrame";
import { useState } from 'react';
import SlideOutNav from "../../components/SlideOutNav";
import { Helmet } from "react-helmet-async";
import Terminal from "../../components/Terminal";
import { Link } from "react-router-dom";
import { ChevronRightCircleIcon } from "lucide-react";


const tabActiveState = `
"tab.active": {
  setup: [
    {
      when: ["keyboard"],
      steps: (arg: { relativeTarget?: string | number } = {}) => [
        { type: "keypress", target: "relative", relativeTarget: arg.relativeTarget, key: "ArrowLeft" }
      ]
    },
    {
      when: ["pointer"],
      steps: (arg: { relativeTarget?: string | number } = {}) => [
        { type: "click", target: "relative", relativeTarget: arg.relativeTarget }
      ]
    }
  ],
  assertion: (arg: { relativeTarget?: string | number } = {}) => isTabActive(arg.relativeTarget as string | number)
}`

const tabFocusedState = `
"tab.focused": {
  setup: [
    {
      when: ["keyboard"],
      steps: (arg: { relativeTarget?: string | number } = {}) => [
        { type: "focus", target: "relative", relativeTarget: arg.relativeTarget }
      ]
    },
    {
      when: ["pointer"],
      steps: (arg: { relativeTarget?: string | number } = {}) => [
        { type: "focus", target: "relative", relativeTarget: arg.relativeTarget }
      ]
    }
  ],
  assertion: (arg: { relativeTarget?: string | number } = {}) => isTabFocused(arg.relativeTarget as string | number)
}`



// eslint-disable-next-line react/prop-types
const TabsContract = ({ darkMode, setDarkMode }) => {
    const[showDropdownPage, setShowDropdownPage] = useState(false);
    const page = 'tabs-contract';

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Tabs Contract | Aria-Ease</title>
        <meta name="description" content="Documentation for the tabs Contract, defining required selectors, ARIA attributes, and behaviors for accessible tabs implementations." />
        <meta name="keywords" content="tabs contract, ARIA tabs, accessible tabs, WAI-ARIA patterns, web accessibility, frontend development, UI components" />
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
            <h1 className='introduction-heading black-white-text'>Tabs <span className='text-gradient'>Contract</span></h1>
            <p className='mt-2'>This page documents the <b>Tabs Contract</b> for accessible, ARIA-compliant tabs implementations. It covers required selectors, ARIA attributes, and dynamic behaviors, based on <a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Authoring Practices</a> and WCAG 2.2 AA.</p>
            <p className='mt-2'>The contract is written using the fluent, expressive DSL, and compiled to JSON. <Link to="/dsl/overview" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>Learn more about DSL here.</Link></p>
          </div>

          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">Selectors</h2>
            <ul className="docs-list mt-2">
              <li className="mb-4">
                <b>main</b>: <code>[role=tablist]</code><br/>
                <span className="docs-note">The root interactive element for the tabs component. This element acts as the container for all tabs and manages keyboard navigation between them. It must have <code>role=&#34;tablist&#34;</code> so that assistive technology recognizes it as a group of related tabs. The <b>main</b> selector is used to set focus, handle arrow key navigation, and coordinate ARIA attributes such as <code>aria-orientation</code> and <code>aria-label</code> for accessibility. Only one tablist should be present per set of tabs.</span>
              </li>
              <li className="mb-4">
                <b>tablist</b>: <code>[role=tablist]</code><br/>
                <span className="docs-note">The container element that groups all the tabs together. It manages keyboard navigation between tabs and must have <code>role=&#34;tablist&#34;</code> for assistive technology to recognize it as a tab group. Only one tablist should be present per set of tabs.</span>
              </li>
              <li className="mb-4">
                <b>tab</b>: <code>[role=tab]</code><br/>
                <span className="docs-note">An individual tab within the tablist. Each tab must have <code>role=&#34;tab&#34;</code> and should be focusable. Tabs are used to select and display their associated tabpanel. The active tab should have <code>aria-selected=&#34;true&#34;</code> and be included in the tab order.</span>
              </li>
              <li className="mb-4">
                <b>panel</b>: <code>[role=tabpanel]</code><br/>
                <span className="docs-note">The content region associated with a tab. Each panel must have <code>role=&#34;tabpanel&#34;</code> and be referenced by the <code>aria-controls</code> attribute of its corresponding tab. Only the panel associated with the active tab should be visible, and panels should be accessible via keyboard navigation.</span>  
              </li>
              <li>
                <b>relative</b>: <code>[role=tab]</code><br/>
                <span className="docs-note">A collection of sibling elements that can be interacted with. In a tabs component this is a tab.</span>
              </li>
            </ul>
          </section>
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">States</h2>
            <p>These are the collection of states that help define the expected behaviors and ARIA attributes of a tabs component. Each state describes a particular UI or accessibility condition, how to set it up, and what should be asserted. The <b>relativeTarget</b> argument is used for states that depend on a specific element, such as activating a particular tab.</p>
            <div className="mt-[20px]">
              <h3><code>tab.active</code></h3>
              <p className="my-2">
                This state represents a tab being active (selected and its panel visible). The setup simulates activating a tab either by keyboard (using arrow keys to move and select) or by pointer (clicking the tab), using the <b>relativeTarget</b> argument to specify which tab to activate. The assertion checks that the tab has <code>aria-selected=&#34;true&#34;</code>, is in the tab order, and its associated panel is visible while other panels are hidden. This state is essential for ensuring only one tab and panel are active at a time, supporting both keyboard and pointer interaction.
              </p>
              <Terminal darkMode={darkMode} title="Popup Open State" lang="javascript">{tabActiveState}</Terminal>
            </div>
            <div className="mt-[50px]">
              <h3><code>tab.focused</code></h3>
              <p className="my-2">
                This state represents a tab receiving keyboard or pointer focus. The setup focuses a specific tab, using the <b>relativeTarget</b> argument to indicate which tab. The assertion checks that the tab is focused (ready for keyboard interaction), but not necessarily active. This distinction is important for accessibility: a user can move focus between tabs with arrow keys, and activate a tab with <kbd>Enter</kbd> or <kbd>Space</kbd>. The focused tab should have appropriate <code>tabindex</code> and ARIA attributes to support screen readers and keyboard navigation.
              </p>
              <Terminal darkMode={darkMode} title="Popup Closed State" lang="javascript">{tabFocusedState}</Terminal>
            </div>
          </section>
          
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">References</h2>
            <ul className="docs-list mt-2">
              <li className="mb-2"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Tabs Pattern</a></li>
              <li><a href="https://www.w3.org/WAI/WCAG22/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WCAG 2.2 AA</a></li>
            </ul>
          </section>

          <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
            <Link to='/contracts/radio' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
              <ChevronRightCircleIcon className='rotate-180'/>
              <div className='flex flex-col w-full'>
                <span className='text-sm black-white-text'>Prev</span>
                <span className='next-link-text text-md'>Radio Contract</span>
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

export default TabsContract
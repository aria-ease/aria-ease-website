import DocsFrame from "../../components/DocsFrame";
import { useState } from 'react';
import SlideOutNav from "../../components/SlideOutNav";
import { Link } from "react-router-dom";
import { ChevronRightCircleIcon } from "lucide-react";
import { Helmet } from 'react-helmet-async';

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
                <b>focusable</b>: <code>[role=combobox]</code><br/>
                <span className="docs-note">The element that should receive focus when interacting with the combobox. Usually the same as <b>main</b> and <b>input</b>, but in custom implementations, may be a wrapper or proxy element.</span>
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
            <h2 className="docs-section-heading">ARIA Attributes</h2>
            <ul className="docs-list mt-2">
              <li className="mb-4"><b>role</b>: 
                <ul className="list-disc ml-4">
                  <li><code>combobox</code> on main/input</li>
                  <li><code>listbox</code>, <code>tree</code>, <code>grid</code>, or <code>dialog</code> on popup</li>
                  <li><code>option</code>, <code>treeitem</code>, <code>gridcell</code>, or <code>row</code> on each option</li>
                </ul>
              </li>
              <li className="mb-4"><b>aria-expanded</b>: <code>true</code> or <code>false</code> on main, reflects popup visibility.</li>
              <li className="mb-4"><b>aria-controls</b>: References the popup <code>id</code> from main, linking combobox to listbox.</li>
              <li className="mb-4"><b>aria-haspopup</b>: <code>listbox</code> on main, signals the popup type. Could also be <code>tree</code>, <code>grid</code>, or <code>dialog</code>.</li>
              <li className="mb-4"><b>aria-autocomplete</b>: <code>list</code>, <code>none</code> or <code>both</code>, on main, describes autocomplete behavior.</li>
              <li><b>aria-selected</b>: <code>true</code> or <code>false</code> on each option, marks selection state.</li>
            </ul>
          </section>
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">Relationships</h2>
            <ul className="docs-list mt-2">
              <li className="mb-4"><b>aria-controls</b>: <code>main</code> <b>must</b> reference <code>popup</code> by <code>id</code> (required).</li>
              <li><b>popup</b> <b>must</b> contain <code>option</code>, <code>treeitem</code>, or <code>gridcell</code> (required).</li>
            </ul>
          </section>
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">Dynamic Behaviors</h2>
            <ul className="docs-list mt-2">
              <li className="mb-4"><b>Escape</b> closes the popup if open, sets <code>aria-expanded</code> to <code>false</code>, and clears <code>aria-activedescendant</code>.</li>
              <li className="mb-4"><b>Escape</b> (when popup is closed) clears the input value.</li>
              <li className="mb-4"><b>Down Arrow</b> (on closed) opens the popup and sets <code>aria-expanded</code> to <code>true</code>.</li>
              <li className="mb-4"><b>Down Arrow</b> (on open) moves focus to the first option and updates <code>aria-activedescendant</code>.</li>
              <li className="mb-4"><b>Home</b> (on last option) moves active to first option (optional, but recommended for accessibility).</li>
              <li className="mb-4"><b>Click</b> on button toggles popup open/close and updates <code>aria-expanded</code>.</li>
              <li><b>Enter</b> on an option selects it and sets <code>aria-selected</code> to <code>true</code>.</li>
            </ul>
          </section>
          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="docs-section-heading">References</h2>
            <ul className="docs-list mt-2">
              <li className="mb-2"><a href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>WAI-ARIA Combobox Pattern</a></li>
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

export default ComboboxContract
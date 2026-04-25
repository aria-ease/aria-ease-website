import { useState } from 'react';
import SlideOutNav from '../../components/SlideOutNav'
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import CalloutPanel from '../../components/CalloutPanel';
import DocsFrame from '../../components/DocsFrame';
import Terminal from '../../components/Terminal';
import { Link } from 'react-router-dom';


const comboboxStatePack = `
export const COMBOBOX_STATES = {
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
  },
  "comboboxpopup.closed": {
    setup: [
      {
        when: ["keyboard", "pointer"],
        steps: () => []
      }
    ],
    assertion: [...isComboboxClosed(), ...isActiveDescendantUnset()]
  },
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
  },
  // ...
};

function isComboboxOpen() {
  return [
    { target: "popup", assertion: "toBeVisible" },
    { target: "main", assertion: "toHaveAttribute", attribute: "aria-expanded", expectedValue: "true" }
  ];
}
`

// eslint-disable-next-line react/prop-types
const StatePack = ({ darkMode, setDarkMode }) => {
    const[showDropdownPage, setShowDropdownPage] = useState(false);
    const page = 'concept-statepack';

  return (
     <div id="inner-body-div">
        <Helmet>
          <title>State Pack | Aria-Ease</title>
          <meta name="description" content="Learn about State Packs in Aria-Ease: structured representations of component states and transitions that enable automatic accessibility testing through the contract DSL." />
          <meta name="keywords" content="State Pack, Aria-Ease, accessibility testing, contract DSL, component states, transitions, automated testing" />
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
                    <span className='docs-kicker black-grey-text'>CONCEPTS</span>
                    <h1 className='introduction-heading black-white-text'>State <span className='text-gradient'>Pack</span></h1>
                    <p className='mt-2'>We needed a way to let the <Link to='/contracts/dsl' aria-label='Navigate to contract DSL page' className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>DSL</Link> contract builder resolve component preconditions for state-dependent tests automatically. So we built a structured representation of all meaningful states + transitions that define a component&#39;s behavior. This allows us to apply explicit state modeling to deterministic accessibility behavior + make it enforcable.</p>
                </div>

                <section className="side-body-sections-div docs-section-card">
                  <h2 className="text-xl font-bold mb-2">What is a State Pack?</h2>
                  <p className="mb-4">
                    A <b>state pack</b> is a collection of states that define how to reach and verify UI conditions through setup and assertions. It enables the contract system to automatically resolve preconditions and validate behavior without requiring manually defined interaction flows. Each state defines how to reach itself and how to verify its correctness, allowing the system to resolve preconditions and validate behavior.
                  </p>
                  <ul className="list-disc ml-6 mb-4">
                    <li>Each state (e.g. <code>comboboxpopup.open</code>) defines how to reach it (keyboard/pointer steps) and how to verify it (assertions).</li>
                    <li>The state pack is a JavaScript object where each key is a state name and the value describes how to set up and check that state.</li>
                    <li>States can depend on other states (e.g. <code>option.active</code> requires <code>comboboxpopup.open</code>).</li>
                    <li>Invariants. Some rules must always hold. If a combobox option is highlighted, then the combobox must be open.</li>
                    <li>The library uses the state pack to automatically construct setup steps and validate behavior, removing the need for manually defined interaction flows.</li>
                    <li>State packs make the DSL executable: they turn declarative rules into real, automated accessibility checks.</li>
                    <li>You can extend or override the default state pack for custom components or advanced scenarios.</li>
                  </ul>
                  <h3 className="font-semibold mt-6 mb-2">How Does the Library Build a State Pack?</h3>
                  <p className="mb-2">The library provides default state packs for currently supported components (combobox, menu, tabs), mapping all required states to setup/assertion logic. When running contract tests, the library:</p>
                  <ol className="list-decimal ml-6 mb-4">
                    <li>Parses the DSL contract to extract all referenced states.</li>
                    <li>Uses the state pack to simulate user actions (e.g. keypresses, clicks) to reach each state.</li>
                    <li>Runs the corresponding assertions to verify ARIA roles, attributes, and relationships.</li>
                    <li>Reports any failures or mismatches, helping you catch accessibility issues early.</li>
                  </ol>
                  <CalloutPanel tone="info" className="mb-4">
                    <strong>Tip:</strong> State packs are reusable and composable. You can share state packs across similar components, or override only the states that differ.
                  </CalloutPanel>
                  <h3 className="font-semibold mt-6 mb-2">Example: Combobox State Pack</h3>
                  <Terminal lang="ts" darkMode={darkMode} title="Base comboboxStatePack.ts">{comboboxStatePack}</Terminal>
                </section>

                <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 justify-between mt-[100px]'>
                  <Link to='/glossary' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Glossary</span>
                      </div>
                    </Link>
                    <Link to='/components/overview' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Components Overview</span>
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

export default StatePack
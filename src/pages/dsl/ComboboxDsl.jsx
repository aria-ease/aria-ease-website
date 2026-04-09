import DocsFrame from "../../components/DocsFrame";
import { useState } from 'react';
import SlideOutNav from "../../components/SlideOutNav";
import { Link } from "react-router-dom";
import { ChevronRightCircleIcon } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Terminal from "../../components/Terminal";


const comboboxJSX = `
import * as Combobox from "aria-ease/combobox";
...
const ComboBox = () => {
  ...
  useEffect(() => {
    const accessibleCombobox = Combobox.makeComboboxAccessible({
      comboboxInputId: "fruit",
      comboboxButtonId: "show-list-button",
      listBoxId: "fruits-listbox",
      listBoxItemsClass: "list-options",
      callback: {
        onSelect: (option) => { ... },
        onOpenChange: (isOpen) => { ... },
        onActiveDescendantChange: (optId, item) => { ... },
      }
    });
    comboboxInstanceRef.current = accessibleCombobox;
    return () => accessibleCombobox.cleanup();
  }, []);
  ...
  return (
    <div>
      <input id="fruit" ... />
      <button id="show-list-button" ... />
      <ul id="fruits-listbox"> ... </ul>
    </div>
  );
}
`;

const comboboxContractDSL = `
export const comboboxListboxContract = createContract("combobox", (c) => {
  c.meta({
    id: "docs.custom.contract.combobox.listbox",
    version: "1.0.0",
    ...
  });
  c.selectors({
    main: "[role=combobox]",
    input: "[role=combobox]",
    button: "button[tabindex='-1']",
    options: "[role=option]",
    focusable: "[role=combobox]",
    relative: "[role=option]",
    popup: "[role=listbox]"
  });
  c.relationships((r) => {
    r.ariaReference("main", "aria-controls", "popup").required();
    r.contains("popup", "options").required();
  });
  c.static((s) => {
    s.target("main").has("role", "combobox").required();
    s.target("main").has("aria-expanded", "true | false").required();
    ...
  });
  // Event-driven rules (examples):
  c.when("Escape").
  as("keypress")
  .on("main")
  .given("popup.open")
  .then("popup.closed")
  .describe("Escape closes an open listbox popup.")
  .required();
  
  c.when("ArrowDown")
  .as("keypress")
  .on("input")
  .given("popup.closed")
  .then("popup.open")
  .describe("Down Arrow opens the listbox.")
  .required();
  // ...
});
`;

// eslint-disable-next-line react/prop-types
const ComboboxDsl = ({ darkMode, setDarkMode }) => {
    const[showDropdownPage, setShowDropdownPage] = useState(false);
    const page = 'combobox-dsl';

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Combobox DSL | Aria-Ease</title>
        <meta name="description" content="Learn about the Combobox DSL (Domain-Specific Language) in aria-ease, which defines a fluent, testable contract for accessible combobox components. This page explains how the Combobox DSL works, key terms and states, and provides examples of usage and automated accessibility testing." />
        <meta name="keywords" content="Combobox DSL, aria-ease, accessible combobox, ARIA roles, ARIA attributes, accessibility testing, keyboard interactions, state packs, UI states, automated accessibility validation" />
        <meta name="og:title" content="Combobox DSL | Aria-Ease" />
        <meta name="og:description" content="Learn about the Combobox DSL (Domain-Specific Language) in aria-ease, which defines a fluent, testable contract for accessible combobox components. This page explains how the Combobox DSL works, key terms and states, and provides examples of usage and automated accessibility testing." />
        <meta name="og:url" content="https://ariaease.site/dsl/combobox" />
        <meta name="twitter:title" content="Combobox DSL | Aria-Ease" />
        <meta name="twitter:description" content="Learn about the Combobox DSL (Domain-Specific Language) in aria-ease, which defines a fluent, testable contract for accessible combobox components. This page explains how the Combobox DSL works, key terms and states, and provides examples of usage and automated accessibility testing." />

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
            <span className='docs-kicker black-grey-text'>DSL</span>
            <h1 className='introduction-heading black-white-text'>Combobox <span className='text-gradient'>DSL</span></h1>
            <p className='mt-2'>
              The Combobox DSL (Domain-Specific Language) defines a fluent, testable contract for accessible combobox components. It enables automated, robust accessibility validation by describing expected ARIA roles, attributes, relationships, and user interactions in a declarative way.
            </p>
          </div>

          <section className="side-body-sections-div docs-section-card mt-6">
            <h2 className="text-xl font-bold mb-2">How the Combobox DSL Works</h2>
            <ul className="list-disc ml-6 mb-4">
              <li><b>Selectors:</b> Map logical roles (main, input, button, options, popup) to CSS selectors.</li>
              <li><b>Relationships:</b> Define required ARIA relationships (e.g., <code>aria-controls</code>).</li>
              <li><b>Static Assertions:</b> Specify required and recommended ARIA attributes and roles.</li>
              <li><b>Dynamic Rules:</b> Describe how interactions change component state.</li>
            </ul>

            <h3 className="font-semibold mt-6 mb-2">About State Packs</h3>
            <p className="mb-4">
              <b>State packs</b> define how to reach and verify component states (like <code>popup.open</code>, <code>activeOption.first</code>, etc.). For a full explanation, see the <Link to="/dsl/overview" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>DSL Overview</Link>.
            </p>

            <h3 className="font-semibold mt-6 mb-2">Key DSL Terms & States</h3>
            <ul className="list-disc ml-6 mb-4">
              <li><b>main</b>: The root combobox element (usually <code>[role=combobox]</code>), the primary widget container.</li>
              <li><b>input</b>: The text input field inside the combobox (often also <code>[role=combobox]</code>).</li>
              <li><b>button</b>: The button that toggles the popup/listbox.</li>
              <li><b>popup</b>: The dropdown list container (<code>[role=listbox]</code>).</li>
              <li><b>options</b>: The selectable items inside the popup (<code>[role=option]</code>).</li>
              <li><b>activeOption.first</b>: The first option in the list is currently active (highlighted/focused via keyboard).</li>
              <li><b>activeOption.last</b>: The last option in the list is currently active.</li>
              <li><b>selectedOption.first</b>: The first option is selected (chosen by user).</li>
              <li><b>popup.open</b>: The popup/listbox is currently visible.</li>
              <li><b>popup.closed</b>: The popup/listbox is hidden.</li>
              <li><b>main.focused</b>: The combobox widget has keyboard focus.</li>
              <li><b>main.notFocused</b>: The combobox widget does not have focus.</li>
              <li><b>input.filled</b>: The input field contains text.</li>
              <li><b>input.notFilled</b>: The input field is empty.</li>
            </ul>

            

            <h3 className="font-semibold mt-6 mb-2">Example: Combobox DSL Contract</h3>
            <Terminal lang="js" darkMode={darkMode} title="combobox.listbox.contract.mjs">{comboboxContractDSL}</Terminal>

  <h3 className="font-semibold mt-8 mb-2">Live Usage Example</h3>
  <p className="mb-2">Below is a minimal combobox implementation using <b>aria-ease</b> that fully satisfies the DSL contract above:</p>
  <Terminal lang="jsx" darkMode={darkMode} title="ComboBox.jsx">{comboboxJSX}</Terminal>

  <h3 className="font-semibold mt-8 mb-2">Automated Accessibility Testing</h3>
  <p>By defining your combobox contract in this DSL, you enable automated accessibility tests that:</p>
  <ul className="list-disc ml-6 mt-2">
      <li>Validate ARIA roles, attributes, and relationships</li>
      <li>Simulate keyboard and pointer interactions</li>
      <li>Check all required states and transitions</li>
      <li>Catch regressions and ensure WCAG/APG compliance</li>
  </ul>
  <p className='mt-1'><b>Tip:</b> Use the <code>aria-ease</code> CLI or contract test runner to automatically verify your component against the DSL contract.</p>
</section>

          <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <Link to='/dsl/overview' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>DSL Overview</span>
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

export default ComboboxDsl
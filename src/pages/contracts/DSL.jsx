import { useState } from 'react';
import SlideOutNav from '../../components/SlideOutNav';
import CalloutPanel from '../../components/CalloutPanel';
import { Helmet } from 'react-helmet-async';
import Terminal from '../../components/Terminal';
import { ChevronRightCircleIcon } from 'lucide-react';
import DocsFrame from '../../components/DocsFrame';
import { Link } from 'react-router-dom';

const dslExample = `
import { createContract } from "aria-ease/contract";

export const comboboxListboxContract = createContract("combobox", (c) => {
  c.meta({
    id: "docs.custom.contract.combobox.listbox",
    version: "1.0.0",
    created: "11-02-2026",
    lastUpdated: "19-03-2026",
    description: "Simple fluent DSL example for combobox listbox custom policy",
    source: {
      apg: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",
      wcag: ["2.2 AA"],
    },
    W3CName: "Combobox Listbox Popup",
  });

  c.selectors({
    main: "[role=combobox]",
    input: "[role=combobox]",
    button: "button[tabindex='-1']",
    options: "[role=option]",
    relative: "[role=option]",
    popup: "[role=listbox]",
  });

  c.relationships((r) => {
    r.ariaReference("main", "aria-controls", "popup").required();
    r.contains("popup", "options").required();
  });

  c.static((s) => {
    s.target("main").has("role", "combobox").required();
    s.target("main").has("aria-expanded", "true | false").required();
    s.target("main").has("aria-controls", "!empty").required();
  });

  c.when("Escape")
  .as("keypress")
  .on("main")
  .given("comboboxpopup.open")
  .then("comboboxpopup.closed")
  .describe("Escape closes an open listbox.")
  .required();

  c.when("ArrowDown")
  .as("keypress")
  .on("main")
  .given("comboboxpopup.closed")
  .then("comboboxpopup.open")
  .describe("Down Arrow on closed combobox opens the listbox.")
  .required();

  c.when("ArrowDown")
  .as("keypress")
  .on("main")
  .given("comboboxpopup.open")
  .then({type: "option.active", ref: "first"})
  .describe("Second Down Arrow on open combobox activates the first option.")
  .required();

  c.when("Home")
  .as("keypress")
  .on("main")
  .given({type: "option.active", ref: "last"})
  .then({type: "option.active", ref: "first"})
  .describe("Home on last option moves active option from last to first while maintaining input focus.")
  .optional();
});`;

const stateDependentExample = `
c.static((s) => {
  s.target("main").has("aria-activedescendant", "!empty").requires("comboboxpopup.open").recommended();
});

c.relationships((r) => {
  r.contains("popup", "options").requires("comboboxpopup.open").required();
});
`

const stateIndependent = `
c.static((s) => {
  s.target("main").has("role", "combobox").required();
  s.target("main").has("aria-controls", "!empty").required();
});
`
const stateTransition = `
c.when("Escape")
.as("keypress")
.on("main")
.given("comboboxpopup.open")
.then("comboboxpopup.closed")
.describe("Escape closes an open listbox.")
.required();
`

// eslint-disable-next-line react/prop-types
const DslOverview = ({ darkMode, setDarkMode }) => {
  const [showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'dsl-overview';
  const [resultsVisible, setResultsVisible] = useState(false);

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Contract DSL | Aria-Ease</title>
        <meta name="description" content="Define accessibility contracts using a fluent DSL and compile to executable policy." />
        <meta name="keywords" content="accessibility contract, DSL, domain-specific language, JSON policy, custom component testing, accessibility expectations, user interaction flows" />
        <meta name="og:title" content="Contract DSL | Aria-Ease" />
        <meta name="og:description" content="Define accessibility contracts using a fluent DSL and compile to executable policy." />
        <meta name="og:url" content="https://ariaease.site/contracts/dsl" />
        <meta name="twitter:title" content="Contract DSL | Aria-Ease" />
        <meta name="twitter:description" content="Define accessibility contracts using a fluent DSL and compile to executable policy." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <DocsFrame
      
      page={page}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showDropdownPage={showDropdownPage}
        setShowDropdownPage={setShowDropdownPage}
        resultsVisible={resultsVisible}
        setResultsVisible={setResultsVisible}>
        <div className='side-body-div docs-flow'>
                <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                  <span className='docs-kicker black-grey-text'>CONTRACTS</span>
                  <h1 className='introduction-heading black-white-text'>Contract <span className='text-gradient'>DSL</span></h1>
                  <p className='mt-2'>Write accessibility contracts in a fluent, expressive DSL. Compile to JSON for deterministic, repeatable testing of custom component behavior.</p>
                </div>

                {/* Conceptual Overview */}
                <section>
                  <h2 className='text-2xl font-bold mb-2'>What is a Contract?</h2>
                  <p className='mb-2'>A <strong>Contract</strong> is a declarative specification of expected accessibility behavior for a UI component or pattern. It describes selectors, relationships, static and dynamic assertions, and user interaction flows, which can be executed by a contract runner for deterministic, repeatable testing and policy enforcement.</p>
                  <CalloutPanel tone='info'>
                    <strong>Best Practice:</strong> Write contracts as close to the design system or component implementation as possible. Keep them versioned and reviewed alongside code.
                  </CalloutPanel>
                </section>

                {/* Structure Guide */}
                <section>
                  <h2 className='text-2xl font-bold mb-2'>How a Contract DSL is Structured</h2>
                  <ol className='list-decimal list-inside mb-2'>
                    <li><strong>Meta</strong>: Identifies the contract (id, version, description, sources).</li>
                    <li><strong>Selectors</strong>: Maps logical names to element&#39;s semantic accessibility selectors.</li>
                    <li><strong>Relationships</strong>: Declares relationships between elements of a component (e.g., aria-controls, containment).</li>
                    <li><strong>Static Assertions</strong>: Checks attributes/roles that must always be present.</li>
                    <li><strong>Dynamic Assertions</strong>: Describes state transitions and user interactions (e.g., keypress flows).</li>
                  </ol>
                  <CalloutPanel tone='info'>
                    <strong>Best Practice:</strong> Use stable semantic accessibility selectors and keep relationships explicit. Document every dynamic interaction that affects accessibility.
                  </CalloutPanel>
                </section>

                {/* State-Dependent Section */}
                <section>
                  <h2 className='text-xl font-bold mb-2'>State-Dependent Assertions</h2>
                  <p className='mb-2'>
                    <strong>State-dependent</strong> assertions are only checked when the component is in a specific UI state. Use <code>.requires(&#34;state&#34;)</code> to make a static assertion or relationship conditional. This is essential for elements that are dynamically injected into the DOM only when the component is in certain states.
                  </p>
                  <Terminal darkMode={darkMode} title="State-dependent Example" lang="javascript">{stateDependentExample}</Terminal>
                  <p className='mt-2 mb-4'>In the code snippet above, if the popup is dynamically rendered, without a state-dependent <code>requires(...)</code> the tests will return false positives because the popup will not be present in the DOM at the time of the test.</p>
                  <CalloutPanel tone="info">
                    <strong>Use case:</strong> Only check <code>aria-activedescendant</code> when the combobox popup is open, not when it is closed.
                  </CalloutPanel>
                </section>

                {/* State-Independent Section */}
                <section>
                  <h2 className='text-xl font-bold mb-2'>State-Independent Assertions</h2>
                  <p className='mb-2'>
                    <strong>State-independent</strong> assertions are always checked, regardless of the UI state. These are used for attributes and relationships that must always be present for accessibility conformance.
                  </p>
                  <Terminal darkMode={darkMode} title="State-independent Example" lang="javascript">{stateIndependent}</Terminal>
                  <p className='mt-2 mb-4'>A combobox main element would have <code>role=&#34;combobox&#34;</code> regardless of the state the combobox is in at the time of the test.</p>
                  <CalloutPanel tone="info" className='mt-4'>
                    <strong>Use case:</strong> <code>role=&#34;combobox&#34;</code> and <code>aria-controls</code> must always be present on the main element.
                  </CalloutPanel>
                </section>

                {/* State Transition Section */}
                <section>
                  <h2 className='text-xl font-bold mb-2'>State Transition Assertions</h2>
                  <p className='mb-2'>
                    <strong>State transition</strong> assertions describe how the component should respond to user events, specifying the expected state change. These are written using <code>c.when(...).as(...).on(...).given(...).then(...)</code> and are essential for testing interactive behavior.
                  </p>
                  <Terminal darkMode={darkMode} title="State Transition Example" lang="javascript">{stateTransition}</Terminal>
                  <p className='mt-2 mb-4'>The methods <code>given(...)</code> and <code>then(...)</code> define a transition between two states. In this case the popup going from &#39;open&#39; to &#39;closed&#39;.</p>
                  <CalloutPanel tone="info">
                    <strong>Use case:</strong> Pressing Escape when the popup is open should close the popup.
                  </CalloutPanel>
                </section>

                {/* Example Section (expanded) */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>Combobox Listbox Contract Example</h2>
                  <CalloutPanel tone='info' className='p-4 mb-4'>
                    <strong>What is this example?</strong> This contract describes how a combobox with a listbox should behave. It defines selectors for key elements, relationships between them, static checks (like required ARIA attributes), and dynamic checks (like what happens when you press Escape or ArrowDown).<br />
                    <br />
                    <strong>How to read it:</strong> Each <code>c.meta</code>, <code>c.selectors</code>, <code>c.relationships</code>, <code>c.static</code>, and <code>c.when</code> block describes a different aspect of the component’s expected behavior. See the walkthrough below.
                  </CalloutPanel>
                  <div className='mt-6'>
                    <Terminal darkMode={darkMode} title="combobox.contract.mjs" lang="javascript">
                      {dslExample}
                    </Terminal>
                  </div>
                  <div className='mt-6'>
                    <h3 className='text-lg font-bold mb-2'>How to Read This Example</h3>
                    <ul className='list-disc ml-6'>
                      <li><strong>c.meta({`...`})</strong>: Sets metadata about the contract (ID, version, description, sources).</li>
                      <li><strong>c.selectors({`...`})</strong>: Maps logical names (like <code>main</code>, <code>input</code>, <code>listbox</code>) to CSS selectors in your DOM.</li>
                      <li><strong>c.relationships((r) =&gt; {`...`})</strong>: Declares required relationships, like <code>aria-controls</code> and DOM containment.</li>
                      <li><strong>c.static((s) =&gt; {`...`})</strong>: Defines static assertions—checks that must always be true (e.g., <code>role=&#34;combobox&#34;</code>).</li>
                      <li><strong className='break-words'>c.when(...).as(...).on(...).given(...).then(...).describe(...).required()</strong>: Describes a dynamic assertion—a user event (like pressing Escape) and the expected state change (like closing the listbox).</li>
                    </ul>
                  </div>
                </section>

                {/* Keyword Explanations & Glossary */}
                <section className='mt-10 mb-8'>
                  <h2 className='text-2xl font-bold mb-2'>Keyword Explanations & Glossary</h2>
                  <ul className='mb-4'>
                    <li><strong>createContract(name, fn)</strong>: Starts a new contract definition. <em>name</em> is a unique string; <em>fn</em> receives the contract builder.</li>
                    <li><strong>meta({`...`})</strong>: Sets metadata (id, version, description, sources, etc).</li>
                    <li><strong>selectors({`...`})</strong>: Maps logical names (e.g., <code>input</code>, <code>listbox</code>) to CSS selectors.</li>
                    <li><strong>relationships(fn)</strong>: Declares relationships between elements. Use <code>ariaReference</code> for ARIA attributes, <code>contains</code> for DOM containment.</li>
                    <li><strong>static(fn)</strong>: Defines static assertions. Use <code>target</code> to select an element, <code>has</code> to check attributes/roles.</li>
                    <li><strong>requires(...)</strong>: Used to set a requirement for state-dependent relationship and static tests.</li>
                    <li><strong>when(event)</strong>: Begins a dynamic assertion for a user event (e.g., keypress).</li>
                    <li><strong>as(type)</strong>: Specifies the event type (e.g., <code>keypress</code>).</li>
                    <li><strong>on(target)</strong>: The element the event is fired on.</li>
                    <li><strong>given(state)</strong>: The precondition state for the assertion.</li>
                    <li><strong>then(state)</strong>: The expected state after the event.</li>
                    <li><strong>describe(text)</strong>: Human-readable description of the assertion.</li>
                    <li><strong>required()</strong>: Marks the assertion as required for conformance.</li>
                    <li><strong>recommended()</strong>: Marks the assertion as recommended.</li>
                    <li><strong>optional()</strong>: Marks the assertion as optional (nice-to-have, not required for conformance).</li>
                  </ul>
                  <CalloutPanel tone='info' className='mb-4'>
                    <strong>Best Practice:</strong> Use <code>required()</code> for all critical accessibility behaviors. Use <code>optional()</code> for enhancements that improve UX but are not strictly required.
                  </CalloutPanel>
                  <h3 className='font-semibold mt-4 mb-2'>Glossary</h3>
                  <ul>
                    <li><strong>Selector</strong>: A CSS selector string used to find elements in the DOM.</li>
                    <li><strong>Relationship</strong>: A rule describing how elements are connected (e.g., <code>aria-controls</code>).</li>
                    <li><strong>Static Assertion</strong>: A check that must always be true (e.g., <code>role=&#34;combobox&#34;</code>).</li>
                    <li><strong>Dynamic Assertion</strong>: A check that describes a state change or interaction (e.g., pressing Escape closes a popup).</li>
                    <li><strong>State</strong>: A named condition of the UI (e.g., <code>popup.open</code>).</li>
                    <li><strong>Event</strong>: A user action (e.g., keypress, click) that triggers a state change.</li>
                  </ul>
                </section>

                {/* Best Practices Callout */}
                <section>
                  <CalloutPanel tone='info' className='p-4'>
                    <strong>Best Practices for Writing Contracts:</strong>
                    <ul className='list-disc list-inside mt-2'>
                      <li>Keep contracts small and focused—one per component or pattern.</li>
                      <li>Use stable semantic accessibility selectors to avoid test flakiness.</li>
                      <li>Document every required user interaction and state transition.</li>
                      <li>Review contracts with both developers and accessibility experts.</li>
                      <li>Version contracts and keep them in source control.</li>
                    </ul>
                  </CalloutPanel>
                </section>


                <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <Link to='/contracts/overview' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Contract Overview</span>
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
      <SlideOutNav page={page} showDropdownPage={showDropdownPage} />
    </div>
  );
};

export default DslOverview;

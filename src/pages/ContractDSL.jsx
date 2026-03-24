import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState } from 'react';
import SlideOutNav from '../components/SlideOutNav';
import ScrollTracker from '../components/ScrollTracker';
import CalloutPanel from '../components/CalloutPanel';
import { Braces } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Terminal from '../components/Terminal';
import { ChevronRightCircleIcon } from 'lucide-react';

const dslExample = `
import { createContract } from "aria-ease/contract";

export const comboboxListboxContract = createContract("combobox.listbox", (c) => {
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
    input: "[role=combobox]",
    button: "button[tabindex='-1']",
    listbox: "[role=listbox]",
    options: "[role=option]",
    focusable: "[role=combobox]",
    relative: "[role=option]",
    popup: "[role=listbox]",
  });

  c.relationships((r) => {
    r.ariaReference("input", "aria-controls", "listbox").required();
    r.contains("listbox", "options").required();
  });

  c.static((s) => {
    s.target("input").has("role", "combobox").required();
    s.target("input").has("aria-expanded", "true | false").required();
    s.target("input").has("aria-controls", "!empty").required();
  });

  c.when("Escape")
  .as("keypress")
  .on("input")
  .given("listbox.open")
  .then("listbox.closed")
  .describe("Escape closes an open listbox.")
  .required();

  c.when("ArrowDown")
  .as("keypress")
  .on("input")
  .given("listbox.closed")
  .then("listbox.open")
  .describe("Down Arrow on closed combobox opens the listbox.")
  .required();

  c.when("ArrowDown")
  .as("keypress")
  .on("input")
  .given("listbox.open")
  .then("activeOption.first")
  .describe("Second Down Arrow on open combobox activates the first option.")
  .required();

  c.when("Home")
  .as("keypress")
  .on("input")
  .given("activeOption.last")
  .then("activeOption.first")
  .describe("Home on last option moves active option from last to first while maintaining input focus.")
  .optional();
});`;

// eslint-disable-next-line react/prop-types
const ContractDSL = ({ darkMode, setDarkMode }) => {
  const [showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'contract-dsl';
  const [resultsVisible, setResultsVisible] = useState(false);

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Contract DSL | Aria-Ease</title>
        <meta name="description" content="Define accessibility contracts using a fluent DSL and compile to executable policy." />
      </Helmet>
      <a href="#main-content" className="skip-to-content-link absolute left-2 top-2 px-4 py-2 rounded-md" tabIndex={0}>
        Skip to Content
      </a>
      <ScrollTracker page={page} />
      <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage} resultsVisible={resultsVisible} setResultsVisible={setResultsVisible} />
      <main className='page-body-div documentation-page section-tone-a' id="main-content">
        <Container fluid>
          <Row>
            <SideNav page={page} />
            <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
              <div className='side-body-div docs-flow'>
                <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                  <span className='docs-kicker black-grey-text'>DSL</span>
                  <h1 className='introduction-heading black-white-text'>Contract <span className='text-gradient'>DSL</span></h1>
                  <p className='mt-2 docs-intro-copy'>Write accessibility contracts in a fluent, expressive DSL. Compile to JSON for deterministic, repeatable testing of custom component behavior.</p>
                </div>

                {/* Conceptual Overview */}
                <section>
                  <h2 className='text-2xl font-bold mb-2'>What is a Contract?</h2>
                  <p className='mb-2'>A <strong>Contract</strong> is a formal, machine-readable specification of accessibility expectations for a UI component or pattern. It describes selectors, relationships, static/dynamic assertions, and user interaction flows in a fluent, readable DSL. Contracts are compiled to JSON for deterministic, repeatable testing and policy enforcement.</p>
                  <CalloutPanel tone='info'>
                    <strong>Best Practice:</strong> Write contracts as close to the design system or component implementation as possible. Keep them versioned and reviewed alongside code.
                  </CalloutPanel>
                </section>

                {/* Structure Guide */}
                <section>
                  <h2 className='text-2xl font-bold mb-2'>How a Contract is Structured</h2>
                  <ol className='list-decimal list-inside mb-2'>
                    <li><strong>Meta</strong>: Identifies the contract (id, version, description, sources).</li>
                    <li><strong>Selectors</strong>: Maps logical names to CSS selectors for elements.</li>
                    <li><strong>Relationships</strong>: Declares required relationships (e.g., aria-controls, containment).</li>
                    <li><strong>Static Assertions</strong>: Checks attributes/roles that must always be present.</li>
                    <li><strong>Dynamic Assertions</strong>: Describes state transitions and user interactions (e.g., keypress flows).</li>
                  </ol>
                  <CalloutPanel tone='info'>
                    <strong>Best Practice:</strong> Use stable accessibility semantic selectors and keep relationships explicit. Document every dynamic interaction that affects accessibility.
                  </CalloutPanel>
                </section>

                {/* Example Section (existing) */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>Combobox Listbox Contract Example</h2>
                  <CalloutPanel tone='info' className='p-4'>
                    <div className='flex items-start gap-3'>
                      <Braces className='mt-1 flex-shrink-0' size={22} />
                      <div className='min-w-0 flex-1'>
                        <h3 className='font-semibold text-lg mb-2 black-white-text'>Fluent Contract DSL</h3>
                        <p className='black-grey-text'>Define selectors, relationships, static and dynamic assertions, and keyboard interaction flows in a single, readable contract file.</p>
                      </div>
                    </div>
                  </CalloutPanel>
                  <div className='mt-6'>
                    <Terminal darkMode={darkMode} title="Combobox Listbox Contract DSL Example">
                      {dslExample}
                    </Terminal>
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
                    <li><strong>State</strong>: A named condition of the UI (e.g., <code>listbox.open</code>).</li>
                    <li><strong>Event</strong>: A user action (e.g., keypress, click) that triggers a state change.</li>
                  </ul>
                </section>

                {/* Best Practices Callout */}
                <section>
                  <CalloutPanel tone='info' className='p-4'>
                    <strong>Best Practices for Writing Contracts:</strong>
                    <ul className='list-disc list-inside mt-2'>
                      <li>Keep contracts small and focused—one per component or pattern.</li>
                      <li>Use stable accessibility semantic selectors to avoid test flakiness.</li>
                      <li>Document every required user interaction and state transition.</li>
                      <li>Review contracts with both developers and accessibility experts.</li>
                      <li>Version contracts and keep them in source control.</li>
                    </ul>
                  </CalloutPanel>
                </section>

                <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <a href='/component-testing' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Component Testing</span>
                      </div>
                    </a>
                    <a href='/philosophy/utilities' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Utility Philosophy</span>
                      </div>
                      <ChevronRightCircleIcon/>
                    </a>
                  </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <SlideOutNav page={page} showDropdownPage={showDropdownPage} />
    </div>
  );
};

export default ContractDSL;

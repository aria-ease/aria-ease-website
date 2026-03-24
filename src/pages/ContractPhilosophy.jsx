import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState } from 'react';
import SlideOutNav from '../components/SlideOutNav';
import ScrollTracker from '../components/ScrollTracker';
import CalloutPanel from '../components/CalloutPanel';
import { ChevronRightCircleIcon, Braces, GitBranch, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Terminal from '../components/Terminal';

const ariaConfig = `
export default {
  test: {
    strictness: 'strict',
    components: [
      {
        name: 'combobox.listbox',
        path: './tests/external-contracts/combobox.listbox.contract.json',
        strategyPath: './tests/external-strategies/CustomComboboxStrategy.js'
      }
    ]
  },
  contracts: [
    {
      src: './tests/external-contracts/**/*.contract.mjs'
      // Optional: out: './tests/external-contracts/generated'
    },
    {
      src: './tests/client-a/**/*.contract.mjs',
      out: './tests/client-a/generated'
    }
  ]
};`;

const contractDsl = `
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
  .describe("Second Down Arrow on open combobox makes the first option active.")
  .required();

  c.when("Home")
  .as("keypress")
  .on("input")
  .given("activeOption.last")
  .then("activeOption.first")
  .describe("Home on last option moves active option from last to first while maintaining input focus.")
  .optional();
});
`;

const buildAndTest = `
# Build DSL contracts to JSON + validate schema/references
npx aria-ease build contracts

# Run contract tests
npx aria-ease test

# Suggested script
{
  "scripts": {
    "test:a11y": "npx aria-ease build contracts && npx aria-ease test"
  }
}`;

const strategyExample = `
export class CustomMenuStrategy implements ComponentStrategy {
  async resetState(page) {
    // Product-specific reset logic
  }

  async shouldSkipTest(page) {
    // Product-specific skip logic
    return false;
  }

  getMainSelector() {
    return this.mainSelector;
  }
}`;

// eslint-disable-next-line react/prop-types
const ContractPhilosophy = ({ darkMode, setDarkMode }) => {
  const [showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'contract-philosophy';
  const [resultsVisible, setResultsVisible] = useState(false);

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Contract Philosophy | Aria-Ease</title>
        <meta
          name="description"
          content="Define accessibility behavior as executable policy, build contracts from DSL, and enforce product-specific standards with repeatable tests."
        />
      </Helmet>
      <a
        href="#main-content"
        className="skip-to-content-link absolute left-2 top-2 px-4 py-2 rounded-md"
        tabIndex={0}
      >
        Skip to Content
      </a>
      <ScrollTracker page={page} />
      <Header
        page={page}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showDropdownPage={showDropdownPage}
        setShowDropdownPage={setShowDropdownPage}
        resultsVisible={resultsVisible}
        setResultsVisible={setResultsVisible}
      />

      <main className='page-body-div documentation-page section-tone-a' id="main-content">
        <Container fluid>
          <Row>
            <SideNav page={page} />
            <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
              <div className='side-body-div docs-flow'>
                <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                  <span className='docs-kicker black-grey-text'>Philosophy</span>
                  <h1 className='introduction-heading black-white-text'>Contract <span className='text-gradient'>Philosophy</span></h1>
                  <p className='mt-2 docs-intro-copy'>Contracts are team-owned accessibility policy. Codify deterministic component behavior, generate reusable contracts, and enforce them consistently against your components.</p>
                </div>

                <section>
                  <h2 className='text-3xl font-bold mb-4'>Why Contracts Matter</h2>
                  <p className='mb-4'>Accessibility behavior can be interpreted in more than one valid way. Contracts let your team choose a policy and verify it in a repeatable way across components and releases.</p>

                  <CalloutPanel tone='info' className='p-4'>
                    <div className='flex items-start gap-3'>
                      <Braces className='mt-1 flex-shrink-0' size={22} />
                      <div className='min-w-0 flex-1'>
                        <h3 className='font-semibold text-lg mb-2 black-white-text'>Executable Accessibility Policy</h3>
                        <p className='black-grey-text'>Contracts encode keyboard interactions, ARIA transitions, focus behavior, and semantic relationships as checks that run in local development and CI.</p>
                      </div>
                    </div>
                  </CalloutPanel>
                </section>

                <section>
                  <h2 className='text-3xl font-bold mb-4'>Baseline, Then Ownership</h2>
                  <p className='mb-4'>Use baseline contracts as a starting point, then adapt policy to your product context. The goal is consistency with ownership, not a universal one-size-fits-all standard.</p>
                  <ul className='list-disc ml-6 space-y-2'>
                    <li><strong>Start fast:</strong> Use baseline policy for immediate coverage.</li>
                    <li><strong>Customize safely:</strong> Extend or override rules where your UX intentionally differs.</li>
                    <li><strong>Govern over time:</strong> Version contract changes like product code.</li>
                  </ul>
                </section>

                <section>
                  <h2 className='text-3xl font-bold mb-4'>Extension and Override</h2>
                  <p className='mb-4'>Contracts are operational artifacts, not static docs. Teams can evolve standards while maintaining regression protection.</p>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <CalloutPanel tone='success' className='p-4'>
                      <div className='flex items-start gap-3'>
                        <GitBranch className='mt-1 flex-shrink-0' size={22} />
                        <div className='min-w-0 flex-1'>
                          <h3 className='font-semibold mb-2 black-white-text'>Extend</h3>
                          <p className='black-grey-text'>Add requirements specific to your product, clients, or internal quality bar.</p>
                        </div>
                      </div>
                    </CalloutPanel>

                    <CalloutPanel tone='purple' className='p-4'>
                      <div className='flex items-start gap-3'>
                        <CheckCircle className='mt-1 flex-shrink-0' size={22} />
                        <div className='min-w-0 flex-1'>
                          <h3 className='font-semibold mb-2 black-white-text'>Override</h3>
                          <p className='black-grey-text'>Replace baseline expectations where your accessibility policy intentionally differs.</p>
                        </div>
                      </div>
                    </CalloutPanel>
                  </div>
                </section>

                <section>
                  <h2 className='text-3xl font-bold mb-4'>Author, Build, Enforce</h2>
                  <p className='mb-4'>Configure contract sources and component overrides in <code className='inline-code'>ariaease.config.js</code>:</p>

                  <Terminal darkMode={darkMode} title="Aria-Ease Config JS">
                    {ariaConfig}
                  </Terminal>

                  <h3 className='text-xl font-bold mb-3 mt-[50px]'>Contract DSL Example</h3>
                  <p className='mb-4'>Write readable DSL with relationship handling, then compile to JSON with a single command:</p>

                  <Terminal darkMode={darkMode} title="Combobox Contract DSL">
                    {contractDsl}
                  </Terminal>

                  <h3 className='text-xl font-bold mb-3 mt-[50px]'>Build and Test Commands</h3>
                  <p className='mb-4'>No custom Node build script required. The CLI builds and validates contract artifacts:</p>

                  <Terminal darkMode={darkMode} title="Build + Test Workflow">
                    {buildAndTest}
                  </Terminal>

                  <h3 className='text-xl font-bold mb-3 mt-[50px]'>When Custom Strategies Are Needed</h3>
                  <p className='mb-4'>Use custom strategies only when your component behavior diverges from baseline strategy assumptions.</p>

                  <Terminal darkMode={darkMode} title="Custom Strategy Example">
                    {strategyExample}
                  </Terminal>
                </section>

                <section className='side-body-sections-div tone-card tone-card-base docs-section-card'>
                  <h2 className='text-3xl font-bold mb-4'>Practical Adoption Model</h2>
                  <ol className='list-decimal ml-6 space-y-2'>
                    <li><strong>Start with baseline:</strong> Use starter contracts and built-in strategies.</li>
                    <li><strong>Write policy:</strong> Author DSL contracts for your product or client rules.</li>
                    <li><strong>Build artifacts:</strong> Run <code className='inline-code'>npx aria-ease build contracts</code>.</li>
                    <li><strong>Enforce behavior:</strong> Run <code className='inline-code'>npx aria-ease test</code> in CI and local workflows.</li>
                    <li><strong>Customize selectively:</strong> Add strategy overrides only where required.</li>
                    <li><strong>Version everything:</strong> Treat contracts and strategies as reviewable policy code.</li>
                  </ol>
                </section>

                <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                  <a href='/philosophy/utilities' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                    <ChevronRightCircleIcon className='rotate-180' />
                    <div className='flex flex-col w-full'>
                      <span className='text-sm black-white-text'>Prev</span>
                      <span className='next-link-text text-md'>Utility Philosophy</span>
                    </div>
                  </a>
                  <a href='/changelog' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                    <div className='flex flex-col w-full items-end'>
                      <span className='text-sm black-white-text'>Next</span>
                      <span className='next-link-text text-md'>Changelog</span>
                    </div>
                    <ChevronRightCircleIcon />
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

export default ContractPhilosophy;

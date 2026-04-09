import { useState } from 'react';
import SlideOutNav from '../../components/SlideOutNav';
import CalloutPanel from '../../components/CalloutPanel';
import { ChevronRightCircleIcon, Braces } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Terminal from '../../components/Terminal';
import DocsFrame from '../../components/DocsFrame';
import { Link } from 'react-router-dom';

const ariaConfig = `
export default {
  test: {
    strictness: 'strict',
    components: [
      {
        name: 'combobox',
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
    focusable: "[role=combobox]",
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
  .given("popup.open")
  .then("popup.closed")
  .describe("Escape closes an open listbox.")
  .required();


  c.when("ArrowDown")
  .as("keypress")
  .on("main")
  .given("popup.closed")
  .then("popup.open")
  .describe("Down Arrow on closed combobox opens the listbox.")
  .required();

  c.when("ArrowDown")
  .as("keypress")
  .on("main")
  .given("popup.open")
  .then("activeOption.first")
  .describe("Second Down Arrow on open combobox makes the first option active.")
  .required();

  c.when("Home")
  .as("keypress")
  .on("main")
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
class ComboboxStrategy {
  constructor(mainSelector, selectors, actionTimeoutMs = 400, assertionTimeoutMs = 400) {
    this.mainSelector = mainSelector;
    this.selectors = selectors;
    this.actionTimeoutMs = actionTimeoutMs;
    this.assertionTimeoutMs = assertionTimeoutMs;
  }

  async resetState(page) {
    if (!this.selectors.popup) return;

    const popupElement = page.locator(this.selectors.popup).first();
    const isPopupVisible = await popupElement.isVisible().catch(() => false);
    if (!isPopupVisible) return;

    let closed = false;

    if (this.selectors.input) {
      await page.locator(this.selectors.input).first().focus();
      await page.keyboard.press("Escape");
      closed = await popupElement
        .waitFor({ state: "hidden" })
        .then(() => true)
        .catch(() => false);
    }

    if (!closed && this.selectors.button) {
      await page.locator(this.selectors.button).first().click({ timeout: this.actionTimeoutMs });
      closed = await popupElement
        .waitFor({ state: "hidden" })
        .then(() => true)
        .catch(() => false);
    }

    if (!closed) {
      await page.mouse.click(10, 10);
      closed = await popupElement
        .waitFor({ state: "hidden" })
        .then(() => true)
        .catch(() => false);
    }

    if (this.selectors.input) {
      await page.locator(this.selectors.input).first().fill("");
    }
  }

  async shouldSkipTest() {
    return false;
  }

  getMainSelector() {
    return this.mainSelector;
  }
}

export default ComboboxStrategy;`;

// eslint-disable-next-line react/prop-types
const ContractOverview = ({ darkMode, setDarkMode }) => {
  const [showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'contract-overview';
  const [resultsVisible, setResultsVisible] = useState(false);

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Contract Overview | Aria-Ease</title>
        <meta name="description" content="Define accessibility behavior as executable policy, build contracts from DSL, and enforce product-specific standards with repeatable tests." />
        <meta name="keywords" content="accessibility contracts, executable policy, contract DSL, custom accessibility standards, contract testing, product-specific accessibility, contract enforcement" />
        <meta name="og:title" content="Contract Overview | Aria-Ease" />
        <meta name="og:description" content="Define accessibility behavior as executable policy, build contracts from DSL, and enforce product-specific standards with repeatable tests." />
        <meta name="og:url" content="https://ariaease.site/contracts/overview" />
        <meta name="twitter:title" content="Contract Overview | Aria-Ease" />
        <meta name="twitter:description" content="Define accessibility behavior as executable policy, build contracts from DSL, and enforce product-specific standards with repeatable tests." />
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
                  <h1 className='introduction-heading black-white-text'>Contract <span className='text-gradient'>Philosophy</span></h1>
                  <p className='mt-2'>Contracts are team-defined accessibility policies. Codify deterministic component behavior, generate reusable contracts, and enforce them consistently against your components.</p>
                  <p className='mt-2'>Contracts are written using the fluent, expressive DSL, and compiled to JSON. <Link to="/contracts/dsl" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}>Learn more about DSL here.</Link></p>
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
                  <h2 className='text-3xl font-bold mb-4'>Author, Build, Enforce</h2>
                  <p className='mb-4'>Configure contract sources and component strategies in <code className='inline-code'>ariaease.config.js</code>:</p>
                  <CalloutPanel tone='info' className='mb-4'>
                    <p><strong>What is this?</strong> This config tells Aria-Ease where to find your contracts and which strategy to use for each component.</p>
                    <p className="mt-1"><strong>Components</strong> lets you override the default strategy for a component (for example, if you have a custom combobox).</p>
                    <p className="mt-1"><strong>Contracts</strong> tells the system where to look for your DSL files.</p>
                  </CalloutPanel>
                  <Terminal darkMode={darkMode} title="ariaease.config.js" lang="javascript">
                    {ariaConfig}
                  </Terminal>

                  <h3 className='text-xl font-bold mb-3 mt-[50px]'>What is a Strategy?</h3>
                  <p className='mb-4'>
                    <strong>Strategy</strong> refers to the set of instructions that tells the test runner how to interact with your component. It defines how to perform actions (like opening, closing, or resetting a component) and how to check its state. <br />
                    <br />
                    <strong>Built-in strategies</strong> exist for common patterns (menu, accordion, combobox, tabs). <br />
                    <strong>Custom strategies</strong> are needed when your component behaves differently from the default. For example, an editable combobox resets by focusing the input and pressing Escape, while a select-only combobox might reset by clicking a button.
                  </p>
                  <CalloutPanel tone='info' className='mb-4'>
                    <strong>When do I need a custom strategy?</strong> If your component&#39;s interaction model is different from the baseline (e.g., custom keyboard shortcuts, non-standard open/close logic), you should provide a custom strategy.
                  </CalloutPanel>

                  <Terminal darkMode={darkMode} title="CustomComboboxStrategy.js" lang="javascript">
                    {strategyExample}
                  </Terminal>

                  <h3 className='text-xl font-bold mb-3 mt-[50px]'>What is a Main Selector?</h3>
                  <p className='mb-4'>
                    The <strong>main selector</strong> is the primary CSS selector that uniquely identifies the root or main interactive element of your component. It’s the element that most user interactions (like clicks, focus, or keyboard events) are targeted at during testing.<br />
                    <br />
                    <strong>Examples:</strong><br />
                    - For an <strong>accordion</strong>: the trigger element (e.g., <code>{`[aria-controls][aria-expanded]`}</code>)<br />
                    - For a <strong>tabs</strong> component: the tablist container (e.g., <code>{`[role=tablist]`}</code>)<br />
                    - For a <strong>combobox</strong>: the input or trigger element (e.g., <code>{`[role=combobox]`}</code>)<br />
                    - For a <strong>menu</strong>: the menu trigger (e.g., <code>{`[aria-controls][aria-haspopup][aria-expanded]:not([role='menuitem']):not([role='menuitemcheckbox']):not([role='menuitemradio'])`}</code>)<br />
                  </p>
                  <CalloutPanel tone='info' className='mb-4'>
                    <strong>How do I define it?</strong> In your DSL, add a <code>main</code> property under <code>selectors</code>:
                    <br />
                    
                  </CalloutPanel>

                  <h3 className='text-xl font-bold mb-3 mt-[50px]'>Contract DSL Example</h3>
                  <p className='mb-4'>Write readable DSL with relationship handling, then compile to JSON with a single command. <br />
                  <strong>What does this example do?</strong> It defines selectors, relationships, static and dynamic assertions, and keyboard interaction flows for a combobox component.</p>
                  <Terminal darkMode={darkMode} title="combobox.contract.mjs" lang="javascript">
                    {contractDsl}
                  </Terminal>

                  <h3 className='text-xl font-bold mb-3 mt-[50px]'>How to Build and Test</h3>
                  <p className='mb-4'>No custom Node build script required. The CLI builds and validates contract artifacts:</p>
                  <Terminal darkMode={darkMode} title="Build + Test Workflow" lang="javascript">
                    {buildAndTest}
                  </Terminal>
                </section>

                <section>
                  <h2 className='text-2xl font-bold mb-2'>Glossary & Key Concepts</h2>
                  <ul className='mb-4'>
                    <li><strong>Contract</strong>: A machine-readable policy describing how a component should behave and be tested for accessibility.</li>
                    <li><strong>Strategy</strong>: The logic for interacting with a component in tests (open, close, reset, etc.).</li>
                    <li><strong>Main Selector</strong>: The primary CSS selector for the root/interactive element of a component.</li>
                    <li><strong>Selector</strong>: Any CSS selector used to find elements in your component for testing.</li>
                    <li><strong>Relationship</strong>: A rule describing how elements are connected (e.g., <code>aria-controls</code>).</li>
                    <li><strong>Static Assertion</strong>: A check that must always be true (e.g., <code>role=&#34;combobox&#34;</code>).</li>
                    <li><strong>Dynamic Assertion</strong>: A check that describes a state change or interaction (e.g., pressing Escape closes a popup).</li>
                    <li><strong>State</strong>: A named condition of the UI (e.g., <code>popup.open</code>).</li>
                    <li><strong>Event</strong>: A user action (e.g., keypress, click) that triggers a state change.</li>
                  </ul>
                  <CalloutPanel tone='info'>
                    <strong>Tip:</strong> If you’re not sure what selectors to use, inspect your component in the browser and look for unique roles, IDs, or classes.
                  </CalloutPanel>
                </section>

                <section className='side-body-sections-div docs-section-card'>
                  <h2 className='text-3xl font-bold mb-4'>Practical Adoption Model</h2>
                  <ol className='list-decimal ml-6 space-y-2'>
                    <li><strong>Write policy:</strong> Author DSL contracts for your product or client rules.</li>
                    <li><strong>Build artifacts:</strong> Run <code className='inline-code'>npx aria-ease build contracts</code>.</li>
                    <li><strong>Enforce behavior:</strong> Run <code className='inline-code'>npx aria-ease test</code> in CI and local workflows.</li>
                    <li><strong>Customize selectively:</strong> Add strategy overrides only where required.</li>
                    <li><strong>Version everything:</strong> Treat contracts and strategies as reviewable policy code.</li>
                  </ol>
                </section>

                <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                  <Link to='/testing/component-testing' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                    <ChevronRightCircleIcon className='rotate-180' />
                    <div className='flex flex-col w-full'>
                      <span className='text-sm black-white-text'>Prev</span>
                      <span className='next-link-text text-md'>Component Testing</span>
                    </div>
                  </Link>
                  <Link to='/contracts/dsl' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                    <div className='flex flex-col w-full items-end'>
                      <span className='text-sm black-white-text'>Next</span>
                      <span className='next-link-text text-md'>Contract DSL</span>
                    </div>
                    <ChevronRightCircleIcon />
                  </Link>
                </div>
              </div>
      </DocsFrame>

      <SlideOutNav page={page} showDropdownPage={showDropdownPage} />
    </div>
  );
};

export default ContractOverview;

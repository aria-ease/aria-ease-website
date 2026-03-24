import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState } from 'react';
import SlideOutNav from '../components/SlideOutNav';
import CodeBlockDemo from '../components/CodeBlock';
import CalloutPanel from '../components/CalloutPanel';
import ScrollTracker from '../components/ScrollTracker';
import { CheckCircle, XCircle, AlertCircle, ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line react/prop-types
const Testing = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'testing';
  const [resultsVisible, setResultsVisible] = useState(false);

  const workflowCode = `name: Accessibility Component Contract Test

# When to run this workflow
on:
  push:
    branches: [main, <branch>] # Run on pushes to main and your current branch
  pull_request:
    branches: [main] # Run on PRs targeting main

jobs:
  accessibility-audit:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Get your code
      - name: Checkout code
        uses: actions/checkout@v4

      # Step 2: Set up Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      # Step 3: Install dependencies
      - name: Install dependencies
        run: npm install

      # Step 4: Install Playwright browsers (needed for aria-ease test)
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps chromium

      # Step 5: Build the site
      - name: Build site
        run: npm run build

      # Step 6: Start dev server in background
      - name: Start dev server
        run: |
          npm run dev &
          # Wait for server to be ready
          npx wait-on http://localhost:5173 -t 30000

      # Step 7: Run aria-ease contract tests
      - name: Run accessibility tests
        run: |
          set -o pipefail
          npm run test 2>&1 | tee component-contract-test-output.txt

      # Step 8: Upload test report as artifact (so you can download and view it)
      - name: Upload test report
        if: failure() # Upload only when tests fail
        uses: actions/upload-artifact@v4
        with:
          name: component-contract-test-output
          path: component-contract-test-output.txt
          retention-days: 30

      # Step 9: Comment on PR with results (optional but cool)
      - name: Comment PR with test results
        if: github.event_name == 'pull_request' && failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '❌ Accessibility checks failed! Check the [workflow run](https://github.com/{{ github.repository }}/actions/runs/{{ github.run_id }}) for details and download the audit report.'
            })
`

  return (
    <div id="inner-body-div">
      <Helmet>
            <title>Testing Component | Aria-Ease</title>
        <meta name="description" content="Learn how to automate component accessibility validation with baseline APG contract testing, custom policies, and practical usage examples." />
          </Helmet>
          <a
        href="#main-content"
        className="skip-to-content-link absolute left-2 top-2 px-4 py-2 rounded-md"
        tabIndex={0}
      >
        Skip to Content
      </a>
      <ScrollTracker page={page}/>
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
            <SideNav page={page}/>
            <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
              <div className='side-body-div docs-flow'>
                <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                  <span className='docs-kicker black-grey-text'>Documentation</span>
                  <h1 className='introduction-heading black-white-text'>Component <span className='text-gradient'>Testing</span></h1>
                  <p className='mt-2 docs-intro-copy'>Learn how to automate component accessibility validation with baseline APG contract testing, custom policies, and practical usage examples.</p>
                </div>

                {/* Overview */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>Overview</h2>
                  <p className='mb-4'>The Aria-Ease component testing framework combines two complementary testing approaches for consistency and confidence:</p>
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <CalloutPanel tone='info' className='py-4 px-3'>
                      <div className='flex items-start gap-3'>
                        <CheckCircle className='mt-1 flex-shrink-0' size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className='font-semibold text-lg mb-2 black-white-text'>Axe-Core Testing</h3>
                          <p className='black-grey-text'>Analysis of your component&#39;s HTML to detect static WCAG violations, missing ARIA attributes, and accessibility issues.</p>
                        </div>
                      </div>
                    </CalloutPanel>

                    <CalloutPanel tone='success' className='py-4 px-3'>
                      <div className='flex items-start gap-3'>
                        <CheckCircle className='mt-1 flex-shrink-0' size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className='font-semibold text-lg mb-2 black-white-text'>Contract Testing</h3>
                          <p className='black-grey-text'>Verify consistent baseline ARIA component behaviors like keyboard interactions, focus management, and ARIA state updates.</p>
                        </div>
                      </div>
                    </CalloutPanel>
                  </div>
                </section>

                {/* What Contract Testing Covers & Doesn't Cover */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>What Baseline Contract Testing Covers & Doesn&#39;t Cover</h2>
                  <p className='mb-4'>
                    Understanding what contract testing validates—and what it doesn&#39;t—is critical for building a complete accessibility testing strategy. 
                    Most testing tools tell you what they <em>can</em> do, but not what they <em>can&#39;t</em> do. This transparency gap leads to incomplete testing and accessibility issues reaching production.
                  </p>

                  
                  <CalloutPanel tone='info' className='p-4 mb-6'>
                    <div className='flex items-start gap-3'>
                      <CheckCircle className='mt-1 flex-shrink-0' size={24} />
                      <div className='min-w-0 flex-1'>
                        <h3 className='font-semibold text-lg mb-3 black-white-text'>✅ What Contract Testing DOES Cover</h3>
                        <p className='mb-3 black-grey-text'>
                          Contract testing validates that your interactive components follow a <strong>baseline APG interpretation</strong> for supported patterns:
                        </p>
                        <ul className='list-disc ml-4 space-y-2 black-grey-text'>
                          <li><strong>Keyboard interaction patterns</strong> — Arrow keys, Enter, Space, Escape, Tab, Home, End behaviors per your active contract policy</li>
                          <li><strong>ARIA attribute updates</strong> — aria-expanded, aria-selected, aria-checked, aria-pressed, etc, update correctly on interaction</li>
                          <li><strong>Focus management</strong> — Focus moves to correct elements during keyboard navigation</li>
                          <li><strong>Role conformance</strong> — Elements have correct ARIA roles (menu, menuitem, button, etc.)</li>
                          <li><strong>State management</strong> — Component states (open/closed, selected/unselected) match your contract requirements</li>
                          <li><strong>DOM structure validation</strong> — Required parent-child relationships (menu → menuitem, etc.)</li>
                        </ul>
                        <p className='mt-3 text-sm black-grey-text'>
                          💡 <strong>Think of it as:</strong> &ldquo;Does your component conform to a proven, consistent baseline behavior model?&rdquo;
                        </p>
                      </div>
                    </div>
                  </CalloutPanel>

                  <CalloutPanel tone='danger' className='p-4 mb-6'>
                    <div className='flex items-start gap-3'>
                      <XCircle className='mt-1 flex-shrink-0' size={24} />
                      <div className='min-w-0 flex-1'>
                        <h3 className='font-semibold text-lg mb-3 black-white-text'>❌ What Contract Testing Does NOT Cover</h3>
                        <p className='mb-3 black-grey-text'>
                          Contract testing <strong>cannot</strong> validate several critical accessibility aspects:
                        </p>
                        <ul className='list-disc ml-4 space-y-2 black-grey-text'>
                          <li><strong>Screen reader announcements</strong> — How NVDA, JAWS, VoiceOver actually read your component to users</li>
                          <li><strong>Visual presentation</strong> — Focus indicators, visual affordances, responsive design</li>
                          <li><strong>Content quality</strong> — Clear labels, helpful instructions, meaningful link text</li>
                          <li><strong>Context-specific UX</strong> — Whether your accordion/menu/combobox actually makes sense for your use case</li>
                          <li><strong>Real user experience</strong> — How actual users with disabilities interact with your component in context</li>
                          <li><strong>Timing and animation</strong> — Whether animations respect prefers-reduced-motion, timeout durations</li>
                          <li><strong>Error handling</strong> — How your component communicates errors to assistive technology users</li>
                          <li><strong>Mobile accessibility</strong> — Touch target sizes, mobile screen reader behavior, gesture support</li>
                        </ul>
                        <p className='mt-3 text-sm black-grey-text'>
                          ⚠️ <strong>Critical:</strong> Passing all contract tests does NOT mean your component is fully accessible.
                        </p>
                      </div>
                    </div>
                  </CalloutPanel>

                  <CalloutPanel tone='purple' className='p-4 mb-6'>
                    <div className='flex items-start gap-3'>
                      <AlertCircle className='mt-1 flex-shrink-0' size={24} />
                      <div className='min-w-0 flex-1'>
                        <h3 className='font-semibold text-lg mb-3 black-white-text'>🧪 Manual Testing Still Required</h3>
                        <p className='mb-3 black-grey-text'>
                          Contract testing automates the &ldquo;mechanical&rdquo; parts of accessibility. You still need human testing:
                        </p>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 black-grey-text'>
                          <div>
                            <h4 className='font-semibold mb-2'>Screen Reader Testing</h4>
                            <ul className='list-disc ml-6 space-y-1 text-sm'>
                              <li>NVDA (Windows)</li>
                              <li>JAWS (Windows)</li>
                              <li>VoiceOver (macOS/iOS)</li>
                              <li>TalkBack (Android)</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className='font-semibold mb-2'>Manual Validation</h4>
                            <ul className='list-disc ml-6 space-y-1 text-sm'>
                              <li>Focus indicator visibility</li>
                              <li>Content clarity and labeling</li>
                              <li>Timing and animation</li>
                              <li>Mobile accessibility</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CalloutPanel>

                  <CalloutPanel tone='yellow' className='p-4'>
                    <div className='flex items-start gap-3'>
                      <AlertCircle className='mt-1 flex-shrink-0' size={24} />
                      <div className='min-w-0 flex-1'>
                        <h3 className='font-semibold text-lg mb-3 black-white-text'>📊 Coverage Estimate</h3>
                        <p className='mb-3 black-grey-text'>
                          Combined axe-core + contract testing provides approximately:
                        </p>
                        <ul className='space-y-2 black-grey-text'>
                          <li>                            
                            <span className='mt-1'><span className='font-bold text-xl'>30-40%</span> of total accessibility requirements for a typical web application</span>
                          </li>
                          <li>                           
                            <span className='mt-1'><span className='font-bold text-xl'>90-95%</span> of WAI-ARIA APG keyboard interaction patterns for supported components (Menu, Accordion, Combobox, etc.)</span>
                          </li>
                        </ul>
                        <p className='mt-4 text-sm black-grey-text'>
                          <strong>The remaining 60-70%</strong> requires human judgment, screen reader testing, and context-specific validation.
                        </p>
                        <p className='mt-2 text-sm black-grey-text'>
                          Read the complete <a href="https://github.com/aria-ease/aria-ease/blob/main/SCOPE-AND-LIMITATIONS.md" className='underline font-semibold' target="_blank" rel="noopener noreferrer">Scope & Limitations Guide</a> for detailed coverage breakdown.
                        </p>
                      </div>
                    </div>
                  </CalloutPanel>
                </section>

                {/* Installation */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>Installation</h2>
                  <p className='mb-4'>Install Aria-Ease and your testing framework of choice:</p>
                  
                  <h3 className='text-xl font-semibold mb-3 mt-6'>With Vitest</h3>
                  <CodeBlockDemo code={`npm install -D aria-ease vitest @testing-library/react jsdom`}/>
                  
                  <h3 className='text-xl font-semibold mb-3 mt-6'>With Jest</h3>
                  <CodeBlockDemo code={`npm install -D aria-ease jest @testing-library/react jest-environment-jsdom`}/>

                  <CalloutPanel tone='yellow' className='mt-6 py-4 px-3'>
                    <div className='flex items-start gap-3'>
                      <AlertCircle className='mt-1 flex-shrink-0' size={20} />
                      <div className='min-w-0 flex-1'>
                        <h4 className='font-semibold black-white-text'>Optional: Playwright</h4>
                        <p className='black-grey-text mt-1'>For full E2E contract testing with real browser interactions:</p>
                        <div className='overflow-x-auto' tabIndex={0} role='region' aria-label='Playwright installation command'>
                          <CodeBlockDemo code={`npm install -D @playwright/test`}/>
                        </div>
                      </div>
                    </div>
                  </CalloutPanel>
                </section>

                {/* Contract Workflow */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>Contract Workflow</h2>
                  <p className='mb-4'>Before calling <code>testUiComponent(...)</code>, it helps to understand the contract lifecycle: author policy, build artifacts, then enforce behavior.</p>

                  <CalloutPanel tone='info' className='p-4 mb-6'>
                    <div className='flex items-start gap-3'>
                      <CheckCircle className='mt-1 flex-shrink-0' size={24} />
                      <div className='min-w-0 flex-1'>
                        <h3 className='font-semibold text-lg mb-3 black-white-text'>How Contracts Flow Through The System</h3>
                        <ul className='list-disc ml-4 space-y-2 black-grey-text'>
                          <li><strong>Author:</strong> Write readable DSL contracts (selectors, relationships, static checks, dynamic interactions).</li>
                          <li><strong>Build:</strong> Run <code>npx aria-ease build contracts</code> to compile DSL to JSON and validate schema/references.</li>
                          <li><strong>Map:</strong> Point each component to its generated JSON contract in <code>ariaease.config.js</code>.</li>
                          <li><strong>Enforce:</strong> Run <code>npx aria-ease test</code> to verify behavior against your policy.</li>
                        </ul>
                      </div>
                    </div>
                  </CalloutPanel>

                  <h3 className='text-xl font-semibold mb-3 mt-6'>Author + Build + Test</h3>
                  <CodeBlockDemo code={`# 1) Author policy in *.contract.mjs files (DSL)

# 2) Build DSL contracts to JSON (+ validation)
npx aria-ease build contracts

# 3) Run component contract tests
npx aria-ease test`} />

                  <h3 className='text-xl font-semibold mb-3 mt-6'>Configure Sources and Component Mapping</h3>
                  <CodeBlockDemo code={`export default {
  test: {
    strictness: "balanced",
    components: [
      {
        name: "combobox.listbox",
        path: "./tests/external-contracts/combobox.listbox.contract.json",
        strategyPath: "./tests/external-strategies/CustomComboboxStrategy.js"
      }
    ]
  },
  contracts: [
    {
      src: "./tests/external-contracts/**/*.contract.mjs"
      // Optional: out: "./tests/external-contracts/generated"
    }
  ]
};`} />

                  <CalloutPanel tone='purple' className='p-4 mt-6'>
                    <p className='black-grey-text'>
                      <strong>Relationship checks are first-class:</strong> contract relationships (for example, <code>aria-reference</code> and <code>contains</code>) are validated during build and executed in contract test runs.
                    </p>
                  </CalloutPanel>
                </section>

                {/* Basic Usage */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>Basic Usage</h2>
                  <p className='mb-4'>Once your contracts are built and mapped in config, use <code>testUiComponent(...)</code> to run both axe-core and contract tests on your components.</p>

                  <h3 className='text-xl font-semibold mb-3 mt-6'>Simple Example</h3>
                  <CodeBlockDemo code={`import { describe, test, afterAll } from "vitest";
import { testUiComponent, cleanupTests } from "aria-ease/test";
import { render } from "@testing-library/react";
import ShopifyUserMenu from "../src/components/menus/ShopifyUserMenu";


afterAll(async () => {
  await cleanupTests();
});

describe("Shopify User Menu Accessibility Test", () => {
  test("Menu meets WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent(
      "menu", 
      null, 
      "http://localhost:5173/test-harness?component=menu"
    ); // For full component interaction test. Uses Playwright to test interaction and behaviors
  });
});

describe("Shopify User Menu Accessibility Test", () => {
  test("Menu meets WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    const { container } = render(<ShopifyUserMenu/>)
    await testUiComponent(
      "menu", 
      container,
      null
    ); // For fast limited static tests. Doesn't test for interaction and behaviors
  });
});`} isLineNumber={true}/>

<p className='mt-4 mb-2'>To run component contract tests with custom DSL contracts:</p>
                    <CodeBlockDemo code={`# Build DSL contracts to JSON
npx aria-ease build contracts

# Run component contract tests
npx aria-ease test

# Output test report as text file
npx aria-ease test 2>&1 | tee component-contract-test-output.txt`}/>
<p className='mt-4 mb-2'>Configure contract sources in <code>ariaease.config.js</code>:</p>
<CodeBlockDemo code={`export default {
  test: {
    strictness: "balanced",
    components: [
      {
        name: "combobox.listbox",
        path: "./tests/external-contracts/combobox.listbox.contract.json",
        strategyPath: "./tests/external-strategies/CustomComboboxStrategy.js"
      }
    ]
  },
  contracts: [
    {
      src: "./tests/external-contracts/**/*.contract.mjs"
      // Optional: out: "./tests/external-contracts/generated"
    }
  ]
};`}/>
<div className='text-sm mt-2 space-y-2'>
  <p><span className='text-red-500'>*</span> Build contracts before test when using custom DSL sources: <code>npx aria-ease build contracts && npx aria-ease test</code>.</p>
  <p><span className='text-red-500'>*</span> The CLI command <code>npx aria-ease test</code> currently requires Vitest as the test runner.</p>
  <p className='ml-3'>However, you can use <code>testUiComponent</code> with any test framework:</p>
  <div className='ml-3 space-y-1'>
    <p>• <strong>Vitest:</strong> <code>npx vitest run</code></p>
    <p>• <strong>Jest:</strong> <code>npx jest</code></p>
    <p>• <strong>Playwright:</strong> <code>npx playwright test</code></p>
  </div>
</div>

                  <CalloutPanel tone='success' className='mt-6 p-4' title='What This Tests:' titleAs='h4'>
                    <ul className='list-disc ml-6 space-y-1'>
                      <li>WCAG 2.1 Level A & AA violations (static analysis)</li>
                      <li>ARIA attributes and roles (correctness)</li>
                      <li>Keyboard interaction patterns (Playwright mode only)</li>
                      <li>Focus management (element focus order)</li>
                      <li>Color contrast (programmatic checks)</li>
                    </ul>
                    <p className='mt-3 text-sm'>
                      ⚠️ <strong>Important:</strong> This tests ~30-40% of accessibility requirements. Screen reader testing, content quality, and context-specific validation still required. 
                      <a href="#what-contract-testing-covers-doesnt-cover" className='underline ml-1'>See full coverage details</a>
                    </p>
                  </CalloutPanel>
                </section>

                {/* Testing Modes */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>Testing Modes</h2>
                  
                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>jsdom Mode</h3>
                    <p className='mb-4'>Fast testing for static accessibility. Interaction and behavior tests will be skipped as they require a real browser simulated environment.</p>
                    <CodeBlockDemo code={`// Omit URL parameter for jsdom mode
const result = await testUiComponent("combobox.listbox", container, null);`}/>
                    
                    <CalloutPanel tone='info' className='mt-4 p-4'>
                      <p className='font-semibold mb-2 black-white-text'>✅ Best For:</p>
                      <ul className='list-disc ml-6 black-grey-text'>
                        <li>Quick static accessibility tests</li>
                        <li>Static ARIA states, color contrasts, etc</li>
                        <li>Quick feedback during development</li>
                      </ul>
                    </CalloutPanel>
                  </div>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>Playwright Mode (Full E2E)</h3>
                    <p className='mb-4'>Complete testing with real browser automation and keyboard events.</p>
                    <CodeBlockDemo code={`// Provide URL for Playwright mode
const result = await testUiComponent("menu", null, "http://localhost:5173/test-harness?component=menu");`}/>
                    
                    <CalloutPanel tone='purple' className='mt-4 p-4'>
                      <p className='font-semibold mb-2 black-white-text'>✅ Best For:</p>
                      <ul className='list-disc ml-6 black-grey-text'>
                        <li>E2E testing</li>
                        <li>Keyboard interactions and behaviors</li>
                        <li>Visual regression testing</li>
                        <li>Production validation</li>
                      </ul>
                    </CalloutPanel>
                  </div>

                  <CalloutPanel tone='yellow' className='p-4'>
                    <p><strong>Note:</strong> For Playwright mode, ensure your development server is running before executing tests.</p>
                  </CalloutPanel>
                </section>

                {/* Test Harness Architecture */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>Test Harness Architecture (Playwright Mode)</h2>
                  <p className='mb-4'>For Playwright testing, we use a <strong>test harness pattern</strong> that dramatically improves test speed and reliability by rendering components in isolation.</p>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>Why Test Harness?</h3>
                    <p className='mb-4'>Traditional E2E testing navigates to your full application, which includes:</p>
                    <ul className='list-disc ml-6 mb-4 space-y-2'>
                      <li>Complete routing system</li>
                      <li>App-level state management</li>
                      <li>Headers, footers, and navigation</li>
                      <li>Data fetching and API calls</li>
                      <li>Unrelated components and processes</li>
                    </ul>
                    <p className='mb-4'>This results in <strong>90+ second test times per component</strong> and brittle tests that break due to unrelated app changes.</p>
                    
                    <CalloutPanel tone='success' className='mt-4 p-4'>
                      <p className='font-semibold mb-2 black-white-text'>✅ Test Harness Benefits:</p>
                      <ul className='list-disc ml-6 space-y-1 black-grey-text'>
                        <li><strong>15x faster:</strong> ~6 seconds per component (vs 90+ seconds)</li>
                        <li><strong>Deterministic:</strong> No app state interference</li>
                        <li><strong>Isolated:</strong> Test only the component, nothing else</li>
                        <li><strong>Interactive:</strong> Real JavaScript, real events, real DOM</li>
                        <li><strong>Stable:</strong> Browser reuse across all tests</li>
                      </ul>
                    </CalloutPanel>
                  </div>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>Step 1: Create Test Harness Page</h3>
                    <p className='mb-4'>Add a dedicated route in your app that renders components in isolation:</p>
                    
                    <CodeBlockDemo code={`// src/pages/ComponentTestHarness.jsx
import { useSearchParams } from 'react-router-dom';
import ShopifyUserMenu from '../components/menus/ShopifyUserMenu';
import ComboBox from '../components/combobox/ComboBox';
import AccordionExample from '../components/accordions/AccordionExample';

// Registry of components available for testing
const COMPONENT_REGISTRY = {
  menu: ShopifyUserMenu,
  combobox_listbox: ComboBox,
  accordion: AccordionExample,
};

export default function ComponentTestHarness() {
  const [searchParams] = useSearchParams();
  const componentName = searchParams.get('component');
  
  const Component = COMPONENT_REGISTRY[componentName];
  
  if (!Component) {
    return (
      <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
        <h1>Component Test Harness</h1>
        <p>Invalid component: {componentName}</p>
        <p>Available components:</p>
        <ul>
          {Object.keys(COMPONENT_REGISTRY).map(key => (
            <li key={key}>
              <a href={\`?component=\${key}\`}>{key}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  // Render component in isolation (no app layout/chrome)
  return <Component />;
}`} isLineNumber={true}/>
                  </div>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>Step 2: Add Route</h3>
                    <p className='mb-4'>Register the test harness route in your router:</p>
                    
                    <CodeBlockDemo code={`// App.jsx
import ComponentTestHarness from './pages/ComponentTestHarness';

function App() {
  return (
    <Router>
      <Routes>
        {/* ...your existing routes */}
        <Route path="/test-harness" element={<ComponentTestHarness />} />
      </Routes>
    </Router>
  );
}`} isLineNumber={true}/>
                  </div>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>Step 3: Query Param Component Switching</h3>
                    <p className='mb-4'>Use query parameters to switch between components without page reloads:</p>
                    
                    <CodeBlockDemo code={`// Test different components using query params
http://localhost:5173/test-harness?component=menu
http://localhost:5173/test-harness?component=combobox_listbox
http://localhost:5173/test-harness?component=accordion

// Tests navigate between components instantly:
await testUiComponent("menu", null, "http://localhost:5173/test-harness?component=menu");
await testUiComponent("combobox.listbox", null, "http://localhost:5173/test-harness?component=combobox_listbox");`}/>
                  </div>

                  <CalloutPanel tone='danger' className='mb-8 p-4'>
                    <div className='flex items-start gap-3'>
                      <AlertCircle className='mt-1 flex-shrink-0' size={20} />
                      <div className='min-w-0 flex-1'>
                        <h3 className='font-semibold mb-2 black-white-text'>Critical: Component Must Be Fully Rendered</h3>
                        <p className='mb-3 black-grey-text'>Before Playwright tests begin, your component must be <strong>completely rendered</strong> with:</p>
                        <ul className='list-disc ml-4 space-y-2 black-grey-text'>
                          <li><strong>All state initialized:</strong> No pending useState, useEffect, or async operations</li>
                          <li><strong>All data loaded:</strong> No loading spinners, no fetch calls in progress</li>
                          <li><strong>All event handlers attached:</strong> onClick, onKeyDown, etc. must be active</li>
                          <li><strong>All dynamic content visible:</strong> Conditional rendering must be complete</li>
                          <li><strong>Full interactivity:</strong> Component responds to clicks and keyboard immediately</li>
                        </ul>
                        <p className='mt-3 black-grey-text'>Tests may fail if the component is still mounting, loading data, or waiting for side effects.</p>
                      </div>
                    </div>
                  </CalloutPanel>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>Architecture Flow</h3>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                      <pre className='text-sm overflow-x-auto'>
{`1. Playwright launches browser once (reused for all tests)
2. Navigate to: /test-harness?component=menu
3. React Router renders ONLY <ShopifyUserMenu />
4. Component mounts with full interactivity
5. Playwright runs contract tests (clicks, keyboard, ARIA)
6. Change query param to ?component=combobox_listbox (no reload!)
7. React Router switches to <ComboBox />
8. Repeat tests for new component
9. Cleanup browser after all tests complete`}
                      </pre>
                    </div>
                  </div>

                  <CalloutPanel tone='info' className='p-4'>
                    <p className='font-semibold mb-2 black-white-text'>💡 Pro Tip: No Browser Extensions</p>
                    <p className='black-grey-text'>Playwright launches a clean browser profile without user extensions, ensuring tests aren&#39;t affected by extension scripts that inject code into pages.</p>
                  </CalloutPanel>
                </section>

                {/* Supported Components */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>Supported Components</h2>
                  <p className='mb-4'>The following component patterns include starter contract test coverage:</p>

                  <div className='docs-table-wrap'>
                    <table className='docs-table'>
                      <thead className='docs-thead'>
                        <tr>
                          <th className='docs-th'>Component</th>
                          <th className='docs-th'>Contract Tests</th>
                          <th className='docs-th'>Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='docs-td'><code>accordion</code></td>
                          <td className='docs-td'>Expand/collapse, ARIA and role attributes, Enter/Space expansion/collapsing, Home/End, Up/Down Arrow</td>
                          <td className='docs-td'><code>testUiComponent(&quot;accordion&quot;, ...)</code></td>
                        </tr>
                        <tr>
                          <td className='docs-td'><code>combobox.listbox</code></td>
                          <td className='docs-td min-w-[300px]'>Arrow key navigation, Enter/Space selection, Escape closes, Home/End keys, focus management, ARIA and role attributes</td>
                          <td className='docs-td'><code>testUiComponent(&quot;combobox.listbox&quot;, ...)</code></td>
                        </tr>
                        <tr>
                          <td className='docs-td'><code>menu</code></td>
                          <td className='docs-td'>Arrow key navigation, Escape closes, focus management, ARIA and role attributes</td>
                          <td className='docs-td'><code>testUiComponent(&quot;menu&quot;, ...)</code></td>
                        </tr>

                        <tr>
                          <td className='docs-td'><code>tabs</code></td>
                          <td className='docs-td'>Focus management, arrow navigation, Home/End, Enter/Space activate on focus, ARIA and role attributes</td>
                          <td className='docs-td'><code>testUiComponent(&quot;tabs&quot;, ...)</code></td>
                        </tr>
                        
                        {/* 
                        
                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>block</code></td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Focus trap, arrow navigation, Home/End keys</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>testUiComponent(&quot;block&quot;, ...)</code></td>
                        </tr>
                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>checkbox</code></td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Space key toggle, ARIA checked state</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>testUiComponent(&quot;checkbox&quot;, ...)</code></td>
                        </tr>
                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>radio</code></td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Arrow key selection, single selection enforcement</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>testUiComponent(&quot;radio&quot;, ...)</code></td>
                        </tr>
                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>toggle</code></td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Space/Enter toggle, ARIA pressed state</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>testUiComponent(&quot;toggle&quot;, ...)</code></td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Advanced Examples */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>Advanced Examples</h2>

                  <h3 className='text-xl font-semibold mb-3 mt-6'>Testing Multiple Components</h3>
                  <CodeBlockDemo code={`describe("Menu WAI-ARIA Accessibility Test", () => {
  test("Menu meets WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("menu", null, "http://localhost:5173/test-harness?component=menu");
  });
});


describe("ComboBox with Listbox popup Accessibility Test", () => {
  test("Combobox with Listbox popup meets WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("combobox.listbox", null, "http://localhost:5173/test-harness?component=combobox_listbox");
  });
});
`} isLineNumber={true}/>

                  <h3 className='text-xl font-semibold mb-3 mt-8'>Inspecting Test Results</h3>
                  <CodeBlockDemo code={`test("detailed violation inspection", async () => {
  const result = await testUiComponent("combobox.listbox", null, "http://localhost:5173/test-harness?component=combobox_listbox");

  // Log all violations
  if (result.violations.length > 0) {
    console.log("Accessibility violations:", result.violations);
  }

  // Check specific violation types
  const colorContrast = result.violations.filter(
    v => v.id === "color-contrast"
  );
  expect(colorContrast).toHaveLength(0);

  // Access contract test results
  console.log("Contract tests:", result.contract);
});`} isLineNumber={true}/>

                  <h3 className='text-xl font-semibold mb-3 mt-8'>E2E Testing with Playwright</h3>
                  <CodeBlockDemo code={`
test("full E2E combobox test", async () => {
  // Let Aria-Ease handle the accessibility testing
  const result = await testUiComponent(
    "combobox.listbox",
    null,
    "http://localhost:5173/test-harness?component=combobox_listbox"
  );

  // Verify results
  expect(result.violations).toHaveLength(0);
  expect(result.contract.passed).toBeGreaterThan(0);
});`} isLineNumber={true}/>
                </section>

                {/* Test Results */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>Understanding Test Results</h2>
                  
                  <p className='mb-4'>The <code>testUiComponent(...)</code> function returns an object with the following structure:</p>

                  <CodeBlockDemo code={`{
  violations: [
    {
      id: "color-contrast",
      impact: "serious",
      description: "Elements must have sufficient color contrast",
      nodes: [/* affected elements */]
    }
  ],
  raw: {
    /* Full axe-core results */
  },
  contract: {
    passes: [
      'Attribute value matches expected value. Expected: true | menu, Found: true',
      'Attribute value matches expected value. Expected: true | false, Found: false',
      'At least one of the attributes "aria-controls" exists on the element.'             
    ],
    failures: [],
    skipped: []
  }
}`} isLineNumber={true}/>

                  <div className='mt-6'>
                    <h3 className='text-xl font-semibold mb-3'>Violation Severity Levels</h3>
                    <div className='space-y-3'>
                      <CalloutPanel tone='danger' className='p-3'>
                      <div className='flex items-start gap-3'>
                        <XCircle className={`${darkMode ? 'text-red-400' : 'text-red-600'} mt-1 flex-shrink-0`} size={20} />
                        <div className='min-w-0 flex-1'>
                          <p className={`font-semibold ${darkMode ? 'text-red-100' : 'text-red-900'}`}>Critical</p>
                          <p className={`text-sm ${darkMode ? 'text-red-100' : 'text-red-800'}`}>Must be fixed immediately - prevents users from accessing content</p>
                        </div>
                      </div>
                      </CalloutPanel>

                      <CalloutPanel tone='yellow' className='p-3'>
                      <div className='flex items-start gap-3'>
                        <AlertCircle className={`${darkMode ? 'text-orange-400' : 'text-orange-600'} mt-1 flex-shrink-0`} size={20} />
                        <div className='min-w-0 flex-1'>
                          <p className={`font-semibold ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>Serious</p>
                          <p className={`text-sm ${darkMode ? 'text-orange-100' : 'text-orange-800'}`}>Should be fixed soon - significant accessibility barriers</p>
                        </div>
                      </div>
                      </CalloutPanel>

                      <CalloutPanel tone='yellow' className='p-3'>
                      <div className='flex items-start gap-3'>
                        <AlertCircle className={`${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mt-1 flex-shrink-0`} size={20} />
                        <div className='min-w-0 flex-1'>
                          <p className={`font-semibold ${darkMode ? 'text-yellow-contrast-high' : 'text-yellow-contrast-high'}`}>Moderate</p>
                          <p className={`text-sm ${darkMode ? 'text-yellow-contrast' : 'text-yellow-contrast'}`}>Should be fixed - creates accessibility issues for some users</p>
                        </div>
                      </div>
                      </CalloutPanel>
                    </div>
                  </div>
                </section>

                {/* CI/CD Integration */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>CI/CD Integration</h2>
                  <p className='mb-4'>Integrate accessibility testing into your continuous integration pipeline.</p>

                  <h3 className='text-xl font-semibold mb-3 mt-6'>GitHub Actions</h3>
                  <CodeBlockDemo code={workflowCode} isLineNumber={true}/>

                  <h3 className='text-xl font-semibold mb-3 mt-8'>Package.json Scripts</h3>
                  <CodeBlockDemo code={`{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:coverage": "vitest run --coverage"
  }
}`} isLineNumber={true}/>
                </section>

                {/* Troubleshooting */}
                <section>
                  <h2 className='text-3xl font-bold mb-4'>Troubleshooting</h2>
                  
                  <div className='space-y-6'>
                    {/* Test Timeouts */}
                    <CalloutPanel tone='info' className='py-4 px-3'>
                      <div className='flex items-start gap-3'>
                        <AlertCircle className='mt-1 flex-shrink-0' size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className='font-semibold text-lg mb-2 black-white-text'>Configure Global Test Timeout</h3>
                          <p className='mb-3 black-grey-text'>
                            Set a global timeout in your test framework config. Individual tests don&#39;t need per-test timeouts:
                          </p>
                          <div className='overflow-x-auto mb-3' tabIndex={0} role='region' aria-label='Global timeout configuration examples'>
                            <CodeBlockDemo code={`// vitest.config.mts or vitest.config.js
export default defineConfig({
  test: {
    testTimeout: 30000, // 30 seconds global timeout
  }
});

// jest.config.js
module.exports = {
  testTimeout: 30000, // 30 seconds global timeout
};`} isLineNumber={true}/>
                          </div>
                          <div className='overflow-x-auto' tabIndex={0} role='region' aria-label='Test file timeout usage example'>
                            <CodeBlockDemo code={`// Your test file - no per-test timeout needed
describe("ComboBox with Listbox popup Accessibility Test", () => {
  test("Combobox with Listbox popup meets WAI-ARIA roles, states, properties, and keyboard interactions expectations", async () => {
    await testUiComponent("combobox.listbox", null, "http://localhost:5173/test-harness?component=combobox_listbox");
  }); // Global timeout applies automatically
});`} isLineNumber={true}/>
                          </div>
                          
                          <p className='mt-3 text-sm black-grey-text'>
                            💡 <strong>Recommended baseline:</strong> Keep <code>testTimeout: 30000</code> for normal development and CI runs. It catches real hangs without masking regressions. In rare cases (for example, severe CPU throttling), increase the global test timeout only for local debugging.
                          </p>
                        </div>
                      </div>
                    </CalloutPanel>

                    <CalloutPanel tone='yellow' className='py-4 px-3'>
                      <div className='flex items-start gap-3'>
                        <AlertCircle className='mt-1 flex-shrink-0' size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className='font-semibold text-lg mb-2 black-white-text'>Slow Machine?</h3>
                          <p className='mb-3 black-grey-text'>
                            If your machine is temporarily slow, tests may time out. Increase the global test timeout, only for local debugging.
                          </p>
                          <div className='overflow-x-auto mb-3' tabIndex={0} role='region' aria-label='Optional slow environment timeout config'>
                            <CodeBlockDemo code={`// vitest.config.mts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 90000, // 90 seconds for slow environment
  },
});`}/>
                          </div>
                          <p className='mt-3 text-sm black-grey-text'>
                            Use this only as a temporary local fallback. Keep CI and default local runs on the strict baseline so performance regressions remain visible.
                          </p>
                        </div>
                      </div>
                    </CalloutPanel>


                    

                    {/* Dev Server Not Running */}
                    <CalloutPanel tone='purple' className='py-4 px-3'>
                      <div className='flex items-start gap-3'>
                        <AlertCircle className='mt-1 flex-shrink-0' size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className='font-semibold text-lg mb-2 black-white-text'>Development Server Not Running</h3>
                          <p className='mb-3 black-grey-text'>
                            <strong>Error:</strong> <code>page.goto: net::ERR_CONNECTION_REFUSED</code>
                          </p>
                          <p className='mb-3 black-grey-text'>
                            Playwright tests (with URL) require your dev server to be running:
                          </p>
                          <div className='overflow-x-auto' tabIndex={0} role='region' aria-label='Development server commands'>
                            <CodeBlockDemo code={`# Terminal 1: Start your dev server
npm run dev

# Terminal 2: Run tests
npx aria-ease build contracts
npx aria-ease test`}/>
                          </div>
                          
                          <p className='mt-3 text-sm black-grey-text'>
                            💡 For jsdom tests (no URL parameter), you don&#39;t need a running server
                          </p>
                        </div>
                      </div>
                    </CalloutPanel>

                    {/* Missing Peer Dependencies */}
                    <CalloutPanel tone='info' className='py-4 px-3'>
                      <div className='flex items-start gap-3'>
                        <AlertCircle className='mt-1 flex-shrink-0' size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className='font-semibold text-lg mb-2 black-white-text'>Missing Dependencies</h3>
                          <p className='mb-3 black-grey-text'>
                            <strong>Error:</strong> <code>Cannot find package &#39;jest-axe&#39;</code> or <code>Cannot find package &#39;@testing-library/react&#39;</code>
                          </p>
                          <p className='mb-3 black-grey-text'>
                            Install the required peer dependencies:
                          </p>
                          <div className='overflow-x-auto' tabIndex={0} role='region' aria-label='Install missing dependencies command'>
                            <CodeBlockDemo code={`npm install --save-dev jest-axe @testing-library/react`}/>
                          </div>
                          <p className='mt-3 text-sm black-grey-text'>
                            💡 For Playwright tests, also install: <code>npm install -D playwright</code>
                          </p>
                        </div>
                      </div>
                    </CalloutPanel>
                  </div>
                </section>

                {/* Best Practices */}
                <section className={`p-6 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-lg`}>
                  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>Best Practices</h2>
                  
                  <div className={`space-y-4 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                    <div>
                      <h3 className='font-semibold mb-2'>✅ Test Early and Often</h3>
                      <p className='text-sm'>Run accessibility tests during development, not just before release. Fixing issues early is faster and cheaper.</p>
                    </div>


                    <div>
                      <h3 className='font-semibold mb-2'>✅ Test All Interactive Components</h3>
                      <p className='text-sm'>Every custom-built ARIA component that users interact with should have accessibility tests, starting with a baseline contract you can adapt to your policy.</p>
                    </div>

                    <div>
                      <h3 className='font-semibold mb-2'>✅ Don&#39;t Ignore Warnings</h3>
                      <p className='text-sm'>Even &ldquo;moderate&rdquo; violations can create significant barriers. Address all reported issues before shipping.</p>
                    </div>

                    <div>
                      <h3 className='font-semibold mb-2'>✅ Understand What You&#39;re NOT Testing</h3>
                      <p className='text-sm'>Passing automated tests doesn&#39;t mean your component is fully accessible. Know the gaps: screen reader experience, content quality, visual design, and context-specific usability all require human validation.</p>
                    </div>
                  </div>
                </section>

                {/* Related Tools */}
                <section>
                  <h2 className='text-3xl font-bold mb-4 black-white-text'>Related Tools</h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <a href="/static-audit" className='block-interactive p-4 rounded-lg tone-card tone-card-alt transition-colors'>
                      <h3 className='font-semibold mb-2 black-white-text'>Static Audit CLI</h3>
                      <p className='text-sm black-grey-text'>Scan full web pages for static accessibility issues during runtime →</p>
                    </a>
                    <a href="/api" className='block-interactive p-4 rounded-lg tone-card tone-card-alt transition-colors'>
                      <h3 className='font-semibold mb-2 black-white-text'>API Reference</h3>
                      <p className='text-sm black-grey-text'>Complete API documentation for all testing functions →</p>
                    </a>
                    <a href="/philosophy/utilities" className='block-interactive p-4 rounded-lg tone-card tone-card-alt transition-colors'>
                      <h3 className='font-semibold mb-2 black-white-text'>Utility Philosophy</h3>
                      <p className='text-sm black-grey-text'>How Aria-Ease utilities define a trusted baseline interpretation →</p>
                    </a>
                    <a href="/philosophy/contracts" className='block-interactive p-4 rounded-lg tone-card tone-card-alt transition-colors'>
                      <h3 className='font-semibold mb-2 black-white-text'>Contract Philosophy</h3>
                      <p className='text-sm black-grey-text'>How baseline contracts become enforceable and evolvable policy →</p>
                    </a>
                  </div>
                </section>

                <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <a href='/static-audit' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Static Audit</span>
                      </div>
                    </a>

                    <a href='/contract/dsl' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Contract DSL</span>
                      </div>
                      <ChevronRightCircleIcon />
                    </a>                    
                  </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      
      <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>

  );
};

export default Testing;

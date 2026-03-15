import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState } from 'react';
import SlideOutNav from '../components/SlideOutNav';
import CodeBlockDemo from '../components/CodeBlock';
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
            <meta name="description" content="Learn how to use the yesting suite for automated custom component accessibility testing with APG encoded contract validation. Includes usage examples and guidelines." />
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
      
      <main className='page-body-div' id="main-content">
        <Container fluid>
          <Row>
            <SideNav page={page}/>
            <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
              <div className='side-body-div'>
                <h1 className='introduction-heading'>Automated Testing</h1>
                <p className='mt-2'>Ensure your custom ARIA components meet WCAG guidelines with automated accessibility testing powered by axe-core and contract validation.</p>

                {/* Overview */}
                <section className='mt-10'>
                  <h2 className='text-3xl font-bold mb-4'>Overview</h2>
                  <p className='mb-4'>The Aria-Ease testing framework combines two powerful testing approaches:</p>
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <div className={`py-4 px-3 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                      <div className='flex items-start gap-3'>
                        <CheckCircle className={`${darkMode ? 'text-blue-100' : 'text-blue-600'} mt-1 flex-shrink-0`} size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>Axe-Core Testing</h3>
                          <p className={`${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>Static analysis of your component&#39;s HTML to detect WCAG violations, missing ARIA attributes, and accessibility issues.</p>
                        </div>
                      </div>
                    </div>

                    <div className={`py-4 px-3 rounded-lg border-l-4 border-green-500 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <div className='flex items-start gap-3'>
                        <CheckCircle className={`${darkMode ? 'text-green-100' : 'text-green-600'} mt-1 flex-shrink-0`} size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-green-100' : 'text-green-900'}`}>Contract Testing</h3>
                          <p className={`${darkMode ? 'text-green-100' : 'text-green-900'}`}>Dynamic validation of keyboard interactions, focus management, and ARIA updates according to APG guidelines.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* What Contract Testing Covers & Doesn't Cover */}
                <section className='mt-[100px]'>
                  <h2 className='text-3xl font-bold mb-4'>What Contract Testing Covers & Doesn&#39;t Cover</h2>
                  <p className='mb-4'>
                    Understanding what contract testing validates—and what it doesn&#39;t—is critical for building a complete accessibility testing strategy. 
                    Most testing tools tell you what they <em>can</em> do, but not what they <em>can&#39;t</em> do. This transparency gap leads to incomplete testing and accessibility issues reaching production.
                  </p>

                  <div className={`p-4 rounded-lg border-l-4 border-blue-500 mb-6 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <div className='flex items-start gap-3'>
                      <CheckCircle className={`${darkMode ? 'text-blue-100' : 'text-blue-600'} mt-1 flex-shrink-0`} size={24} />
                      <div className='min-w-0 flex-1'>
                        <h3 className={`font-semibold text-lg mb-3 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>✅ What Contract Testing DOES Cover</h3>
                        <p className={`mb-3 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                          Contract testing validates that your interactive components follow the <strong>WAI-ARIA Authoring Practices Guide (APG)</strong> patterns:
                        </p>
                        <ul className={`list-disc ml-4 space-y-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                          <li><strong>Keyboard interaction patterns</strong> — Arrow keys, Enter, Space, Escape, Tab, Home, End behaviors per APG</li>
                          <li><strong>ARIA attribute updates</strong> — aria-expanded, aria-selected, aria-checked, aria-pressed, etc, update correctly on interaction</li>
                          <li><strong>Focus management</strong> — Focus moves to correct elements during keyboard navigation</li>
                          <li><strong>Role conformance</strong> — Elements have correct ARIA roles (menu, menuitem, button, etc.)</li>
                          <li><strong>State management</strong> — Component states (open/closed, selected/unselected) match APG requirements</li>
                          <li><strong>DOM structure validation</strong> — Required parent-child relationships (menu → menuitem, etc.)</li>
                        </ul>
                        <p className={`mt-3 text-sm ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                          💡 <strong>Think of it as:</strong> &ldquo;Does your component behave like the textbook example from the WAI-ARIA APG?&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border-l-4 border-red-500 mb-6 ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                    <div className='flex items-start gap-3'>
                      <XCircle className={`${darkMode ? 'text-red-100' : 'text-red-600'} mt-1 flex-shrink-0`} size={24} />
                      <div className='min-w-0 flex-1'>
                        <h3 className={`font-semibold text-lg mb-3 ${darkMode ? 'text-red-100' : 'text-red-900'}`}>❌ What Contract Testing Does NOT Cover</h3>
                        <p className={`mb-3 ${darkMode ? 'text-red-100' : 'text-red-900'}`}>
                          Contract testing <strong>cannot</strong> validate several critical accessibility aspects:
                        </p>
                        <ul className={`list-disc ml-4 space-y-2 ${darkMode ? 'text-red-100' : 'text-red-900'}`}>
                          <li><strong>Screen reader announcements</strong> — How NVDA, JAWS, VoiceOver actually read your component to users</li>
                          <li><strong>Visual presentation</strong> — Focus indicators, visual affordances, responsive design</li>
                          <li><strong>Content quality</strong> — Clear labels, helpful instructions, meaningful link text</li>
                          <li><strong>Context-specific UX</strong> — Whether your accordion/menu/combobox actually makes sense for your use case</li>
                          <li><strong>Real user experience</strong> — How actual users with disabilities interact with your component in context</li>
                          <li><strong>Timing and animation</strong> — Whether animations respect prefers-reduced-motion, timeout durations</li>
                          <li><strong>Error handling</strong> — How your component communicates errors to assistive technology users</li>
                          <li><strong>Mobile accessibility</strong> — Touch target sizes, mobile screen reader behavior, gesture support</li>
                        </ul>
                        <p className={`mt-3 text-sm ${darkMode ? 'text-red-100' : 'text-red-900'}`}>
                          ⚠️ <strong>Critical:</strong> Passing all contract tests does NOT mean your component is fully accessible.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border-l-4 border-purple-500 mb-6 ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                    <div className='flex items-start gap-3'>
                      <AlertCircle className={`${darkMode ? 'text-purple-100' : 'text-purple-600'} mt-1 flex-shrink-0`} size={24} />
                      <div className='min-w-0 flex-1'>
                        <h3 className={`font-semibold text-lg mb-3 ${darkMode ? 'text-purple-100' : 'text-purple-900'}`}>🧪 Manual Testing Still Required</h3>
                        <p className={`mb-3 ${darkMode ? 'text-purple-100' : 'text-purple-900'}`}>
                          Contract testing automates the &ldquo;mechanical&rdquo; parts of accessibility. You still need human testing:
                        </p>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${darkMode ? 'text-purple-100' : 'text-purple-900'}`}>
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
                  </div>

                  <div className={`p-4 rounded-lg border-l-4 border-orange-500 ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                    <div className='flex items-start gap-3'>
                      <AlertCircle className={`${darkMode ? 'text-orange-100' : 'text-orange-600'} mt-1 flex-shrink-0`} size={24} />
                      <div className='min-w-0 flex-1'>
                        <h3 className={`font-semibold text-lg mb-3 ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>📊 Coverage Estimate</h3>
                        <p className={`mb-3 ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>
                          Combined axe-core + contract testing provides approximately:
                        </p>
                        <ul className={`space-y-2 ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>
                          <li>                            
                            <span className='mt-1'><span className='font-bold text-xl'>30-40%</span> of total accessibility requirements for a typical web application</span>
                          </li>
                          <li>                           
                            <span className='mt-1'><span className='font-bold text-xl'>90-95%</span> of WAI-ARIA APG keyboard interaction patterns for supported components (Menu, Accordion, Combobox, etc.)</span>
                          </li>
                        </ul>
                        <p className={`mt-4 text-sm ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>
                          <strong>The remaining 60-70%</strong> requires human judgment, screen reader testing, and context-specific validation.
                        </p>
                        <p className={`mt-2 text-sm ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>
                          Read the complete <a href="https://github.com/aria-ease/aria-ease/blob/main/SCOPE-AND-LIMITATIONS.md" className='underline font-semibold' target="_blank" rel="noopener noreferrer">Scope & Limitations Guide</a> for detailed coverage breakdown.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Installation */}
                <section className='mt-[100px]'>
                  <h2 className='text-3xl font-bold mb-4'>Installation</h2>
                  <p className='mb-4'>Install Aria-Ease and your testing framework of choice:</p>
                  
                  <h3 className='text-xl font-semibold mb-3 mt-6'>With Vitest</h3>
                  <CodeBlockDemo code={`npm install -D aria-ease vitest @testing-library/react jsdom`}/>
                  
                  <h3 className='text-xl font-semibold mb-3 mt-6'>With Jest</h3>
                  <CodeBlockDemo code={`npm install -D aria-ease jest @testing-library/react jest-environment-jsdom`}/>

                  <div className='mt-6 py-4 px-3 rounded-lg bg-yellow-50 border-l-4 border-yellow-500'>
                    <div className='flex items-start gap-3'>
                      <AlertCircle className='text-yellow-600 mt-1 flex-shrink-0' size={20} />
                      <div className='min-w-0 flex-1'>
                        <h4 className='font-semibold text-yellow-900'>Optional: Playwright</h4>
                        <p className='text-yellow-900 mt-1'>For full E2E contract testing with real browser interactions:</p>
                        <div className='overflow-x-auto'>
                          <CodeBlockDemo code={`npm install -D @playwright/test`}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Basic Usage */}
                <section className='mt-[100px]'>
                  <h2 className='text-3xl font-bold mb-4'>Basic Usage</h2>
                  <p className='mb-4'>The <code>testUiComponent(...)</code> function runs both axe-core and contract tests on your components.</p>

                  <h3 className='text-xl font-semibold mb-3 mt-6'>Simple Example</h3>
                  <CodeBlockDemo code={`import { describe, test, afterAll } from "vitest";
import { testUiComponent, cleanupTests } from "aria-ease/test";
import { render } from "@testing-library/react";
import ShopifyUserMenu from "../src/components/menus/ShopifyUserMenu";


afterAll(async () => {
  await cleanupTests();
});

describe("Shopify User Menu Accessibility Test", () => {
  test("Menu meets WAI-ARIA roles, states, properties, and keyboard interactions expectactions", async () => {
    await testUiComponent(
      "menu", 
      null, 
      "http://localhost:5173/test-harness?component=menu"
    ); // For full component interaction test. Uses Playwright to test interaction and behaviors
  });
});

describe("Shopify User Menu Accessibility Test", () => {
  test("Menu meets WAI-ARIA roles, states, properties, and keyboard interactions expectactions", async () => {
    const { container } = render(<ShopifyUserMenu/>)
    await testUiComponent(
      "menu", 
      container,
      null
    ); // For fast limited static tests. Doesn't test for interaction and behaviors
  });
});`} isLineNumber={true}/>

<p className='mt-4 mb-2'>To run component contract tests:</p>
                    <CodeBlockDemo code={`npx aria-ease test
    
// Output test report as text file
npx aria-ease test 2>&1 | tee component-contract-test-output.txt`}/>
<div className='text-sm mt-2 space-y-2'>
  <p><span className='text-red-500'>*</span> The CLI command <code>npx aria-ease test</code> currently requires Vitest as the test runner.</p>
  <p className='ml-3'>However, you can use <code>testUiComponent</code> with any test framework:</p>
  <div className='ml-3 space-y-1'>
    <p>• <strong>Vitest:</strong> <code>npx vitest run</code></p>
    <p>• <strong>Jest:</strong> <code>npx jest</code></p>
    <p>• <strong>Playwright:</strong> <code>npx playwright test</code></p>
  </div>
</div>

                  <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <h4 className={`font-semibold mb-2 ${darkMode ? 'text-green-100' : 'text-green-900'}`}>What This Tests:</h4>
                    <ul className={`list-disc ml-6 space-y-1 ${darkMode ? 'text-green-100' : 'text-green-900'}`}>
                      <li>WCAG 2.1 Level A & AA violations (static analysis)</li>
                      <li>ARIA attributes and roles (correctness)</li>
                      <li>Keyboard interaction patterns (Playwright mode only)</li>
                      <li>Focus management (element focus order)</li>
                      <li>Color contrast (programmatic checks)</li>
                    </ul>
                    <p className={`mt-3 text-sm ${darkMode ? 'text-green-100' : 'text-green-900'}`}>
                      ⚠️ <strong>Important:</strong> This tests ~30-40% of accessibility requirements. Screen reader testing, content quality, and context-specific validation still required. 
                      <a href="#what-contract-testing-covers-doesnt-cover" className='underline ml-1'>See full coverage details</a>
                    </p>
                  </div>
                </section>

                {/* Testing Modes */}
                <section className='mt-10 '>
                  <h2 className='text-3xl font-bold mb-4'>Testing Modes</h2>
                  
                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>jsdom Mode (Default)</h3>
                    <p className='mb-4'>Fast testing for static accessibility. Interaction and behavior tests will be skipped as they require a real browser simulated environment.</p>
                    <CodeBlockDemo code={`// Omit URL parameter for jsdom mode
const result = await testUiComponent("combobox.listbox", container, null);`}/>
                    
                    <div className={`mt-4 p-4 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-lg`}>
                      <p className={`font-semibold mb-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>✅ Best For:</p>
                      <ul className={`list-disc ml-6 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                        <li>Quick static accessibility tests</li>
                        <li>Static ARIA states, color contrasts, etc</li>
                        <li>Quick feedback during development</li>
                      </ul>
                    </div>
                  </div>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>Playwright Mode (Full E2E)</h3>
                    <p className='mb-4'>Complete testing with real browser automation and keyboard events.</p>
                    <CodeBlockDemo code={`// Provide URL for Playwright mode
const result = await testUiComponent("menu", null, "http://localhost:5173/test-harness?component=menu");`}/>
                    
                    <div className='mt-4 p-4 bg-purple-50 rounded-lg'>
                      <p className='font-semibold mb-2 text-purple-900'>✅ Best For:</p>
                      <ul className='list-disc ml-6 text-purple-900'>
                        <li>E2E testing</li>
                        <li>Keyboard interactions and behaviors</li>
                        <li>Visual regression testing</li>
                        <li>Production validation</li>
                      </ul>
                    </div>
                  </div>

                  <div className='p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500'>
                    <p className='text-yellow-900 dark:text-yellow-200'><strong>Note:</strong> For Playwright mode, ensure your development server is running before executing tests.</p>
                  </div>
                </section>

                {/* Test Harness Architecture */}
                <section className='mt-[100px]'>
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
                    
                    <div className={`mt-4 p-4 rounded-lg border-l-4 border-green-500 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <p className={`font-semibold mb-2 ${darkMode ? 'text-green-200' : 'text-green-900'}`}>✅ Test Harness Benefits:</p>
                      <ul className={`list-disc ml-6 space-y-1 ${darkMode ? 'text-green-200' : 'text-green-900'}`}>
                        <li><strong>15x faster:</strong> ~6 seconds per component (vs 90+ seconds)</li>
                        <li><strong>Deterministic:</strong> No app state interference</li>
                        <li><strong>Isolated:</strong> Test only the component, nothing else</li>
                        <li><strong>Interactive:</strong> Real JavaScript, real events, real DOM</li>
                        <li><strong>Stable:</strong> Browser reuse across all tests</li>
                      </ul>
                    </div>
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

                  <div className={`mb-8 p-4 rounded-lg border-l-4 border-red-500 ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                    <div className='flex items-start gap-3'>
                      <AlertCircle className={`${darkMode ? 'text-red-200' : 'text-red-600'} mt-1 flex-shrink-0`} size={20} />
                      <div className='min-w-0 flex-1'>
                        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-red-200' : 'text-red-900'}`}>Critical: Component Must Be Fully Rendered</h3>
                        <p className={`mb-3 ${darkMode ? 'text-red-200' : 'text-red-900'}`}>Before Playwright tests begin, your component must be <strong>completely rendered</strong> with:</p>
                        <ul className={`list-disc ml-4 space-y-2 ${darkMode ? 'text-red-200' : 'text-red-900'}`}>
                          <li><strong>All state initialized:</strong> No pending useState, useEffect, or async operations</li>
                          <li><strong>All data loaded:</strong> No loading spinners, no fetch calls in progress</li>
                          <li><strong>All event handlers attached:</strong> onClick, onKeyDown, etc. must be active</li>
                          <li><strong>All dynamic content visible:</strong> Conditional rendering must be complete</li>
                          <li><strong>Full interactivity:</strong> Component responds to clicks and keyboard immediately</li>
                        </ul>
                        <p className={`mt-3 ${darkMode ? 'text-red-200' : 'text-red-900'}`}>Tests may fail if the component is still mounting, loading data, or waiting for side effects.</p>
                      </div>
                    </div>
                  </div>

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

                  <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className={`font-semibold mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>💡 Pro Tip: No Browser Extensions</p>
                    <p className={`${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>Playwright launches a clean browser profile without user extensions, ensuring tests aren&#39;t affected by extension scripts that inject code into pages.</p>
                  </div>
                </section>

                {/* Supported Components */}
                <section className='mt-[100px]'>
                  <h2 className='text-3xl font-bold mb-4'>Supported Components</h2>
                  <p className='mb-4'>The following component patterns have full contract test coverage:</p>

                  <div className='overflow-x-auto'>
                    <table className='w-full border-collapse border border-gray-300 dark:border-gray-600'>
                      <thead className='bg-gray-100 dark:bg-gray-800'>
                        <tr>
                          <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white'>Component</th>
                          <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white'>Contract Tests</th>
                          <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white'>Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>accordion</code></td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Expand/collapse, ARIA and role attributes, Enter/Space expansion/collapsing, Home/End, Up/Down Arrow</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>testUiComponent(&quot;accordion&quot;, ...)</code></td>
                        </tr>
                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>combobox</code></td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2 min-w-[300px]'>Arrow key navigation, Enter/Space selection, Escape closes, Home/End keys, focus management, ARIA and role attributes</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>testUiComponent(&quot;combobox&quot;, ...)</code></td>
                        </tr>
                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>menu</code></td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Arrow key navigation, Escape closes, focus management, ARIA and role attributes</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>testUiComponent(&quot;menu&quot;, ...)</code></td>
                        </tr>

                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>tabs</code></td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Focus management, arrow navigation, Home/End, Enter/Space activate on focus, ARIA and role attributes</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>testUiComponent(&quot;tabs&quot;, ...)</code></td>
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

                {/* Required Test Attributes */}
                <section className='mt-[100px]'>
                  <h2 className='text-3xl font-bold mb-4'>Required Test Attributes</h2>
                  <p className='mb-4'>Some component contract tests use <code>data-test-id</code> attributes to reliably locate elements. Add these to your components before running tests:</p>

                  <div className={`mt-6 p-4 rounded-lg border-l-4 border-red-500 ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                    <div className='flex items-start gap-3'>
                      <AlertCircle className={`${darkMode ? 'text-red-200' : 'text-red-600'} mt-1 flex-shrink-0`} size={20} />
                      <div className='min-w-0 flex-1'>
                        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-red-200' : 'text-red-900'}`}>Important</h3>
                        <p className={`${darkMode ? 'text-red-200' : 'text-red-900'}`}>Tests will fail if these attributes are missing. They provide stable selectors that work across different frameworks and implementations.</p>
                      </div>
                    </div>
                  </div>

                  <div className='overflow-x-auto mt-6'>
                    <table className='w-full border-collapse border border-gray-300 dark:border-gray-600 whitespace-nowrap'>
                      <thead className='bg-gray-100 dark:bg-gray-800'>
                        <tr>
                          <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white'>Component</th>
                          <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white'>Element</th>
                          <th className='border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-900 dark:text-white'>Required data-test-id</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2' rowSpan="2"><code>accordion</code></td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Container (wrapper)</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>data-test-id=&quot;accordion-group&quot;</code></td>
                        </tr>
                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Trigger buttons (all)</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>data-test-id=&quot;accordion-trigger&quot;</code></td>
                        </tr>
                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>combobox</code></td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Toggle button (optional)</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>data-test-id=&quot;combobox-button&quot;</code></td>
                        </tr>
                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2' rowSpan="2"><code>menu</code></td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Trigger button</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>data-test-id=&quot;menu-trigger&quot;</code></td>
                        </tr>
                        <tr>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'>Submenu Trigger button</td>
                          <td className='border border-gray-300 dark:border-gray-600 px-4 py-2'><code>data-submenu-id=&quot;{`<submenu-div-id>`}&quot;</code></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <h4 className={`font-semibold mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>💡 Tips</h4>
                    <ul className={`list-disc ml-6 space-y-1 ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                      <li>Apply the same <code>data-test-id</code> to multiple elements of the same type (e.g., all menu triggers)</li>
                      <li>Tests also use ARIA roles (like <code>role=&quot;combobox&quot;</code>, <code>role=&quot;region&quot;</code>) - ensure these are present if not using Aria-Ease component utilities</li>
                      <li>Check component documentation pages for complete implementation examples</li>
                      <li>Some components rely on roles rather than test IDs (e.g., combobox uses <code>role=&quot;combobox&quot;</code> for the input)</li>
                    </ul>
                  </div>

                  <div className='mt-6'>
                    <h3 className='text-xl font-semibold mb-3'>Quick Example</h3>
                    <CodeBlockDemo code={`<!-- Accordion -->
<div data-test-id="accordion-group">
  <button data-test-id="accordion-trigger">
    Question 1
  </button>
  <div role="region">
    Answer 1
  </div>
</div>

<!-- Menu -->
<button data-test-id="menu-trigger">
  Open Menu
</button>
<div role="menu">
  <div role="menuitem">Item 1</div>
</div>`} isLineNumber={true}/>
                  </div>

                  <p className='mt-6'>
                    <strong>See component pages for full examples</strong>
                  </p>
                </section>

                {/* Advanced Examples */}
                <section className='mt-[100px]'>
                  <h2 className='text-3xl font-bold mb-4'>Advanced Examples</h2>

                  <h3 className='text-xl font-semibold mb-3 mt-6'>Testing Multiple Components</h3>
                  <CodeBlockDemo code={`describe("Menu WAI-ARIA Accessibility Test", () => {
  test("Menu meets WAI-ARIA roles, states, properties, and keyboard interactions expectactions", async () => {
    await testUiComponent("menu", null, "http://localhost:5173/test-harness?component=menu");
  });
});


describe("ComboBox with Listbox popup Accessibility Test", () => {
  test("Combobox with Listbox popup meets WAI-ARIA roles, states, properties, and keyboard interactions expectactions", async () => {
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
                <section className='mt-10'>
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
                      <div className={`flex items-start gap-3 p-3 rounded-lg ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                        <XCircle className={`${darkMode ? 'text-red-400' : 'text-red-600'} mt-1 flex-shrink-0`} size={20} />
                        <div className='min-w-0 flex-1'>
                          <p className={`font-semibold ${darkMode ? 'text-red-100' : 'text-red-900'}`}>Critical</p>
                          <p className={`text-sm ${darkMode ? 'text-red-100' : 'text-red-800'}`}>Must be fixed immediately - prevents users from accessing content</p>
                        </div>
                      </div>

                      <div className={`flex items-start gap-3 p-3 rounded-lg ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                        <AlertCircle className={`${darkMode ? 'text-orange-400' : 'text-orange-600'} mt-1 flex-shrink-0`} size={20} />
                        <div className='min-w-0 flex-1'>
                          <p className={`font-semibold ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>Serious</p>
                          <p className={`text-sm ${darkMode ? 'text-orange-100' : 'text-orange-800'}`}>Should be fixed soon - significant accessibility barriers</p>
                        </div>
                      </div>

                      <div className={`flex items-start gap-3 p-3 rounded-lg ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                        <AlertCircle className={`${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mt-1 flex-shrink-0`} size={20} />
                        <div className='min-w-0 flex-1'>
                          <p className={`font-semibold ${darkMode ? 'text-yellow-contrast-high' : 'text-yellow-contrast-high'}`}>Moderate</p>
                          <p className={`text-sm ${darkMode ? 'text-yellow-contrast' : 'text-yellow-contrast'}`}>Should be fixed - creates accessibility issues for some users</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* CI/CD Integration */}
                <section className='mt-[100px]'>
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
                <section className='mt-[100px]'>
                  <h2 className='text-3xl font-bold mb-4'>Troubleshooting</h2>
                  
                  <div className='space-y-6'>
                    {/* Test Timeouts */}
                    <div className={`py-4 px-3 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                      <div className='flex items-start gap-3'>
                        <AlertCircle className={`${darkMode ? 'text-blue-100' : 'text-blue-700'} mt-1 flex-shrink-0`} size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>Configure Global Test Timeout</h3>
                          <p className={`mb-3 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                            Set a global timeout in your test framework config. Individual tests don&#39;t need per-test timeouts:
                          </p>
                          <div className='overflow-x-auto mb-3'>
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
                          <div className='overflow-x-auto'>
                            <CodeBlockDemo code={`// Your test file - no per-test timeout needed
describe("ComboBox with Listbox popup Accessibility Test", () => {
  test("Combobox with Listbox popup meets WAI-ARIA roles, states, properties, and keyboard interactions expectactions", async () => {
    await testUiComponent("combobox.listbox", null, "http://localhost:5173/test-harness?component=combobox_listbox");
  }); // Global timeout applies automatically
});`} isLineNumber={true}/>
                          </div>
                          
                          <p className={`mt-3 text-sm ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                            💡 <strong>Why this works:</strong> Tests fail fast internally (~400ms per failed assertion) and complete in 4-6 seconds whether passing or failing. The 30s global timeout is a safety net for browser launch, page navigation, and edge cases. Timeouts only occur on critical issues like missing components or dev server not running.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Missing data-test-id */}
                    <div className={`py-4 px-3 rounded-lg border-l-4 border-red-500 ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
                      <div className='flex items-start gap-3'>
                        <XCircle className={`${darkMode ? 'text-red-100' : 'text-red-700'} mt-1 flex-shrink-0`} size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-red-100' : 'text-red-900'}`}>Missing data-test-id Attribute</h3>
                          <p className={`mb-3 ${darkMode ? 'text-red-100' : 'text-red-900'}`}>
                            <strong>Error:</strong> <code>Timeout waiting for locator(&#39;[data-test-id=&#34;combobox-button&#34;]&#39;)</code>
                          </p>
                          <p className={`mb-3 ${darkMode ? 'text-red-100' : 'text-red-900'}`}>
                            Contract tests require the <code>data-test-id</code> attribute to locate components in pages:
                          </p>
                          <div className='overflow-x-auto'>
                            <CodeBlockDemo code={`
function Combobox() {
  return (
    <div>
      <input></input>
      <button data-test-id="combobox-button">▼</button>
      {/* combobox items */}
    </div>
  );
}`} isLineNumber={true}/>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submenu Element Not Found */}
                    {/* <div className={`py-4 px-3 rounded-lg border-l-4 border-orange-500 ${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                      <div className='flex items-start gap-3'>
                        <AlertCircle className={`${darkMode ? 'text-orange-100' : 'text-orange-700'} mt-1 flex-shrink-0`} size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>Submenu Element Not Found (Fixed in v2.8.2+)</h3>
                          <p className={`mb-3 ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>
                            <strong>Error:</strong> <code>Timeout waiting for locator(&#39;[aria-haspopup=true]&#39;)</code>
                          </p>
                          <p className={`mb-3 ${darkMode ? 'text-orange-100' : 'text-orange-900'}`}>
                            This occurred in older versions when testing menus without submenus. Update to v2.8.2 or later where submenu tests are now optional and skip automatically if no submenu exists.
                          </p>
                          <div className='overflow-x-auto'>
                            <CodeBlockDemo code={`npm install aria-ease@latest`}/>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {/* Dev Server Not Running */}
                    <div className={`py-4 px-3 rounded-lg border-l-4 border-purple-500 ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                      <div className='flex items-start gap-3'>
                        <AlertCircle className={`${darkMode ? 'text-purple-100' : 'text-purple-700'} mt-1 flex-shrink-0`} size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-purple-100' : 'text-purple-900'}`}>Development Server Not Running</h3>
                          <p className={`mb-3 ${darkMode ? 'text-purple-100' : 'text-purple-900'}`}>
                            <strong>Error:</strong> <code>page.goto: net::ERR_CONNECTION_REFUSED</code>
                          </p>
                          <p className={`mb-3 ${darkMode ? 'text-purple-100' : 'text-purple-900'}`}>
                            Playwright tests (with URL) require your dev server to be running:
                          </p>
                          <div className='overflow-x-auto'>
                            <CodeBlockDemo code={`# Terminal 1: Start your dev server
npm run dev

# Terminal 2: Run tests
npx aria-ease test`}/>
                          </div>
                          
                          <p className={`mt-3 text-sm ${darkMode ? 'text-purple-100' : 'text-purple-900'}`}>
                            💡 For jsdom tests (no URL parameter), you don&#39;t need a running server
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Missing Peer Dependencies */}
                    <div className={`py-4 px-3 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                      <div className='flex items-start gap-3'>
                        <AlertCircle className={`${darkMode ? 'text-blue-100' : 'text-blue-700'} mt-1 flex-shrink-0`} size={24} />
                        <div className='min-w-0 flex-1'>
                          <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>Missing Dependencies</h3>
                          <p className={`mb-3 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                            <strong>Error:</strong> <code>Cannot find package &#39;jest-axe&#39;</code> or <code>Cannot find package &#39;@testing-library/react&#39;</code>
                          </p>
                          <p className={`mb-3 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                            Install the required peer dependencies:
                          </p>
                          <div className='overflow-x-auto'>
                            <CodeBlockDemo code={`npm install --save-dev jest-axe @testing-library/react`}/>
                          </div>
                          <p className={`mt-3 text-sm ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                            💡 For Playwright tests, also install: <code>npm install -D playwright</code>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Best Practices */}
                <section className={`mt-[100px] p-6 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-lg`}>
                  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>Best Practices</h2>
                  
                  <div className={`space-y-4 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                    <div>
                      <h3 className='font-semibold mb-2'>✅ Test Early and Often</h3>
                      <p className='text-sm'>Run accessibility tests during development, not just before release. Fixing issues early is faster and cheaper.</p>
                    </div>


                    <div>
                      <h3 className='font-semibold mb-2'>✅ Test All Interactive Components</h3>
                      <p className='text-sm'>Every custom-built ARIA component that users interact with should have accessibility tests.</p>
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
                <section className='mt-[100px]'>
                  <h2 className='text-3xl font-bold mb-4'>Related Tools</h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <a href="/audit" className='block-interactive p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors'>
                      <h3 className='font-semibold mb-2'>Runtime Audit CLI</h3>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>Scan full web pages for accessibility issues during runtime →</p>
                    </a>
                    <a href="/api" className='block-interactive p-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors'>
                      <h3 className='font-semibold mb-2'>API Reference</h3>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>Complete API documentation for all testing functions →</p>
                    </a>
                  </div>
                </section>

                <div className='flex flex-wrap gap-4 py-4 mx-auto max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <a href='/audit' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Runtime Audit</span>
                      </div>
                    </a>
                    <a href='/changelog' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Changelog</span>
                      </div>
                      <ChevronRightCircleIcon/>
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

import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import SlideOutNav from "../components/SlideOutNav";
import { useState, useEffect, useRef } from "react";
import ScrollTracker from '../components/ScrollTracker';
import './homepage.css';
import * as Block from 'aria-ease/block';
import SideNav from "../components/SideNav";
import CodeBlockDemo from '../components/CodeBlock';
import { CheckCircle, AlertCircle, ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const installCode = `# Install Playwright browsers (one-time setup)
npx playwright install chromium

# Or install all browsers
npx playwright install`;

const configCode = `// ariaease.config.js
export default {
  audit: {
    urls: [
      'http://localhost:5173/',
    ],
    output: {
      format: 'html', //'json', 'csv', or 'all'
      out: './accessibility-reports/audit'
    },
    // Optional: Page load timeout in ms (default: 60000)
    timeout: 60000,
    // Optional: Wait strategy (default: 'domcontentloaded')
    // Options: 'load' | 'domcontentloaded' | 'networkidle'
    waitUntil: 'domcontentloaded'
  }
};`;

const usageCode = `# Specify single url option
-u http://localhost:5173/ //use url option for quick one-off audits without a config file

# Specify report format options:
-f html //'json', 'csv', or 'all' - optional (default: 'all')

# Specify output dir option
-o ./accessibility-reports/audit // - optional (default: './accessibility-reports/audit')`;

const packageJsonCode = `{
  "name": "your-project",
  "scripts": {
    "audit": "aria-ease audit -f html"
  },
  "devDependencies": {
    "aria-ease": "^2.8.2",
    "@axe-core/playwright": "^4.10.2",
    "playwright": "^1.51.1"
  }
}`;

const workflowCode = `name: Accessibility Audit

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

      # Step 4: Build the site
      - name: Build site
        run: npm run build

      # Step 5: Start dev server in background
      - name: Start dev server
        run: |
          npm run dev &
          # Wait for server to be ready
          npx wait-on http://localhost:5173 -t 30000

      # Step 6: Run aria-ease audit
      - name: Run accessibility audit
        run: npm run audit

      # Step 7: Upload audit report as artifact (so you can download and view it)
      - name: Upload audit report
        if: failure() # Upload only when audits fail
        uses: actions/upload-artifact@v4
        with:
          name: accessibility-audit-report
          path: accessibility-reports/
          retention-days: 30

      # Step 8: Comment on PR with results (optional but cool)
      - name: Comment PR with audit results
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

// eslint-disable-next-line react/prop-types
const Audit = ({ darkMode, setDarkMode }) => {
  const [showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'audit';
  const [resultsVisible, setResultsVisible] = useState(false);

  const mainBlockCleanupRef = useRef(null);

  useEffect(() => {
    mainBlockCleanupRef.current = Block.makeBlockAccessible({ blockId: 'inner-body-div', blockItemsClass: 'block-interactive' });
    return () => {
      if (mainBlockCleanupRef.current) {
        mainBlockCleanupRef.current.cleanup();
        mainBlockCleanupRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (resultsVisible) {
      if (mainBlockCleanupRef.current) {
        mainBlockCleanupRef.current.cleanup();
        mainBlockCleanupRef.current = null;
      }
    } else {
      if (!mainBlockCleanupRef.current) {
        mainBlockCleanupRef.current = Block.makeBlockAccessible({ blockId: 'inner-body-div', blockItemsClass: 'block-interactive' });
      }
    }
  }, [resultsVisible]);

  return (

    <div className="home-body" id="inner-body-div">
      <Helmet>
            <title>Accessibility Audit | Aria-Ease</title>
            <meta name="description" content="Automated accessibility testing powered by axe-core and Playwright. Generate comprehensive HTML or JSON reports to identify and fix accessibility issues in your web applications." />
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
      <main className="page-body-div" id="main-content">
        <Container fluid>
          <Row>
            <SideNav page={page}/>
            <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
              <div className='side-body-div'>
                <h1 className='component-example-heading'>Accessibility Audit</h1>
                <p className='mt-2'>Automated accessibility testing powered by axe-core and Playwright. Generate comprehensive HTML or JSON reports to identify and fix accessibility issues in your web applications.</p>

                <div className='mt-6'>
                  <h2 className='text-3xl font-bold mb-4'>Features</h2>
                  <ul className='list-disc ml-6 mt-2'>
                    <li>Automated accessibility testing using axe-core</li>
                    <li>Beautiful HTML reports with detailed issue breakdowns</li>
                    <li>JSON output for CI/CD integration</li>
                    <li>CSV output for spreadsheet analysis and quick summaries</li>
                    <li>Multi-page testing support</li>
                    <li>WCAG compliance checking</li>
                  </ul>
                </div>

                <div className={`mt-6 p-4 rounded-lg border-l-4 border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <div className='flex items-start gap-3'>
                    <AlertCircle className={`h-5 w-5 ${darkMode ? 'text-blue-100' : 'text-blue-800'} mt-0.5`} />
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-blue-100' : 'text-blue-800'}`}>Important: Playwright Setup Required</h3>
                      <p className={`mt-1 ${darkMode ? 'text-blue-100' : 'text-blue-800'}`}>The audit CLI uses Playwright for browser automation. You&apos;ll need to install Playwright browsers before running your first audit. This is a one-time setup step.</p>
                    </div>
                  </div>
                </div>

                <section className='mt-10'>
                  <h2 className='text-3xl font-bold mb-4'>Installation & Setup</h2>
                  <p className='mt-2'>First, install aria-ease and Playwright as dev dependencies:</p>
                  <CodeBlockDemo code={packageJsonCode} isLineNumber={true}/>
                  
                  <p className='mt-4'>Then install Playwright browsers (one-time setup):</p>
                  <CodeBlockDemo code={installCode} isLineNumber={true}/>

                  <div className={`mt-4 p-3 rounded ${darkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'} border`}>
                    <div className='flex items-start gap-2'>
                      <CheckCircle className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-600'} mt-0.5`} />
                      <p className={`text-sm ${darkMode ? 'text-green-100' : 'text-green-800'}`}>
                        <strong>Pro tip:</strong> Only install <code className='px-1 py-0.5 bg-green-900 text-white rounded text-xs'>chromium</code> to save disk space (~200MB). The audit tool only needs one browser.
                      </p>
                    </div>
                  </div>
                </section>

                <section className='mt-10'>
                  <h2 className='text-3xl font-bold mb-4'>Configuration</h2>
                  <p className='mt-2'>Create a configuration file in your project root. Aria-Ease supports multiple formats with automatic detection and validation:</p>
                  <CodeBlockDemo code={configCode} isLineNumber={true}/>
                  
                  <div className='mt-3'>
                    <h3>Supported Configuration Formats</h3>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>ariaease.config.js</code> - ES modules (recommended)</li>
                      <li><code>ariaease.config.mjs</code> - ES modules explicit</li>
                      <li><code>ariaease.config.cjs</code> - CommonJS</li>
                      <li><code>ariaease.config.json</code> - JSON format</li>
                      <li><code>ariaease.config.ts</code> - TypeScript (experimental)</li>
                    </ul>
                    <p className='mt-3'>The CLI automatically finds and loads your config file with validation to catch errors early.</p>
                  </div>

                  <div className='mt-3'>
                    <h3>Configuration Options</h3>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>urls</code>: Array of URLs to audit (required)</li>
                      <li><code>output.format</code>: Output format - &apos;html&apos;, &apos;csv&apos;, &apos;json&apos;, or &apos;all&apos; (default: &apos;all&apos;)</li>
                      <li><code>output.out</code>: Report output directory (default: &apos;./accessibility-reports/audit&apos;)</li>
                      <li><code>timeout</code>: Page load timeout in milliseconds (default: 60000). Increase for slow-loading pages</li>
                      <li><code>waitUntil</code>: Wait strategy - &apos;load&apos;, &apos;domcontentloaded&apos;, or &apos;networkidle&apos; (default: &apos;domcontentloaded&apos;). Use &apos;networkidle&apos; for SPAs</li>
                    </ul>
                  </div>
                </section>

                <section className='mt-10'>
                  <h2 className='text-3xl font-bold mb-4'>Usage</h2>
                  <p className='mt-2'>To run an audit with a configuration file: </p>
                  <CodeBlockDemo code={'npx aria-ease audit'}/>

                  <p className='mt-4'>To run an audit without a configuration file: </p>
                  <CodeBlockDemo code={usageCode} isLineNumber={true}/>
                  
                  <div className='mt-4'>
                    <h3>Output</h3>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><strong>HTML Report:</strong> Clean, readable report you can open in your browser with interactive issue breakdown</li>
                      <li><strong>JSON Output:</strong> Machine-readable. Perfect for CI/CD pipelines and custom processing</li>
                      <li><strong>CSV Output:</strong> Perfect for spreadsheet analysis and quick summaries</li>
                    </ul>
                  </div>
                </section>

                <section className='mt-10'>
                  <h2 className='text-3xl font-bold mb-4'>Troubleshooting</h2>
                  
                  <div className='mt-3'>
                    <h3>Missing Dependencies</h3>
                    <p className='mt-2'>If you see this error:</p>
                    <div className='code-div'>
                        <code>Cannot find package &apos;@axe-core/playwright&apos;</code>
                    </div>
                    <p className='mt-2'>Install the required peer dependencies:</p>
                    <div className='code-div'>
                        <code>npm install --save-dev @axe-core/playwright playwright</code>
                    </div>
                  </div>

                  <div className='mt-3'>
                    <h3>Playwright Browsers Not Installed</h3>
                    <p className='mt-2'>If you see this error:</p>
                    <div className='code-div'>
                        <code>browserType.launch: Executable doesn&#39;t exist at ...</code>
                    </div>
                    <p className='mt-2'>Run the Playwright install command:</p>
                    <div className='code-div'>
                        <code>npx playwright install chromium</code>
                    </div>
                  </div>

                  <div className='mt-3'>
                    <h3>Page Load Timeouts</h3>
                    <p className='mt-2'>If your audits are timing out, try these solutions:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Increase the <code>timeout</code> value in your config (default is 60 seconds)</li>
                      <li>Change <code>waitUntil</code> from &apos;networkidle&apos; to &apos;domcontentloaded&apos; for faster page loads</li>
                      <li>Ensure your development server is running and accessible</li>
                    </ul>
                  </div>

                  <div className='mt-8'>
                    <h3>Server Not Running</h3>
                    <p className='mt-2'>Make sure your development server is running before auditing localhost URLs:</p>
                    <div className='code-div'>
                        <code>npm run dev  # or your start command</code>
                    </div>
                  </div>
                </section>

                <section className='mt-10'>
                  <h2 className='text-3xl font-bold mb-4'>Best Practices</h2>
                  <ul className='list-disc ml-6 mt-2'>
                    <li>Run audits regularly as part of your development workflow</li>
                    <li>Add audit command to your pre-commit or CI/CD pipeline</li>
                    <li>Test all important pages and user flows</li>
                    <li>Fix critical and serious issues first</li>
                    <li>Use JSON output for automated testing in CI/CD</li>
                  </ul>
                </section>

                <section className='mt-[100px]'>
                  <h2 className='text-3xl font-bold mb-4'>CI/CD Integration</h2>
                  <p className='mb-4'>Integrate accessibility testing into your continuous integration pipeline.</p>

                  <h3 className='text-xl font-semibold mb-3 mt-6'>GitHub Actions</h3>
                  <CodeBlockDemo code={workflowCode} isLineNumber={true}/>

                  <h3 className='text-xl font-semibold mb-3 mt-8'>Package.json Scripts</h3>
                  <CodeBlockDemo code={`{
  "scripts": {
    "audit": "npx aria-ease audit"
  }
}`} isLineNumber={true}/>
                </section>

                <div className='flex flex-wrap gap-4 py-4 mx-auto max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <a href='/examples/toggle-button' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Toggle Button</span>
                      </div>
                    </a>
                    <a href='/testing' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Testing Suite</span>
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

export default Audit;
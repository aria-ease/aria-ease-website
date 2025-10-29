import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import SlideOutNav from "../components/SlideOutNav";
import { useState, useEffect, useRef } from "react";
import ScrollTracker from '../components/ScrollTracker';
import './homepage.css';
import * as Block from 'aria-ease/block';
import SideNav from "../components/SideNav";
import CodeBlockDemo from '../components/CodeBlock';
import { Terminal, CheckCircle, AlertCircle } from 'lucide-react';

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
    }
  }
};`;

const usageCode = `# Specify single url option
-u http://localhost:5173/ //url option is required if no config file

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
    "aria-ease": "^2.1.0",
    "playwright": "^1.51.1"
  }
}`;

const workflowCode = `name: Accessibility Audit

on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npx playwright install chromium
      - run: npm run dev &
      - run: npx aria-ease audit -f json
      - run: cat audit-report.json`

// eslint-disable-next-line react/prop-types
const Audit = ({ darkMode, setDarkMode }) => {
  const [showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'audit';
  const [resultsVisible, setResultsVisible] = useState(false);

  const mainBlockCleanupRef = useRef(null);

  useEffect(() => {
    mainBlockCleanupRef.current = Block.makeBlockAccessible('inner-body-div', 'block-interactive');
    return () => {
      if (mainBlockCleanupRef.current) {
        mainBlockCleanupRef.current();
        mainBlockCleanupRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (resultsVisible) {
      if (mainBlockCleanupRef.current) {
        mainBlockCleanupRef.current();
        mainBlockCleanupRef.current = null;
      }
    } else {
      if (!mainBlockCleanupRef.current) {
        mainBlockCleanupRef.current = Block.makeBlockAccessible('inner-body-div', 'block-interactive');
      }
    }
  }, [resultsVisible]);

  return (
    <div className="home-body" id="inner-body-div">
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
      <main className="page-body-div">
        <Container fluid>
          <Row>
            <SideNav page={page}/>
            <Col xs={12} sm={12} md={12} lg={9}>
              <div className='side-body-div'>
                <h1 className='component-example-heading'>Accessibility Audit</h1>
                <p className='mt-2'>Automated accessibility testing powered by axe-core and Playwright. Generate comprehensive HTML or JSON reports to identify and fix accessibility issues in your web applications.</p>

                <div className='mt-6'>
                  <h2>Features</h2>
                  <ul className='list-disc ml-6 mt-2'>
                    <li>Automated accessibility testing using axe-core</li>
                    <li>Beautiful HTML reports with detailed issue breakdowns</li>
                    <li>JSON output for CI/CD integration</li>
                    <li>CSV output for spreadsheet analysis and quick summaries</li>
                    <li>Multi-page testing support</li>
                    <li>WCAG compliance checking</li>
                  </ul>
                </div>

                <div className='mt-6 p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20'>
                  <div className='flex items-start gap-3'>
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h3 className='font-semibold text-blue-900 dark:text-blue-100'>Important: Playwright Setup Required</h3>
                      <p className='mt-1 text-blue-800 dark:text-blue-200'>The audit CLI uses Playwright for browser automation. You&apos;ll need to install Playwright browsers before running your first audit. This is a one-time setup step.</p>
                    </div>
                  </div>
                </div>

                <div className='example-each-ui-code-block-div mt-6'>
                  <h3>Installation & Setup</h3>
                  <p className='mt-2'>First, install aria-ease and Playwright as dev dependencies:</p>
                  <CodeBlockDemo code={packageJsonCode} isLineNumber={true}/>
                  
                  <p className='mt-4'>Then install Playwright browsers (one-time setup):</p>
                  <CodeBlockDemo code={installCode} isLineNumber={true}/>

                  <div className='mt-4 p-3 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'>
                    <div className='flex items-start gap-2'>
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                      <p className='text-sm text-green-800 dark:text-green-200'>
                        <strong>Pro tip:</strong> Only install <code className='px-1 py-0.5 bg-green-100 dark:bg-green-900 rounded text-xs text-[#bc216e]'>chromium</code> to save disk space (~200MB). The audit tool only needs one browser.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='example-each-ui-code-block-div mt-6'>
                  <h3>Configuration</h3>
                  <p className='mt-2'>Create an <code>ariaease.config.js</code> file in your project root:</p>
                  <CodeBlockDemo code={configCode} isLineNumber={true}/>
                  
                  <div className='mt-3'>
                    <h4>Configuration Options</h4>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>urls</code>: Array of URLs to audit</li>
                      <li><code>output[&apos;format&apos;]</code>: Output format - &apos;html&apos;, &apos;csv&apos;, &apos;json&apos;, or &apos;all&apos; (default: &apos;all&apos;)</li>
                      <li><code>output[&apos;out&apos;]</code>: Report output directory - (default: &apos;./accessibility-reports/audit&apos;)</li>
                    </ul>
                  </div>
                </div>

                <div className='example-each-ui-code-block-div mt-6'>
                  <h4>Usage</h4>
                  <p className='mt-2'>To run an audit with a configuration file: </p>
                  <CodeBlockDemo code={'npx aria-ease audit'}/>

                  <p className='mt-4'>To run an audit without a configuration file: </p>
                  <CodeBlockDemo code={usageCode} isLineNumber={true}/>
                  
                  <div className='mt-4'>
                    <h4>Output</h4>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><strong>HTML Report:</strong> Clean, readable report you can open in your browser with interactive issue breakdown</li>
                      <li><strong>JSON Output:</strong> Machine-readable. Perfect for CI/CD pipelines and custom processing</li>
                      <li><strong>CSV Output:</strong> Perfect for spreadsheet analysis and quick summaries</li>
                    </ul>
                  </div>
                </div>

                <div className='mt-6'>
                  <h4>Troubleshooting</h4>
                  
                  <div className='mt-3'>
                    <p className='mt-2'>If you see this error:</p>
                    <div className='code-div'>
                        <code>browserType.launch: Executable doesn&#39;t exist at ...</code>
                    </div>
                    <p className='mt-2'>Run the Playwright install command:</p>
                    <div className='code-div'>
                        <code>npx playwright install chromium</code>
                    </div>
                  </div>

                  <div className='mt-8'>
                    <h4>Server Not Running</h4>
                    <p className='mt-2'>Make sure your development server is running before auditing localhost URLs:</p>
                    <div className='code-div'>
                        <code>npm run dev  # or your start command</code>
                    </div>
                  </div>
                </div>

                <div className='mt-6'>
                  <h4>Best Practices</h4>
                  <ul className='list-disc ml-6 mt-2'>
                    <li>Run audits regularly as part of your development workflow</li>
                    <li>Add audit command to your pre-commit or CI/CD pipeline</li>
                    <li>Test all important pages and user flows</li>
                    <li>Fix critical and serious issues first</li>
                    <li>Use JSON output for automated testing in CI/CD</li>
                  </ul>
                </div>

                <div className='mt-6'>
                  <h4>CI/CD Integration</h4>
                  <p className='mt-2'>Example GitHub Actions workflow:</p>
                  <pre className='code-div p-4 rounded mt-2 text-sm overflow-x-auto'>
                    {workflowCode}
                  </pre>
                </div>

                <div className='flex justify-start items-center mt-[100px]'>
                  <a href='/examples/toggle-button' className='block-interactive next-link rounded-lg'>
                    <div className='flex flex-col px-4 py-3 rounded-lg'>
                      <span className='text-sm black-white-text'>Prev</span>
                      <span className='text-blue-500 text-lg'>Toggle Button</span>
                    </div>
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
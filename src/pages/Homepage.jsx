import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import SlideOutNav from "../components/SlideOutNav";
import { useState } from "react";
import { Link } from "react-router-dom";
import './homepage.css';
import Footer from "../components/Footer";
import ScrollTracker from '../components/ScrollTracker';
import AnimatedTerminalDemo from '../components/animated-terminal-demo/AnimatedTerminalDemo';
import { Helmet } from 'react-helmet-async';

const jsoncontract = `
{
  "meta": {
    "source": {
      "apg": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
    }
  },
  "selectors": {
    "input": "[role=combobox]",
    "listbox": "[role=listbox]",
    "options": "[role=option]"
  },
  "relationships": [
    {
      "type": "aria-reference",
      "from": "input",
      "attribute": "aria-controls",
      "to": "listbox"
    }
  ],
  "static": [...],
  "dynamic": [
    {
      "description": "Down Arrow on closed combobox opens listbox and updates ARIA expanded",
      "action": [
        { "type": "keypress", "target": "input", "key": "ArrowDown" }
      ],
      "assertions": [
        { 
          "target": "listbox", 
          "assertion": "toBeVisible" 
        },
        {
          "target": "input",
          "assertion": "toHaveAttribute",
          "attribute": "aria-expanded",
          "expectedValue": "true"
        }
      ]
    }
  ]
}`
// eslint-disable-next-line react/prop-types
const Homepage = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'home';
  
  const saveScrollPosition = () => {
    const scrollContainer = document.getElementById('main-content');
    const currentPosition = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
    sessionStorage.setItem(`scroll-position-${page}`, String(currentPosition));
  };

  return (
    <div className="home-body" id="inner-body-div">
      <Helmet>
        <title>Home | Aria-Ease</title>
        <meta name="description" content="Accessibility infrastructure for the entire frontend engineering lifecycle. Build accessible patterns, verify with automated testing, and gate deployments—block inaccessible code from production. React, Vue, Svelte, or vanilla JS." />
        <meta name="keywords" content="Aria-Ease, accessibility infrastructure, frontend engineering lifecycle, accessible patterns, automated testing, production gating, React accessibility, Vue accessibility, Svelte accessibility, vanilla JS accessibility" />
        <meta name="og:title" content="Home | Aria-Ease" />
        <meta name="og:description" content="Accessibility infrastructure for the entire frontend engineering lifecycle. Build accessible patterns, verify with automated testing, and gate deployments—block inaccessible code from production. React, Vue, Svelte, or vanilla JS." />
        <meta name="og:url" content="https://ariaease.site" />
        <meta name="twitter:title" content="Home | Aria-Ease" />
        <meta name="twitter:description" content="Accessibility infrastructure for the entire frontend engineering lifecycle. Build accessible patterns, verify with automated testing, and gate deployments—block inaccessible code from production. React, Vue, Svelte, or vanilla JS." />
        <meta name="twitter:card" content="summary_large_image" />
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
      />

      <main className="page-body-div overflow-y-auto homepage" id="main-content">
        <section className="section-shell section-tone-a px-3">
          <Container fluid className="homepage-above-fold-div px-0">
            <Row>
              <Col xs={12} sm={12} md={12} lg={8}>
                <div className="hero-text-div pb-[50px]">
                  <h1 className="hero-heading">Accessibility infrastructure for your <span className="text-gradient">entire frontend lifecycle</span></h1>
                  <p className="hero-paragraph mb-5 mt-4 text-[1.1rem] leading-[1.5rem]">Integrate accessibility integrity into every phase of your frontend development workflow — from reusable component utilities to CI pipelines, Aria-Ease ensures accessibility behavior is built in, tested, and never regresses. Works with React, Vue, Svelte, or vanilla JavaScript.</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <Link onClick={saveScrollPosition} to='/getting-started' className="px-4 sm:px-8 h-12 flex items-center justify-center button-gradient shadow-xl rounded-lg text-white">Get Started</Link>
                    <Link className="hero-explore px-4 sm:px-8 rounded-lg" onClick={saveScrollPosition} to='/components/overview'>
                      <div className="flex items-center gap-2 h-12 black-white-text">
                        Explore Components <span className="material-symbols-outlined text-[17px] leading-none" aria-hidden="true">arrow_forward</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </Col>
              <div className="mx-auto flex w-full max-w-2xl justify-center mt-1">
                    <div className={`w-full overflow-hidden rounded-xl terminal-border shadow-2xl ${darkMode ? 'bg-gray-900/10' : 'bg-card'}`}>
                      <div className={`flex items-center gap-2 terminal-header px-4 py-3 ${darkMode ? 'bg-gray-800/20' : 'bg-gray-100'}`}>
                        <div className="flex gap-1.5">
                          <div className="size-2 rounded-full bg-red-500/60" />
                          <div className="size-2 rounded-full bg-yellow-500/60" />
                          <div className="size-2 rounded-full bg-green-500/60" />
                        </div>
                        <span className="ml-2 font-mono text-xs text-muted-foreground black-grey-text">npm run prepublish</span>
                      </div>
                      <div className="p-4 font-mono text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground black-grey-text">$ npx aria-ease audit && npx aria-ease build contracts && npx aria-ease test</p>  
                          <p className="text-foreground">
                            <span className={darkMode ? 'text-green-400' : 'text-green-700'}>✓</span> <span className="black-grey-text">Running axe-core audit on 16 pages...</span>
                          </p>
                          <p className="text-foreground">
                            <span className={darkMode ? 'text-green-400' : 'text-green-700'}>✓</span> <span className="black-grey-text">Testing 142 components...</span>
                          </p>
                          <p className="text-foreground">
                            <span className={darkMode ? 'text-green-400' : 'text-green-700'}>✓</span> <span className="black-grey-text">Validating ARIA patterns...</span>
                          </p>
                          <p className="mt-2 text-foreground">
                            <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-700'}`}>Passed:</span> <span className="black-grey-text">12 pages, 138 components</span>
                          </p>
                          <p className="text-foreground">
                            <span className={`font-medium ${darkMode ? 'text-yellow-400' : 'text-amber-700'}`}>Warnings:</span> <span className="black-grey-text">4 pages, 4 components</span>
                          </p>
                          <p className="text-muted-foreground">
                            <span className={`font-medium ${darkMode ? 'text-red-400' : 'text-red-700'}`}>Critical:</span> <span className="black-grey-text">0 issues</span>
                          </p>
                          <p className="mt-2 text-muted-foreground black-grey-text">
                            Completed in <span className="text-foreground">12.3s</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
            </Row>
          </Container>
        </section>


        <section className="section-shell section-tone-b px-3">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider black-grey-text">The Problem</p>
            <h2 className="black-white-text text-3xl font-bold mb-4 mt-3 text-balance tracking-tight text-foreground sm:text-4xl">
              Accessibility Testing is {" "}
              <span className="broken-word">
                <span className="sr-only">Broken</span>
                <span aria-hidden="true" className="broken-char broken-char-1">B</span>
                <span aria-hidden="true" className="broken-char broken-char-2">r</span>
                <span aria-hidden="true" className="broken-char broken-char-3">o</span>
                <span aria-hidden="true" className="broken-char broken-char-4">k</span>
                <span aria-hidden="true" className="broken-char broken-char-5">e</span>
                <span aria-hidden="true" className="broken-char broken-char-6">n</span>
              </span>
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground black-grey-text">
              For a lot of teams, accessibility checks happen too far into the frontend development cycle, often as last-minute QA. Critical issues are discovered late, causing costly rework, rushed fixes, missed deadline, or shipping inaccessible frontend to production.
            </p>
          </div>

          <div className="mt-12">
              <Container fluid className="px-0">
                <Row className="g-4">
                  <Col md={6} lg={6}>
                    <div className="p-4 rounded-lg tone-card tone-card-base h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl leading-none text-purple-600" aria-hidden="true">schedule</span>
                        </div>
                        <h3 className="font-bold black-white-text text-xl font-bold">Too Late in the Cycle</h3>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Accessibility issues are often discovered during QA or right before launch, when fixes are slower, more expensive, and harder to prioritize.</p>
                      
                    </div>
                  </Col>
                                  
                  <Col md={6} lg={6}>
                    <div className="p-4 rounded-lg tone-card tone-card-alt h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl leading-none text-orange-600" aria-hidden="true">groups</span>
                        </div>
                        <h3 className="font-bold black-white-text text-xl font-bold">Knowledge Silos</h3>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Critical accessibility knowledge often lives with a few specialists, making it hard for the whole team to build and review accessible UI with confidence.</p>
                      
                    </div>
                  </Col>
                  
                  <Col md={6} lg={6}>
                    <div className="p-4 rounded-lg tone-card tone-card-alt h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl leading-none text-green-600" aria-hidden="true">autorenew</span>
                        </div>
                        <h3 className="font-bold black-white-text text-xl font-bold">Regression Prone</h3>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Even after fixes ship, accessibility can quietly break again as components evolve and new features land without reliable guardrails.</p>
                      
                    </div>
                  </Col>

                  <Col md={6} lg={6}>
                    <div className="p-4 rounded-lg tone-card tone-card-base h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl leading-none text-rose-600" aria-hidden="true">rule</span>
                        </div>
                        <h3 className="font-bold black-white-text text-xl font-bold">Can&#39;t Verify Behavior</h3>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Current tools scan for WCAG violations but don&#39;t test if components actually work—keyboard interaction, focus management, ARIA management.</p>
                      
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>

            <Container fluid className="mt-[70px] px-0">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider black-grey-text">The Solution</p>
              <h2 className="black-white-text text-3xl font-bold mb-4 mt-3 text-balance tracking-tight text-foreground sm:text-4xl">The Aria-Ease Accessibility Lifecycle</h2>
              <p className="text-[1.1rem] leading-[1.5rem] black-grey-text max-w-3xl mx-auto">From design to deployment—Aria-Ease covers every phase of the frontend lifecycle. Accessibility becomes a property your system guarantees. That means quick feedback during development, minimal runtime impact, and fewer late-release accessibility surprises.</p>
            </div>
            
            {/* Accessibility Lifecycle Phases */}
            <div className="mt-12">
              <div>
                <Row className="g-4">
                  <Col md={6} lg={4}>
                    <div className="p-4 rounded-lg tone-card tone-card-base h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl leading-none text-purple-600" aria-hidden="true">code</span>
                        </div>
                        <h3 className="font-bold black-white-text text-xl font-bold">Design & Build</h3>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Lightweight component utilities based on the Aria-Ease baseline APG interpretation for roles, ARIA, and interaction management</p>
                      <code className="text-xs text-purple-600 dark:text-purple-400">make*Accessible()</code>
                    </div>
                  </Col>
                  
                  <Col md={6} lg={4}>
                    <div className="p-4 rounded-lg tone-card tone-card-alt h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl leading-none text-blue-600" aria-hidden="true">verified_user</span>
                        </div>
                        <h3 className="font-bold black-white-text text-xl font-bold">Verify Behavior</h3>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Contract testing validates consistent baseline ARIA component behaviors and interaction patterns</p>
                      <code className="text-xs text-blue-600 dark:text-blue-400">npx aria-ease test</code>
                    </div>
                  </Col>
                  
                  <Col md={6} lg={4}>
                    <div className="p-4 rounded-lg tone-card tone-card-base h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl leading-none text-orange-600" aria-hidden="true">fact_check</span>
                        </div>
                        <h3 className="font-bold black-white-text text-xl font-bold">Static Audit</h3>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Runtime page scanning with axe-core for static WCAG violations</p>
                      <code className="text-xs text-orange-600 dark:text-orange-400">npx aria-ease audit</code>
                    </div>
                  </Col>
                  
                  <Col md={6} lg={4}>
                    <div className="p-4 rounded-lg tone-card tone-card-alt h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl leading-none text-green-600" aria-hidden="true">check_circle</span>
                        </div>
                        <h3 className="font-bold black-white-text text-xl font-bold">Validate</h3>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Multi-format reports (JSON, CSV, HTML) for compliance tracking</p>
                      <code className="text-xs text-green-600 dark:text-green-400">audit-report.html</code>
                    </div>
                  </Col>
                  
                  <Col md={6} lg={4}>
                    <div className="p-4 rounded-lg tone-card tone-card-base h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl leading-none text-cyan-600" aria-hidden="true">terminal</span>
                        </div>
                        <h3 className="font-bold black-white-text text-xl font-bold">Integrate CI/CD</h3>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Automated testing in your deployment pipeline. Block broken releases</p>
                      <code className="text-xs text-cyan-600 dark:text-cyan-400">GitHub Actions, Jenkins, etc.</code>
                    </div>
                  </Col>
                  
                  <Col md={6} lg={4}>
                    <div className="p-4 rounded-lg tone-card tone-card-alt h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-2xl leading-none text-pink-600" aria-hidden="true">deployed_code</span>
                        </div>
                        <h3 className="font-bold black-white-text text-xl font-bold">Maintain & Govern</h3>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Continuous monitoring and enforcement across your codebase</p>
                      <code className="text-xs text-pink-600 dark:text-pink-400">Ongoing compliance</code>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </section>


<section className="section-shell section-tone-c px-3">
<div className="max-w-7xl mx-auto">
<div className="mb-16">
<span className="black-grey-text font-label text-sm font-bold tracking-widest uppercase mb-3 block">Infrastructure Layers</span>
<h2 className="text-4xl font-bold tracking-tight black-white-text">Purpose-built for speed.</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">

<div className="md:col-span-4 lg:col-span-3 p-8 rounded-2xl relative overflow-hidden group transition-all tone-card tone-card-emphasis">
<div className="mb-6 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/10 flex items-center justify-center">
  <span className="material-symbols-outlined text-2xl text-purple-600">dynamic_form</span>
</div>
<div className="relative z-10">
<h3 className="text-2xl font-bold mb-4 black-white-text">Component Utilities</h3>
<p className="mb-6 black-grey-text">High-performance component utilities for managing WAI-ARIA states, roles, properties, and keyboard interactions using a proven baseline interpretation.</p>
<div className="flex gap-4">
<div className="text-center p-3 rounded">
<p className="text-xl font-bold black-white-text">1.4KB - 3.7KB</p>
<p className="text-[10px] uppercase black-grey-text">Per Component</p>
</div>
<div className="text-center p-3 rounded">
<p className="text-xl font-bold black-white-text">100%</p>
<p className="text-[10px] uppercase black-grey-text">Type Safe</p>
</div>
</div>
</div>
<div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-[160px] widgets text-black dark:text-white">widgets</span>
</div>
</div>

<div className="md:col-span-2 lg:col-span-1 p-8 rounded-2xl group transition-colors tone-card tone-card-base">
<div className="mb-6 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/10 flex items-center justify-center">
<span className="material-symbols-outlined text-2xl text-blue-600">terminal</span>
</div>

<h3 className="text-xl font-bold mb-3 black-white-text">Audit CLI</h3>
<p className="text-sm black-grey-text">Fast, static audits for web pages. Integrates directly into your local development server for instant feedback.</p>
<p className="text-xs mt-3 black-grey-text">CI/CD: Run audits on pull requests and fail builds on violations.</p>
</div>

<div className="md:col-span-2 lg:col-span-1 p-8 rounded-2xl group transition-colors tone-card tone-card-base">
<div className="mb-6 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/10 flex items-center justify-center">
  <span className="material-symbols-outlined text-2xl text-purple-600">handshake</span>
</div>

<h3 className="text-xl font-bold mb-3 black-white-text">Contract Testing</h3>
<p className="text-sm black-grey-text">Defines deterministic component behaviors as JSON contracts. Build your reusable component contract using Aria-Ease&#39;s developer friendly DSL API.</p>
<p className="text-xs mt-3 black-grey-text">CI/CD: Enforce contracts in pipelines to prevent regressions while your standard evolves.</p>
</div>

  <div className="md:col-span-4 lg:col-span-3 p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center tone-card tone-card-alt">
    <div className="flex-1">
    <h3 className="text-2xl font-bold mb-2 black-white-text">Built for Performance</h3>
    <p className="black-grey-text">Aria-Ease ensures performance by separating concerns: lightweight baseline utilities, CLI audits for static scans, contract tests with isolated component architecture for repeatable verification, and CI/CD enforcement for early failure.</p>
    </div>
    <div className="flex gap-8">
    <div className="text-right">
    <p className="text-4xl font-bold black-white-text">~2s</p>
    <p className="text-sm black-grey-text">Avg. Audit Speed</p>
    </div>
    <div className="text-right">
    <p className="text-4xl font-bold black-white-text">0</p>
    <p className="text-sm black-grey-text">Rerender Penalty</p>
    </div>
    </div>
  </div>
  </div>
</div>
</section>


        <section className="section-shell section-tone-b px-3">
          <Container fluid className="px-0">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-wider black-grey-text">Contract-First Workflow</p>
              <h2 className="black-white-text text-3xl font-bold mb-4 mt-3 text-balance tracking-tight text-foreground sm:text-4xl">Define Accessibility Behavior as Code</h2>
              <p className="text-[1.1rem] leading-[1.6rem] black-grey-text">Your team defines accessibility contracts as readable policy using Aria-Ease&#39;s developer friendly DSL API, then uses them to build test artifacts, validate deterministic component accessibility behaviors, and keep documentation and team knowledge aligned.</p>
            </div>

            <Row className="g-4 items-stretch mb-8">
              <Col lg={6} md={12}>
                <div className="p-6 rounded-xl h-full tone-card tone-card-base flex flex-col">
                  <h3 className="text-2xl font-bold mb-4 black-white-text">One Contract, Multiple Outputs</h3>
                  <p className="black-grey-text mb-5">Treat accessibility behavior like product logic, not checklist debt. Write one contract per component pattern, then reuse it to power implementation, component testing, and governance.</p>
                
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[20px] leading-none text-purple-600 mt-1" aria-hidden="true">construction</span>
                      <div>
                        <p className="font-semibold black-white-text">Scaffold utilities</p>
                        <p className="text-sm black-grey-text">Generate accessible utilities from a shared behavior contract.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[20px] leading-none text-blue-600 mt-1" aria-hidden="true">library_books</span>
                      <div>
                        <p className="font-semibold black-white-text">Keep docs synced</p>
                        <p className="text-sm black-grey-text">Use the same contract rules to power onboarding and documentation.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[20px] leading-none text-green-600 mt-1" aria-hidden="true">monitoring</span>
                      <div>
                        <p className="font-semibold black-white-text">Catch regressions early</p>
                        <p className="text-sm black-grey-text">Diff contract behavior in CI before changes reach production.</p>
                      </div>
                    </div>
                  </div>


                  <div className="mt-10">
                    <AnimatedTerminalDemo
                      section="contract"
                      title="Component Test Run"
                      ariaLabel="Animated contract testing terminal demo"
                      darkMode={darkMode}
                      command="npx aria-ease test"
                      lines={[
                        { tone: 'info', prefix: '>', text: 'Initializing Playwright Runner' },
                        { tone: 'info', prefix: '>', text: 'Loading contract: combobox.contract.json' },
                        { tone: 'success', prefix: '✓', text: 'Static Attributes: 7/7 passed' },
                        { tone: 'success', prefix: '✓', text: 'Keyboard interactions: 12/12 passed' },
                        { tone: 'success', prefix: '✓', text: 'ARIA state transitions: 9/9 passed' },
                        { tone: 'success', prefix: '✓', text: 'Focus movement assertions: 6/6 passed' },
                        { tone: 'success', prefix: '✓', text: 'Semantic Relationships: 4/4 passed' },
                        { tone: 'neutral', prefix: '', text: 'Result: 0 regressions detected' },
                      ]}
                    />
                  </div>

                  <div className="mt-auto pt-6">
                    <p className="text-sm font-semibold black-white-text">Test Your ARIA Components</p>
                    <p className="text-sm black-grey-text mt-1">Start with Aria-Ease&#39;s contract-powered deterministic ARIA component behavior testing.</p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Link onClick={saveScrollPosition} to='/testing/component-testing' className="px-4 sm:px-6 h-11 flex items-center justify-center button-gradient shadow-xl rounded-lg text-white">Test Your Components</Link>
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg={6} md={12}>
                <div className={`w-full overflow-hidden rounded-xl terminal-border shadow-2xl ${darkMode ? 'bg-gray-900/10' : 'bg-card'}`}>
                      <div className={`flex items-center gap-2 terminal-header px-4 py-3 ${darkMode ? 'bg-gray-800/20' : 'bg-gray-100'}`}>
                        <div className="flex gap-1.5">
                          <div className="size-2 rounded-full bg-red-500/60" />
                          <div className="size-2 rounded-full bg-yellow-500/60" />
                          <div className="size-2 rounded-full bg-green-500/60" />
                        </div>
                        <span className="ml-2 font-mono text-xs text-muted-foreground black-grey-text">Combobox JSON Contract</span>
                      </div>
                      <div className="px-4 pb-4 font-mono text-sm">
                        <div className="space-y-1">
                          <pre className={darkMode ? 'text-green-400' : 'text-green-700'} tabIndex={0} aria-label="Combobox JSON contract code example">
                      <code style={{color: darkMode ? 'rgb(74 222 128)' : 'rgb(21 128 61)'}} className="text-foreground">
                        {jsoncontract}
                      </code>
                    </pre>
                        </div>
                      </div>
                    </div>
              </Col>
            </Row>

            <Row className="g-4">
              <Col md={6} lg={3}>
                <div className="p-4 rounded-lg h-full tone-card tone-card-base">
                  <h4 className="font-bold black-white-text mb-2">Smarter Linting</h4>
                  <p className="text-sm black-grey-text">Enforce behavior rules from contracts, not generic lint heuristics.</p>
                </div>
              </Col>
              <Col md={6} lg={3}>
                <div className="p-4 rounded-lg h-full tone-card tone-card-alt">
                  <h4 className="font-bold black-white-text mb-2">Regression Diffing</h4>
                  <p className="text-sm black-grey-text">Track exactly what interaction behavior changed between versions.</p>
                </div>
              </Col>
              <Col md={6} lg={3}>
                <div className="p-4 rounded-lg h-full tone-card tone-card-base">
                  <h4 className="font-bold black-white-text mb-2">Knowledge Transfer</h4>
                  <p className="text-sm black-grey-text">Contracts encode intent so new contributors can build correctly faster.</p>
                </div>
              </Col>
              <Col md={6} lg={3}>
                <div className="p-4 rounded-lg h-full tone-card tone-card-alt">
                  <h4 className="font-bold black-white-text mb-2">Behavior Analytics</h4>
                  <p className="text-sm black-grey-text">See which patterns pass, fail, and regress across your system.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="px-3 section-shell section-tone-c audit-section flex gap-5 flex-wrap justify-center">
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="flex items-center gap-2 audit-graphic rounded-sm bg-[#cbd4dd] px-3 py-2 border ml-20">
              <div className="bg-green-100 dark:bg-green-900/10 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl leading-none text-green-600" aria-hidden="true">fact_check</span>
              </div>
              <span className="text-md font-[200]">Pages Audited</span>
              <span className="text-2xl font-bold">10</span>
            </div>

            <div className="flex items-center gap-2 audit-graphic rounded-sm bg-[#cbd4dd] px-3 py-2 border">
              <div className="bg-orange-100 dark:bg-orange-900/10 w-10 h-10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl leading-none text-orange-600" aria-hidden="true">warning</span>
              </div>
              <span className="text-md font-[200]">Total violations</span>
              <span className="text-2xl font-bold">48</span>
            </div>

            <div className="flex items-center gap-2 audit-graphic rounded-sm bg-[#cbd4dd] px-3 py-2 border ml-20">
              <div className="bg-pink-100 dark:bg-pink-900/10 w-10 h-10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl leading-none text-pink-600" aria-hidden="true">error</span>
              </div>
              <span className="text-md font-[200]">Critical violations</span>
              <span className="text-2xl font-bold">18</span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-3 max-w-full">
            <h2 className="black-white-text text-3xl font-bold">Audit Your Web Pages. <span className="text-gradient">Get instant accessibility insights</span></h2>
            <p className="audit-section-paragraph max-w-[700px] text-[1.1rem] leading-[1.5rem] mb-4">Do you wonder what static accessibility issues might be lurking on your web pages? After contracts validate behavior and utilities ensure implementation, audit catches any remaining static WCAG gaps.</p>
            <div className="overflow-x-auto w-full">
            </div>
            <div className="w-full">
              <AnimatedTerminalDemo
                section="audit"
                title="Static Audit Run"
                ariaLabel="Animated audit CLI terminal demo"
                darkMode={darkMode}
                command="npx aria-ease audit -f html"
                lines={[
                  { tone: 'info', prefix: '>', text: 'Scanning 10 URLs with axe-core + Playwright' },
                  { tone: 'warning', prefix: '!', text: '4 pages with warnings (manual review suggested)' },
                  { tone: 'error', prefix: 'x', text: '2 critical findings blocked for release' },
                  { tone: 'neutral', prefix: '', text: 'Report written: accessibility-reports/audit/index.html' },
                ]}
              />
            </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[20px] leading-none text-green-600 mt-1" aria-hidden="true">fact_check</span>
                      <div>
                        <p className="font-semibold black-white-text">Multi-format reports</p>
                        <p className="text-sm black-grey-text">JSON, CSV, and interactive HTML</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[20px] leading-none text-blue-600 mt-1" aria-hidden="true">verified_user</span>
                      <div>
                        <p className="font-semibold black-white-text">Powered by axe-core</p>
                        <p className="text-sm black-grey-text">Industry-standard accessibility auditing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[20px] leading-none text-purple-600 mt-1" aria-hidden="true">bolt</span>
                      <div>
                        <p className="font-semibold black-white-text">CI/CD ready</p>
                        <p className="text-sm black-grey-text">Integrate into your deployment pipeline</p>
                      </div>
                    </div>
                  </div>
            <Link onClick={saveScrollPosition} to='/testing/static-audit' className="px-4 sm:px-8 h-12 flex items-center justify-center button-gradient shadow-xl rounded-lg text-white">Audit Your Webpage</Link>
          </div>
        </section>

        <Footer page={page} darkMode={darkMode}/>
      </main>
        
      <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>

      
    </div>
  )
}

export default Homepage
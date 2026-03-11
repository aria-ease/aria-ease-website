import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import SlideOutNav from "../components/SlideOutNav";
import { useState, useEffect, useRef } from "react";
import * as Block from "aria-ease/block";
import { Link } from "react-router-dom";
import './homepage.css';
import { Terminal, Boxes, Keyboard, ArrowRight, FileWarning, FileCheck2, Code2, Zap, Package, ShieldCheck, CheckCircle2 } from 'lucide-react';
import keyboardnavdemo from '../assets/keyboard-nav-demo.mp4';
import Footer from "../components/Footer";
import ScrollTracker from '../components/ScrollTracker';
import CodeBlockDemo from '../components/CodeBlock';
import { Helmet } from 'react-helmet-async';

const belowTheFoldCode = `import { useEffect } from "react";
import * as Block from "aria-ease/block";

const App = () => {
  useEffect(() => {
    function initializeBlock() {
      Block.makeBlockAccessible({ blockId: "text-input-block-div", blockItemsClass: "block-interactive-items" });
    }
    
    initializeBlock();
  },[])

  return (
    <div id="text-input-block-div">
      <input placeholder="Name" className="block-interactive-items"></input>
      <input placeholder="Email" className="block-interactive-items"></input>
      <input placeholder="Phone" className="block-interactive-items"></input>
    </div>
  )
}

export default App
                    `

const boilerplateCode = `// Without aria-ease: ~50 lines of boilerplate
const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("dropdown-menu");
const menuItems = Array.from(document.querySelectorAll(".menu-item"));
let currentIndex = -1;

function openMenu() {
  menu.style.display = "block";
  menuButton.setAttribute("aria-expanded", "true");
  if (menuItems.length > 0) {
    currentIndex = 0;
    menuItems[0].focus();
  }
}

function closeMenu() {
  menu.style.display = "none";
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.focus();
  currentIndex = -1;
}

function handleMenuKeydown(e) {
  switch(e.key) {
    case "ArrowDown":
      e.preventDefault();
      currentIndex = Math.min(currentIndex + 1, menuItems.length - 1);
      menuItems[currentIndex].focus();
      break;
    case "ArrowUp":
      e.preventDefault();
      currentIndex = Math.max(currentIndex - 1, 0);
      menuItems[currentIndex].focus();
      break;
    case "Escape":
      e.preventDefault();
      closeMenu();
      break;
    case "Tab":
      closeMenu();
      break;
    case "Enter":
    case " ":
      e.preventDefault();
      menuItems[currentIndex].click();
      break;
  }
}

menuButton.addEventListener("click", () => {
  menu.style.display === "none" ? openMenu() : closeMenu();
});

menu.addEventListener("keydown", handleMenuKeydown);
// Plus: cleanup, edge cases, focus trap, etc.`

const ariaEaseCode = `// With aria-ease: 3 lines
import * as Menu from "aria-ease/menu";

const menu = Menu.makeMenuAccessible({
  menuId: "dropdown-menu",
  menuItemsClass: "menu-item",
  triggerId: "menu-button"
});

// That's it! Keyboard nav, focus trap, 
// ARIA updates, Submenu support, click outside close included.`

// eslint-disable-next-line react/prop-types
const Homepage = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'home';
  const[resultsVisible, setResultsVisible] = useState(false);
  
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
        <title>Home | Aria-Ease</title>
        <meta name="description" content="Accessibility infrastructure for the entire frontend engineering lifecycle. Build accessible patterns, verify with automated testing, and gate deployments—block inaccessible code from production. React, Vue, Svelte, or vanilla JS." />
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

      <main className="page-body-div overflow-y-auto pb-[100px]" id="main-content">
        <section>
          <Container fluid className="homepage-above-fold-div">
            <Row>
              <Col xs={12} sm={12} md={12} lg={8}>
                <div className="hero-text-div">
                  <h1 className="">Accessibility infrastructure for your entire frontend lifecycle</h1>
                  <p className="hero-paragraph mb-5 mt-8 text-[1.2rem] leading-[1.5rem]">Stop treating accessibility as an afterthought. Aria-Ease engineers accessibility integrity into every phase of frontend development — from reusable component utilities to CI/CD gatekeepers that block inaccessible code from production. Works with React, Vue, Svelte, or vanilla JavaScript.</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/docs' className="px-4 sm:px-8 h-12 flex items-center justify-center bg-blue-800 hover:bg-blue-900 shadow-xl rounded-lg text-white">Get Started</Link>
                    <Link className="hero-explore px-4 sm:px-8 rounded-lg" onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/examples/accordion'>
                      <div className="flex items-center gap-2 h-12 black-white-text">
                        Explore Utilities <ArrowRight height={17}/>
                      </div>
                    </Link>
                  </div>
                  {/* Stats badges */}
                  <div className="flex items-center gap-4 mt-10 flex-wrap text-sm">
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-blue-600" aria-hidden="true"/>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>1.4KB - 3.7KB per component</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-green-600" aria-hidden="true"/>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>WCAG 2.1 AA Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Code2 size={16} className="text-purple-600" aria-hidden="true"/>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Framework Agnostic</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <hr className={`${darkMode ? 'border-gray-100' : 'border-gray-900'}`}></hr>

        {/* Before/After Comparison Section */}
        <section className="py-[80px] px-3">
          <Container fluid>
            <div className="text-center mb-12">
              <h2 className="black-white-text text-3xl font-bold mb-4">From 50 Lines to 3 Lines</h2>
              <p className="text-[1.2rem] leading-[1.5rem] black-grey-text">See how aria-ease eliminates boilerplate code</p>
            </div>
            <Row className="items-start">
              <Col lg={6} md={12} className="mb-6 lg:mb-0">
                <div className="flex flex-col h-full max-h-[600px]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <h3 className="text-lg font-semibold black-grey-text">❌ Without aria-ease (~50 lines)</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <CodeBlockDemo code={boilerplateCode} isLineNumber={true}/>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Plus: cleanup functions, edge cases, focus trap logic, submenu handling...</p>
                </div>
              </Col>
              <Col lg={6} md={12}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <h3 className="text-lg font-semibold black-grey-text">✅ With aria-ease (3 lines)</h3>
                </div>
                <CodeBlockDemo code={ariaEaseCode} isLineNumber={true}/>
                <div className={`mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500 ${darkMode ? 'text-green-100 bg-green-900/20' : 'text-green-900 bg-green-50'}`}>
                  <p className="font-semibold mb-2">You automatically get:</p>
                  <ul className="space-y-1 text-sm">
                    <li>✓ Arrow key navigation</li>
                    <li>✓ Escape/Tab/Shift+Tab closes menu</li>
                    <li>✓ Focus trap within menu</li>
                    <li>✓ Automatic ARIA updates</li>
                    <li>✓ Submenu support</li>
                    <li>✓ Click outside close</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Why aria-ease Section */}
        <section className="py-[80px] px-3">
          <Container fluid>
            <div className="text-center mb-12">
              <h2 className="black-white-text text-3xl font-bold mb-4">Complete Accessibility Lifecycle</h2>
              <p className="text-[1.2rem] leading-[1.5rem] black-grey-text max-w-3xl mx-auto">From design to deployment—aria-ease covers every phase of accessibility governance</p>
            </div>
            <Row className="g-4">
              <Col lg={4} md={6}>
                <div className={`p-6 h-full rounded-xl border-2 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} shadow-lg`}>
                  <h3 className="text-xl font-bold mb-4 text-red-600">❌ Fragmented Approach</h3>
                  <ul className="space-y-2 black-grey-text">
                    <li>• Manual ARIA implementation</li>
                    <li>• Separate testing tools</li>
                    <li>• Post-launch audits only</li>
                    <li>• No behavior validation</li>
                    <li>• Testing disconnected from CI/CD</li>
                    <li>• Accessibility as an afterthought</li>
                  </ul>
                </div>
              </Col>
              <Col lg={4} md={6}>
                <div className={`p-6 h-full rounded-xl border-2 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} shadow-lg`}>
                  <h3 className="text-xl font-bold mb-4 text-orange-600">⚠️ Component Libraries Only</h3>
                  <ul className="space-y-2 black-grey-text">
                    <li>• Pre-built components only</li>
                    <li>• No testing infrastructure</li>
                    <li>• No audit capabilities</li>
                    <li>• Limited to their patterns</li>
                    <li>• Can&apos;t verify custom components</li>
                    <li>• No CI/CD integration</li>
                  </ul>
                </div>
              </Col>
              <Col lg={4} md={12}>
                <div className={`p-6 h-full rounded-xl border-2 border-green-500 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'} shadow-xl`}>
                  <h3 className="text-xl font-bold mb-4 text-green-600">✅ aria-ease Platform</h3>
                  <ul className="space-y-2 black-grey-text">
                    <li>• 🎨 Design: Component utilities (1.4-3.7KB)</li>
                    <li>• 🧪 Test: Contract testing for behavior</li>
                    <li>• 🔍 Audit: Runtime page scanning</li>
                    <li>• ✓ Verify: WCAG compliance validation</li>
                    <li>• 🚀 Integrate: CI/CD pipeline ready</li>
                    <li>• 📊 Govern: End-to-end lifecycle coverage</li>
                  </ul>
                </div>
              </Col>
            </Row>
            
            {/* Accessibility Lifecycle Phases */}
            <div className="mt-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 black-white-text text-center">The aria-ease Accessibility Lifecycle</h3>
                <Row className="g-4">
                  <Col md={6} lg={4}>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} h-full`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Code2 className="text-purple-600" size={18} />
                        </div>
                        <h4 className="font-bold black-white-text">Design & Build</h4>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Component utilities with automatic ARIA management</p>
                      <code className="text-xs text-purple-600 dark:text-purple-400">makeMenuAccessible(), makeTabsAccessible()</code>
                    </div>
                  </Col>
                  
                  <Col md={6} lg={4}>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} h-full`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <ShieldCheck className="text-blue-600" size={18} />
                        </div>
                        <h4 className="font-bold black-white-text">Test & Verify</h4>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Contract testing validates keyboard interaction & ARIA patterns</p>
                      <code className="text-xs text-blue-600 dark:text-blue-400">npx aria-ease test</code>
                    </div>
                  </Col>
                  
                  <Col md={6} lg={4}>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} h-full`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <FileCheck2 className="text-orange-600" size={18} />
                        </div>
                        <h4 className="font-bold black-white-text">Audit</h4>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Runtime page scanning with axe-core for WCAG violations</p>
                      <code className="text-xs text-orange-600 dark:text-orange-400">npx aria-ease audit</code>
                    </div>
                  </Col>
                  
                  <Col md={6} lg={4}>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} h-full`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <CheckCircle2 className="text-green-600" size={18} />
                        </div>
                        <h4 className="font-bold black-white-text">Validate</h4>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Multi-format reports (JSON, CSV, HTML) for compliance tracking</p>
                      <code className="text-xs text-green-600 dark:text-green-400">audit-report.html</code>
                    </div>
                  </Col>
                  
                  <Col md={6} lg={4}>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} h-full`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                          <Terminal className="text-cyan-600" size={18} />
                        </div>
                        <h4 className="font-bold black-white-text">Integrate CI/CD</h4>
                      </div>
                      <p className="text-sm black-grey-text mb-2">Automated testing in your deployment pipeline</p>
                      <code className="text-xs text-cyan-600 dark:text-cyan-400">GitHub Actions, Jenkins, etc.</code>
                    </div>
                  </Col>
                  
                  <Col md={6} lg={4}>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'} h-full`}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                          <Boxes className="text-pink-600" size={18} />
                        </div>
                        <h4 className="font-bold black-white-text">Maintain & Govern</h4>
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

        <hr className={`${darkMode ? 'border-gray-100' : 'border-gray-300'}`}></hr>

        {/* Quick Wins Section */}
        <section className="py-[80px] px-3">
          <Container fluid>
            <div className="text-center mb-12">
              <div className={`inline-flex items-center gap-2 ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'} px-4 py-2 rounded-full mb-4`}>
                <Zap size={20} className="text-purple-600" aria-hidden="true"/>
                <span className={`${darkMode ? 'text-purple-100' : 'text-purple-600'} font-semibold`}>Quick Start</span>
              </div>
              <h2 className="black-white-text text-3xl font-bold mb-4">Get Results in 5 Minutes</h2>
              <p className="text-[1.2rem] leading-[1.5rem] black-grey-text">
                Already have a dropdown menu? Make it accessible right now.
              </p>
            </div>
            <Row className="justify-center">
              <Col lg={8}>
                <div className={`p-8 rounded-xl ${darkMode ? 'bg-none' : 'bg-white'} shadow-2xl`}>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                      <h3 className="text-lg font-semibold black-grey-text">Install</h3>
                    </div>
                    <CodeBlockDemo code={`npm i aria-ease`}/>
                  </div>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
                      <h3 className="text-lg font-semibold black-grey-text">Add 3 lines of code</h3>
                    </div>
                    <CodeBlockDemo code={`import * as Menu from "aria-ease/menu";

const menu = Menu.makeMenuAccessible({
  menuId: "your-menu-id",
  menuItemsClass: "your-menu-item-class",
  triggerId: "your-button-id"
});`} isLineNumber={true}/>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">✓</div>
                      <h3 className="text-lg font-semibold black-grey-text">That&apos;s it!</h3>
                    </div>
                    <div className={`p-4 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-lg`}>
                      <p className={`font-medium mb-2 ${darkMode ? 'text-green-100' : 'text-green-900'}`}>Your menu now has:</p>
                      <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ${darkMode ? 'text-green-100' : 'text-green-900'}`}>
                        <div>✓ Full keyboard interaction</div>
                        <div>✓ Focus management</div>
                        <div>✓ ARIA attributes</div>
                        <div>✓ Screen reader support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Developer Experience Section */}
        <section className="py-[80px] px-3">
          <Container fluid>
            <div className="text-center mb-12">
              <h2 className="black-white-text text-3xl font-bold mb-4 b">Built for Developers</h2>
              <p className="text-[1.2rem] leading-[1.5rem] black-grey-text">
                Modern DX with zero compromise on accessibility
              </p>
            </div>
            <Row className="g-4">
              <Col lg={3} md={6}>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-full text-center`}>
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Code2 className="text-blue-600" size={24} aria-hidden="true"/>
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 black-white-text">TypeScript Support</h3>
                  <p className="text-sm black-grey-text">Full type definitions included</p>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-full text-center`}>
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Package className="text-purple-600" size={24} aria-hidden="true"/>
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 black-white-text">Tree-Shakeable</h3>
                  <p className="text-sm black-grey-text">Import only what you need</p>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-full text-center`}>
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <ShieldCheck className="text-green-600" size={24} aria-hidden="true"/>
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 black-white-text">Tiny Bundle Size</h3>
                  <p className="text-sm black-grey-text">1.4KB - 3.7KB per component</p>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-full text-center`}>
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Boxes className="text-orange-600" size={24} aria-hidden="true"/>
                    </div>
                  </div>
                  <h3 className="font-bold mb-2 black-white-text">Framework Agnostic</h3>
                  <p className="text-sm black-grey-text">React, Vue, Svelte, vanilla JS</p>
                </div>
              </Col>
            </Row>
            <div className="mt-8">
              <CodeBlockDemo code={`// Works with any framework or vanilla JS
import * as Menu from "aria-ease/menu";  // ESM
// OR
const Menu = require("aria-ease/menu");   // CommonJS
// OR
<script type="module">                    // CDN
  import * as Menu from "https://cdn.jsdelivr.net/npm/aria-ease@latest/dist/src/menu/index.js";
</script>`}/>
            </div>
          </Container>
        </section>

        <hr className={`${darkMode ? 'border-gray-100' : 'border-gray-300'}`}></hr>

        <section className="pt-[50px]">
          <Container fluid className="below-the-fold-container mb-[50px]">
            <Row>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="mt-[50px]">
                  <h2 className="text-3xl font-bold mb-6">Built for a more accessible web</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Terminal className={`${darkMode ? 'text-gray-400' : 'text-gray-800'} h-6 w-6 mt-1`} aria-hidden="true"/>
                      <div>
                        <h3 className="font-semibold mb-2">Seamless Integration</h3>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>Integrate accessibility into components with ease with simple function calls</p>
                    </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Boxes className={`${darkMode ? 'text-gray-400' : 'text-gray-800'} h-6 w-6 mt-1`} aria-hidden="true"/>
                      <div>
                        <h3 className="font-semibold mb-2">Utility Functions</h3>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>Audit your components to discover where accessibilty can be improved</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Keyboard className={`${darkMode ? 'text-gray-400' : 'text-gray-800'} h-16 w-16 mt-1`} aria-hidden="true"/>
                      <div>
                        <h3 className="font-semibold mb-2">Intuitive Navigation</h3>
                        <div>
                          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-800'} mb-3`}>See how easy it is to navigate with keyboard controls and track focus</p>
                          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                            <video autoPlay loop muted playsInline>
                              <source src={keyboardnavdemo} type="video/mp4"></source>
                            </video>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm mt-[50px]" aria-hidden='true'>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <pre className="text-green-400">
                    <code style={{color: 'rgb(74 222 128)'}}>{belowTheFoldCode}</code>
                  </pre>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="px-7 pt-[100px] pb-[100px] audit-section mt-[100px] flex gap-5 flex-wrap justify-center">
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="flex items-center gap-2 audit-graphic rounded-sm bg-[#cbd4dd] px-3 py-2 border ml-20">
              <div className="bg-green-300 rounded-full p-2">
                  <FileCheck2/>
              </div>
              <span className="text-md font-[200]">Pages Audited</span>
              <span className="text-2xl font-bold">10</span>
            </div>

            <div className="flex items-center gap-2 audit-graphic rounded-sm bg-[#cbd4dd] px-3 py-2 border">
              <div className="bg-orange-300 rounded-full p-2">
                <FileWarning/>
              </div>
              <span className="text-md font-[200]">Total violations</span>
              <span className="text-2xl font-bold">48</span>
            </div>

            <div className="flex items-center gap-2 audit-graphic rounded-sm bg-[#cbd4dd] px-3 py-2 border ml-20">
              <div className="bg-red-300 rounded-full p-2">
                <FileWarning/>
              </div>
              <span className="text-md font-[200]">Critical violations</span>
              <span className="text-2xl font-bold">18</span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-3 max-w-full">
            <h2 className="black-white-text text-3xl font-bold">Audit Your Web Pages. <span className="text-blue-500">Get instant accessibility insights</span></h2>
            <p className="audit-section-paragraph max-w-[700px] text-[1.2rem] leading-[1.5rem] mb-4">Do you wonder what accessibility issues might be lurking on your web pages? Scan your web pages using the runtime audit CLI. You&#39;ll get multi-format audit reports of accessibility violations.</p>
            <div className="overflow-x-auto w-full">
              <CodeBlockDemo code={`npx aria-ease audit --url https://yoursite.com

# Or audit multiple pages
npx aria-ease audit  # Uses ariaease.config.js`}/>
            </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <FileCheck2 className="text-green-600 mt-1" size={20} aria-hidden="true"/>
                      <div>
                        <p className="font-semibold black-white-text">Multi-format reports</p>
                        <p className="text-sm black-grey-text">JSON, CSV, and interactive HTML</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="text-blue-600 mt-1" size={20} aria-hidden="true"/>
                      <div>
                        <p className="font-semibold black-white-text">Powered by axe-core</p>
                        <p className="text-sm black-grey-text">Industry-standard accessibility testing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="text-purple-600 mt-1" size={20} aria-hidden="true"/>
                      <div>
                        <p className="font-semibold black-white-text">CI/CD ready</p>
                        <p className="text-sm black-grey-text">Integrate into your deployment pipeline</p>
                      </div>
                    </div>
                  </div>
            <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/audit' className="px-4 sm:px-8 h-12 flex items-center justify-center bg-blue-800 hover:bg-blue-900 shadow-xl rounded-lg text-white">Audit Your Webpage</Link>
          </div>
        </section>

        <hr className={`${darkMode ? 'border-gray-100' : 'border-gray-300'}`}></hr>

        {/* Migration/Adoption Section */}
        <section className="py-[80px] px-3">
          <Container fluid>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 black-white-text">Already Have Existing Code?</h2>
              <p className="text-[1.2rem] leading-[1.5rem] black-grey-text">
                No need to rewrite everything. Start small and gradually adopt.
              </p>
            </div>
            <Row className="justify-center">
              <Col lg={8}>
                <div className="space-y-6">
                  <div className={`py-6 px-3 rounded-xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-2 shadow-lg`}>
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 font-bold text-blue-600">1</div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 black-white-text">Pick One Component</h3>
                        <p className="black-grey-text">Start with your main navigation, a dropdown menu, or any frequently-used component.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`py-6 px-3 rounded-xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-2 shadow-lg`}>
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 font-bold text-blue-600">2</div>
                      <div className="w-full overflow-hidden">
                        <h3 className="font-bold text-lg mb-2 black-white-text">Add aria-ease in 5 Minutes</h3>
                        <p className="black-grey-text mb-3">Keep your existing HTML and CSS. Just add the accessibility layer.</p>
                        <div className='overflow-x-auto max-w-full'>
                          <CodeBlockDemo code={`// Your existing component stays the same
// Just add this:
import * as Menu from "aria-ease/menu";

useEffect(() => {
  const menu = Menu.makeMenuAccessible({
    menuId: "existing-menu-id",
    menuItemsClass: "existing-menu-item-class",
    triggerId: "existing-button-id"
  });
  
  return () => menu.cleanup();
}, []);`}/>
                        </div>
                        
                      </div>
                    </div>
                  </div>

                  <div className={`py-6 px-3 rounded-xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-2 shadow-lg`}>
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 font-bold text-blue-600">3</div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 black-white-text">See Immediate Improvements</h3>
                        <p className="black-grey-text">Run an accessibility audit and watch your scores improve instantly.</p>
                      </div>
                    </div>
                  </div>

                  <div className={`py-6 px-3 rounded-xl ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-2 shadow-lg`}>
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 font-bold text-green-600">4</div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 black-white-text">Gradually Roll Out to Other Components</h3>
                        <p className="black-grey-text">Once you see the benefits, apply the same pattern to other components at your own pace.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border-2`}>
                  <h4 className={`font-bold mb-3 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>💡 Pro Tip</h4>
                  <p className={`${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                    aria-ease works alongside your existing code. You don&apos;t need to refactor or migrate everything at once. 
                    Many teams start with their most-used component and see results within a sprint.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <hr className={`${darkMode ? 'border-gray-100' : 'border-gray-300'}`}></hr>

        {/* Services CTA Section */}
        <section className="home-services-cta py-24 px-3">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="mb-4 mb-lg-0">
                <h2 className="text-4xl font-bold mb-4 black-white-text">Need Expert Help?</h2>
                <p className="text-lg mb-4 opacity-80 black-grey-text">
                  Get professional accessibility audits and remediation services from the 
                  creator of aria-ease. WCAG-compliant solutions for your digital products.
                </p>
                <ul className="services-features-list mb-4">
                  <li className="flex items-start gap-3 mb-2">
                    <CheckCircle2 size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                    <span className="black-grey-text">Comprehensive WCAG 2.1/2.2 compliance audits</span>
                  </li>
                  <li className="flex items-start gap-3 mb-2">
                    <CheckCircle2 size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                    <span className="black-grey-text">Expert code remediation and fixes</span>
                  </li>
                  <li className="flex items-start gap-3 mb-2">
                    <CheckCircle2 size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                    <span className="black-grey-text">Developer training and workshops</span>
                  </li>
                </ul>
              </Col>
              <Col lg={6} className="text-center text-lg-end">
                <Link 
                  onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} 
                  to='/services' 
                  className="inline-flex items-center gap-2 px-8 h-14 bg-blue-800 hover:bg-blue-900 shadow-xl rounded-lg text-white text-lg font-semibold transition-all hover:-translate-y-1"
                >
                  View Services <ArrowRight size={20} />
                </Link>
              </Col>
            </Row>
          </Container>
        </section>

        <hr className={`${darkMode ? 'border-gray-100' : 'border-gray-300'}`}></hr>

        <Footer page={page} darkMode={darkMode}/>
      </main>
        
      <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>

      
    </div>
  )
}

export default Homepage
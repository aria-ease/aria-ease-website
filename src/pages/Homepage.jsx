import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import SlideOutNav from "../components/SlideOutNav";
import { useState, useEffect, useRef } from "react";
import * as Block from "aria-ease/block";
import { Link } from "react-router-dom";
import './homepage.css';
import { Terminal, Boxes, Keyboard, ArrowRight, FileWarning, FileCheck2 } from 'lucide-react';
import keyboardnavdemo from '../assets/keyboard-nav-demo.gif';
import Footer from "../components/Footer";
import ScrollTracker from '../components/ScrollTracker';

const belowTheFoldCode = `import { useEffect } from "react";
import * as Block from "aria-ease/block";

const App = () => {
  useEffect(() => {
    function initializeBlock() {
      Block.makeBlockAccessible("text-input-block-div", "block-interactive-items");
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

// eslint-disable-next-line react/prop-types
const Homepage = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'home';
  const[resultsVisible, setResultsVisible] = useState(false);
  
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
        <section>
          <Container fluid className="homepage-above-fold-div">
            <Row>
              <Col xs={12} sm={12} md={12} lg={8}>
                <div className="hero-text-div">
                  <h1 className="hero-heading">Build accessible web applications with ease</h1>
                  <p className="hero-paragraph mb-5 mt-8 text-[1.2rem] leading-[1.5rem]">Open-source library with out-of-the-box utilities for the web. Automate focus management, keyboard interaction and navigation, accessibility audit and reporting, and more.</p>
                  {/* <div className="badge-container mb-[50px]">
                    <span className="new-badge">New</span>
                    <span className="version-text">v2.2.3 is now available</span>
                  </div> */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/docs' className="px-4 sm:px-8 h-12 flex items-center justify-center bg-blue-800 hover:bg-blue-900 shadow-xl rounded-lg text-white">Get Started</Link>
                    <Link className="hero-explore px-4 sm:px-8 rounded-lg" onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/examples/accordion'>
                      <div className="flex items-center gap-2 h-12 black-white-text">
                        Explore Utilities <ArrowRight height={17}/>
                      </div>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
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
                            <img 
                              src={keyboardnavdemo} 
                              alt="Demonstration of keyboard navigation through form inputs"
                              className="w-full"
                            />
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
          <div className="flex flex-col items-start justify-center gap-3">
            <h2 className="black-white-text text-3xl font-bold">Audit Your Web Pages. <span className="text-blue-500">Get instant accessibility insights</span></h2>
            <p className="audit-section-paragraph max-w-[700px] text-[1.2rem] leading-[1.5rem] mb-4">Do you wonder what accessibility issues might be lurking on your web pages? Scan your web pages using the runtime audit CLI. You&#39;ll get multi-format audit reports of accessibility violations.</p>
            <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/audit' className="px-4 sm:px-8 h-12 flex items-center justify-center bg-blue-800 hover:bg-blue-900 shadow-xl rounded-lg text-white">Audit Your Webpage</Link>
          </div>
        </section>

        <section className="home-get-started-div flex flex-col items-center justify-center pt-[100px] pb-[100px] px-3">
          <p className="mb-2">Get Started</p>
          <p className="get-started-ship font-semibold mb-1">Ship accessible projects faster</p>
          <p className="mb-4">Find out how Aria-Ease helps developers achieve perfect accessibility scores on their web projects, including ours.</p>
          <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/docs' className="px-4 sm:px-8 h-12 flex items-center justify-center bg-blue-800 hover:bg-blue-900 shadow-xl rounded-lg text-white">Get Started</Link>
        </section>
        <Footer page={page} darkMode={darkMode}/>
      </main>
        
      <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>

      
    </div>
  )
}

export default Homepage
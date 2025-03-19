import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import SlideOutNav from "../components/SlideOutNav";
import { useState, useEffect } from "react";
import { makeBlockAccessible } from "aria-ease";
import { Link } from "react-router-dom";
import './homepage.css';
import { Terminal, Boxes, Keyboard } from 'lucide-react';
import keyboardnavdemo from '../assets/keyboard-nav-demo.gif';
import Footer from "../components/Footer";
import BeforeAfterSlider from "../components/games/BATest";
import ScrollTracker from '../components/ScrollTracker';

// eslint-disable-next-line react/prop-types
const Homepage = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'home';

  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('inner-body-div', 'block-interactive');
    return accessibleBlock;
  },[]);

  return (
    <div className="home-body" id="inner-body-div">
      <ScrollTracker page={page}/>
      <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>

      <div className="page-body-div">
        <div>
          <Container fluid className="homepage-above-fold-div">
            <Row>
              <Col xs={12} sm={12} md={12} lg={8}>
                <div className="hero-text-div">
                  <h1 className="hero-heading">Add accessibility to your web components with ease</h1>
                  <p className="hero-paragraph mb-5 mt-8">Out-of-the-box accessibility utility package that you can integrate into your web components with simple function calls. Automate menu and block focus management, keyboard interactions and navigations, aria attributes update, and more.</p>
                  <div className="badge-container mb-[50px]">
                    <span className="new-badge">New</span>
                    <span className="version-text">v1.6.1 is now available</span>
                  </div>
                  <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/docs' className='block-interactive home-discover-functions-button' aria-label='Navigate to the documentation page'>Discover the core functions</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid className="below-the-fold-container mb-[50px]">
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
              <div className="mt-[50px]">
                <h2 className="text-3xl font-bold mb-6">Built for a more accessible web</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Terminal className={`${darkMode ? 'text-gray-400' : 'text-gray-800'} h-6 w-6 mt-1`} />
                    <div>
                      <h3 className="font-semibold mb-2">Seamless Integration</h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>Integrate accessibility into components with ease with simple function calls</p>
                  </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Boxes className={`${darkMode ? 'text-gray-400' : 'text-gray-800'} h-6 w-6 mt-1`} />
                    <div>
                      <h3 className="font-semibold mb-2">Utility Functions</h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>Audit your components to discover where accessibilty can be improved</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Keyboard className={`${darkMode ? 'text-gray-400' : 'text-gray-800'} h-16 w-16 mt-1`} />
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
              <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm mt-[50px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre className="text-green-400">
                  <code style={{color: 'rgb(74 222 128)'}}>
                    {`import { useEffect } from "react";
import { makeBlockAccessible } from "aria-ease";

const App = () => {
  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('text-input-block-div', 'block-interactive-items');
    return accessibleBlock;
  },[])

  return (
    <div id="text-input-block-div">
      <input type="text" placeholder='Name' className='block-interactive-items' aria-label='Enter your name'></input>
      <input name='email' autoComplete='email' type="text" placeholder='Email' className='block-interactive-items' aria-label='Enter your email'></input>
      <input type="tel" placeholder='Phone' className='block-interactive-items' aria-label='Enter your phone number'></input>
    </div>
  )
}

export default App
                    `}
                  </code>
                </pre>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="px-3 mt-[150px] mb-[50px]">
          {/* <AccessibilityGame/> */}
          <BeforeAfterSlider darkMode={darkMode}/>
          {/* <ScreenReaderSimulator/> */}
        </div>

        <div className="home-get-started-div flex flex-col items-center justify-center pt-[100px] pb-[100px] px-3">
          <p className="mb-2">Get Started</p>
          <p className="get-started-ship font-semibold mb-1">Ship accessible projects faster</p>
          <p className="mb-4">Find out how Aria-Ease helps developers achieve perfect accessibility scores on their projects, including ours.</p>
          <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/docs' className='block-interactive home-discover-functions-button' aria-label='Navigate to the documentation page'>Discover the core functions</Link>
        </div>
        <Footer page={page}/>
      </div>
        
      <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>

      
    </div>
  )
}

export default Homepage
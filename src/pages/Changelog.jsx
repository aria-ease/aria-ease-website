import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import SlideOutNav from "../components/SlideOutNav";
import { useState, useEffect, useRef } from "react";
import ScrollTracker from '../components/ScrollTracker';
import './homepage.css';
import * as Block from 'aria-ease/block';
import SideNav from "../components/SideNav";
import './changelog.css';
import ReactMarkdown from 'react-markdown';


// eslint-disable-next-line react/prop-types
const Changelog = ({ darkMode, setDarkMode }) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'changelog';
  const[resultsVisible, setResultsVisible] = useState(false);
  const[content, setContent] = useState("");

  useEffect(() => {
    // Fetch the markdown file directly from the built assets
    fetch("/CHANGELOG.md")
    .then((res) => res.text())
    .then((text) => {setContent(text); console.log(text)})
    .catch((err) => console.error("Error loading changelog:", err));
  }, [])

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
      <div className="page-body-div">
        <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <Container fluid className="homepage-above-fold-div">
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={8}>
                        <div className="pt-[100px]">
                            <h1 className="hero-heading">Changelog</h1>
                            <p className="hero-paragraph mb-5 mt-8">See what&#39;s new, improved, and fixed in each release of Aria-Ease.</p>
                        </div>
                        </Col>
                    </Row>
                </Container>
                <main className="changelog-container">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </main>
              </Col>
            </Row>
        </Container>
      </div>
      <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  );
};

export default Changelog;
import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import SlideOutNav from "../components/SlideOutNav";
import { useState, useEffect, useRef } from "react";
import ScrollTracker from '../components/ScrollTracker';
import './homepage.css';
import * as Block from 'aria-ease/block';
import SideNav from "../components/SideNav";

const changelogData = [
  {
    version: "2.0.3",
    date: "Sep 23, 2025",
    changes: [
      "Improved tree-shaking for unused utilities.",
      "Added per-utility and central builds/imports for granularity."
    ]
  },
  {
    version: "2.0.2",
    date: "Sep 4, 2025",
    changes: [
      "Added tree-shaking for unused utilities.",
    ]
  },
  {
    version: "2.0.1",
    date: "Sep 4, 2025",
    changes: [
      "Removed aria-label update functionality for menu, checkbox, radio, toggle, and accordion.",
      "Refactored makeMenuAccessible usage: Removed updateMenuTriggerAriaAttributes, cleanUpMenuEventListeners functions. Added openMenu, closeMenu, and cleanup functions."
    ]
  },
  {
    version: "2.0.0",
    date: "Sep 4, 2025",
    changes: [
      "Major refactor: deprecated v1.x.x.",
      "Initiated v2.x.x.",
      "Added namespace imports."
    ]
  }
];

// eslint-disable-next-line react/prop-types
const Changelog = ({ darkMode, setDarkMode }) => {
  const [showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'changelog';
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
                <Container fluid className="mb-[50px]">
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <div className="changelog-list mt-8">
                                {changelogData.map((entry) => (
                                <div key={entry.version} className="changelog-entry mb-8 p-6 rounded-lg shadow-sm">
                                    <div className="flex items-center gap-4 mb-2">
                                    <span className="text-lg font-bold text-blue-700">v{entry.version}</span>
                                    <span className="text-sm changelog-entry-date font-semibold">{entry.date}</span>
                                    </div>
                                    <ul className="list-disc ml-6 mt-2">
                                    {entry.changes.map((change, i) => (
                                        <li key={i} className="mb-1 changes-list-text">{change}</li>
                                    ))}
                                    </ul>
                                </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
              </Col>
            </Row>
        </Container>
      </div>
      <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  );
};

export default Changelog;
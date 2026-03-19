import Header from "../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import SlideOutNav from "../components/SlideOutNav";
import { useState, useEffect, useRef, useMemo } from "react";
import ScrollTracker from '../components/ScrollTracker';
import './homepage.css';
import * as Block from 'aria-ease/block';
import SideNav from "../components/SideNav";
import './changelog.css';
import { markdownParser } from '../hooks/markdownParser';
import CalloutPanel from '../components/CalloutPanel';
import { AlertCircle, ChevronRightCircleIcon } from "lucide-react";
import { Helmet } from 'react-helmet-async';



// eslint-disable-next-line react/prop-types
const Changelog = ({ darkMode, setDarkMode }) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'changelog';
  const[resultsVisible, setResultsVisible] = useState(false);
  const[changelogData, setChangelogData] = useState([]);

  const mainBlockCleanupRef = useRef(null);

  const changelogDataa = useMemo(() => {
    return markdownParser(changelogData);
  }, [changelogData]);

  useEffect(() => {
    fetch('/CHANGELOG.md')
    .then(response => response.text())
    .then(data => setChangelogData(data))
    .catch(error => console.error(error))
  }, [])

  
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

  const getCategoryClasses = (category) => {
    switch (category) {
      case 'Features':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Bug Fixes':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Performance':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Refactor':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (

    
    <div className="home-body" id="inner-body-div">
      <Helmet>
            <title>Changelog | Aria-Ease</title>
            <meta name="description" content="See what's new, improved, and fixed in each release of Aria-Ease. Stay updated with the latest features, bug fixes, and performance enhancements." />
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
      <main className="page-body-div documentation-page section-tone-a" id="main-content">
        <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
                <div className="side-body-div docs-flow">
                            <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                              <span className='docs-kicker black-grey-text'>Documentation</span>
                              <h1 className='introduction-heading black-white-text'>Release <span className='text-gradient'>Changelog</span></h1>
                              <p className='mt-2 docs-intro-copy'>See what&#39;s new, improved, and fixed in each release of Aria-Ease.</p>
                            </div>

                            <CalloutPanel tone='info' className='mt-6 mb-[50px] w-full'>
                              <div className='flex items-center gap-3'>
                                <AlertCircle className='h-5 w-5 mt-0.5' />
                                <p>Note: Earlier versions (≤2.0.x) were pre-release experimental builds without formal changelogs.</p>
                              </div>
                            </CalloutPanel>

                            {changelogDataa.map((release, index) => (
                              <div key={release.version + index} className="mb-20">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3 pt-1">
                                  <span className="inline-block pr-2">
                                    <a 
                                      href={release.compareLink} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="black-white-text"
                                    >
                                      {release.version}
                                    </a>
                                    <span className="text-sm font-normal changelog-text ml-2"> ({release.date})</span>
                                  </span>
                                </h2>

                                {Object.entries(release.categories).map(([category, changes]) => (
                                  <div key={category} className="mt-6">
                                    <h3 
                                      className={`inline-block text-sm font-semibold tracking-wider uppercase px-3 py-1 rounded-full border mb-4 ${getCategoryClasses(category)}`}
                                    >
                                      {category}
                                    </h3>
              
                                    <ul className="space-y-3 pl-4">
                                      {changes.map((change, index) => (
                                        <li key={index} className="flex items-start text-gray-700">
                                          <span className="h-6 w-6 flex items-center justify-center flex-shrink-0 mr-2 text-indigo-600">
                                              •
                                          </span>
                                          <span className="flex-1 changelog-text">
                                              {change.description.charAt(0).toUpperCase() + change.description.slice(1)} 
                                        
                                              {change.commitLink && change.commitLink !== 'N/A' && (
                                                  <a 
                                                      href={`https://github.com/aria-ease/aria-ease/commit/${change.commitLink}`}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className={`ml-3 text-xs font-mono ${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-indigo-600 transition-colors`}
                                                      title="View commit details on GitHub"
                                                  >
                                                      ({change.commitLink.substring(0, 7)})
                                                  </a>
                                              )}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            ))}
                            

                            <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-start'>
                    <a href='/testing' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                    <ChevronRightCircleIcon className="rotate-180"/>
                      <div className='flex flex-col w-full items-start'>
                        <span className='text-sm black-white-text'>Previous</span>
                        <span className='next-link-text text-md'>Testing Suite</span>
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

export default Changelog;
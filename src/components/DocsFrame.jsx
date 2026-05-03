import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getActiveScrollPosition } from '../utils/scrollPosition';
import Header from './Header';
import ScrollTracker from './ScrollTracker';
import SideNavDisclosure from './SideNavDisclosure';

// eslint-disable-next-line react/prop-types
const DocsFrame = ({ page, children, darkMode, setDarkMode, showDropdownPage, setShowDropdownPage }) => {
  const sideNavRef = useRef(null);

    useEffect(() => {
      document.body.style.overflow = 'hidden';

      const sideNav = sideNavRef.current;
        if (!sideNav) return;

        const handleScroll = () => {
          if (sideNav.scrollTop > 0) {
            sessionStorage.setItem('side-nav-scroll', sideNav.scrollTop.toString());
          }
        };

      sideNav.addEventListener('scroll', handleScroll);
      return () => sideNav.removeEventListener('scroll', handleScroll);
    }, []);

    
    useEffect(() => {
        const sideNav = sideNavRef.current;
        if (!sideNav) return;

        const savedPosition = sessionStorage.getItem('side-nav-scroll');
            
        if (savedPosition) {
          requestAnimationFrame(() => {
            sideNav.scrollTo({
              top: parseInt(savedPosition, 10),
              behavior: 'instant'
            });
          });
        }
    }, [page]);


    const saveScrollPosition = () => {
      sessionStorage.setItem(`scroll-position-${page}`, String(getActiveScrollPosition()));
    };

  return (
    <>
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

      <div className='flex overflow-hidden h-[calc(100vh-56px)] fixed top-[56px] w-full'>
            <nav className='min-w-[230px] max-w-[250px] docs-large-screen-side-bar h-[calc(100vh-56px)] section-tone-c'>
              <div ref={sideNavRef} className='side-nav-div overflow-y-auto flex flex-col sticky h-full' id='side-nav-div'>
                      <div className='side-nav-links-section'>
                        <p className="text-[0.900rem] font-bold">Getting Started</p>
                        <div className='flex flex-col gap-2'>
                          <Link onClick={saveScrollPosition} to='/getting-started' aria-label='Navigate to the documentation overview page' className={`side-nav-link ${(page === 'documentation') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Overview</Link>
                          <Link onClick={saveScrollPosition} to='/api' aria-label='Navigate to API reference page' className={`side-nav-link ${(page === 'api') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>API Reference</Link>
                          <Link onClick={saveScrollPosition} to='/glossary' aria-label='Navigate to Aria-Ease glossary page' className={`side-nav-link ${(page === 'glossary') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Glossary</Link>
                        </div>
                      </div>
                      <div className='side-nav-links-section'>
                        <p className="text-[0.900rem] font-bold">Concepts</p>
                        <div className='flex flex-col gap-2'>
                          <Link onClick={saveScrollPosition} to='/concepts/state-pack' aria-label='Navigate to state pack page' className={`side-nav-link ${(page === 'concept-statepack') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>State Pack</Link>
                        </div>
                      </div>
                      <div className='side-nav-links-section'>
                        <p className="text-[0.900rem] font-bold">Components</p>
                        <Link onClick={saveScrollPosition} to='/components/overview' aria-label='Navigate to the component overview page' className={`mb-2 side-nav-link ${(page === 'components-overview') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Overview</Link>
                        <SideNavDisclosure
                          page={page}
                          triggerTitle={'Components'}
                          sectionPages={['accordions', 'block', 'checkbox', 'combobox', 'menu', 'radio', 'tabs', 'toggle-button']}
                        >
                          <div className='flex flex-col gap-2 p-[10px]'>
                            <Link onClick={saveScrollPosition} to='/components/accordion' aria-label="View accordion examples" className={`side-nav-link component-dropdown-menu-item ${(page === 'accordions') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Accordion</Link>
                                                          
                            <Link onClick={saveScrollPosition} to='/components/block' aria-label="View block examples" className={`side-nav-link component-dropdown-menu-item ${(page === 'block') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Block</Link>                             
                                                          
                            <Link onClick={saveScrollPosition} to='/components/checkbox' aria-label="View checkbox examples" className={`side-nav-link component-dropdown-menu-item ${(page === 'checkbox') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Checkbox</Link>                              
                                                         
                            <Link onClick={saveScrollPosition} to='/components/combobox' aria-label="View combobox examples" className={`side-nav-link component-dropdown-menu-item ${(page === 'combobox') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Combobox</Link>                             
                                                         
                            <Link onClick={saveScrollPosition} to='/components/menu' aria-label="View menu examples" className={`side-nav-link component-dropdown-menu-item ${(page === 'menu') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Menu</Link>                             
                                                         
                            <Link onClick={saveScrollPosition} to='/components/radio' aria-label="View radio examples" className={`side-nav-link component-dropdown-menu-item ${(page === 'radio') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Radio</Link>                             
                                                         
                            <Link onClick={saveScrollPosition} to='/components/tabs' aria-label="View tabs examples" className={`side-nav-link component-dropdown-menu-item ${(page === 'tabs') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Tabs</Link>                             
                                                         
                            <Link onClick={saveScrollPosition} to='/components/toggle-button' aria-label="View toggle button examples" className={`side-nav-link component-dropdown-menu-item ${(page === 'toggle-button') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Toggle Button</Link>
                          </div>
                        </SideNavDisclosure>
                      </div>
                      <div className='side-nav-links-section'>
                        <p className="text-[0.900rem] font-bold">Testing</p>
                        <div className='flex flex-col gap-2'>
                          <Link onClick={saveScrollPosition} to='/testing/static-audit' aria-label="Navigate to static audit page" className={`tools-dropdown-menu-item side-nav-link ${(page === 'audit') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Static Audit</Link>
                          <Link onClick={saveScrollPosition} to='/testing/component-testing' aria-label="Navigate to component testing page" className={`tools-dropdown-menu-item side-nav-link ${(page === 'testing') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Component Testing</Link>
                        </div>       
                      </div>

                      <div className='side-nav-links-section'>
                        <p className="text-[0.900rem] font-bold">Contracts</p>
                        <Link onClick={saveScrollPosition} to='/contracts/overview' aria-label='Navigate to the contracts overview page' className={`mb-2 side-nav-link ${(page === 'contract-overview') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Overview</Link>
                        <Link onClick={saveScrollPosition} to='/contracts/dsl' aria-label='Navigate to the contracts dsl page' className={`mb-2 side-nav-link ${(page === 'dsl-overview') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>DSL</Link>
                        <SideNavDisclosure
                          page={page}
                          triggerTitle={'Component Contracts'}
                          sectionPages={['checkbox-contract', 'combobox-contract', 'menu-contract', 'tabs-contract', 'accordion-contract', 'radio-contract', 'toggle-contract']}
                        >
                          <div className='flex flex-col gap-2 p-[10px]'>
                            {/* Component specific contract */}
                            <Link onClick={saveScrollPosition} to='/contracts/accordion' aria-label='Navigate to the accordion contract page' className={`mb-2 side-nav-link ${(page === 'accordion-contract') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Accordion</Link>
                            <Link onClick={saveScrollPosition} to='/contracts/checkbox' aria-label='Navigate to the checkbox contract page' className={`mb-2 side-nav-link ${(page === 'checkbox-contract') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Checkbox</Link>
                            <Link onClick={saveScrollPosition} to='/contracts/combobox' aria-label='Navigate to the combobox contract page' className={`mb-2 side-nav-link ${(page === 'combobox-contract') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Combobox</Link>
                            <Link onClick={saveScrollPosition} to='/contracts/menu' aria-label='Navigate to the menu contract page' className={`mb-2 side-nav-link ${(page === 'menu-contract') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Menu</Link>
                            <Link onClick={saveScrollPosition} to='/contracts/radio' aria-label='Navigate to the radio contract page' className={`mb-2 side-nav-link ${(page === 'radio-contract') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Radio</Link>
                            <Link onClick={saveScrollPosition} to='/contracts/tabs' aria-label='Navigate to the tabs contract page' className={`mb-2 side-nav-link ${(page === 'tabs-contract') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Tabs</Link>
                            <Link onClick={saveScrollPosition} to='/contracts/toggle' aria-label='Navigate to the toggle contract page' className={`mb-2 side-nav-link ${(page === 'toggle-contract') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`}>Toggle</Link>
                          </div>
                        </SideNavDisclosure>        
                      </div>

                      <div className='side-nav-links-section'>
                        <p className="text-[0.900rem] font-bold">Project</p>
                        <div className='flex flex-col gap-2'>
                          <Link onClick={saveScrollPosition} to="/changelog" className={`side-nav-link ${(page === 'changelog') ? 'active-nav-link' : ''} ${(window.innerWidth >= 992) ? 'block-interactive' : ''}`} aria-label='Navigate to changelog page'>Changelog</Link>
                        </div>         
                      </div>
                    </div>
            </nav>
            <div className='flex-grow h-[calc(100vh-56px)] overflow-hidden'>
                <main className='h-full pb-[100px] page-body-div documentation-page section-tone-a' id="main-content">{children}</main>
            </div>
        </div>
    </>
  )
}

export default DocsFrame




//Getting Started
///Introduction
///API Reference
///Aria-Ease Glossary

//Concepts
///State Pack

//Components
///Overview
///Individual Component Utility

//Testing
///Static Audit
///Component Testing

//Contracts
///Overview
///Individual Component Contract. //DSL becomes a feature
///Write a contract
///DSL

//Project
///Changelog
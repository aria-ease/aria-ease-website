import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getActiveScrollPosition } from '../utils/scrollPosition';
import { useState } from "react";
import { ChevronRight } from 'lucide-react';


// eslint-disable-next-line react/prop-types
const SlideOutNav = ({ page, showDropdownPage }) => {
  const saveScrollPosition = () => {
    sessionStorage.setItem(`scroll-position-${page}`, String(getActiveScrollPosition()));
  };

  // Local dropdown state for each dropdown
  const [utilityOpen, setUtilityOpen] = useState(false);
  const [contractOpen, setContractOpen] = useState(false);


  return (
    <AnimatePresence>
      {showDropdownPage && (
        <motion.div
          className="slide-out-side-nav-outer-div"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="slide-out-side-nav-div pt-5 pr-5 pl-5 overflow-y-auto absolute top-0 left-0 h-full w-full section-tone-a"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ stiffness: 300, damping: 30 }}
          >
            <div className='flex flex-col h-full pb-[100px]'>
              <Link onClick={saveScrollPosition} to='/' className={`side-nav-link ${(page === 'home') ? 'active-nav-link' : ''}`}>Home</Link>
              <div className='slide-nav-links-section'>
                <p className="text-[0.900rem] font-bold">Getting Started</p>
                <div className='flex flex-col gap-2'>
                  <Link onClick={saveScrollPosition} to='/getting-started' aria-label='Navigate to the documentation overview page' className={`side-nav-link ${(page === 'documentation') ? 'active-nav-link' : ''}`}>Overview</Link>
                  <Link onClick={saveScrollPosition} to='/api' aria-label='Navigate to API reference page' className={`side-nav-link ${(page === 'api') ? 'active-nav-link' : ''}`}>API Reference</Link>
                  <Link onClick={saveScrollPosition} to='/glossary' aria-label='Navigate to Aria-Ease glossary page' className={`side-nav-link ${(page === 'glossary') ? 'active-nav-link' : ''}`}>Glossary</Link>
                </div>
              </div>
              <div className='slide-nav-links-section'>
                <p className="text-[0.900rem] font-bold">Concepts</p>
                <div className='flex flex-col gap-2'>
                  <Link onClick={saveScrollPosition} to='/concepts/state-pack' aria-label='Navigate to state pack page' className={`side-nav-link ${(page === 'concept-statepack') ? 'active-nav-link' : ''}`}>State Pack</Link>
                </div>
              </div>
              <div className='slide-nav-links-section'>
                <p className="text-[0.900rem] font-bold">Components</p>
                <Link onClick={saveScrollPosition} to='/components/overview' aria-label='Navigate to the component overview page' className={`mb-2 side-nav-link ${(page === 'components-overview') ? 'active-nav-link' : ''}`}>Overview</Link>
                <button className={`flex items-center gap-4 text-[0.900rem] ${['accordions', 'block', 'checkbox', 'combobox', 'menu', 'radio', 'tabs', 'toggle-button'].includes(page) ? 'active-nav-link' : ''}`} onClick={() => setUtilityOpen((v) => !v)} aria-expanded={utilityOpen} aria-controls='slideout-utility-dropdown'>           
                  Components
                  {utilityOpen ? <ChevronRight className='rotate-90' height={13} width={13}/> : <ChevronRight height={13} width={13}/>}
                </button>
                {utilityOpen && (
                  <ul id='slideout-utility-dropdown' className='flex flex-col gap-2 p-[10px]'>
                    <Link onClick={saveScrollPosition} to='/components/accordion' aria-label="View accordion examples" className={`side-nav-link utility-dropdown-menu-item ${(page === 'accordions') ? 'active-nav-link' : ''}`}>Accordion</Link>
                    <Link onClick={saveScrollPosition} to='/components/block' aria-label="View block examples" className={`side-nav-link utility-dropdown-menu-item ${(page === 'block') ? 'active-nav-link' : ''}`}>Block</Link>
                    <Link onClick={saveScrollPosition} to='/components/checkbox' aria-label="View checkbox examples" className={`side-nav-link utility-dropdown-menu-item ${(page === 'checkbox') ? 'active-nav-link' : ''}`}>Checkbox</Link>
                    <Link onClick={saveScrollPosition} to='/components/combobox' aria-label="View combobox examples" className={`side-nav-link utility-dropdown-menu-item ${(page === 'combobox') ? 'active-nav-link' : ''}`}>Combobox</Link>
                    <Link onClick={saveScrollPosition} to='/components/menu' aria-label="View menu examples" className={`side-nav-link utility-dropdown-menu-item ${(page === 'menu') ? 'active-nav-link' : ''}`}>Menu</Link>
                    <Link onClick={saveScrollPosition} to='/components/radio' aria-label="View radio examples" className={`side-nav-link utility-dropdown-menu-item ${(page === 'radio') ? 'active-nav-link' : ''}`}>Radio</Link>
                    <Link onClick={saveScrollPosition} to='/components/tabs' aria-label="View tabs examples" className={`side-nav-link utility-dropdown-menu-item ${(page === 'tabs') ? 'active-nav-link' : ''}`}>Tabs</Link>
                    <Link onClick={saveScrollPosition} to='/components/toggle-button' aria-label="View toggle button examples" className={`side-nav-link utility-dropdown-menu-item ${(page === 'toggle-button') ? 'active-nav-link' : ''}`}>Toggle Button</Link>
                  </ul>
                )}
              </div>
              <div className='slide-nav-links-section'>
                <p className="text-[0.900rem] font-bold">Testing</p>
                <ul className='flex flex-col gap-2'>
                  <Link onClick={saveScrollPosition} to='/testing/static-audit' aria-label="Navigate to static audit page" className={`tools-dropdown-menu-item side-nav-link ${(page === 'audit') ? 'active-nav-link' : ''}`}>Static Audit</Link>
                  <Link onClick={saveScrollPosition} to='/testing/component-testing' aria-label="Navigate to component testing page" className={`tools-dropdown-menu-item side-nav-link ${(page === 'testing') ? 'active-nav-link' : ''}`}>Component Testing</Link>
                </ul>
              </div>
              <div className='slide-nav-links-section'>
                <p className="text-[0.900rem] font-bold">Contracts</p>
                <Link onClick={saveScrollPosition} to='/contracts/overview' aria-label='Navigate to the contract overview page' className={`mb-2 side-nav-link ${(page === 'contract-overview') ? 'active-nav-link' : ''}`}>Overview</Link>
                <Link onClick={saveScrollPosition} to='/contracts/dsl' aria-label='Navigate to the dsl overview page' className={`mb-2 side-nav-link ${(page === 'dsl-overview') ? 'active-nav-link' : ''}`}>DSL</Link>
                <button className={`flex items-center gap-4 text-[0.900rem] ${['combobox-contract', 'menu-contract', 'tabs-contract', 'accordion-contract', 'checkbox-contract', 'radio-contract', 'toggle-contract'].includes(page) ? 'active-nav-link' : ''}`} onClick={() => setContractOpen((v) => !v)} aria-expanded={contractOpen} aria-controls='slideout-contract-dropdown'>
                  Contracts
                  {contractOpen ? <ChevronRight className='rotate-90' height={13} width={13}/> : <ChevronRight height={13} width={13}/>}
                </button>
                {contractOpen && (
                  <ul id='slideout-contract-dropdown' className='flex flex-col gap-2 p-[10px]'>
                    <Link onClick={saveScrollPosition} to='/contracts/accordion' aria-label='Navigate to the accordion contract page' className={`mb-2 side-nav-link ${(page === 'accordion-contract') ? 'active-nav-link' : ''}`}>Accordion</Link>
                    <Link onClick={saveScrollPosition} to='/contracts/checkbox' aria-label='Navigate to the checkbox contract page' className={`mb-2 side-nav-link ${(page === 'checkbox-contract') ? 'active-nav-link' : ''}`}>Checkbox</Link>
                    <Link onClick={saveScrollPosition} to='/contracts/combobox' aria-label='Navigate to the combobox contract page' className={`mb-2 side-nav-link ${(page === 'combobox-contract') ? 'active-nav-link' : ''}`}>Combobox</Link>
                    <Link onClick={saveScrollPosition} to='/contracts/menu' aria-label='Navigate to the menu contract page' className={`mb-2 side-nav-link ${(page === 'menu-contract') ? 'active-nav-link' : ''}`}>Menu</Link>
                    <Link onClick={saveScrollPosition} to='/contracts/radio' aria-label='Navigate to the radio contract page' className={`mb-2 side-nav-link ${(page === 'radio-contract') ? 'active-nav-link' : ''}`}>Radio</Link>
                    <Link onClick={saveScrollPosition} to='/contracts/tabs' aria-label='Navigate to the tabs contract page' className={`mb-2 side-nav-link ${(page === 'tabs-contract') ? 'active-nav-link' : ''}`}>Tabs</Link>
                    <Link onClick={saveScrollPosition} to='/contracts/toggle' aria-label='Navigate to the toggle contract page' className={`mb-2 side-nav-link ${(page === 'toggle-contract') ? 'active-nav-link' : ''}`}>Toggle</Link>
                  </ul>
                )}
              </div>
      
              <div className='slide-nav-links-section'>
                <p className="text-[0.900rem] font-bold">Project</p>
                <div className='flex flex-col gap-2'>
                  <Link onClick={saveScrollPosition} to="/changelog" className={`side-nav-link ${(page === 'changelog') ? 'active-nav-link' : ''}`} aria-label='Navigate to changelog page'>Changelog</Link>
                </div>
              </div>
                {/* Spacer to ensure bottom padding on all devices */}
                <div className="h-[100px] flex-shrink-0"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SlideOutNav
import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState, useEffect, useRef } from 'react';
import SlideOutNav from '../components/SlideOutNav';
import * as Block from 'aria-ease/block';
import * as Menu from 'aria-ease/menu';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import { Settings } from 'lucide-react';
import ShopifyUserMenu from '../components/menus/ShopifyUserMenu';
import InteractivePlayground from '../components/InteractivePlayground';
import { ChevronRightCircleIcon } from 'lucide-react';
import ComboBox from '../components/combobox/ComboBox';
import { Helmet } from 'react-helmet-async';



// Example 2: Dashboard Settings
const DashboardSettings = () => {
  const menuRef = useRef(null);

  useEffect(() => {
    menuRef.current = Menu.makeMenuAccessible({
      menuId: "settings-menu",
      menuItemsClass: "settings-item",
      triggerId: "settings-trigger"
    });

    return () => menuRef.current.cleanup();
  }, []);

  return (
    
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="relative inline-block">
        <button
          id="settings-trigger"
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        >
          <Settings size={18} />
          Settings
        </button>
        <div
          id="settings-menu"
          className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 p-2"
          style={{display: 'none', marginTop: '5px'}}
        >
          <button className="settings-item w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
            <div className="font-semibold">Notifications</div>
            <div className="text-sm text-gray-500">Manage your alerts</div>
          </button>
          <button className="settings-item w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
            <div className="font-semibold">Privacy</div>
            <div className="text-sm text-gray-500">Control your data</div>
          </button>
          <button className="settings-item w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
            <div className="font-semibold">Appearance</div>
            <div className="text-sm text-gray-500">Customize your theme</div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Example 3: Multi-step Form Wizard
const FormWizard = () => {
  const blockRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    blockRef.current = Block.makeBlockAccessible({
      blockId: "wizard-steps",
      blockItemsClass: "wizard-step"
    });
    return () => {
      if (blockRef.current) {
        blockRef.current.cleanup();
      }
    };
  }, []);

  const steps = ['Personal Info', 'Address', 'Payment', 'Review'];

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div id="wizard-steps" className="flex justify-between mb-6 flex-wrap gap-3">
        {steps.map((step, index) => (
          <button
            key={index}
            className={`wizard-step px-4 py-2 rounded-lg flex-grow ${
              index === currentStep
                ? 'bg-blue-600 text-white'
                : index < currentStep
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-black'
            }`}
            onClick={() => setCurrentStep(index)}
            aria-current={index === currentStep ? 'step' : undefined}
          >
            {index + 1}. {step}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-gray-600">Step {currentStep + 1}: {steps[currentStep]}</h3>
        <p className="text-gray-600">Use arrow keys to navigate between steps</p>
      </div>
    </div>
  );
};

const ecommerceCode = `import { useEffect, useRef } from "react";
import * as Menu from "aria-ease/menu";

const ShopifyUserMenu = () => {
  const menuRef = useRef();
    
  useEffect(() => {
    menuRef.current = Menu.makeMenuAccessible({
      menuId: "merchant-dropdown-menu",
      menuItemsClass: "merchant-profile-menu-item",
      triggerId: "merchant-profile-menu-button"
    });

    return () => menuRef.current.cleanup();
  }, [])
    
  return (
    <div>
        <button id="merchant-profile-menu-button">
            <span>Davii Collections</span>
            <div>
              <span>DC</span>
            </div>
        </button>

        <div id="merchant-dropdown-menu">
            <div>
                <div>
                    <div>
                        <div>
                            <span>DC</span>
                        </div>
                        <span>Davii Collections</span>
                    </div>
                    <svg width="10.67" height="7.33" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3332 1L3.99984 8.33333L0.666504 5" stroke="#303030" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <a href="https://admin.shopify.com" className="merchant-profile-menu-item">
                    <svg width="20" height="20" viewBox="0 0 21 20" fill="rgba(48, 48, 48, 1)" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.757 3H7.24302C6.85944 3 6.4971 3.17611 6.26012 3.47772L3.87394 6.51468C3.63169 6.823 3.5 7.20375 3.5 7.59586V8.25C3.5 9.31867 4.10958 10.245 5 10.7001V15.25C5 16.2165 5.7835 17 6.75 17H14.25C15.2165 17 16 16.2165 16 15.25V10.7001C16.8904 10.245 17.5 9.31867 17.5 8.25V7.76879C17.5 7.26465 17.3307 6.77511 17.0192 6.3787L14.7399 3.47772C14.5029 3.17611 14.1406 3 13.757 3ZM13.5 15.5H14.25C14.3881 15.5 14.5 15.3881 14.5 15.25V11C13.712 11 13.0014 10.6686 12.5 10.1375C11.9986 10.6686 11.288 11 10.5 11C9.71199 11 9.00138 10.6686 8.5 10.1375C7.99862 10.6686 7.28801 11 6.5 11V15.25C6.5 15.3881 6.61193 15.5 6.75 15.5H10.5V13C10.5 12.4477 10.9477 12 11.5 12H12.5C13.0523 12 13.5 12.4477 13.5 13V15.5ZM6.5 9.5H6.25C5.55964 9.5 5 8.94036 5 8.25V7.59586C5 7.53985 5.01881 7.48545 5.05342 7.44141L7.36453 4.5H13.6355L15.8397 7.30543C15.9436 7.43757 16 7.60075 16 7.76879V8.25C16 8.94036 15.4404 9.5 14.75 9.5H14.5C13.8096 9.5 13.25 8.94036 13.25 8.25V7.75C13.25 7.33579 12.9142 7 12.5 7C12.0858 7 11.75 7.33579 11.75 7.75V8.25C11.75 8.94036 11.1904 9.5 10.5 9.5C9.80964 9.5 9.25 8.94036 9.25 8.25V7.75C9.25 7.33579 8.91421 7 8.5 7C8.08579 7 7.75 7.33579 7.75 7.75V8.25C7.75 8.94036 7.19036 9.5 6.5 9.5Z" fill="rgba(48, 48, 48, 1)"/>
                    </svg>
                    <span>All stores</span>
                </a>
            </div>
            <hr/>
            <div>
                <a href="https://admin.shopify.com" className="merchant-profile-menu-item">Help Center</a>
                <a href="https://admin.shopify.com" className="merchant-profile-menu-item">Changelog</a>
                <a href="https://admin.shopify.com" className="merchant-profile-menu-item">Community forums</a>
                <a href="https://admin.shopify.com" className="merchant-profile-menu-item">Hire a Shopify Partner</a>
                <a href="https://admin.shopify.com" className="merchant-profile-menu-item">Keyboard shortcuts</a>
            </div>
            <hr/>
            <div>
                <a href="https://admin.shopify.com" className="merchant-profile-menu-item">
                    <p className='m-0 text-[13px] font-[500] leading-[18px]'>David Micheal</p>
                    <p className='m-0 text-[12px] font-[400] leading-[16px]'>davidmicheal@gmail.com</p>
                </a>
                <a href="https://admin.shopify.com" className="merchant-profile-menu-item">Manage account</a>
                <a href="https://admin.shopify.com" className="merchant-profile-menu-item">Log out</a>
            </div>
        </div>
    </div>
  )
}

export default ShopifyUserMenu`;

const wizardCode = `import { useEffect, useRef, useState } from "react";
import * as Block from "aria-ease/block";

function FormWizard() {
  const blockRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    blockRef.current = Block.makeBlockAccessible({
      blockId: "wizard-steps",
      blockItemsClass: "wizard-step"
    });
    return () => {
      if (blockRef.current) {
        blockRef.current.cleanup();
      }
    };
  }, []);

  const steps = ['Personal Info', 'Address', 'Payment', 'Review'];

  return (
    <div id="wizard-steps">
      {steps.map((step, index) => (
        <button
          key={index}
          className="wizard-step"
          onClick={() => setCurrentStep(index)}
          aria-current={index === currentStep ? 'step' : undefined}
        >
          {index + 1}. {step}
        </button>
      ))}
    </div>
  );
}`;

const comboboxCode = `import { useState, useEffect, useRef } from "react";
import * as Combobox from "aria-ease/combobox";

const ComboBox = () => {
    const[listShown, setListShown] = useState(false);
    const[inputValue, setInputValue] = useState("");
    const[optionsArray] = useState([
        {id: "apple", label: "Apple", hidden: false},
        {id: "mango", label: "Mango", hidden: false},
        {id: "orange", label: "Orange", hidden: false},
        {id: "banana", label: "Banana", hidden: false}
    ]);

    const comboboxInstanceRef = useRef(null);

    useEffect(() => {
        const accessibleCombobox = Combobox.makeComboboxAccessible({
            comboboxInputId: "fruit",
            comboboxButtonId: "show-list-button",
            listBoxId: "fruits-listbox",
            listBoxItemsClass: "list-options",
            callback: {
                onSelect: (option) => {
                    setInputValue(option.textContent);
                    setListShown(false);
                    // Reset all options to visible after selection
                    optionsArray.forEach(opt => {
                        const el = document.getElementById(opt.id);
                        if (el) el.hidden = false;
                    });
                },
                onOpenChange: (isOpen) => { 
                    setListShown(isOpen);
                    // If opening via button (not via typing), show all options
                    if (isOpen && !inputValue) {
                        optionsArray.forEach(opt => {
                            const el = document.getElementById(opt.id);
                            if (el) el.hidden = false;
                        });
                        // Only refresh when button opens the list
                        if (comboboxInstanceRef.current) {
                            comboboxInstanceRef.current.refresh();
                        }
                    }
                } 
            }
        });

        comboboxInstanceRef.current = accessibleCombobox;

        return () => accessibleCombobox.cleanup();
    }, []);

    const changeInput = (event) => {
        setInputValue(event.target.value);
        const query = event.target.value.toLowerCase();
        let hasMatch = false;
        
        optionsArray.forEach(opt => {
            const match = opt.label.toLowerCase().includes(query);
            const el = document.getElementById(opt.id);
            if (el) {
                el.hidden = !match;
                if (match) hasMatch = true;
            }
        });
        
        // Open listbox if there are matches and user is typing
        if (hasMatch && query.length > 0) {
            setListShown(true);
            // Manually sync aria-expanded since we're opening via React state
            const input = document.getElementById('fruit');
            if (input) {
                input.setAttribute('aria-expanded', 'true');
            }
        }
        
        // Refresh the library's cache after hiding/showing elements
        if (comboboxInstanceRef.current) {
            comboboxInstanceRef.current.refresh();
        }
    }
  return (
    <div id="combo-wrapper" className="max-w-[700px] m-auto pt-10">
        <div className="flex flex-col gap-2 inline-block min-w-[280px]">
            <label 
                htmlFor="fruit" 
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
                Select a fruit
            </label>
            <div className="relative">
                <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:border-gray-400 dark:hover:border-gray-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 dark:focus-within:ring-blue-400 dark:focus-within:border-blue-400 transition-all">
                    <input 
                        type="text"
                        id="fruit"
                        name="fruit"
                        value={inputValue}
                        onChange={changeInput}
                        placeholder="Search fruits..."
                        className="flex-1 px-3 py-2 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none rounded-l-lg text-sm"
                    />
                    <button 
                        id="show-list-button" 
                        data-test-id="combobox-button" 
                        tabIndex={-1} 
                        aria-label="Open fruits list"
                        className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
                    >
                        <svg 
                            className="w-4 h-4 transition-transform duration-200 listShown ? 'rotate-180' : ''" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>   
        </div>
        <ul 
            id="fruits-listbox" 
            role="listbox" 
            aria-label="Fruits" 
            className="mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden min-w-[280px] inline-block"
            style={{ display: listShown ? "block" : "none" }}
        >
            {optionsArray.map(opt => (
                <li 
                    key={opt.id} 
                    id={opt.id} 
                    role="option" 
                    aria-selected="false" 
                    hidden={opt.hidden} 
                    className="list-options px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 aria-[selected=true]:bg-blue-100 dark:aria-[selected=true]:bg-blue-900/50 aria-[selected=true]:text-blue-900 dark:aria-[selected=true]:text-blue-100 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                    {opt.label}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ComboBox`

// eslint-disable-next-line react/prop-types
const Examples = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'examples';
  const [resultsVisible, setResultsVisible] = useState(false);
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

    <div id="inner-body-div">
      <Helmet>
+            <title>Examples | Aria-Ease</title>
+            <meta name="description" content="Explore practical examples demonstrating how to use Aria-Ease components and utilities for building accessible web applications." />
+          </Helmet>
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
      
      <main className='page-body-div' id="main-content">
        <Container fluid>
          <Row>
            <SideNav page={page}/>
            <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
              <div className='side-body-div'>
                <h1 className='introduction-heading'>Real-World Examples</h1>
                <p className='mt-2 mb-6'>
                  See how aria-ease solves common accessibility challenges in production applications. 
                  Each example shows a complete, working implementation you can use in your projects.
                </p>

                {/* E-commerce Example */}
                <section className='mt-10'>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border-2 mb-6`}>
                    <h2 className='text-3xl font-bold mb-3'>🛒 Shopify-Style Merchant Menu</h2>
                    <p className={`${darkMode ? 'text-blue-100' : 'text-blue-900'} mb-2`}>
                      <strong>Use Case:</strong> Building an admin dashboard or e-commerce platform where merchants need quick access to their stores, settings, and help resources.
                    </p>
                    <p className={`${darkMode ? 'text-blue-100' : 'text-blue-900'} mb-2`}>
                      <strong>Challenge:</strong> Complex nested menu structure with multiple sections that must be keyboard-navigable and screen reader accessible.
                    </p>
                    <p className={`${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                      <strong>Solution:</strong> aria-ease handles the keyboard interaction, focus management, and ARIA attributes automatically—even for nested menus.
                    </p>
                  </div>
                  
                  <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Live Demo</h3>
                    <ShopifyUserMenu/>
                  </div>

                  <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Implementation</h3>
                    <CodeBlockDemo code={ecommerceCode} isLineNumber={true} />
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <h4 className={`font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>Key Features:</h4>
                    <ul className={`list-disc ml-6 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                      <li>Keyboard navigation with arrow keys</li>
                      <li>Automatic focus management</li>
                      <li>Escape key closes menu</li>
                      <li>Screen reader announcements</li>
                    </ul>
                  </div>
                </section>

                {/* Dashboard Example */}
                <section className='mt-16'>
                  <h2 className='text-3xl font-bold mb-4'>Dashboard Settings Menu</h2>
                  <p className='mb-6'>Rich settings menu with descriptions for each option, perfect for admin dashboards.</p>
                  
                  <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Live Demo</h3>
                    <DashboardSettings />
                  </div>

                  <div className='p-4 rounded-lg bg-green-50'>
                    <h4 className='font-semibold mb-2 text-green-900'>Use Cases:</h4>
                    <ul className='list-disc ml-6 text-green-900'>
                      <li>Admin dashboards</li>
                      <li>User preferences</li>
                      <li>App configuration</li>
                      <li>Context menus</li>
                    </ul>
                  </div>
                </section>

                {/* Combobox Example */}
                <section className='mt-16'>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border-2 mb-6`}>
                    <h2 className='text-3xl font-bold mb-3'>🔍 Searchable Combobox</h2>
                    <p className={`${darkMode ? 'text-purple-100' : 'text-purple-900'} mb-2`}>
                      <strong>Use Case:</strong> Building search interfaces, autocomplete inputs, or filterable dropdowns where users can type to narrow down options (e.g., country selectors, product searches, tag inputs).
                    </p>
                    <p className={`${darkMode ? 'text-purple-100' : 'text-purple-900'} mb-2`}>
                      <strong>Challenge:</strong> Comboboxes require complex ARIA attributes, keyboard interactions (7+ keys), focus management with aria-activedescendant, and seamless mouse interaction.
                    </p>
                    <p className={`${darkMode ? 'text-purple-100' : 'text-purple-900'}`}>
                      <strong>Solution:</strong> aria-ease handles all ARIA attributes, keyboard interactions (arrows, home, end, enter, escape, tab), focus management, and mouse interactions automatically.
                    </p>
                  </div>
                  
                  <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Live Demo</h3>
                    <ComboBox />
                  </div>

                  <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Implementation</h3>
                    <CodeBlockDemo code={comboboxCode} isLineNumber={true} />
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                    <h4 className={`font-semibold mb-2 ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>What&#39;s Automatic:</h4>
                    <ul className={`list-disc ml-6 ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>
                      <li>All ARIA attributes (role, aria-expanded, aria-controls, aria-activedescendant, aria-selected)</li>
                      <li>Complete keyboard interaction (ArrowDown, ArrowUp, Home, End, Enter, Escape, Tab)</li>
                      <li>Focus management with aria-activedescendant pattern</li>
                      <li>Mouse interactions (hover, click, click-outside)</li>
                      <li>Option selection and listbox visibility</li>
                    </ul>
                  </div>

                  <div className={`p-4 rounded-lg mt-4 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h4 className={`font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>You Only Provide:</h4>
                    <ul className={`list-disc ml-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>HTML structure with IDs and class names</li>
                      <li>Filtering logic to show/hide options based on input</li>
                      <li>Visual styling (CSS)</li>
                      <li>Optional: data fetching from APIs</li>
                    </ul>
                  </div>
                </section>

                {/* Form Wizard Example */}
                <section className='mt-16'>
                  <h2 className='text-3xl font-bold mb-4'>Multi-Step Form Wizard</h2>
                  <p className='mb-6'>Accessible step navigation for complex forms like checkout or onboarding flows.</p>
                  
                  <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Live Demo</h3>
                    <FormWizard />
                  </div>

                  <div className='mb-6'>
                    <h3 className='text-xl font-semibold mb-3'>Implementation</h3>
                    <CodeBlockDemo code={wizardCode} isLineNumber={true} />
                  </div>

                  <div className='p-4 rounded-lg bg-purple-50'>
                    <h4 className='font-semibold mb-2 text-purple-900'>Perfect For:</h4>
                    <ul className='list-disc ml-6 text-purple-900'>
                      <li>Checkout processes</li>
                      <li>User onboarding</li>
                      <li>Survey forms</li>
                      <li>Configuration wizards</li>
                    </ul>
                  </div>

                  {/* <InteractivePlayground darkMode={darkMode} exampleType="form-wizard" /> */}
                </section>

                {/* More Patterns */}
                <section className={`mt-16`}>
                  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>More Patterns</h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
                      <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>🎨 Design Systems</h3>
                      <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Build accessible component libraries</p>
                      <a href="/examples/accordion" className={`underline block-interactive ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>View Accordion →</a>
                    </div>
                    <div className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
                      <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>📝 Form Controls</h3>
                      <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Accessible checkboxes and radios</p>
                      <a href="/examples/checkbox" className={`underline block-interactive ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>View Checkbox →</a>
                    </div>
                    <div className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
                      <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>🎯 Focus Management</h3>
                      <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Control keyboard interaction</p>
                      <a href="/examples/block" className={`underline block-interactive ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>View Block →</a>
                    </div>
                    <div className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
                      <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>🔘 Toggle Switches</h3>
                      <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Accessible on/off controls</p>
                      <a href="/examples/toggle-button" className={`underline block-interactive ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>View Toggle →</a>
                    </div>
                  </div>
                </section>

                <div className='flex flex-wrap gap-4 py-4 mx-auto max-w-7xl md:py-12 mt-[100px] justify-between'>
                  <a href='/migration' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                    <ChevronRightCircleIcon className='rotate-180'/>
                    <div className='flex flex-col w-full'>
                      <span className='text-sm black-white-text'>Prev</span>
                      <span className='text-link-contrast text-md'>Migration Guide</span>
                    </div>
                  </a>
                  <a href='/examples/accordion' className='block-interactive next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                    <div className='flex flex-col w-full items-end'>
                      <span className='text-sm black-white-text'>Next</span>
                      <span className='text-link-contrast text-md'>Accordion</span>
                    </div>
                    <ChevronRightCircleIcon/>
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

export default Examples;

import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import * as Block from 'aria-ease/block';
import SlideOutNav from '../components/SlideOutNav';
import SideNav from '../components/SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import CodeBlockDemo from '../components/CodeBlock';
import CalloutPanel from '../components/CalloutPanel';
import ScrollTracker from '../components/ScrollTracker';
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';


// eslint-disable-next-line react/prop-types
const Combobox = ({darkMode, setDarkMode}) => {
    const page = 'combobox';
    const[showDropdownPage, setShowDropdownPage] = useState(false);

  
    const [resultsVisible, setResultsVisible] = useState(false);

    const mainBlockCleanupRef = useRef(null);
          
            // Initialize main block on mount
            useEffect(() => {
              mainBlockCleanupRef.current = Block.makeBlockAccessible({ blockId: 'inner-body-div', blockItemsClass: 'block-interactive' });
              return () => {
                if (mainBlockCleanupRef.current) {
                  mainBlockCleanupRef.current.cleanup();
                  mainBlockCleanupRef.current = null;
                }
              };
            }, []);
          
            // Clean up main block listeners when search is visible, re-enable when hidden
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

  const importCombobox = "import * as Combobox from aria-ease/combobox";
  const basicSetup = `const comboboxRef = useRef(null);

useEffect(() => {
  comboboxRef.current = Combobox.makeComboboxAccessible({
    comboboxInputId: "search-input",
    listBoxId: "suggestions-list",
    listBoxItemsClass: "suggestion-item"
  });

  return () => {
    if (comboboxRef.current) {
      comboboxRef.current.cleanup();
    }
  };
}, []);`;

  const withCallbacks = `Combobox.makeComboboxAccessible({
  comboboxInputId: "search-input",
  listBoxId: "suggestions-list",
  listBoxItemsClass: "suggestion-item",
  callback: {
    onSelect: (option) => {
      console.log("Selected:", option);
      setInputValue(option.textContent); //set input value to selected option
    
      // Reset all options to visible after selection
      // Show all options again after selection
      optionsArray.forEach(opt => {
        const el = document.getElementById(opt.id);
        if (el) el.hidden = false;
      });
    },
    onOpenChange: (isOpen) => {
      console.log("Listbox is:", isOpen ? "open" : "closed");

      // If opening via button (not via typing), show all options
      // This is useful if you want to reset filters when user clicks the button to open the list so all the options are displayed
      // If opening via typing, filtering logic handles showing/hiding options
      if (isOpen && !inputValue) {
        optionsArray.forEach(opt => {
          const el = document.getElementById(opt.id);
          if (el) el.hidden = false;
        });
        // Only refresh when button opens the list
        if (comboboxInstanceRef.current) {
          comboboxInstanceRef.current.refresh(); //refresh the listbox and pick up the hidden/visible changes
        }
      }
    },
    onActiveDescendantChange: (optId, item) => {
      console.log("Active descendant changed to:", optId);
      console.log("Active item element:", item);

      // You can use this callback to track which option is currently focused as user navigates with keyboard or mouse
      // For example, you could update some state to show additional details about the focused option elsewhere in the UI or style the active option differently
    },
    onClear: () => {
      console.log("Input was cleared via Escape key");
      //The library automatically clears the input value when user presses Escape while the listbox is closed. This callback allows you to respond to that event. You can perform any additional actions needed when the input is cleared, such as resetting filters, showing all options again, or updating other parts of the UI to reflect that the input has been cleared.
    }
  }
});`;

  const comboboxComponent = `<div>
  <label htmlFor="search-input">Search:</label>
  <input
    type="text"
    id="search-input"
  />
  <button
    id="show-list-button" 
    aria-label="Open fruits list"
  >
    ▼
  </button>
  
  <ul id="suggestions-list">
    <li className="suggestion-item">Apple</li>
    <li className="suggestion-item">Banana</li>
    <li className="suggestion-item">Cherry</li>
  </ul>
</div>`;

const filteringLogicExample = `const[listShown, setListShown] = useState(false);
const[inputValue, setInputValue] = useState("");
const[options, setOptions] = useState([
  { id: "apple", label: "Apple" },
  { id: "banana", label: "Banana" },
  { id: "cherry", label: "Cherry" }
]);

const comboboxInstanceRef = useRef(null);

const handleInputChange = (event) => {
  setInputValue(event.target.value);
  const query = event.target.value.toLowerCase();
  let hasMatch = false;
        
  options.forEach(opt => {
    const match = opt.label.toLowerCase().includes(query);
    const el = document.getElementById(opt.id);
    if (el) {
      el.hidden = !match;
      if (match) hasMatch = true;
    }
  });
        
  // Open listbox if there are matches and user is typing
  if (hasMatch && query.length > 0) {
    comboboxInstanceRef.current.openListbox();
  }
        
  // Refresh the library's cache after hiding/showing elements
  if (comboboxInstanceRef.current) {
    comboboxInstanceRef.current.refresh();
  }
}`;

  return (
    <div id="inner-body-div">
      <Helmet>
            <title>Combobox | Aria-Ease</title>
            <meta name="description" content="Explore how to use the Aria-Ease combobox utility for building accessible comboboxes with complete keyboard interaction, focus management, and ARIA attributes." />
          </Helmet>
          <a
        href="#main-content"
        className="skip-to-content-link absolute left-2 top-2 px-4 py-2 rounded-md"
        tabIndex={0}
      >
        Skip to Content
      </a>
        <ScrollTracker page={page}/>
        <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage} resultsVisible={resultsVisible} setResultsVisible={setResultsVisible}/>

        <main className="page-body-div documentation-page section-tone-a" id="main-content">
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
                <div className='side-body-div docs-flow'>
                  <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                    <span className='docs-kicker black-grey-text'>Documentation</span>
                    <h1 className='introduction-heading black-white-text'>Combobox <span className='text-gradient'>Utility</span></h1>
                    <p className='mt-2 docs-intro-copy'>A combobox is an interactive form control that combines a text input with a listbox, allowing users to either type a value or select from a dropdown list. The aria-ease combobox utility provides complete keyboard interaction, focus management, and ARIA attributes out-of-the-box.</p>
                  </div>

                  <CalloutPanel title='Bundle Size' tone='info'>
                    <p className='mt-2'>The combobox component is tree-shakable and weighs approximately <strong>32KB</strong> when imported individually.</p>
                    <code className='block mt-2 p-2 text-sm'>
                      <p>import * as Combobox from &quot;aria-ease/combobox&quot;;</p>
                      <p className='my-4'>or</p>
                      <p>import &#123; makeComboboxAccessible &#125; from &quot;aria-ease/combobox&quot;;</p>
                    </code>
                  </CalloutPanel>
                  
                  <section>
                    <h2>Features</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>✨ Automatic ARIA attribute management</li>
                      <li>⌨️ Built-in keyboard interaction (Arrow keys, Home, End, Enter, Space)</li>
                      <li>🔧 Programmatic control methods</li>
                      <li>🧹 Automatic cleanup on unmount</li>
                    </ul>
                  </section>

                  <section>
                      <h2>Common Use Cases</h2>
                      <ul className='list-disc ml-6 mt-2'>
                        <li>Search with autocomplete suggestions</li>
                        <li>Country/state/city selection with type-ahead filtering</li>
                        <li>Tag or category selection</li>
                        <li>Command palette interfaces</li>
                        <li>Product search with suggestions</li>
                      </ul>
                  </section>

                  <section>
                    <h2>WAI-ARIA Roles, States, and Properties</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>The element that serves as an input and displays the combobox value has role combobox.</li>
                      <li>The combobox element has aria-controls set to a value that refers to the element that serves as the popup. Note that aria-controls is only set when the popup is visible. However, it is valid to reference an element that is not visible.</li>
                      <li>The popup is an element that has role listbox.</li>
                      <li>When the combobox popup is not visible, the element with role combobox has aria-expanded set to false. When the popup element is visible, aria-expanded is set to true. Note that elements with role combobox have a default value for aria-expanded of false.</li>
                      <li>When a combobox receives focus, DOM focus is placed on the combobox element.</li>
                      <li>When a descendant of a listbox popup is focused, DOM focus remains on the combobox and the combobox has aria-activedescendant set to a value that refers to the focused element within the popup.</li>
                      <li>For a combobox that controls a listbox popup, when a suggested value is visually indicated as the currently selected value, the option containing that value has aria-selected set to true.</li>
                      <li>If the combobox has a visible label and the combobox element is an HTML element that can be labelled using the HTML label element (e.g., the input element), it should be labeled using the label element. Otherwise, if it has a visible label, the combobox element has aria-labelledby set to a value that refers to the labelling element. Otherwise, the combobox element has a label provided by aria-label.</li>
                    </ul>
                  </section>

                  <section>
                    <h2>What the Utility Handles Automatically</h2>
                    <p className='mt-2'>The <code>makeComboboxAccessible</code> utility automatically sets and manages all required ARIA attributes:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>role=&quot;combobox&quot;</code> on the input element</li>
                      <li><code>role=&quot;listbox&quot;</code> on the dropdown container</li>
                      <li><code>role=&quot;option&quot;</code> on each selectable item</li>
                      <li><code>aria-expanded</code> - dynamically updates when listbox opens/closes</li>
                      <li><code>aria-controls</code> - links input to listbox</li>
                      <li><code>aria-autocomplete=&quot;list&quot;</code> - indicates autocomplete behavior</li>
                      <li><code>aria-haspopup=&quot;listbox&quot;</code> - indicates popup capability</li>
                      <li><code>aria-activedescendant</code> - tracks focused option during navigation</li>
                      <li><code>aria-selected</code> - marks the currently selected option</li>
                      <li><code>display</code> - toggles the display of the listbox</li>
                      <li><code>tabindex=&#34;-1&#34;</code> - on the button that toggles the display of the listbox</li>
                    </ul>
                    
                    <p className='mt-2'>You only need to provide the HTML structure with IDs and class names.</p>
                  </section>

                  

                  <section>
                    <h2 className='break-words'>makeComboboxAccessible</h2>
                    <p className='mt-2'>The <code>makeComboboxAccessible(...)</code> method is your one-stop solution for accessible comboboxes.</p>
                    <p className='mt-2'>This function handles all combobox complexity - you provide clean HTML with IDs and class names, and it manages ARIA attributes, keyboard interactions, mouse support, and focus behavior. You no longer need to manually set aria-expanded, aria-controls, aria-activedescendant, or manage focus.</p>

                  <CalloutPanel title='Key Features' tone='success' className='mt-6' titleAs='h3'>
                    <ul className='list-disc ml-4 mt-2'>
                      <li>Automatic ARIA attribute management (aria-expanded, aria-activedescendant, aria-controls, roles)</li>
                      <li>Complete keyboard interaction following W3C APG specifications</li>
                      <li>Built-in mouse support with hover and click handling</li>
                      <li>Focus management with aria-activedescendant pattern</li>
                      <li>Dynamic filtering support with visibility-based navigation</li>
                      <li>Event callbacks for selection, open/close, and focus changes</li>
                      <li>No manual state management required</li>
                    </ul>
                  </CalloutPanel>
                  </section>

                  <section>
                    <h2>Configuration Options</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>comboboxInputId</code>: ID of the input element (required)</li>
                      <li><code>listBoxId</code>: ID of the dropdown container (required)</li>
                      <li><code>listBoxItemsClass</code>: Shared class name for all options (required)</li>
                      <li><code>comboboxButtonId</code>: Optional toggle button ID</li>
                      <li><code>callback.onSelect</code>: Callback when user selects an option</li>
                      <li><code>callback.onOpenChange</code>: Callback when listbox opens/closes</li>
                      <li><code>callback.onActiveDescendantChange</code>: Callback when focus moves between options</li>
                      <li><code>callback.onClear</code>: Callback when input is cleared via Escape</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className='mt-5'>Returns:</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>cleanup()</code>: Remove event listeners</li>
                      <li><code>refresh()</code>: Re-initialize combobox (useful for dynamic content)</li>
                    </ul>
                  </section>

                  <section>
                    <p className='mb-2'>Import the utility:</p>
                      <CodeBlockDemo code={importCombobox}/>

                      <p className='mb-2 mt-6'>Basic setup:</p>
                      <CodeBlockDemo code={basicSetup} isLineNumber={true}/>

                      <p className='mb-2 mt-6'>Filtering Logic:</p>
                      <CodeBlockDemo code={filteringLogicExample} isLineNumber={true}/>

                      <p className='mb-2 mt-6'>Add event callbacks to respond to user actions:</p>
                      <CodeBlockDemo code={withCallbacks} isLineNumber={true}/>

                      <p className='mb-2 mt-6'>Minimal HTML structure (no ARIA attributes needed):</p>
                      <CodeBlockDemo code={comboboxComponent} isLineNumber={true}/>
                      
                      <CalloutPanel tone='success' className='mt-4'>
                        <p>
                          <strong>Notice:</strong> You don&#39;t need to add <code>role</code>, <code>aria-expanded</code>, <code>aria-controls</code>, or any other ARIA attributes manually. The utility sets everything automatically.
                        </p>
                      </CalloutPanel>
                  </section>

                  <section>
                    <h2>Dynamic Filtering</h2>
                      <p className='mt-2'>The utility works seamlessly with dynamic filtering:</p>
                      <ul className='list-disc ml-6 mt-2'>
                        <li>Filter options by hiding/showing them (<code>style.display = &#39;none&#39;</code> or <code>hidden</code> attribute)</li>
                        <li>The utility only navigates through visible options</li>
                        <li>Call <code>refresh()</code> if you add/remove options dynamically</li>
                        <li>Focus management updates automatically based on visible items</li>
                      </ul>
                  </section>

                  <section>
                    <h2>Keyboard Interaction (Built-in)</h2>
                    <p className='mt-2'>The utility provides complete keyboard support following W3C APG specifications:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>↓</code>: Opens listbox (if closed), or moves focus to next option if open</li>
                      <li><code>↑</code>: Moves focus to previous option (wraps to last)</li>
                      <li><code>Home</code>: Moves focus to first option</li>
                      <li><code>End</code>: Moves focus to last option</li>
                      <li><code>Enter</code>: Selects the focused option and closes listbox</li>
                      <li><code>Escape</code>: Closes listbox (first press) or clears input (second press)</li>
                      <li><code>Tab</code>: Closes listbox and moves to next focusable element</li>
                    </ul>
                  </section>

                  <section>
                    <h2>Mouse Support (Built-in)</h2>
                    <p className='mt-2'>Mouse interactions are fully handled:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><strong>Hover</strong>: Automatically highlights options on mouse move</li>
                      <li><strong>Click</strong>: Selects option and closes listbox</li>
                      <li><strong>Click outside</strong>: Closes listbox automatically</li>
                      <li><strong>Toggle button</strong>: Optional button to open/close listbox (pass <code>comboboxButtonId</code>)</li>
                    </ul>
                  </section>


                  <section>
                    <h2>What You Need to Provide</h2>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><strong>HTML structure</strong>: Input, listbox container, and option elements with IDs/classes</li>
                        <li><strong>Styling</strong>: Visual appearance (colors, sizing, positioning)</li>
                        <li><strong>Filtering logic</strong>: If you want to filter options as user types (show/hide based on input)</li>
                        <li><strong>Data fetching</strong>: Loading options from API if needed</li>
                        <li><strong>Label</strong>: Accessible label for the input (<code>&lt;label&gt;</code> or <code>aria-label</code>)</li>
                      </ul>
                  </section>

                  <section>
                    <h2>Accessibility Testing</h2>
                      <p className='mt-2'>The combobox utility includes built-in contract testing:</p>
                      <ul className='list-disc ml-6 mt-2'>
                        <li>Run <code>npx aria-ease test</code> to validate your implementation</li>
                        <li>Tests verify all ARIA attributes are correctly set</li>
                        <li>Validates keyboard interaction patterns</li>
                        <li>Checks focus management and option selection</li>
                        <li>Runs in both jsdom and real browser (Playwright) modes</li>
                      </ul>
                  </section>

                  <section>
                    <h2>Visual Design Best Practices</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Minimum touch target size for input: 44x44 pixels</li>
                      <li>Clear focus indicators with high contrast on both input and options</li>
                      <li>Visible hover and selected states that are distinct</li>
                      <li>Loading indicators when fetching options dynamically</li>
                      <li>Consider adding a dropdown icon to indicate the listbox capability</li>
                      <li>Ensure listbox appears above other content with appropriate z-index</li>
                    </ul>
                  </section>

                  <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <a href='/utilities/checkbox' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Checkbox</span>
                      </div>
                    </a>
                    <a href='/utilities/menu' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Menu</span>
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

  )
}

export default Combobox
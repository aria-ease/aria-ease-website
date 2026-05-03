import { useState } from 'react';
import SlideOutNav from '../../components/SlideOutNav';
import CodeBlockDemo from '../../components/CodeBlock';
import CalloutPanel from '../../components/CalloutPanel';
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import DocsFrame from '../../components/DocsFrame';
import { Link } from 'react-router-dom';
import Terminal from '../../components/Terminal';


// eslint-disable-next-line react/prop-types
const Radio = ({darkMode, setDarkMode}) => {
  const page = 'radio';
  const[showDropdownPage, setShowDropdownPage] = useState(false);
    
const radioSetup = `
useEffect(() => {
  const radioInstance = makeRadioAccessible({
    radioGroupId: 'radio-div',
    radiosClass: 'radio',
    defaultSelectedIndex: 0,  // Optional: which radio is selected initially
    callback: {
      onValueChange: (index, value) => {
        console.log("Radio at index with value is checked") 
      }
    }
  });

  // Clean up on unmount
  return () => radioInstance.cleanup();
}, []);`;

const apiMethods = `
// Available methods:
radioInstance.selectRadio(index)     // Select radio at index (auto-deselects others)
radioInstance.getSelectedIndex()     // Returns currently selected index
radioInstance.cleanup()              // Remove all listeners`;

const radiosComponent = `
<div id='radio-div'>
  <form>
    <div>
      <label htmlFor='financial'>Financial</label>
      <input type='radio' className='radio block-interactive' id='financial' value='financial' name='radio-group' aria-label='Financial type' onChange={(event) => handleRadioCheck(event, 0)} aria-checked={radioState[0].checked}></input>
    </div>
            
    <div>
      <label htmlFor='non-financial'>Non-financial</label>
      <input type='radio' className='radio block-interactive' id='non-financial' value='non-financial' name='radio-group' aria-label='Non-financial type' onChange={(event) => handleRadioCheck(event, 1)} aria-checked={radioState[1].checked}></input>
    </div>
                    
    <div>
      <label htmlFor='partly-financial'>Partly financial</label>
      <input type='radio' className='radio block-interactive' id='partly-financial' value='partly-financial' name='radio-group' aria-label='Partly financial type' onChange={(event) => handleRadioCheck(event, 2)} aria-checked={radioState[2].checked}></input>  
    </div>
  </form>
</div>`;

  return (
    
    <div id="inner-body-div">
      <Helmet>
      <title>Radio | Aria-Ease</title>
      <meta name="description" content="Learn how to use the Radio component for accessible single-choice selections in forms. Includes ARIA attributes and usage examples." />
      <meta name="keywords" content="Radio component, accessible radio buttons, ARIA attributes, single-choice selection, form controls, React accessibility" />
      <meta name="og:title" content="Radio | Aria-Ease" />
      <meta name="og:description" content="Learn how to use the Radio component for accessible single-choice selections in forms. Includes ARIA attributes and usage examples." />
      <meta name="og:url" content="https://ariaease.site/components/radio" />
      <meta name="twitter:title" content="Radio | Aria-Ease" />
      <meta name="twitter:description" content="Learn how to use the Radio component for accessible single-choice selections in forms. Includes ARIA attributes and usage examples." />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    

    <DocsFrame
    
    page={page}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showDropdownPage={showDropdownPage}
        setShowDropdownPage={setShowDropdownPage}>
      <div className='side-body-div docs-flow'>
                  <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                    <span className='docs-kicker black-grey-text'>Component</span>
                    <h1 className='introduction-heading black-white-text'>Radio <span className='text-gradient'>Component</span></h1>
                    <p className='mt-2'>A radio button is a form control that allows users to select exactly one option from a predefined set of mutually exclusive choices. Unlike checkboxes, when a user selects a radio button within a group, any previously selected option is automatically deselected, making radio buttons ideal for scenarios where only one choice is valid.</p>
                  </div>

                  <CalloutPanel title='Bundle Size' tone='info'>
                    <p className='mt-2'>The radio component is tree-shakable and weighs approximately <strong>5.5KB</strong> when imported individually.</p>
                    <code className='block mt-2 p-2 text-sm'>
                      <p>import * as Radio from &quot;aria-ease/radio&quot;;</p>
                      <p className='my-4'>or</p>
                      <p>import &#123; makeRadioAccessible &#125; from &quot;aria-ease/radio&quot;;</p>
                    </code>
                  </CalloutPanel>

                  <section>
                    <h2>Features</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>✨ Automatic ARIA attribute management</li>
                      <li>⌨️ Built-in keyboard interaction (Arrow keys, Space, Enter)</li>
                      <li>🔧 Programmatic control methods</li>
                      <li>🧹 Automatic cleanup on unmount</li>
                    </ul>
                  </section>

                  <section>
                    <h2>Common Use Cases</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Form selection (e.g., gender, age group)</li>
                      <li>Preference settings (e.g., theme, language)</li>
                      <li>Survey questions</li>
                    </ul>
                  </section>

                  <section>
                    <h2>WAI-ARIA Roles, States, and Properties</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>The radio buttons are contained in or owned by an element with role radiogroup.</li>
                      <li>Each radio button element has role radio.</li>
                      <li>If a radio button is checked, the radio element has aria-checked set to true. If it is not checked, it has aria-checked set to false.</li>
                      <li>Each radio element is labelled by its content, or has a visible label referenced by aria-labelledby, or has a label specified with aria-label.</li>
                      <li>The radiogroup element has a visible label referenced by aria-labelledby or has a label specified with aria-label.</li>
                      <li>If elements providing additional information about either the radio group or each radio button are present, those elements are referenced by the radiogroup element or radio elements with the aria-describedby property.</li>
                    </ul>
                  </section>

                  <section>
                    <h2>What the Utility Handles Automatically</h2>
                    <p className='mt-2'>The <code>makeToggleAccessible</code> utility automatically sets and manages all required ARIA attributes:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>role=&quot;radiogroup&quot;</code> on the element the radio buttons are contained in</li>
                      <li><code>role=&quot;radio&quot;</code> on the radio button element</li>
                      <li><code>aria-checked</code> - dynamically updates when radio is checked or not checked</li>
                    </ul>
                    
                    <p className='mt-2'>You only need to provide the HTML structure with IDs and class names.</p>
                  </section>

                  <section>
                    <h2>makeRadioAccessible()</h2>
                    <p className='mt-2'>The <code>makeRadioAccessible()</code> function automatically manages radio group accessibility with proper mutual exclusivity - when one radio is selected, others are automatically deselected.</p>
                    <p className='mt-2'>This function handles all radio button complexity including ARIA attributes, keyboard interaction (arrow keys), focus management, and ensuring only one radio can be selected at a time.</p>

                    <CalloutPanel title='Key Features' tone='success' className='mt-6' titleAs='h3'>
                      <ul className='list-disc ml-6 mt-2'>
                        <li>Automatic mutual exclusivity (only one selected)</li>
                        <li>Built-in keyboard interaction (Arrow keys, Space)</li>
                        <li>Proper radiogroup ARIA roles</li>
                        <li>Focus management with roving tabindex</li>
                        <li>No manual state management required</li>
                      </ul>
                    </CalloutPanel>
                  </section>

                  <section>
                    <h2>Keyboard Interaction</h2>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>↓</code> / <code>→</code> - Select next radio</li>
                        <li><code>↑</code> / <code>←</code> - Select previous radio</li>
                        <li><code>Space</code> - Select focused radio</li>
                      </ul>
                  </section>

                  <section>
                    <p className='mb-2'>Import the function:</p>
                      <CodeBlockDemo code={'import { makeRadioAccessible } from "aria-ease/radio";'}/>

                      <p className='mb-2 mt-6'>Initialize in useEffect (or vanilla JS):</p>
                      <Terminal darkMode={darkMode} title="Radio.jsx" lang="js">{radioSetup}</Terminal>
                      <p className='mt-2'>NOTE: The function automatically unchecks previously selected radios when a new one is selected, maintaining the mutual exclusivity pattern expected from radio buttons.</p>

                      <p className='mb-2 mt-6'>Create your radio markup:</p>
                      <Terminal darkMode={darkMode} title="Radio.jsx" lang="html">{radiosComponent}</Terminal>

                      <p className='mb-2 mt-6'>Available API methods:</p>
                      <Terminal darkMode={darkMode} title="Radio API Methods" lang="js">{apiMethods}</Terminal>
                  </section>

                  <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <Link to='/components/menu' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Menu Component</span>
                      </div>
                    </Link>
                    <Link to='/components/tabs' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Tabs Component</span>
                      </div>
                      <ChevronRightCircleIcon/>
                    </Link>
                  </div>
                </div>
    </DocsFrame>

        <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>

  )
}

export default Radio
import { useState } from 'react';
import SlideOutNav from '../../components/SlideOutNav';
import CodeBlockDemo from '../../components/CodeBlock';
import CalloutPanel from '../../components/CalloutPanel';
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import DocsFrame from '../../components/DocsFrame';
import Terminal from '../../components/Terminal';
import { Link } from 'react-router-dom';



// eslint-disable-next-line react/prop-types
const Checkbox = ({darkMode, setDarkMode}) => {
  const page = 'checkbox';
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  
  const checkboxSetup = `
useEffect(() => {
  const checkboxInstance = makeCheckboxAccessible({ //Checkbox.makeCheckboxAccessible({})
    checkboxGroupId: 'checkbox-div',
    checkboxesClass: 'course-checkbox'
  });

  // Clean up on unmount
  return () => checkboxInstance.cleanup();
}, []);`;
  const checkboxesComponent = `
<div id='checkbox-div'>
  <div>
    <label htmlFor='math'>Math:</label>
    <input type='checkbox' name='math' id='math' className='course-checkbox block-interactive' aria-label='Add Math to list of courses' />
  </div>

  <div>
    <label htmlFor='biology'>Biology:</label>
    <input type='checkbox' name='biology' id='biology' className='course-checkbox block-interactive' aria-label='Add Biology to list of courses' />
  </div>

  <div>
    <label htmlFor='philosophy'>Philosophy:</label>
    <input type='checkbox' name='philosophy' id='philosophy' className='course-checkbox block-interactive' aria-label='Add Philosophy to list of courses' />
  </div>
</div>`;
  const apiMethods = `
// Available methods:
checkboxInstance.toggleCheckbox(index)       // Toggle checkbox at index
checkboxInstance.setCheckboxState(index, checked)  // Set specific state
checkboxInstance.getCheckedStates()          // Returns [true, false, true]
checkboxInstance.getCheckedIndices()         // Returns [0, 2]
checkboxInstance.cleanup()                   // Remove all listeners`;

  return (

    <div id="inner-body-div">
      <Helmet>
            <title>Checkbox | Aria-Ease</title>
            <meta name="description" content="Explore how to use the Aria-Ease checkbox utility for building accessible checkboxes with complete keyboard interaction, focus management, and ARIA attributes." />
            <meta name="keywords" content="checkbox utility, accessible checkboxes, ARIA attributes, keyboard interaction, focus management, React checkbox example" />
            <meta name="og:title" content="Checkbox | Aria-Ease" />
            <meta name="og:description" content="Explore how to use the Aria-Ease checkbox utility for building accessible checkboxes with complete keyboard interaction, focus management, and ARIA attributes." />
            <meta name="og:url" content="https://ariaease.site/components/checkbox" />
            <meta name="twitter:title" content="Checkbox | Aria-Ease" />
            <meta name="twitter:description" content="Explore how to use the Aria-Ease checkbox utility for building accessible checkboxes with complete keyboard interaction, focus management, and ARIA attributes." />
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
                    <h1 className='introduction-heading black-white-text'>Checkbox <span className='text-gradient'>Component</span></h1>
                    <p className='mt-2'>A checkbox is an interactive form control that allows users to make binary choices (checked or not checked) by clicking or tapping a square box. When checked, the box typically displays a checkmark or tick symbol, providing a visual indication of the user&#39;s choice while maintaining accessibility through ARIA attributes for assistive technology users.</p>
                  </div>

                  <CalloutPanel title='Bundle Size' tone='info'>
                    <p className='mt-2'>The checkbox component is tree-shakable and weighs approximately <strong>6.0KB</strong> when imported individually.</p>
                    <code className='block mt-2 p-2 text-sm'>
                      <p>import * as Checkbox from &quot;aria-ease/checkbox&quot;;</p>
                      <p className='my-4'>or</p>
                      <p>import &#123; makeCheckboxAccessible &#125; from &quot;aria-ease/checkbox&quot;;</p>
                    </code>
                  </CalloutPanel>

                  <section>
                    <h2>Features</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>✨ Automatic ARIA attribute management</li>
                      <li>⌨️ Built-in keyboard interaction (Space)</li>
                      <li>🔧 Programmatic control methods</li>
                      <li>🧹 Automatic cleanup on unmount</li>
                    </ul>
                  </section>

                  <section>
                        <h2>Common Use Cases</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Terms and conditions acceptance</li>
                          <li>Multiple item selection in lists</li>
                          <li>Feature toggles in settings</li>
                          <li>Parent-child selection patterns (e.g., &#34;Select All&#34;)</li>
                        </ul>
                  </section>

                  <section>
                    <h2>WAI-ARIA Roles, States, and Properties</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>The checkbox has role checkbox.</li>
                      <li>The checkbox has an accessible label provided by one of the following:
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Visible text content contained within the element with role checkbox.</li>
                          <li>A visible label referenced by the value of aria-labelledby set on the element with role checkbox.</li>
                          <li>aria-label set on the element with role checkbox.</li>
                        </ul>
                      </li>
                      <li>When checked, the checkbox element has state aria-checked set to true.</li>
                      <li>When not checked, it has state aria-checked set to false.</li>
                      <li>If a set of checkboxes is presented as a logical group with a visible label, the checkboxes are included in an element with role group that has the property aria-labelledby set to the ID of the element containing the label.</li>
                      <li>If the presentation includes additional descriptive static text relevant to a checkbox or checkbox group, the checkbox or checkbox group has the property aria-describedby set to the ID of the element containing the description.</li>
                    </ul>
                  </section>

                  <section>
                    <h2>What the Utility Handles Automatically</h2>
                    <p className='mt-2'>The <code>makeToggleAccessible</code> utility automatically sets and manages all required ARIA attributes:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>role=&quot;group&quot;</code> on the element the checkboxes are contained in</li>
                      <li><code>role=&quot;checkbox&quot;</code> on the checkbox element</li>
                      <li><code>aria-checked</code> - dynamically updates when checkbox is checked or not checked</li>
                    </ul>
                    
                    <p className='mt-2'>You only need to provide the HTML structure with IDs and class names.</p>
                  </section>

                  <section>
                    <h2>Checkbox Groups</h2>
                      <p className='mt-2'>When grouping multiple checkboxes:</p>
                      <ul className='list-disc ml-6 mt-2'>
                        <li>Use <code>role=&#34;group&#34;</code> on the container element with the <code>checkboxGroupId</code></li>
                        <li>Add <code>aria-labelledby</code> on the container element with the <code>role=&#34;group&#34;</code> to reference the group&#39;s heading id</li>
                        <li>Maintain consistent spacing between checkboxes (minimum 8px)</li>
                        <li>Consider using fieldset and legend for form groups</li>
                      </ul>
                  </section>

                  <section>
                    <h2 className='mt-10 break-words'>makeCheckboxAccessible()</h2>
                    <p className='mt-2'>The <code>makeCheckboxAccessible()</code> function automatically manages checkbox group accessibility, including ARIA attributes, keyboard interaction, and state management.</p>
                    <p className='mt-2'>This function handles all the complexity of making checkboxes accessible - it sets up proper ARIA attributes, manages focus, and provides keyboard interaction (Space). You no longer need to manually track state or update ARIA attributes.</p>

                    <CalloutPanel title='Key Features' tone='success' className='mt-6' titleAs='h3'>
                      <ul className='list-disc ml-6 mt-2'>
                        <li>Automatic ARIA attribute management</li>
                        <li>State query methods (getCheckedStates, getCheckedIndices)</li>
                        <li>Automatic cleanup on unmount</li>
                        <li>No manual state management required</li>
                      </ul>
                    </CalloutPanel>
                  </section>

                  <section>
                    <p className='mb-2'>Import the function:</p>
                      <CodeBlockDemo code={'import * as Checkbox from "aria-ease/checkbox";'}/>

                      <p className='mb-2 mt-6'>Initialize in useEffect (or vanilla JS):</p>
                      <Terminal darkMode={darkMode} title="Checkbox Utility Init" lang="js">{checkboxSetup}</Terminal>

                      <p className='mb-2 mt-6'>Create your checkbox markup:</p>
                      <Terminal darkMode={darkMode} title="Checkbox DOM Markup" lang="html">{checkboxesComponent}</Terminal>

                      <p className='mb-2 mt-6'>Available API methods:</p>
                      <Terminal darkMode={darkMode} title="Checkbox API Methods" lang="js">{apiMethods}</Terminal>
                  </section>


                  <section>
                    <h2>Keyboard Interaction</h2>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>Space</code> - Toggle checkbox</li>
                      </ul>
                  </section>

                  <section>
                    <h2>Label and Input Relationship</h2>
                        <p className='mt-2'>Proper labeling is crucial for accessibility:</p>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Always use <code>htmlFor</code> attribute matching input&#39;s <code>id</code></li>
                          <li>Place labels before checkboxes for left-to-right languages</li>
                          <li>Ensure labels are clickable to toggle checkbox state</li>
                          <li>Use descriptive label text that clearly indicates the purpose</li>
                        </ul>
                  </section>

                  <section>
                    <h2>Visual Design Best Practices</h2>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Minimum touch target size: 44x44 pixels</li>
                      <li>Clear focus indicators with high contrast</li>
                      <li>Visible state changes beyond just the checkmark</li>
                      <li>Support for mixed/indeterminate states when parent-child relationships exist</li>
                    </ul>
                  </section>

                    <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <Link to='/components/block' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Block Component</span>
                      </div>
                    </Link>
                    <Link to='/components/combobox' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Combobox Component</span>
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

export default Checkbox
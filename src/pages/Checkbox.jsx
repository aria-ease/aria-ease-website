import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import * as Block from 'aria-ease/block';
import SlideOutNav from '../components/SlideOutNav';
import SideNav from '../components/SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';



// eslint-disable-next-line react/prop-types
const Checkbox = ({darkMode, setDarkMode}) => {
    const page = 'checkbox';
    const[showDropdownPage, setShowDropdownPage] = useState(false);

  
  const [resultsVisible, setResultsVisible] = useState(false);
        
        const mainBlockCleanupRef = useRef(null);
      
        // Initialize main block on mount
        useEffect(() => {
          mainBlockCleanupRef.current = Block.makeBlockAccessible('inner-body-div', 'block-interactive');
          return () => {
            if (mainBlockCleanupRef.current) {
              mainBlockCleanupRef.current();
              mainBlockCleanupRef.current = null;
            }
          };
        }, []);
      
        // Clean up main block listeners when search is visible, re-enable when hidden
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

  const importGroupCheckboxes = 'import * as Checkbox from "aria-ease/checkbox";';
  const groupStates = `const[checkboxState, setCheckboxState] = useState(() => Array.from({ length: 3 }, () => ({ checked: false })));`;
  const handleCheckFunction = `const handleCheck = (event, index) => {
  const checkboxElement = event.target;
  
  const updateState = () => {
    setCheckboxState((prevStates) => {
      const newStates = prevStates.map((state, i) => ({
        ...state,
        checked: i === index ? !state.checked : state.checked,
      }));
      Checkbox.updateCheckboxAriaAttributes('checkbox-div', 'course-checkbox', newStates, index);
      return newStates;
    });
  };

  if(event.type === 'keydown' && (event.key === 'Enter' || event.key === ' ')) {
    checkboxElement.checked = !checkboxElement.checked;
  }
  if(event.type === 'change' || (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))) {
    updateState();
  }
};`;
  const checkboxesComponent = `<div id='checkbox-div'>
    <div>
      <label htmlFor='math'>Math:</label>
      <input type='checkbox' name='math' id='math' className='course-checkboxes block-interactive' onChange={(event) => handleCheck(event, 0)} onKeyDown={(event) => handleCheck(event, 0)} aria-checked={false} aria-label='Add Math to list of courses'></input>
    </div>

    <div>
      <label htmlFor='biology'>Biology:</label>
      <input type='checkbox' name='biology' id='biology' className='course-checkboxes block-interactive' onChange={(event) => handleCheck(event, 1)} onKeyDown={(event) => handleCheck(event, 1)} aria-checked={false} aria-label='Add Biology to list of courses'></input>
    </div>

    <div>
      <label htmlFor='philosophy'>Philosophy:</label>
      <input type='checkbox' name='philosophy' id='philosophy' className='course-checkboxes block-interactive' onChange={(event) => handleCheck(event, 2)} onKeyDown={(event) => handleCheck(event, 2)} aria-checked={false} aria-label='Add Philosophy to list of courses'></input>
    </div>
</div>`;

  return (
    <div id="inner-body-div">
        <ScrollTracker page={page}/>
        <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage} resultsVisible={resultsVisible} setResultsVisible={setResultsVisible}/>
        
        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className='side-body-div'>
                  <h1 className='component-example-heading'>Checkbox</h1>

                  <p className='mt-2'>A checkbox is an interactive form control that allows users to make binary choices (checked or not checked) by clicking or tapping a square box. When checked, the box typically displays a checkmark or tick symbol, providing a visual indication of the user&#39;s choice while maintaining accessibility through ARIA attributes for assistive technology users.</p>

                  <div className='mt-10'>
                    <h4>Required ARIA Attributes</h4>
                    <p className='mt-2'>Checkboxes require specific ARIA attributes to ensure proper accessibility:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>aria-checked</code>: Indicates the selection state (&#39;true&#39; or &#39;false&#39;)</li>
                      <li><code>aria-label</code>: Provides a descriptive label for screen readers</li>
                    </ul>
                  </div>

                  <div className='mt-4'>
                    <h4>aria-checked</h4>
                    <p>The <code>aria-checked</code> attribute indicates to assistive technologies the presence of a checkable item. It indicates the current &#34;checked&#34;--or &#34;unchecked&#34;--state of the item. If the aria-checked attribute is not present, a user will not be able to correctly identify the item as checkable.</p>

                    <h4 className='mt-4'>aria-label</h4>
                    <p>The <code>aria-label</code> attribute provides a description of a checkbox for screen reader users. It typically contains a detailed purpose of the checkbox.</p>

                    <div className='mt-5'>
                    <h4>Checkbox Groups</h4>
                    <p className='mt-2'>When grouping multiple checkboxes:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Use <code>role=&#34;group&#34;</code> on the container element</li>
                      <li>Add <code>aria-labelledby</code> to reference the group&#39;s heading</li>
                      <li>Maintain consistent spacing between checkboxes (minimum 8px)</li>
                      <li>Consider using fieldset and legend for form groups</li>
                    </ul>
                  </div>

                  <div className='mt-4'>
                    <h4>Visual Design Best Practices</h4>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Minimum touch target size: 44x44 pixels</li>
                      <li>Clear focus indicators with high contrast</li>
                      <li>Visible state changes beyond just the checkmark</li>
                      <li>Support for mixed/indeterminate states when parent-child relationships exist</li>
                    </ul>
                  </div>

                    <h4 className='mt-10'>Checkbox.updateCheckboxAriaAttributes</h4>
                    <p className='mt-2'>The <code>Checkbox.updateCheckboxAriaAttributes</code> method allows to systematically manage multiple checkboxes with dynamic accessibility attributes.</p>
                    <p className='mt-2'>The method enables assistive technology support for the checkboxes. This feature helps visually impaired users to navigate interacting with the checkboxes, by informing the users about the current state, of each of the checkboxes. The states are either checked or not checked. The method updates the aria-checked attribute of the checkboxes.</p>
                    <p className='mt-2'>The method accepts 4 arguments; the id of the checkbox parent container, a shared class of all the checkboxes, an array of objects with information about each checkbox in the collection, and the index position of the currently clicked checkbox relative to the main checkboxes container and other checkboxes.</p>

                    <div>
                      <p className='mb-2 mt-2'>Let&#39;s begin by importing the Checkbox utility class</p>
                      <CodeBlockDemo code={importGroupCheckboxes}/>
                      

                      <p className='mb-2 mt-6'>Then we define the states for each checkbox in the collection in a states array.</p>
                      <CodeBlockDemo code={groupStates}/>

                      <p className='mb-2 mt-6'>And then we create a function to handle checking/unchecking of the checkboxes. The function uses the index position of the current checked/unchecked checkbox to update the checkbox state in the states array.</p>
                      <CodeBlockDemo code={handleCheckFunction}/>

                      <p className='mb-2 mt-6'>Lastly we create our checkboxes components.</p>
                      <CodeBlockDemo code={checkboxesComponent}/>
                    </div>
                  </div>
                  
                  <div className='mt-10 pt-3'>
                    <div className='mt-6'>
                      <div className='mt-10'>
                    <h4>Common Use Cases</h4>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Terms and conditions acceptance</li>
                      <li>Multiple item selection in lists</li>
                      <li>Feature toggles in settings</li>
                      <li>Parent-child selection patterns (e.g., &#34;Select All&#34;)</li>
                    </ul>
                  </div>

                  <div className='mt-4'>
                    <h4>Label and Input Relationship</h4>
                    <p className='mt-2'>Proper labeling is crucial for accessibility:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Always use <code>htmlFor</code> attribute matching input&#39;s <code>id</code></li>
                      <li>Place labels before checkboxes for left-to-right languages</li>
                      <li>Ensure labels are clickable to toggle checkbox state</li>
                      <li>Use descriptive label text that clearly indicates the purpose</li>
                    </ul>
                  </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  )
}

export default Checkbox
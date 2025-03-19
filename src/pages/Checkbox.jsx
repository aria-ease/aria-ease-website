import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { makeBlockAccessible } from 'aria-ease';
import SlideOutNav from '../components/SlideOutNav';
import SideNav from '../components/SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import CheckboxExample from '../components/checkbox/CheckboxExample';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import { updateSingleCheckboxAriaAttribute } from "aria-ease";


// eslint-disable-next-line react/prop-types
const Checkbox = ({darkMode, setDarkMode}) => {
    const page = 'checkbox';
    const[showDropdownPage, setShowDropdownPage] = useState(false);

    const checkSingleCheckbox = (event) => {
      const checkboxElement = event.target;
      const ariaChecked = checkboxElement.getAttribute('aria-checked');
      if(event.type === 'keydown' && (event.key === 'Enter' || event.key === ' ')) {
        checkboxElement.checked = !checkboxElement.checked;
      }

      if(event.type === 'change' || (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))) {
        if(ariaChecked === 'true') {
          updateSingleCheckboxAriaAttribute('single-checkbox', 'Select math course')
        } else if(ariaChecked === 'false') {
          updateSingleCheckboxAriaAttribute('single-checkbox', 'Deselect math course')
        }
      }
    }
  
  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('inner-body-div', 'block-interactive');
    return accessibleBlock;
  },[])

  const importGroupCheckboxes = 'import { updateGroupCheckboxesAriaAttributes } from "aria-ease";';
  const groupStates = `const[checkboxState, setCheckboxState] = useState([
  {checked: false, uncheckedAriaLabel: 'Select math course', checkedAriaLabel: 'Deselect math course'},
  {checked: false, uncheckedAriaLabel: 'Select biology course', checkedAriaLabel: 'Deselect biology course'},
  {checked: false, uncheckedAriaLabel: 'Select philosophy course', checkedAriaLabel: 'Deselect philosophy course'}
])`;
  const handleCheckFunction = `const handleCheck = (event, index) => {
  const checkboxElement = event.target;
  
  const updateState = () => {
    setCheckboxState((prevStates) => {
      const newStates = prevStates.map((state, i) => ({
        ...state,
        checked: i === index ? !state.checked : state.checked,
      }));
      updateGroupCheckboxesAriaAttributes(newStates, 'course-checkboxes', index);
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

  const singleImport = `import { updateSingleCheckboxAriaAttribute } from "aria-ease";`;
  const checkSingleBox = `const checkSingleCheckbox = (event) => {
  const checkboxElement = event.target;
  const ariaChecked = checkboxElement.getAttribute('aria-checked');
  if(event.type === 'keydown' && (event.key === 'Enter' || event.key === ' ')) {
    checkboxElement.checked = !checkboxElement.checked;
  }

  if(event.type === 'change' || (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))) {
    if(ariaChecked === 'true') {
      updateSingleCheckboxAriaAttribute('single-checkbox', 'Select math course')
    } else if(ariaChecked === 'false') {
      updateSingleCheckboxAriaAttribute('single-checkbox', 'Deselect math course')
    }
  }
}`;
  
const singleBox = `<input type='checkbox' name='math' id='math' className='single-checkbox' aria-checked={false} aria-label='Add Math to list of courses' onChange={(event) => checkSingleCheckbox(event)} onKeyDown={(event) => checkSingleCheckbox(event)}></input>`

  return (
    <div id="inner-body-div">
        <ScrollTracker page={page}/>
        <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>
        
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

                    <h4 className='mt-2'>aria-label</h4>
                    <p>The <code>aria-label</code> attribute provides a description of a checkbox for screen reader users. It typically contains a detailed purpose of the checkbox, and the action that will happen when interacted with.</p>

                    <h4 className='mt-5'>updateGroupCheckboxesAriaAttributes</h4>
                    <p className='mt-2'>The <code>updateGroupCheckboxesAriaAttributes</code> function allows to systematically manage multiple checkboxes with dynamic accessibility attributes.</p>
                    <p className='mt-2'>The function enables assistive technology support for the checkboxes. This feature helps visually impaired users to navigate interacting with the checkboxes, by informing the users about the current state, and the action, of each of the checkboxes. The states are either checked or not checked. The function updates the aria-checked and aria-label attributes of the checkboxes.</p>
                    <p className='mt-2'>The function accepts 3 arguments; an array of objects with information about each checkbox in the collection, a shared class of all the checkboxes, and the index position of the currently clicked checkbox relative to the main checkboxes container and other checkboxes.</p>

                    <div><CheckboxExample/></div>
                    <div>
                      <p className='mb-2'>Let&#39;s begin by importing the fuction</p>
                      <CodeBlockDemo code={importGroupCheckboxes}/>
                      

                      <p className='mb-2 mt-6'>Then we define the states for each checkbox in the collection sequentially (according to the order in which the checkboxes elements are defined) in a states array</p>
                      <CodeBlockDemo code={groupStates}/>
                      <p>In the code snippet above, when the first checkbox is in it&#39;s default unchecked state, the aria-label indicates the action that will occur when it gets checked, which is &#34;Select math course&#34;. After the checkbox has been checked, the aria-label, and hence action, then changes to &#34;Deselect math course&#34;.</p>

                      <p className='mb-2 mt-6'>And then we create a function to handle checking/unchecking of the checkboxes. The function uses the index position of the current checked/unchecked checkbox to update the checkbox state in the states array. Hence checkbox elements and states have to be defined sequentially.</p>
                      <CodeBlockDemo code={handleCheckFunction}/>

                      <p className='mb-2 mt-6'>Lastly we create our checkboxes components</p>
                      <CodeBlockDemo code={checkboxesComponent}/>
                    </div>
                  </div>
                  
                  <div className='mt-10 pt-3'>
                    <h4>updateSingleCheckboxAriaAttribute</h4>
                    <p className='mt-2'>The <code>updateSingleCheckboxAriaAttribute</code> function allows to systematically update the aria attributes of a single checkbox.</p>
                    <p>The function enables assistive technology support for the checkbox. This feature helps visually impaired users to navigate interacting with the checkbox, by informing the users about the current state, and purpose, of each of the checkbox. The states are either checked or not checked. The function updates the aria-checked and aria-label attributes of the checkbox.</p>
                    <p>The function accepts 2 arguments; the class of the checkbox, and the aria label to be updated.</p>

                    <div className='mt-6'>
                      <div className='flex items-center'>
                        <label htmlFor='math'>Math</label>
                        <input type='checkbox' name='math' id='math' className='single-checkbox ml-4 course-checkbox w-[1.25rem] h-[1.25rem] block-interactive' aria-checked={false} aria-label='Select math course' onChange={(event) => checkSingleCheckbox(event)} onKeyDown={(event) => checkSingleCheckbox(event)}></input>
                      </div>
                    </div>

                    <div className='mt-6'>
                      <p className='mb-2'>Let&#39;s begin by importing the fuction</p>
                      <CodeBlockDemo code={singleImport}/>

                      <p className='mb-2 mt-6'>And then we create a function to handle checking/unchecking of the checkbox</p>
                      <CodeBlockDemo code={checkSingleBox}/>

                      <p className='mb-2 mt-6'>Lastly we create our checkbox component</p>
                      <CodeBlockDemo code={singleBox}/>
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
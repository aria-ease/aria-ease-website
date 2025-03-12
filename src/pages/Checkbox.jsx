import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { makeBlockAccessible } from 'aria-ease';
import SlideOutNav from '../components/SlideOutNav';
import SideNav from '../components/SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import CheckboxExample from '../components/checkbox/CheckboxExample';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';


// eslint-disable-next-line react/prop-types
const Checkbox = ({darkMode, setDarkMode}) => {
    const page = 'checkbox';
    const[showDropdownPage, setShowDropdownPage] = useState(false);

    
  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('inner-body-div', 'block-interactive');
    return accessibleBlock;
  },[])

  const importGroupCheckboxes = 'import { updateGroupCheckboxesAriaAttributes } from "aria-ease";';
  const groupStates = `const[checkboxState, setCheckboxState] = useState([
    {checked: false, uncheckedAriaLabel: 'Add Math to list of courses', checkedAriaLabel: 'Remove Math from list of courses'},
    {checked: false, uncheckedAriaLabel: 'Add Biology to list of courses', checkedAriaLabel: 'Remove Biology from list of courses'},
    {checked: false, uncheckedAriaLabel: 'Add Philosophy to list of courses', checkedAriaLabel: 'Remove Philosophy from list of courses'}
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

  const singleImport = `import { updateSingleCheckboxAriaAttribute } from aria-ease`;
  const checkSingleBox = `const checkSingleCheckbox = (event) => {
    const ariaChecked = event.target.getAttribute('aria-checked')
    if(ariaChecked === 'true') {
      updateSingleCheckboxAriaAttribute('single-checkbox', 'Check financial type')
    } else if(ariaChecked === 'false') {
      updateSingleCheckboxAriaAttribute('single-checkbox', 'Uncheck financial type')
    }

  }`;
  const singleBox = `<input className='single-checkbox' type='checkbox' aria-checked='false' aria-label='Check financial type' onChange={(event) => checkSingleCheckbox(event)}></input>`

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

                  <div className='mt-10'>
                    <h4>updateGroupCheckboxesAriaAttributes</h4>
                    <p className='mt-2'>The <code>updateGroupCheckboxesAriaAttributes</code> function allows to systematically update the aria attributes of a group of checkboxes.</p>
                    <p>The function enables screen reader support for the checkboxes. This feature helps visually impaired users to navigate interacting with the checkboxes, by informing the users about the current state, and purpose, of each of the checkboxes. The states are either checked or not checked. The function updates the aria-checked and aria-label attributes of the checkboxes.</p>
                    <p>The function accepts 3 arguments; an array of objects with information about each checkbox in the collection, a shared class of all the checkboxes, and the index position of the currently clicked checkbox relative to the main checkboxes container and other checkboxes.</p>

                    <div><CheckboxExample/></div>
                    <div>
                      <p className='mb-2'>Let&#39;s begin by importing the fuction</p>
                      <CodeBlockDemo code={importGroupCheckboxes}/>
                      

                      <p className='mb-2 mt-6'>Then we define the states for each checkbox in the collection sequentially (according to the order in which the checkboxes elements are defined) in a states array</p>
                      <CodeBlockDemo code={groupStates}/>

                      <p className='mb-2 mt-6'>And then we create a function to handle checking/unchecking of the checkboxes. The function uses the index position of the current checked/unchecked checkbox to update the checkbox state in the states array. Hence checkbox elements and states have to be defined sequentially.</p>
                      <CodeBlockDemo code={handleCheckFunction}/>

                      <p className='mb-2 mt-6'>Lastly we create our checkboxes components</p>
                      <CodeBlockDemo code={checkboxesComponent}/>
                    </div>
                  </div>
                  
                  <div className='mt-10 pt-3'>
                    <h4>updateSingleCheckboxAriaAttribute</h4>
                    <p className='mt-2'>The <code>updateSingleCheckboxAriaAttribute</code> function allows to systematically update the aria attributes of a single checkbox.</p>
                    <p>The function enables screen reader support for the checkbox. This feature helps visually impaired users to navigate interacting with the checkbox, by informing the users about the current state, and purpose, of each of the checkbox. The states are either checked or not checked. The function updates the aria-checked and aria-label attributes of the checkbox.</p>
                    <p>The function accepts 2 arguments; the class of the checkbox, and the aria label to be updated.</p>

                    <div className='mt-6'>
                      <div>
                        <label htmlFor='math'>Math:</label>
                        <input type='checkbox' name='math' id='math' className='single-checkbox ml-4' aria-checked={false} aria-label='Add Math to list of courses'></input>
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
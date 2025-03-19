import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { makeBlockAccessible } from 'aria-ease';
import SlideOutNav from '../components/SlideOutNav';
import SideNav from '../components/SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import GroupRadio from '../components/radio/GroupRadio';


// eslint-disable-next-line react/prop-types
const Radio = ({darkMode, setDarkMode}) => {
    const page = 'radio';
    const[showDropdownPage, setShowDropdownPage] = useState(false);
    
  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('inner-body-div', 'block-interactive');
    return accessibleBlock;
  },[])

  const importGroupRadios = 'import { updateGroupRadiosAriaAttributes } from "aria-ease";';
  const groupStates = `const[radioState, setRadioState] = useState([
  {checked: false, ariaLabel: 'Financial type'},
  {checked: false, ariaLabel: 'Non-financial type'},
  {checked: false, ariaLabel: 'Partly financial type'}
]);`;
  const handleRadioCheckFunction = `const handleRadioCheck = (event, index) => {
  setRadioState((prevStates) => {
    const newStates = prevStates.map((state, i) => ({
      ...state,
      checked: i === index ? true : false,
    }));
    updateGroupRadiosAriaAttributes(newStates, 'radio', index);
    return newStates;
  });     
}`;
  const radiosComponent = `<div id='radio-div'>
  <form>
    <div className=''>
      <label htmlFor='financial'>Financial</label>
      <input type='radio' id='financial' value='financial' name='radio-group' aria-label='Financial type' onChange={(event) => handleRadioCheck(event, 0)} aria-checked={false}></input>
    </div>
            
    <div className=''>
      <label htmlFor='non-financial'>Non-financial</label>
      <input type='radio' id='non-financial' value='non-financial' name='radio-group' aria-label='Non-financial type' onChange={(event) => handleRadioCheck(event, 1)} aria-checked={false}></input>
    </div>
            
    <div className=''>
      <label htmlFor='partly-financial'>Partly financial</label>
      <input type='radio' id='partly-financial' value='partly-financial' name='radio-group' aria-label='Partly financial type' onChange={(event) => handleRadioCheck(event, 2)} aria-checked={false}></input>  
    </div>
  </form>
</div>`;

  const singleImport = `import { updateSingleRadioAriaAttribute } from "aria-ease";`;
  const checkSingleRadio = `const checkSingleRadio = (event) => {
  const ariaChecked = event.target.getAttribute('aria-checked');
  if(ariaChecked === 'true') {
    updateSingleRadioAriaAttribute('single-radio')
  } else if(ariaChecked === 'false') {
    updateSingleRadioAriaAttribute('single-radio')
  }
}`;
  const singleRadio = `<input className='single-radio' type='radio' aria-checked='false' aria-label='Financial type' onChange={(event) => checkSingleRadio(event)}></input>`

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
                  <h1 className='component-example-heading'>Radio</h1>
                  <p className='mt-2'>A radio button is a form control that allows users to select exactly one option from a predefined set of mutually exclusive choices. Unlike checkboxes, when a user selects a radio button within a group, any previously selected option is automatically deselected, making radio buttons ideal for scenarios where only one choice is valid.</p>

                  <div className='mt-10'>
                    <h4>Required ARIA Attributes</h4>
                    <p className='mt-2'>Radio buttons require specific ARIA attributes to ensure proper accessibility:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>aria-checked</code>: Indicates the selection state (&#39;true&#39; or &#39;false&#39;)</li>
                      <li><code>aria-label</code>: Provides a descriptive label for screen readers</li>
                    </ul>
                  </div>

                  <div className='mt-4'>
                  <h4>aria-checked</h4>
                    <p>The <code>aria-checked</code> attribute indicates to assistive technologies the presence of a checkable item. It indicates the current &#34;checked&#34;--or &#34;unchecked&#34;--state of the item. If the aria-checked attribute is not present, a user will not be able to correctly identify the item as checkable.</p>

                    <h4 className='mt-2'>aria-label</h4>
                    <p>The <code>aria-label</code> attribute provides a description of the radio for screen reader users. It typically contains a detailed purpose of the radio. Unlike the checkbox, the aria-label does not define action.</p>

                    <h4 className='mt-5'>updateGroupRadiosAriaAttributes</h4>
                    <p className='mt-2'>The <code>updateGroupRadiosAriaAttributes</code> function allows to systematically update the aria attributes of a group of radios.</p>
                    <p>The function enables assistive technology support for the radios. This feature helps visually impaired users to navigate interacting with the radios, by informing the users about the current state, and purpose, of each of the radios. The states are either checked or not checked. The function updates the aria-checked and aria-label attributes of the radios.</p>
                    <p>The function accepts 3 arguments; an array of objects with information about each radio in the collection, a shared class of all the radios, and the index position of the currently clicked radio relative to the main radios container and other radios.</p>

                    <div>
                      <p className='mb-2'>Let&#39;s begin by importing the function</p>
                      <CodeBlockDemo code={importGroupRadios}/>

                      <p className='mb-2 mt-6'>Then we define the states for each radio in the collection sequentially (according to the order in which the radios elements are defined) in a states array</p>
                      <CodeBlockDemo code={groupStates}/>
                      <p>NOTE: The ariaLabel property in the states object above is simply to keep track of the sequential order of the radio in the array and relative to the radio group container. The content of a radio&#39;s aria-label must not be changed when the state changes. So a screen reader will simply say something like &#34;Financial type, selected&#34;, which is intuitive enough for a user relying on it.</p>

                      <p className='mb-2 mt-6'>And then we create a function to handle checking/unchecking of the radios. The function uses the index position of the current checked/unchecked radio to update the radio state in the states array. Hence radio elements and states have to be defined sequentially.</p>
                      <CodeBlockDemo code={handleRadioCheckFunction}/>

                      <p className='mb-2 mt-6'>Lastly we create our radios components</p>
                      <CodeBlockDemo code={radiosComponent}/>
                      <GroupRadio/>
                    </div>
                  </div>
                  
                  <div className='mt-10 pt-3'>
                    <h4>updateSingleRadioAriaAttribute</h4>
                    <p className='mt-2'>The <code>updateSingleRadioAriaAttribute</code> function allows to systematically update the aria attributes of a single radio.</p>
                    <p>The function enables assistive technology support for the radio. This feature helps visually impaired users to navigate interacting with the radio, by informing the users about the current state, and purpose, of each of the radio. The states are either checked or not checked. The function updates the aria-checked and aria-label attributes of the radio.</p>
                    <p>The function accepts 1 argument; the class of the radio.</p>

                    <div className='mt-6'>
                      <p className='mb-2'>Let&#39;s begin by importing the fuction</p>
                      <CodeBlockDemo code={singleImport}/>

                      <p className='mb-2 mt-6'>And then we create a function to handle checking/unchecking of the radio</p>
                      <CodeBlockDemo code={checkSingleRadio}/>

                      <p className='mb-2 mt-6'>Lastly we create our radio component</p>
                      <CodeBlockDemo code={singleRadio}/>
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

export default Radio
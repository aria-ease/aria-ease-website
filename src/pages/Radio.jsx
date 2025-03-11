import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { makeBlockAccessible } from 'aria-ease';
import SlideOutNav from '../components/SlideOutNav';
import SideNav from '../components/SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import CodeBlockDemo from '../components/CodeBlock';


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
    {checked: false, uncheckedAriaLabel: 'Check financial type', checkedAriaLabel: 'Uncheck financial type'},
    {checked: false, uncheckedAriaLabel: 'Check non-financial type', checkedAriaLabel: 'Uncheck non-financial type'},
    {checked: false, uncheckedAriaLabel: 'Check partly financial type', checkedAriaLabel: 'Uncheck partly financial type'}
  ])`;
  const handleRadioCheckFunction = `const handleRadioCheck = (event, index) => {
    const radioElement = event.target

    if(event.type === 'keydown' && (event.key === 'Enter' || event.key === ' ')) {
      if(radioElement.checked === false) {
        radioElement.checked = true;
      }
    }

    if(event.type === 'change' || (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))) {
      setRadioState((prevStates) => {
        const newStates = prevStates.map((state, i) => ({
          ...state,
          checked: i === index ? true : false,
        }));
        updateGroupRadiosAriaAttributes(newStates, 'radio', index);
        return newStates;
      });
    }
  }`;
  const radiosComponent = `<div id='radio-div'>
  <form>
    <input type='radio' name='radio-group' className='radio' aria-label='Check financial type' onChange={(event) => handleRadioCheck(event, 0)} onKeyDown={(event) => handleRadioCheck(event, 0)} aria-checked={false}></input>
    <input type='radio' name='radio-group' className='radio' aria-label='Check non-financial type' onChange={(event) => handleRadioCheck(event, 1)} onKeyDown={(event) => handleRadioCheck(event, 1)} aria-checked={false}></input>
    <input type='radio' name='radio-group' className='radio' aria-label='Check partly financial type' onChange={(event) => handleRadioCheck(event, 2)} onKeyDown={(event) => handleRadioCheck(event, 2)} aria-checked={false}></input>
  </form>
</div>`;

  const singleImport = `import { updateSingleRadioAriaAttribute } from aria-ease`;
  const checkSingleRadio = `const checkSingleRadio = (event) => {
    const ariaChecked = event.target.getAttribute('aria-checked')
    if(ariaChecked === 'true') {
      updateSingleRadioAriaAttribute('single-radio', 'Check financial type')
    } else if(ariaChecked === 'false') {
      updateSingleRadioAriaAttribute('single-radio', 'Uncheck financial type')
    }

  }`;
  const singleRadio = `<input className='single-radio' type='radio' aria-checked='false' aria-label='Check financial type' onChange={(event) => checkSingleRadio(event)}></input>`

  return (
    <div id="inner-body-div">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>
        
        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className='side-body-div'>
                  <h1 className='component-example-heading'>Radio</h1>

                  <div className='mt-10'>
                    <h4>updateGroupRadiosAriaAttributes</h4>
                    <p className='mt-2'>The <code>updateGroupRadiosAriaAttributes</code> function allows to systematically update the aria attributes of a group of radios.</p>
                    <p>The function enables screen reader support for the radios. This feature helps visually impaired users to navigate interacting with the radios, by informing the users about the current state, and purpose, of each of the radios. The states are either checked or not checked. The function updates the aria-checked and aria-label attributes of the radios.</p>
                    <p>The function accepts 3 arguments; an array of objects with information about each radio in the collection, a shared class of all the radios, and the index position of the currently clicked radio relative to the main radios container and other radios.</p>

                    <div>
                      <p className='mb-2'>Let&#39;s begin by importing the fuction</p>
                      <CodeBlockDemo code={importGroupRadios}/>

                      <p className='mb-2 mt-6'>Then we define the states for each radio in the collection sequentially (according to the order in which the radios elements are defined) in a states array</p>
                      <CodeBlockDemo code={groupStates}/>

                      <p className='mb-2 mt-6'>And then we create a function to handle checking/unchecking of the radios. The function uses the index position of the current checked/unchecked radio to update the radio state in the states array. Hence radio elements and states have to be defined sequentially.</p>
                      <CodeBlockDemo code={handleRadioCheckFunction}/>

                      <p className='mb-2 mt-6'>Lastly we create our radios components</p>
                      <CodeBlockDemo code={radiosComponent}/>
                    </div>
                  </div>
                  
                  <div className='mt-10 pt-3'>
                    <h4>updateSingleRadioAriaAttribute</h4>
                    <p className='mt-2'>The <code>updateSingleRadioAriaAttribute</code> function allows to systematically update the aria attributes of a single radio.</p>
                    <p>The function enables screen reader support for the radio. This feature helps visually impaired users to navigate interacting with the radio, by informing the users about the current state, and purpose, of each of the radio. The states are either checked or not checked. The function updates the aria-checked and aria-label attributes of the radio.</p>
                    <p>The function accepts 2 arguments; the class of the radio, and the aria label to be updated.</p>

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
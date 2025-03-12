import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { makeBlockAccessible } from 'aria-ease';
import SlideOutNav from '../components/SlideOutNav';
import SideNav from '../components/SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';


// eslint-disable-next-line react/prop-types
const Toggle = ({darkMode, setDarkMode}) => {
    const page = 'toggle-button';
    const[showDropdownPage, setShowDropdownPage] = useState(false);
    
  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('inner-body-div', 'block-interactive');
    return accessibleBlock;
  },[])

  const importGroupToggles = 'import { updateGroupTogglesAriaAttributes } from "aria-ease";';
  const groupStates = `const[toggleButtonsState, setToggleButtonsState] = useState([
    {pressed: false, unpressedAriaLabel: 'Select financial type', pressedAriaLabel: 'Unselect financial type'},
    {pressed: false, unpressedAriaLabel: 'Select non-financial type', pressedAriaLabel: 'Unselect non-financial type'},
    {pressed: false, unpressedAriaLabel: 'Select partly financial type', pressedAriaLabel: 'Unselect partly financial type'}
  ])`;
  const handleTogglePressFunction = `const handlePress = (event, index) => {
    const toggleButtonElement = event.target;

    const updateState = () => {
      setToggleButtonsState((prevStates) => {
        const newStates = prevStates.map((state, i) => ({
          ...state,
          pressed: i === index ? !state.pressed : state.pressed,
        }));
        updateGroupTogglesAriaAttributes(newStates, 'course-toggle-button', index);
        return newStates;
      });
    };
    updateState()

    if(event.type === 'keydown' && (event.key === 'Enter' || event.key === ' ')) {
      toggleButtonElement.pressed = !toggleButtonElement.pressed;
    }
    if(event.type === 'change' || (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))) {
      updateState();
    }
  }`;
  const togglesComponent = `<div>
    <button className='course-toggle-button' role='button' aria-pressed='false' aria-label='Select financial type' onClick={(event) => handlePress(event, 0)}>One</button>
    <button className='course-toggle-button' role='button' aria-pressed='false' aria-label='Select non-financial type' onClick={(event) => handlePress(event, 1)}>Two</button>
    <button className='course-toggle-button' role='button' aria-pressed='false' aria-label='Select partly financial type' onClick={(event) => handlePress(event, 2)}>Three</button>
  </div>`;

  const singleImport = `import { updateSingleToggleAriaAttribute } from aria-ease`;
  const toggleSingleButton = `const toggleSingleButton = (event) => {
    const ariaPressed = event.target.getAttribute('aria-pressed')
    if(ariaPressed === 'true') {
      updateSingleToggleAriaAttribute('single-toggle-button', 'Select financial type')
    } else if(ariaPressed === 'false') {
      updateSingleToggleAriaAttribute('single-toggle-button', 'Unselect financial type')
    }

  }`;
  const singleToggle = `<button className='single-toggle-button' role='button' aria-pressed='false' aria-label='Select financial type' onClick={(event) => toggleSingleButton(event)}>One</button>`

  return (
    <div id="inner-body-div">
        <ScrollTracker page={page}/>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>
        
        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className='side-body-div'>
                  <h1 className='component-example-heading'>Toggle</h1>

                  <div className='mt-10'>
                    <h4>updateGroupTogglesAriaAttributes</h4>
                    <p className='mt-2'>The <code>updateGroupTogglesAriaAttributes</code> function allows to systematically update the aria attributes of a group of toggle buttons.</p>
                    <p>The function enables screen reader support for the toggle buttons. This feature helps visually impaired users to navigate interacting with the toggle buttons, by informing the users about the current state, and purpose, of each of the toggle buttons. The states are either pressed or unpressed. The function updates the aria-pressed and aria-label attributes of the toggle buttons.</p>
                    <p>The function accepts 3 arguments; an array of objects with information about each radio in the collection, a shared class of all the toggle buttons, and the index position of the currently clicked radio relative to the main toggle buttons container and other toggle buttons.</p>

                    <div>
                      <p className='mb-2'>Let&#39;s begin by importing the fuction</p>
                      <CodeBlockDemo code={importGroupToggles}/>

                      <p className='mb-2 mt-6'>Then we define the states for each toggle button in the collection sequentially (according to the order in which the toggle buttons elements are defined) in a states array</p>
                      <CodeBlockDemo code={groupStates}/>

                      <p className='mb-2 mt-6'>And then we create a function to handle checking/unchecking of the toggle buttons. The function uses the index position of the current checked/unchecked toggle button to update the toggle button state in the states array. Hence toggle button elements and states have to be defined sequentially.</p>
                      <CodeBlockDemo code={handleTogglePressFunction}/>

                      <p className='mb-2 mt-6'>Lastly we create our toggle buttons components</p>
                      <CodeBlockDemo code={togglesComponent}/>
                    </div>
                  </div>
                  
                  <div className='mt-10 pt-3'>
                    <h4>updateSingleToggleAriaAttribute</h4>
                    <p className='mt-2'>The <code>updateSingleToggleAriaAttribute</code> function allows to systematically update the aria attributes of a single toggle button.</p>
                    <p>The function enables screen reader support for the toggle button. This feature helps visually impaired users to navigate interacting with the toggle button, by informing the users about the current state, and purpose, of each of the toggle button. The states are either checked or not checked. The function updates the aria-checked and aria-label attributes of the toggle button.</p>
                    <p>The function accepts 2 arguments; the class of the toggle button, and the aria label to be updated.</p>

                    <div className='mt-6'>
                      <p className='mb-2'>Let&#39;s begin by importing the fuction</p>
                      <CodeBlockDemo code={singleImport}/>

                      <p className='mb-2 mt-6'>And then we create a function to handle checking/unchecking of the toggle button</p>
                      <CodeBlockDemo code={toggleSingleButton}/>

                      <p className='mb-2 mt-6'>Lastly we create our radio component</p>
                      <CodeBlockDemo code={singleToggle}/>
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

export default Toggle
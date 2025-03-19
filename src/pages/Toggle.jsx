import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { makeBlockAccessible } from 'aria-ease';
import SlideOutNav from '../components/SlideOutNav';
import SideNav from '../components/SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import { Link } from 'react-router-dom';
import SingleToggleButton from '../components/toggle-button/SingleToggleButton';
import GroupToggleButton from '../components/toggle-button/GroupToggleButton';


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
  {pressed: false, ariaLabel: 'Mute notification'},
  {pressed: false, ariaLabel: 'Dark mode'},
  {pressed: false, ariaLabel: 'Enable 2FA'}
])`;
  const handleTogglePressFunction = `const handlePress = (event, index) => {  
  if(event.type === 'mousedown' || (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))) {
    event.preventDefault();
    setToggleButtonsState((prevStates) => {
      const newStates = prevStates.map((state, i) => ({
        ...state,
        pressed: i === index ? !state.pressed : state.pressed,
      }));
      updateGroupTogglesAriaAttributes(newStates, 'group-toggle-button', index);
      return newStates;
    });
  }
}`;

  const togglesComponent = `<div>
  <button className='group-toggle-button block-interactive py-2 px-3 mt-3 text-sm rounded-md' role='button' aria-pressed='false' aria-label='Mute notification' onKeyDown={(event) => handlePress(event, 0)} onMouseDown={(event) => handlePress(event, 0)}>Mute notification</button>
  <button className='group-toggle-button block-interactive py-2 px-3 mt-3 text-sm rounded-md ml-2' role='button' aria-pressed='false' aria-label='Dark mode' onKeyDown={(event) => handlePress(event, 1)} onMouseDown={(event) => handlePress(event, 1)}>Dark mode</button>
  <button className='group-toggle-button block-interactive py-2 px-3 mt-3 text-sm rounded-md ml-2' role='button' aria-pressed='false' aria-label='Enable 2FA' onKeyDown={(event) => handlePress(event, 2)} onMouseDown={(event) => handlePress(event, 2)}>Enable 2FA</button>
</div>`;

  const singleImport = `import { updateSingleToggleAriaAttribute } from "aria-ease";`;
  const toggleSingleButton = `const toggleSingleButton = (event) => {
  if (event.type === 'mousedown' || (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))) {
    event.preventDefault();
    updateSingleToggleAriaAttribute('single-toggle-button');
  }
}`;
  const singleToggle = `<button className='single-toggle-button' role='button' aria-pressed='false' aria-label='Mute notification' onKeyDown={(event) => toggleSingleButton(event)} onMouseDown={(event) => toggleSingleButton(event)}>Mute notification</button>`

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
                  <h1 className='component-example-heading'>Toggle</h1>
                  <p className='mt-2'>Toggle buttons are components that require a full press-and-release cycle to toggle a value. It is similar but not identical to a checkbox. <Link className='underline block-interactive' to='/examples/checkbox' aria-label='Navigate to checkbox component page'>Learn about checkbox component here</Link></p>

                  <div className='mt-10'>
                    <h4>Required ARIA Attributes</h4>
                    <p className='mt-2'>Toggle buttons require specific ARIA attributes to ensure proper accessibility:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>aria-pressed</code>: Indicates the selection state (&#39;true&#39; or &#39;false&#39;)</li>
                      <li><code>aria-label</code>: Provides a descriptive label for screen readers</li>
                    </ul>
                  </div>

                  <div className='mt-4'>
                    <h4>aria-pressed</h4>
                    <p>The <code>aria-pressed</code> attribute indicates the presence of a toggle button. It describes the current &#34;pressed&#34;--or &#34;not pressed&#34;--state of a toggle button. If the aria-pressed attribute is not present, the button is not a toggle button.</p>

                    <h4 className='mt-5'>updateGroupTogglesAriaAttributes</h4>
                    <p className='mt-2'>The <code>updateGroupTogglesAriaAttributes</code> function allows to systematically update the aria-pressed attribute of a group of toggle buttons.</p>
                    <p>The function enables assistive technology support for the toggle buttons. This feature helps visually impaired users to navigate interacting with the toggle buttons, by informing the users about the current state, and purpose, of each of the toggle buttons. The states are either pressed or unpressed.</p>
                    <p>The function accepts 3 arguments; an array of objects with information about each button in the collection, a shared class of all the toggle buttons, and the index position of the currently pressed/unpressed button relative to the toggle buttons container and other toggle buttons.</p>

                    <div>
                      <p className='mb-2'>Let&#39;s begin by importing the fuction</p>
                      <CodeBlockDemo code={importGroupToggles}/>

                      <p className='mb-2 mt-6'>Then we define the states for each toggle button in the collection sequentially (according to the order in which the toggle buttons elements are defined) in a states array.</p>
                      <CodeBlockDemo code={groupStates}/>
                      <p>NOTE: The ariaLabel property in the states object above is simply to keep track of the sequential order of the toggle button in the array and relative to the toggle buttons container. The content of a toggle button&#39;s aria-label must not be changed when the state changes. Do not change a &#34;Mute notification&#34; label to &#34;Unmute notification&#34; simply because the button state changed. So a screen reader will simply say something like &#34;Mute notifaction pressed&#34; and &#34;Mute notification not pressed&#34;, which is intuitive enough for a user relying on it.</p>

                      <p className='mb-2 mt-6'>And then we create a function to handle pressing/unpressing of the toggle buttons. The function uses the index position of the current pressed/unpressed toggle button to update the toggle button state in the states array. Hence toggle button elements and states have to be defined sequentially.</p>
                      <CodeBlockDemo code={handleTogglePressFunction}/>

                      <p className='mb-2 mt-6'>Lastly we create our toggle buttons components</p>
                      <CodeBlockDemo code={togglesComponent}/>
                      <GroupToggleButton/>
                    </div>
                  </div>
                  
                  <div className='mt-10 pt-3'>
                    <h4>updateSingleToggleAriaAttribute</h4>
                    <p className='mt-2'>The <code>updateSingleToggleAriaAttribute</code> function allows to systematically update the aria attributes of a single toggle button.</p>
                    <p>The function enables assistive technology support for the toggle button. This feature helps visually impaired users to navigate interacting with the toggle button, by informing the users about the current state, and purpose, of each of the toggle button. The states are either pressed or unpressed. The function updates the aria-pressed and aria-label attributes of the toggle button.</p>
                    <p>The function accepts 2 arguments; the class of the toggle button, and the aria label to be updated.</p>

                    <div className='mt-6'>
                      <p className='mb-2'>Let&#39;s begin by importing the fuction</p>
                      <CodeBlockDemo code={singleImport}/>

                      <p className='mb-2 mt-6'>And then we create a function to handle pressing/unpressing of the toggle button</p>
                      <CodeBlockDemo code={toggleSingleButton}/>

                      <p className='mb-2 mt-6'>Lastly we create our toggle component</p>
                      <CodeBlockDemo code={singleToggle}/>

                      <SingleToggleButton/>
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
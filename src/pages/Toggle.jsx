import { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import * as Block from 'aria-ease/block';
import SlideOutNav from '../components/SlideOutNav';
import SideNav from '../components/SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import { Link } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const Toggle = ({darkMode, setDarkMode}) => {
    const page = 'toggle-button';
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

  const importGroupToggles = 'import * as Toggle from "aria-ease/toggle";';
  const groupStates = `const[toggleButtonsState, setToggleButtonsState] = useState(() => Array.from({ length: 3 }, () => ({ pressed: false })));`;
const handleTogglePressFunction = `const handlePress = (index) => {  
  setToggleButtonsState((prevStates) => {
    const newStates = prevStates.map((state, i) => ({
    ...state,
    pressed: i === index ? !state.pressed : state.pressed,
  }));
  Toggle.updateToggleAriaAttribute('toggle-div', 'group-toggle-button', newStates, index);
  return newStates;
  });
}`;

const togglesComponent = `<div id='toggle-div'>
  <button className='group-toggle-button block-interactive-items py-2 px-3 mt-3 text-sm rounded-md' aria-pressed={toggleButtonsState[0].pressed} onClick={() => handlePress(0)}>Mute notification</button>
  <button className='group-toggle-button block-interactive-items py-2 px-3 mt-3 text-sm rounded-md' aria-pressed={toggleButtonsState[1].pressed} onClick={() => handlePress(1)}>Dark mode</button>
  <button className='group-toggle-button block-interactive-items py-2 px-3 mt-3 text-sm rounded-md' aria-pressed={toggleButtonsState[2].pressed} onClick={() => handlePress(2)}>Enable 2FA</button>
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
                  <h1 className='component-example-heading'>Toggle</h1>
                  <p className='mt-2'>Toggle buttons are components that require a full press-and-release cycle to toggle a value. It is similar but not identical to a checkbox. <Link className='underline block-interactive' to='/examples/checkbox'>Learn about checkbox component here.</Link></p>

                  <div className='mt-10'>
                    <h4>Required ARIA Attributes</h4>
                    <p className='mt-2'>Toggle buttons require specific ARIA attributes to ensure proper accessibility:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>aria-pressed</code>: Indicates the selection state (&#39;true&#39; or &#39;false&#39;)</li>
                    </ul>
                  </div>

                  <div className='mt-10'>
                    <h4>Optional ARIA Attributes</h4>
                    <p className='mt-2'>These are optional aria attributes:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>aria-label</code>: Provides a descriptive label for assistive technologies. Use for non-text toggle buttons.</li>
                    </ul>
                  </div>

                  <div className='mt-4'>
                    <h4>aria-pressed</h4>
                    <p>The <code>aria-pressed</code> attribute indicates the presence of a toggle button. It describes the current &#34;pressed&#34;--or &#34;not pressed&#34;--state of a toggle button. If the aria-pressed attribute is not present, the button is not a toggle button.</p>

                    <h4 className='mt-4'>aria-label</h4>
                    <p>The <code>aria-label</code> attribute provides a description of the toggle button&#39;s feature, and should not be updated when the toggle button&#39;s state changes.</p>
                    <p className='mt-2'>Do not change a &#34;Mute notification&#34; label to &#34;Unmute notification&#34; simply because the button state changed. So a screen reader will simply say something like &#34;Mute notifaction, pressed&#34; and &#34;Mute notification, not pressed&#34;, which is intuitive enough for a user relying on it.</p>

                    <h4 className='mt-5'>Toggle.updateToggleAriaAttribute</h4>
                    <p className='mt-2'>The <code>Toggle.updateToggleAriaAttribute</code> method allows to systematically update the aria-pressed attribute of a group of toggle buttons.</p>
                    <p className='mt-2'>The method enables assistive technology support for the toggle buttons. This feature helps visually impaired users to navigate interacting with the toggle buttons, by informing the users about the current state, of each of the toggle buttons. The states are either pressed or unpressed.</p>
                    <p className='mt-2'>The method accepts 4 arguments; the id of the toggle button(s) container, a shared class of all the toggle buttons, an array of objects with information about each button in the collection, and the index position of the currently pressed/unpressed button relative to the toggle buttons container and other toggle buttons.</p>

                    <div>
                      <p className='mb-2 mt-2'>Let&#39;s begin by importing the Toggle utility class.</p>
                      <CodeBlockDemo code={importGroupToggles}/>

                      <p className='mb-2 mt-6'>Then we define the states for each toggle button in the collection in a states array.</p>
                      <CodeBlockDemo code={groupStates}/>

                      <p className='mb-2 mt-6'>And then we create a function to handle pressing/unpressing of the toggle buttons. The function uses the index position of the current pressed/unpressed toggle button to update the toggle button state in the states array.</p>
                      <CodeBlockDemo code={handleTogglePressFunction}/>

                      <p className='mb-2 mt-6'>Lastly we create our toggle buttons component.</p>
                      <CodeBlockDemo code={togglesComponent}/>
                    </div>
                  </div>
                  
                  <div className='mt-10 pt-3'>
                    <div className='mt-6'>
                      <div className='mt-10'>
                    <h4>Common Pitfalls to Avoid</h4>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Use aria-label for only non-text toggle buttons</li>
                      <li>When used, don&#39;t change the aria-label based on toggle state</li>
                      <li>Don&#39;t use role=&#34;button&#34; with button elements as it&#39;s redundant</li>
                      <li>Don&#39;t rely solely on color to indicate toggle state</li>
                      <li>Don&#39;t disable keyboard navigation between toggle buttons in a group</li>
                    </ul>
                  </div>

                  <div className='mt-4'>
                    <h4>Use Cases</h4>
                    <ul className='list-disc ml-6 mt-2'>
                      <li>Feature toggles (enable/disable functionality)</li>
                      <li>Preference settings (dark mode, notifications)</li>
                      <li>State controls (mute/unmute, show/hide)</li>
                      <li>Mode switches (edit/view, private/public)</li>
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

export default Toggle
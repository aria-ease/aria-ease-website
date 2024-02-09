import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { makeBlockAccessible } from 'aria-ease';
import SlideOutNav from '../components/SlideOutNav';
import SideNav from '../components/SideNav';
import { Container, Row, Col } from 'react-bootstrap';
import CheckboxExample from '../components/checkbox/CheckboxExample';


const checkboxCode = `import { useState, useEffect } from 'react';
import { makeBlockAccessible, updateCheckboxAriaAttributes } from "aria-ease";

const CheckboxExample = () => {
    const[checkboxState, setCheckboxState] = useState([
        {checked: false, uncheckedAriaLabel: 'Add Math to list of courses', checkedAriaLabel: 'Remove Math from list of courses'},
        {checked: false, uncheckedAriaLabel: 'Add Biology to list of courses', checkedAriaLabel: 'Remove Biology from list of courses'},
        {checked: false, uncheckedAriaLabel: 'Add Philosophy to list of courses', checkedAriaLabel: 'Remove Philosophy from list of courses'}
    ])

    useEffect(() => {
        const checkBoxAccessibility = makeBlockAccessible('checkbox-div', 'course-checkbox');
        return checkBoxAccessibility;
    })

    const handleCheck = (event, index) => {
        const checkboxElement = event.target;
      
        const updateState = () => {
          setCheckboxState((prevStates) => {
            const newStates = prevStates.map((state, i) => ({
              ...state,
              checked: i === index ? !state.checked : state.checked,
            }));
            updateCheckboxAriaAttributes(newStates, 'course-checkbox', index);
            return newStates;
          });
        };
    
        if(event.type === 'keydown' && (event.key === 'Enter' || event.key === ' ')) {
          checkboxElement.checked = !checkboxElement.checked;
        }
        if(event.type === 'change' || (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))) {
          updateState();
        }
    };

    return (
      <div id='checkbox-div'>
        <div>
          <label htmlFor='math'>Math:</label>
          <input type='checkbox' name='math' id='math' className='course-checkbox block-interactive' onChange={(event) => handleCheck(event, 0)} onKeyDown={(event) => handleCheck(event, 0)} aria-checked={false} aria-label='Add Math to list of courses'></input>
        </div>

        <div>
          <label htmlFor='biology'>Biology:</label>
          <input type='checkbox' name='biology' id='biology' className='course-checkbox block-interactive' onChange={(event) => handleCheck(event, 1)} onKeyDown={(event) => handleCheck(event, 1)} aria-checked={false} aria-label='Add Biology to list of courses'></input>
        </div>

        <div>
          <label htmlFor='philosophy'>Philosophy:</label>
          <input type='checkbox' name='philosophy' id='philosophy' className='course-checkbox block-interactive' onChange={(event) => handleCheck(event, 2)} onKeyDown={(event) => handleCheck(event, 2)} aria-checked={false} aria-label='Add Philosophy to list of courses'></input>
        </div>
      </div>
    )
}

export default CheckboxExample
`


// eslint-disable-next-line react/prop-types
const Checkbox = ({darkMode, setDarkMode}) => {
    const page = 'checkbox';
    const[showDropdownPage, setShowDropdownPage] = useState(false);

  useEffect(() => {
    if(showDropdownPage) {
      document.querySelector('body').classList.add('no-scroll')
    } else {
      document.querySelector('body').classList.remove('no-scroll')
    }
  },[showDropdownPage])
    
  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('inner-body-div', 'block-interactive');
    return accessibleBlock;
  },[])
  return (
    <div id="inner-body-div">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>
        
        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className='side-body-div'>
                  <h1 className='component-example-heading'>Checkbox</h1>
                  <p>The updateCheckboxAriaAttributes function enables screen reader support for the checkboxes. This feature helps visually impaired users to navigate interacting with the checkboxes, by informing the users about the current state, and purpose, of each of the accordion. The states are either checked or not checked. The function updates the aria-checked and aria-label attributes of the checkbox.</p>
                  <p>The function accepts 3 arguments; an array of objects with information about each checkbox in the collection, a shared class of all the checkboxes, and the index position of the currently clicked checkbox relative to the main checkboxes container and other checkboxes.</p>
                  <p>The checkboxes have keyboard navigation support using the makeBlockAccessible function.</p>
                  <CheckboxExample/>
                  <pre>
                      <div className='code-div'>
                        <code>
                          {checkboxCode}
                        </code>
                      </div>
                  </pre>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className={`slide-out-side-nav-outer-div ${showDropdownPage ? 'visible' : 'hidden'}`}>
          <div className={`slide-out-side-nav-div ${showDropdownPage ? 'slide-in' : ''}`}>
            <SlideOutNav page={page}/>
          </div>
        </div>
    </div>
  )
}

export default Checkbox
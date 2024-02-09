import { useState } from 'react';
import { updateCheckboxAriaAttributes } from "aria-ease";
import '../styles.css';

const CheckboxExample = () => {
    const[checkboxState, setCheckboxState] = useState([
        {checked: false, uncheckedAriaLabel: 'Add Math to list of courses', checkedAriaLabel: 'Remove Math from list of courses'},
        {checked: false, uncheckedAriaLabel: 'Add Biology to list of courses', checkedAriaLabel: 'Remove Biology from list of courses'},
        {checked: false, uncheckedAriaLabel: 'Add Philosophy to list of courses', checkedAriaLabel: 'Remove Philosophy from list of courses'}
    ])

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
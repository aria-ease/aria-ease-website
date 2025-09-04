import { useState } from 'react';
import { Checkbox } from "aria-ease";
import '../styles.css';

const CheckboxExample = () => {
    const[checkboxState, setCheckboxState] = useState([ {checked: false}, {checked: false}, {checked: false} ])

    const handleCheck = (event, index) => {
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
    };

    return (
      <div id='checkbox-div' className='checkbox-container flex flex-col gap-[1rem] p-[1rem]'>
      <div className='checkbox-item flex items-center gap-[0.75rem]'>
        <label htmlFor='math' className='checkbox-label'>Math</label>
        <input 
          type='checkbox' 
          name='math' 
          id='math' 
          className='course-checkbox w-[1.25rem] h-[1.25rem] block-interactive'
          onChange={(event) => handleCheck(event, 0)} 
          onKeyDown={(event) => handleCheck(event, 0)} 
          aria-checked={checkboxState[0].checked} 
          aria-label='Math course'
        />
      </div>

      <div className='checkbox-item flex items-center gap-[0.75rem]'>
        <label htmlFor='biology' className='checkbox-label'>Biology</label>
        <input 
          type='checkbox' 
          name='biology' 
          id='biology' 
          className='course-checkbox w-[1.25rem] h-[1.25rem] block-interactive'
          onChange={(event) => handleCheck(event, 1)} 
          onKeyDown={(event) => handleCheck(event, 1)} 
          aria-checked={checkboxState[1].checked} 
          aria-label='Biology course'
        />
      </div>

      <div className='checkbox-item flex items-center gap-[0.75rem]'>
        <label htmlFor='philosophy' className='checkbox-label'>Philosophy</label>
        <input 
          type='checkbox' 
          name='philosophy' 
          id='philosophy' 
          className='course-checkbox w-[1.25rem] h-[1.25rem] block-interactive'
          onChange={(event) => handleCheck(event, 2)} 
          onKeyDown={(event) => handleCheck(event, 2)} 
          aria-checked={checkboxState[2].checked} 
          aria-label='Philosophy course'
        />
      </div>
  </div>
    )
}

export default CheckboxExample
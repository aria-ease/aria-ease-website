import { useState } from 'react';
import { updateGroupRadiosAriaAttributes } from "aria-ease";

const GroupRadio = () => {
    const[radioState, setRadioState] = useState([
      {checked: false, ariaLabel: 'Financial type'},
      {checked: false, ariaLabel: 'Non-financial type'},
      {checked: false, ariaLabel: 'Partly financial type'}
    ]);

    const handleRadioCheck = (event, index) => {
      setRadioState((prevStates) => {
        const newStates = prevStates.map((state, i) => ({
          ...state,
          checked: i === index ? true : false,
        }));
        updateGroupRadiosAriaAttributes(newStates, 'radio', index);
        return newStates;
      });     
    }

  return ( 
    <div id='radio-div'>
        <form className='mt-3'>
            <div className='flex items-center gap-4'>
              <label htmlFor='financial'>Financial</label>
              <input type='radio' id='financial' value='financial' name='radio-group' className='radio w-[1rem] h-[1rem]' aria-label='Financial type' onChange={(event) => handleRadioCheck(event, 0)} aria-checked={false}></input>
            </div>
            
            <div className='flex items-center gap-4'>
              <label htmlFor='non-financial'>Non-financial</label>
              <input type='radio' id='non-financial' value='non-financial' name='radio-group' className='radio w-[1rem] h-[1rem]' aria-label='Non-financial type' onChange={(event) => handleRadioCheck(event, 1)} aria-checked={false}></input>
            </div>
            
            <div className='flex items-center gap-4'>
              <label htmlFor='partly-financial'>Partly financial</label>
              <input type='radio' id='partly-financial' value='partly-financial' name='radio-group' className='radio w-[1rem] h-[1rem]' aria-label='Partly financial type' onChange={(event) => handleRadioCheck(event, 2)} aria-checked={false}></input>  
            </div>
        </form>
    </div>
  )
}

export default GroupRadio
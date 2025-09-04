import { useState } from 'react';
import { Radio } from 'aria-ease';

const GroupRadio = () => {
    const[radioState, setRadioState] = useState([ {checked: false}, {checked: false}, {checked: false} ]);

    const handleRadioCheck = (event, index) => {
        setRadioState((prevStates) => {
            const newStates = prevStates.map((state, i) => ({
            ...state,
            checked: i === index ? true : false,
            }));
            Radio.updateRadioAriaAttributes('radio-div', 'radio', newStates, index);
            return newStates;
        });     
    }
    
  return (
    <div id='radio-div'>
        <form>
            <div>
                <label htmlFor='financial'>Financial</label>
                <input type='radio' className='radio block-interactive' id='financial' value='financial' name='radio-group' aria-label='Financial type' onChange={(event) => handleRadioCheck(event, 0)} aria-checked={radioState[0].checked}></input>
            </div>
                    
            <div>
                <label htmlFor='non-financial'>Non-financial</label>
                <input type='radio' className='radio block-interactive' id='non-financial' value='non-financial' name='radio-group' aria-label='Non-financial type' onChange={(event) => handleRadioCheck(event, 1)} aria-checked={radioState[1].checked}></input>
            </div>
                    
            <div>
                <label htmlFor='partly-financial'>Partly financial</label>
                <input type='radio' className='radio block-interactive' id='partly-financial' value='partly-financial' name='radio-group' aria-label='Partly financial type' onChange={(event) => handleRadioCheck(event, 2)} aria-checked={radioState[2].checked}></input>  
            </div>
        </form>
    </div>
  )
}

export default GroupRadio
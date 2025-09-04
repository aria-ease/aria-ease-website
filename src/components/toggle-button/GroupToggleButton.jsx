import { useState } from 'react';
import { Toggle } from 'aria-ease';

const GroupToggleButton= () => {
    const[toggleButtonsState, setToggleButtonsState] = useState([{pressed: false}, {pressed: false}, {pressed: false}]);

    const handlePress = (index) => {  
        setToggleButtonsState((prevStates) => {
            const newStates = prevStates.map((state, i) => ({
                ...state,
                pressed: i === index ? !state.pressed : state.pressed,
            }));
            Toggle.updateToggleAriaAttribute('toggle-div', 'group-toggle-button', newStates, index);
            return newStates;
        });
    }

  return (
    <div id='toggle-div' className='flex items-center gap-3'>
        <button className='group-toggle-button block-interactive-items py-2 px-3 mt-3 text-sm rounded-md' aria-pressed={toggleButtonsState[0].pressed} onClick={() => handlePress(0)}>Mute notification</button>
        <button className='group-toggle-button block-interactive-items py-2 px-3 mt-3 text-sm rounded-md' aria-pressed={toggleButtonsState[1].pressed} onClick={() => handlePress(1)}>Dark mode</button>
        <button className='group-toggle-button block-interactive-items py-2 px-3 mt-3 text-sm rounded-md' aria-pressed={toggleButtonsState[2].pressed} onClick={() => handlePress(2)}>Enable 2FA</button>
    </div>
  )
}

export default GroupToggleButton
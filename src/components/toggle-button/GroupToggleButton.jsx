import { useState } from 'react';
import { updateGroupTogglesAriaAttributes } from "aria-ease";

const GroupToggleButton = () => {
    const[toggleButtonsState, setToggleButtonsState] = useState([
      {pressed: false, ariaLabel: 'Mute notification'},
      {pressed: false, ariaLabel: 'Dark mode'},
      {pressed: false, ariaLabel: 'Enable 2FA'}
    ]);

    const handlePress = (event, index) => {  
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
    }

  return (
    <div>
      <button className='group-toggle-button block-interactive py-2 px-3 mt-3 text-sm rounded-md' role='button' aria-pressed='false' aria-label='Mute notification' onKeyDown={(event) => handlePress(event, 0)} onMouseDown={(event) => handlePress(event, 0)}>Mute notification</button>
      <button className='group-toggle-button block-interactive py-2 px-3 mt-3 text-sm rounded-md ml-2' role='button' aria-pressed='false' aria-label='Dark mode' onKeyDown={(event) => handlePress(event, 1)} onMouseDown={(event) => handlePress(event, 1)}>Dark mode</button>
      <button className='group-toggle-button block-interactive py-2 px-3 mt-3 text-sm rounded-md ml-2' role='button' aria-pressed='false' aria-label='Enable 2FA' onKeyDown={(event) => handlePress(event, 2)} onMouseDown={(event) => handlePress(event, 2)}>Enable 2FA</button>
    </div>
  )
}

export default GroupToggleButton
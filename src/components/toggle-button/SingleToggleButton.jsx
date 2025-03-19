import { updateSingleToggleAriaAttribute } from 'aria-ease';

const SingleToggleButton = () => {
    const toggleSingleButton = (event) => {
        if (event.type === 'mousedown' || (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))) {
            event.preventDefault();
            updateSingleToggleAriaAttribute('single-toggle-button');
        }
    }
  return (
    <button className='single-toggle-button block-interactive py-2 px-3 mt-3 text-sm rounded-md' role='button' aria-pressed='false' aria-label='Mute notification' onKeyDown={(event) => toggleSingleButton(event)} onMouseDown={(event) => toggleSingleButton(event)}>Mute notification</button>
  )
}

export default SingleToggleButton
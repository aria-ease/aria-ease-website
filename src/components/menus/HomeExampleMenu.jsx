import { makeMenuAccessible, updateMenuTriggerAriaAttributes, cleanUpMenuEventListeners } from 'aria-ease'

const HomeExampleMenu = () => {
    const toggleMenuDisplay = (event) => {
      if (event.type === 'mousedown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const menu = document.querySelector('#custom-menu')
        if(getComputedStyle(menu).display === 'none') {
          menu.style.display = 'block'
          makeMenuAccessible('custom-menu', 'profile-menu-item');
          updateMenuTriggerAriaAttributes('display-button', 'Hide profile menu')
        } else {
          cleanUpMenuEventListeners('custom-menu', 'profile-menu-item')
          menu.style.display = 'none'
          updateMenuTriggerAriaAttributes('display-button', 'Display profile menu')
        }
      }
    }
  return (
    <div>
      <button
        id="display-button"
        onMouseDown={toggleMenuDisplay}
        aria-haspopup={true}
        aria-pressed={false}
        aria-expanded={false}
        aria-controls="custom-menu"
        aria-label="Display profile menu"
        className='home-menu-example-trigger-button block-interactive'
        onKeyDown={toggleMenuDisplay}
      >
        Display Example Menu
      </button>
      <div id="custom-menu" role="menu" aria-labelledby="display-button" style={{display: 'none', marginTop: '5px'}}>
        <button role="menuitem" className="profile-menu-item" onClick={() => alert('Button clicked')}>One</button>
        <button role="menuitem" className="profile-menu-item" onClick={() => alert('Button clicked')}>Two</button>
        <button role="menuitem" className="profile-menu-item" onClick={() => alert('Button clicked')}>Three</button>
      </div>
    </div>
  )
}

export default HomeExampleMenu
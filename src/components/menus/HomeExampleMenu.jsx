import { useRef, useEffect } from 'react';
import * as Menu from 'aria-ease/menu';

const HomeExampleMenu = () => {
  const menuRef = useRef();

  useEffect(() => {
    menuRef.current = Menu.makeMenuAccessible({
      menuId: "custom-menu",
      menuElementsClass: "profile-menu-item",
      triggerId: "display-button"
    });
  }, [])

  const toggleMenuDisplay = () => {
    const menuDiv = document.querySelector("#custom-menu");
    if (getComputedStyle(menuDiv).display === "none") {
      menuRef.current.openMenu();
    } else {
      menuRef.current.closeMenu();
    }
  };

  return (
    <div className='mt-2 mb-3'>
      <button
        id="display-button"
        onClick={toggleMenuDisplay}
        aria-haspopup={true}
        aria-expanded={false}
        aria-controls="custom-menu"
        aria-label="Profile menu"
        className='home-menu-example-trigger-button block-interactive'
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
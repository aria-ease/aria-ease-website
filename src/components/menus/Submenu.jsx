import { useEffect, useRef } from 'react';
import * as Menu from 'aria-ease/menu';

const SubMenu = () => {
  const menuRef = useRef();

  useEffect(() => {
    const triggerButton = document.querySelector("#display-button");
    const menuDiv = document.querySelector("#menu-div");
        
    if (!triggerButton || !menuDiv) {
        console.error('[SubMenu] Required elements not found');
        return;
    }

    menuRef.current = Menu.makeMenuAccessible({
        menuId: "menu-div",
        menuItemsClass: "profile-menu-items",
        triggerId: "display-button",
        callback: {
            onOpenChange: (isOpen) => {
                // Do something when 
                console.log(isOpen);
            }
        }
    });

    return () => {
        if (menuRef.current) {
            menuRef.current.cleanup();
        }
    };
  }, [])

  return (
    <div>
      <button
        id="display-button"
        className='home-menu-example-trigger-button'
      >
        Display Example Menu
      </button>
      <div id="menu-div" style={{display: 'none', marginTop: '5px'}}>
        <button className="profile-menu-items" onClick={() => console.log('Button clicked')}>One</button>
        <button 
          id="submenu-trigger"
          className="profile-menu-items"
          data-submenu-id="submenu-div"
        >
          Two (has submenu) →
        </button>
        <div 
          id="submenu-div"   
          style={{display: 'none', marginLeft: '10px', marginTop: '2px'}}
        >
          <button className="profile-menu-items" onClick={() => console.log('Submenu A clicked')}>Submenu A</button>
          <button className="profile-menu-items" onClick={() => console.log('Submenu B clicked')}>Submenu B</button>
          <button className="profile-menu-items" onClick={() => console.log('Submenu C clicked')}>Submenu C</button>
        </div>
        <button className="profile-menu-items" onClick={() => console.log('Button clicked')}>Three</button>
      </div>
    </div>
  )
}

export default SubMenu
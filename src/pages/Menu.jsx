import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import SlideOutNav from '../components/SlideOutNav'
import { useState, useEffect } from 'react'
import { makeBlockAccessible } from 'aria-ease'
import HomeExampleMenu from '../components/menus/HomeExampleMenu'
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';


const firstMenuCode = `import { useEffect} from 'react'
import { makeMenuAccessible, updateMenuTriggerAriaAttributes, cleanUpMenuEventListeners, makeBlockAccessible } from 'aria-ease'

const HomeExampleMenu = () => {
  const toggleMenuDisplay = (event) => {
    if (event.type === 'mousedown' || (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))) {
      event.preventDefault();
      const menu = document.querySelector('#menu-div');
      if (getComputedStyle(menu).display === 'none') {
        menu.style.display = 'block';
        makeMenuAccessible('menu-div', 'profile-menu-items');
        updateMenuTriggerAriaAttributes('display-button', 'Close profile menu');
      } else {
        cleanUpMenuEventListeners('menu-div', 'profile-menu-items');
        menu.style.display = 'none';
        updateMenuTriggerAriaAttributes('display-button', 'Open profile menu');
      }
    }
  };

  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('menu-div', 'profile-menu-item');
    return accessibleBlock;
  })

  return (
    <div>
      <button
        id="display-button"
        onMouseDown={toggleMenuDisplay}
        aria-haspopup={true}
        role="button"
        aria-expanded={false}
        aria-controls="menu-div"
        aria-label="Display profile menu"
        className='home-menu-example-trigger-button block-interactive'
        onKeyDown={toggleMenuDisplay}
      >
        Display Example Menu
      </button>
      <div id="menu-div" role="menu" aria-labelledby="display-button" style={{display: 'none', marginTop: '5px'}}>
        <button role="menuitem" className="profile-menu-items" onClick={() => alert('Button clicked')}>One</button>
        <button role="menuitem" className="profile-menu-items" onClick={() => alert('Button clicked')}>Two</button>
        <button role="menuitem" className="profile-menu-items" onClick={() => alert('Button clicked')}>Three</button>
      </div>
    </div>
  )
}

export default HomeExampleMenu`


// eslint-disable-next-line react/prop-types
const Examples = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'menu'

  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('inner-body-div', 'block-interactive');
    return accessibleBlock;
  },[])

  return (
    <div id="inner-body-div" className='menu-example-page-div'>
        <ScrollTracker page={page}/>
        <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>
        
        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className='side-body-div'>
                  <h1 className='component-example-heading'>Menu</h1>
                  <span>A component that toggles display and has a list of interactive children items e.g dropdowns, combo boxes, slide out menu navigations.</span>

                  <div className='example-each-ui-code-block-div'>
                    <h5 className='mb-1'>Buttons Menu</h5>
                    <p>This creates a focus trap within the displayed menu. The Arrow keys navigates the focus within the trap in a cycle. The Space and Enter keys &#34;clicks&#34; the interactive element. The Escape key closes the menu, and returns the focus back to the button that toggles the menu. The Tab key exits the trap.</p>
                    <p>The toggle button has keyboard interaction support using the makeBlockAccessible function.</p>
                    <HomeExampleMenu/>
                    <CodeBlockDemo code={firstMenuCode}/>
                    <p>The onMouseDown and onKeyDown event handlers are used in place of the onClick event handler because the package uses a click() function to handle key press, which means if using the onClick event, two events are being acted upon, which leads to a conflict and irregular results.</p>
                    <p>When you click on an element that has been enabled for keyboard interaction using the package, with the keyboard, on the package end a keydown event listens for key interactions and carries out a respective action based on the pressed key. Using the onClick event handler in the component carries out the same action which causes unexpected results, hence using onMouseDown and onKeyDown on the button to trigger it.</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        
        <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  )
}

export default Examples
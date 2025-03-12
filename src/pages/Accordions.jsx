import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import SlideOutNav from '../components/SlideOutNav'
import { makeBlockAccessible } from 'aria-ease'
import AccordionExample from '../components/accordions/AccordionExample';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';


const firstAccordionCode = `import { useState, useEffect } from 'react';
import openeddropdown from '../../assets/opened-dropdown.svg';
import closeddropdown from '../../assets/closed-dropdown.svg';
import { makeBlockAccessible, updateAccordionTriggerAriaAttributes } from "aria-ease";


const AccordionExample = () => {
  const[isAccordionShown, setIsAccordionShown] = useState([
    {display: false, closedAriaLabel: 'Expand information on how to make appointment', openedAriaLabel: 'Collapse information on how to make appointment'},
    {display: false, closedAriaLabel: 'Expand information on how to get copy of records', openedAriaLabel: 'Collapse information on how to get copy of records'},
    {display: false, closedAriaLabel: 'Expand information on extra charge for copy of records', openedAriaLabel: 'Collapse information on extra charge for copy of records'}
  ])

  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('faq-div', 'faq-div-items');
    return accessibleBlock;
  },[])

  const handleAccordionClick = (event, index) => {
    if (event.type === 'mousedown' || (event.type === 'keydown' && (event.key === 'Enter' || event.key === ' '))) {
      event.preventDefault();
      setIsAccordionShown((prevStates) => {
        const newStates = prevStates.map((state, i) => ({
          ...state,
          display: i === index ? !state.display : false,
        }));
        updateAccordionTriggerAriaAttributes(newStates, 'dropdown-button', index);
        return newStates;
      });
    }
  };
      
  return (
    <div id='faq-div' className='faq-div'>
      <div className='faq-each-div'>
        <button id='make-an-appointment' className='dropdown-button faq-div-items block-interactive' onKeyDown={(event) => handleAccordionClick(event, 0)} onMouseDown={(event) => handleAccordionClick(event, 0)} aria-expanded={false} aria-label='Expand information on how to make appointment'>
          <span className='dropdown-heading-text'>How do I make an appointment?</span>
          {isAccordionShown[0].display ? 
            <img src={openeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img> :
            <img src={closeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img>
          }
        </button>
        {isAccordionShown[0].display ? 
          <div className='faq-each-text-div'>
            <p>If you would like to make an appointent with any one of our practitioners, please contact our reception staff. Alternatively you can book an appointment online. Every effort will be made to accomodate your preferred time and choice of practitioner</p>
          </div> : 
          null
        }
      </div>

      <div className='faq-each-div'>
        <button id='copy-of-record' className='dropdown-button faq-div-items block-interactive' onKeyDown={(event) => handleAccordionClick(event, 1)} onMouseDown={(event) => handleAccordionClick(event, 1)} aria-expanded={false} aria-label='Expand information on how to get copy of records'>
          <span className='dropdown-heading-text'>How do I get a copy of my record?</span>
          {isAccordionShown[1].display ? 
            <img src={openeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img> :
            <img src={closeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img>
          }
        </button>
        {isAccordionShown[1].display ? 
          <div className='faq-each-text-div'>
            <p>If you would like to get a copy of your record, please contact our customer support team. Alternatively you can come into the hospital.</p>
          </div> : 
          null
        }
      </div>

      <div className='faq-each-div'>
        <button id='extra-charge' className='dropdown-button faq-div-items block-interactive' onKeyDown={(event) => handleAccordionClick(event, 2)} onMouseDown={(event) => handleAccordionClick(event, 2)} aria-expanded={false} aria-label='Expand information on extra charge for copy of record'>
          <span className='dropdown-heading-text'>Is there a charge for extra copies?</span>
          {isAccordionShown[2].display ? 
            <img src={openeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img> :
            <img src={closeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img>
          }
        </button>
        {isAccordionShown[2].display ? 
          <div className='faq-each-text-div'>
            <p>The first copy is free and subsequent copies cost $1 per copy. This cost covers printing and mailing.</p>
          </div> : 
          null
        }
      </div>
    </div>
  )
}

export default AccordionExample`


// eslint-disable-next-line react/prop-types
const Accordions = ({darkMode, setDarkMode}) => {
  const page = 'accordions'
  const[showDropdownPage, setShowDropdownPage] = useState(false);
    
  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('inner-body-div', 'block-interactive');
    return accessibleBlock;
  },[])


  return (
    <div id="inner-body-div" className='accordion-example-page-div'>
        <ScrollTracker page={page}/>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>

        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className='side-body-div'>
                  <h1 className='component-example-heading'>Accordion</h1>
                  <span>A vertically stacked component that expands and collapses to reveal and hide content respectively. The difference between this and a menu is that a menu has a list interactive items, with the first item being focused when the menu is opened, while an accordion only contains non-interactive content.</span>
                  <p>If you have a component with a combination of both interactive and non-interactive elements, that requires the interactive elements to be keyboard interactive and focused, use a menu instead.</p>
                  <p>The updateAccordionTriggerAriaAttributes function enables screen reader support for the accordions. This feature helps visually impaired users to navigate interacting with the accordions, by informing the users about the current state, and purpose, of each of the accordion. The states are either expanded or not expanded. The function updates the aria-expanded and aria-label attributes of the accordion toggle button.</p>
                  <p>The function accepts 3 arguments; an array of objects with information about each accordion in the collection, a shared class of all the accordion triggers, and the index position of the currently clicked trigger relative to the main accordion container and other trigger buttons.</p>
                  <p>The toggle buttons have keyboard interaction support using the makeBlockAccessible function.</p>
                  <AccordionExample/>
                  <CodeBlockDemo code={firstAccordionCode}/>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        
        <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  )
}

export default Accordions
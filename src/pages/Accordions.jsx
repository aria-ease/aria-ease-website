import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import SlideOutNav from '../components/SlideOutNav'
import * as Block from 'aria-ease/block'
import AccordionExample from '../components/accordions/AccordionExample';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import { Link } from 'react-router-dom'


const firstAccordionCode = `import { useState, useEffect } from 'react';
import * as Accordion from "aria-ease/accordion";


const AccordionExample = () => {
  const[accordionState, setAccordionState] = useState(() => Array.from({ length: 3 }, () => ({ display: false })));

  
  const handleAccordionClick = (index) => {
    setAccordionState((prevStates) => {
      const newStates = prevStates.map((state, i) => ({
        ...state,
        display: i === index ? !state.display : false,
      }));
      Accordion.updateAccordionTriggerAriaAttributes('faq-div', 'dropdown-button', newStates, index);
      return newStates;
    });
  };
      
  return (
    <div id='faq-div'>
      <div className='faq-each-div'>
        <button id='make-an-appointment' className='dropdown-button faq-div-items block-interactive' onClick={() => handleAccordionClick(0)} aria-expanded={accordionState[0].display} aria-controls='makeAnAppointmentAccordion'>
          <span className='dropdown-heading-text'>How do I make an appointment?</span>
        </button>
        {isAccordionShown[0].display && (
          <div className='faq-each-text-div' id='makeAnAppointmentAccordion'>
            <p>If you would like to make an appointent with any one of our practitioners, please contact our reception staff. Alternatively you can book an appointment online. Every effort will be made to accomodate your preferred time and choice of practitioner</p>
          </div>
        )}
      </div>

      <div className='faq-each-div'>
        <button id='copy-of-record' className='dropdown-button faq-div-items block-interactive' onClick={() => handleAccordionClick(1)} aria-expanded={accordionState[1].display} aria-controls='copyOfRecordsAccordion'>
          <span className='dropdown-heading-text'>How do I get a copy of my record?</span>
        </button>
        {isAccordionShown[1].display && (
          <div className='faq-each-text-div' id="copyOfRecordsAccordion">
            <p>If you would like to get a copy of your record, please contact our customer support team. Alternatively you can come into the hospital.</p>
          </div>
        )}
      </div>

      <div className='faq-each-div'>
        <button id='extra-charge' className='dropdown-button faq-div-items block-interactive' onClick={() => handleAccordionClick(2)} aria-expanded={accordionState[2].display} aria-controls='extraCopyChargeAccordion'>
          <span className='dropdown-heading-text'>Is there a charge for extra copies?</span>
        </button>
        {isAccordionShown[2].display && (
          <div className='faq-each-text-div' id='extraCopyChargeAccordion'>
            <p>The first copy is free and subsequent copies cost $1 per copy. This cost covers printing and mailing.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccordionExample`


// eslint-disable-next-line react/prop-types
const Accordions = ({darkMode, setDarkMode}) => {
  const page = 'accordions'
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
    
    const mainBlockCleanupRef = useRef(null);
  
    // Initialize main block on mount
    useEffect(() => {
      mainBlockCleanupRef.current = Block.makeBlockAccessible('inner-body-div', 'block-interactive');
      return () => {
        if (mainBlockCleanupRef.current) {
          mainBlockCleanupRef.current();
          mainBlockCleanupRef.current = null;
        }
      };
    }, []);
  
    // Clean up main block listeners when search is visible, re-enable when hidden
    useEffect(() => {
      if (resultsVisible) {
        if (mainBlockCleanupRef.current) {
          mainBlockCleanupRef.current();
          mainBlockCleanupRef.current = null;
        }
      } else {
        if (!mainBlockCleanupRef.current) {
          mainBlockCleanupRef.current = Block.makeBlockAccessible('inner-body-div', 'block-interactive');
        }
      }
    }, [resultsVisible]);


  return (
    <div id="inner-body-div">
        <ScrollTracker page={page}/>
        <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage} resultsVisible={resultsVisible} setResultsVisible={setResultsVisible}/>

        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                <div className='side-body-div'>
                  <h1 className='component-example-heading'>Accordion</h1>
                  <p className='mt-2'>A vertically stacked component that expands and collapses to reveal and hide multiple sections of content respectively. Typically used for FAQs, multi-step forms e.t.c. The difference between this and a menu is that a menu has a list interactive items, with the first item being focused when the menu is opened, while an accordion only contains non-interactive content.</p>
                  <p className='mt-2'>If you have a component with a combination of both interactive and non-interactive elements, that requires the interactive elements to be keyboard interactive and focused, use a menu instead. <Link className='underline block-interactive' to='/examples/menu'>Learn about menu component here.</Link></p>

                  <div className='mt-10'>
                    <h4>Required ARIA Attributes</h4>
                    <p className='mt-2'>Accordions require specific ARIA attributes to ensure proper accessibility:</p>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>aria-expanded</code>: Indicates the expanded state (&#39;true&#39; or &#39;false&#39;).</li>
                      <li><code>aria-controls</code>: Identifies the element (or elements) whose contents or presence are controlled by the element on which this attribute is set.</li>
                    </ul>
                  </div>

                  <div className='mt-10'>
                    <h4>Optional ARIA Attributes</h4>
                    <ul className='list-disc ml-6 mt-2'>
                      <li><code>aria-label</code>: Provides a descriptive label for screen readers. Use only for non-text accordion triggers.</li>
                      <li><code>aria-labelledby</code>: Identifies the element (or elements) that controls the element on which this attribute is set.</li>
                    </ul>
                  </div>

                    <h4 className='mt-4'>aria-expanded</h4>
                    <p className='mt-0'>The <code>aria-expanded</code> attribute indicates to assistive technologies the presence of an interactive element, typically a button, that controls an expandable item. It indicates the current &#34;expanded&#34;--or &#34;not expanded&#34;--state of the item. If the aria-expanded attribute is not present, a user will not be able to correctly identify the item as controlling an expandable item.</p>

                    <h4 className='mt-4'>aria-controls</h4>
                    <p className='mt-0'>The <code>aria-controls</code> attribute identifies the element (or elements) whose contents or presence are controlled by the element on which the attribute is set, regardless of what type of interaction initiates the impacted behavior.</p>

                    <h4 className='mt-4'>aria-label</h4>
                    <p className='mt-0'>The <code>aria-label</code> attribute provides a description of the expandable item control for screen reader users. It typically contains a detailed purpose of the button. It should only be used with non-text triggers and text triggers are descriptive enough for assistive technologies.</p>

                    <h4 className='mt-4'>aria-labelledby</h4>
                    <p className='mt-0 mb-10'>The <code>aria-labelledby</code> attribute identifies the element (or elements) that labels the element it is applied to.</p>

                  <p>The <code>Accordion.updateAccordionTriggerAriaAttributes</code> method enables assistive technology support for the accordions. This feature helps visually impaired users to navigate interacting with the accordions, by informing the users about the current state, and purpose, of each of the accordion. The states are either expanded or not expanded. The method updates the aria-expanded and aria-label attributes of the accordion toggle button.</p>
                  <p className='mt-2'>The method accepts 4 arguments; id of the accordion triggers parent container, the shared class of all the accordion triggers, an array of objects with information about each accordion in the collection, and the index position of the currently clicked trigger relative to the main accordion container and other trigger buttons.</p>
                  <p className='mt-2'>The trigger buttons have keyboard interaction support using the Block.makeBlockAccessible(params) method.</p>
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
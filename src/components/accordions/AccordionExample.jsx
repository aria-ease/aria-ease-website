import { useEffect, useRef, useState } from 'react'
import openeddropdown from '../../assets/opened-dropdown.svg'
import closeddropdown from '../../assets/closed-dropdown.svg'
import * as Accordion from 'aria-ease/accordion'

const AccordionExample = () => {
  const accordionRef = useRef(null);
  const [openStates, setOpenStates] = useState(Array(3).fill(false));

  useEffect(() => {
    // Initialize accordion with automatic state management
    accordionRef.current = Accordion.makeAccordionAccessible({
      accordionId: 'faq-div',
      triggersClass: 'dropdown-button',
      panelsClass: 'faq-each-text-div',
      allowMultipleOpen: false, // Only one panel open at a time
      callback: {
        onExpand: (index) => {
          setOpenStates(prev => {
            const newStates = [...prev];
            newStates[index] = true;
            return newStates;
          });
        },
        onCollapse: (index) => {
          setOpenStates(prev => {
            const newStates = [...prev];
            newStates[index] = false;
            return newStates;
          });
        }
      }
    });

    // Cleanup on unmount
    return () => {
      if (accordionRef.current) {
        accordionRef.current.cleanup();
      }
    };
  }, []);
      
  return (
    <div className='faq-div' id='faq-div' data-test-id='accordion-group'>
            <div className='faq-each-div'>
                <button id='make-an-appointment' className='dropdown-button'  aria-controls='makeAnAppointmentAccordion' data-test-id='accordion-trigger'>
                    <span className='dropdown-heading-text text-black'>How do I make an appointment?</span>
                    {openStates[0] ? 
                        <img src={openeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img> :
                        <img src={closeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img>
                    }
                </button>
                <div className='faq-each-text-div' id='makeAnAppointmentAccordion' aria-labelledby='make-an-appointment'>
                    <p>If you would like to make an appointent with any one of our practitioners, please contact our reception staff. Alternatively you can book an appointment online. Every effort will be made to accomodate your preferred time and choice of practitioner</p>
                </div>
            </div>

            <div className='faq-each-div'>
                <button id='copy-of-record' className='dropdown-button' aria-controls='copyOfRecordsAccordion' data-test-id='accordion-trigger'>
                    <span className='dropdown-heading-text text-black'>How do I get a copy of my record?</span>
                    {openStates[1] ? 
                        <img src={openeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img> :
                        <img src={closeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img>
                    }
                </button>
                <div className='faq-each-text-div' id="copyOfRecordsAccordion" aria-labelledby='copy-of-record'>
                    <p>If you would like to get a copy of your record, please contact our customer support team. Alternatively you can come into the hospital.</p>
                </div>
            </div>

            <div className='faq-each-div'>
                <button id='extra-charge' className='dropdown-button' aria-controls='extraCopyChargeAccordion' data-test-id='accordion-trigger'>
                    <span className='dropdown-heading-text text-black'>Is there a charge for extra copies?</span>
                    {openStates[2] ? 
                        <img src={openeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img> :
                        <img src={closeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img>
                    }
                </button>
                <div className='faq-each-text-div' id='extraCopyChargeAccordion' aria-labelledby='extra-charge'>
                    <p>The first copy is free and subsequent copies cost $1 per copy. This cost covers printing and mailing.</p>
                </div>
            </div>
    </div>
  )
}

export default AccordionExample
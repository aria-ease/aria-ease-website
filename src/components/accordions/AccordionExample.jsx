import { useState } from 'react'
import openeddropdown from '../../assets/opened-dropdown.svg'
import closeddropdown from '../../assets/closed-dropdown.svg'
import { Accordion } from 'aria-ease'

const AccordionExample = () => {
  const[accordionState, setAccordionState] = useState([ {display: false}, {display: false}, {display: false} ]);

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
    <div className='faq-div' id='faq-div'>
            <div className='faq-each-div'>
                <button id='make-an-appointment' className='dropdown-button block-interactive' onClick={() => handleAccordionClick(0)} aria-expanded={accordionState[0].display}  aria-controls='makeAnAppointmentAccordion'>
                    <span className='dropdown-heading-text'>How do I make an appointment?</span>
                    {accordionState[0].display ? 
                        <img src={openeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img> :
                        <img src={closeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img>
                    }
                </button>
                {accordionState[0].display ? 
                    <div className='faq-each-text-div' id='makeAnAppointmentAccordion' aria-labelledby='make-an-appointment'>
                        <p>If you would like to make an appointent with any one of our practitioners, please contact our reception staff. Alternatively you can book an appointment online. Every effort will be made to accomodate your preferred time and choice of practitioner</p>
                    </div> : 
                    null
                }
            </div>

            <div className='faq-each-div'>
                <button id='copy-of-record' className='dropdown-button block-interactive' onClick={() => handleAccordionClick(1)} aria-expanded={accordionState[1].display} aria-controls='copyOfRecordsAccordion'>
                    <span className='dropdown-heading-text'>How do I get a copy of my record?</span>
                    {accordionState[1].display ? 
                        <img src={openeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img> :
                        <img src={closeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img>
                    }
                </button>
                {accordionState[1].display ? 
                    <div className='faq-each-text-div' id="copyOfRecordsAccordion" aria-labelledby='copy-of-record'>
                        <p>If you would like to get a copy of your record, please contact our customer support team. Alternatively you can come into the hospital.</p>
                    </div> : 
                    null
                }
            </div>

            <div className='faq-each-div'>
                <button id='extra-charge' className='dropdown-button block-interactive' onClick={() => handleAccordionClick(2)} aria-expanded={accordionState[2].display} aria-controls='extraCopyChargeAccordion'>
                    <span className='dropdown-heading-text'>Is there a charge for extra copies?</span>
                    {accordionState[2].display ? 
                        <img src={openeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img> :
                        <img src={closeddropdown} alt='Dropdown Icon' className='dropdown-icon-image'></img>
                    }
                </button>
                {accordionState[2].display ? 
                    <div className='faq-each-text-div' id='extraCopyChargeAccordion' aria-labelledby='extra-charge'>
                        <p>The first copy is free and subsequent copies cost $1 per copy. This cost covers printing and mailing.</p>
                    </div> : 
                    null
                }
            </div>
        </div>
  )
}

export default AccordionExample
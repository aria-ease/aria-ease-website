import DocsFrame from "../../components/DocsFrame";
import { useState } from 'react';
import SlideOutNav from "../../components/SlideOutNav";

// eslint-disable-next-line react/prop-types
const AccordionDsl = ({ darkMode, setDarkMode }) => {
    const[showDropdownPage, setShowDropdownPage] = useState(false);
    const page = 'accordion-dsl';

  return (
    <div id="inner-body-div">
        <DocsFrame
        page={page}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showDropdownPage={showDropdownPage}
        setShowDropdownPage={setShowDropdownPage}
      >
        <div className='side-body-div docs-flow'>
            Accordion DSL
        </div>
      </DocsFrame>

       <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  )
}

export default AccordionDsl
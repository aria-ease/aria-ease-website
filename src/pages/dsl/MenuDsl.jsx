import DocsFrame from "../../components/DocsFrame";
import { useState } from 'react';
import SlideOutNav from "../../components/SlideOutNav";

// eslint-disable-next-line react/prop-types
const MenuDsl = ({ darkMode, setDarkMode }) => {
    const[showDropdownPage, setShowDropdownPage] = useState(false);
    const page = 'menu-dsl';

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
          <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
            <span className='docs-kicker black-grey-text'>DSL</span>
            <h1 className='introduction-heading black-white-text'>Menu <span className='text-gradient'>DSL</span></h1>
            <p className='mt-2'>
              The Menu DSL (Domain-Specific Language) defines a fluent, testable contract for accessible menu components. It enables automated, robust accessibility validation by describing expected ARIA roles, attributes, relationships, and user interactions in a declarative way.
            </p>
          </div>
        </div>
      </DocsFrame>

       <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  )
}

export default MenuDsl
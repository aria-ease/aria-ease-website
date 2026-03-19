import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import SideNav from '../components/SideNav';
import { useState, useEffect, useRef } from 'react';
import SlideOutNav from '../components/SlideOutNav';
import * as Block from 'aria-ease/block';
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';
import CalloutPanel from '../components/CalloutPanel';
import { CheckCircleIcon, ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line react/prop-types
const MigrationGuide = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'migration';
  const [resultsVisible, setResultsVisible] = useState(false);
  const mainBlockCleanupRef = useRef(null);

  useEffect(() => {
    mainBlockCleanupRef.current = Block.makeBlockAccessible({ blockId: 'inner-body-div', blockItemsClass: 'block-interactive' });
    return () => {
      if (mainBlockCleanupRef.current) {
        mainBlockCleanupRef.current.cleanup();
        mainBlockCleanupRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (resultsVisible) {
      if (mainBlockCleanupRef.current) {
        mainBlockCleanupRef.current.cleanup();
        mainBlockCleanupRef.current = null;
      }
    } else {
      if (!mainBlockCleanupRef.current) {
        mainBlockCleanupRef.current = Block.makeBlockAccessible({ blockId: 'inner-body-div', blockItemsClass: 'block-interactive' });
      }
    }
  }, [resultsVisible]);

  return (

    
    <div id="inner-body-div">
      <Helmet>
            <title>Migration Guide | Aria-Ease</title>
            <meta name="description" content="Upgrade your Aria-Ease implementation to the latest version with confidence. Learn about new features, API changes, and recommended migration steps." />
          </Helmet>
          <a
        href="#main-content"
        className="skip-to-content-link absolute left-2 top-2 px-4 py-2 rounded-md"
        tabIndex={0}
      >
        Skip to Content
      </a>
      <ScrollTracker page={page}/>
      <Header 
        page={page} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        showDropdownPage={showDropdownPage} 
        setShowDropdownPage={setShowDropdownPage} 
        resultsVisible={resultsVisible} 
        setResultsVisible={setResultsVisible}
      />
      
      <main className='page-body-div documentation-page section-tone-a' id="main-content">
        <Container fluid>
          <Row>
            <SideNav page={page}/>
            <Col xs={12} sm={12} md={12} lg={9} className='px-0'>
              <div className='side-body-div docs-flow'>
                <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                  <span className='docs-kicker black-grey-text'>Upgrade Path</span>
                  <h1 className='introduction-heading black-white-text'>Migration <span className='text-gradient'>Guide</span></h1>
                  <p className='mt-2 docs-intro-copy'>Upgrade your Aria-Ease implementation to the latest version with confidence.</p>
                </div>

                {/* v5.0.0 Migration */}
                <section className='side-body-sections-div tone-card tone-card-base docs-section-card'>
                  <h2 className='text-3xl font-bold mb-4'>Migrating to v5.0.0</h2>
                  <CalloutPanel tone='danger' title='Breaking Changes' className='mb-8' titleAs='h3'>
                    <p className='mb-2'>
                      The <code>update*AriaAttributes</code> utilities have been <strong>removed</strong> in v5.0.0. You must migrate to the new <code>make*Accessible</code> APIs for all components.
                    </p>
                    <p>See the <a href="/changelog" className="text-link-contrast underline">changelog</a> for full details.</p>
                  </CalloutPanel>
                  <div className='mb-8'>
                    <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-green-300' : 'text-green-800'}`}>✅ Migration Steps</h3>
                    <ol className='list-decimal ml-6 space-y-2'>
                      <li>Replace all <code>update*AriaAttributes</code> calls with the corresponding <code>make*Accessible</code> API for each component (accordion, menu, checkbox, radio, toggle, etc).</li>
                      <li>Update your imports to use the new component-specific paths if not already done:<br/>
                        <CodeBlockDemo code={`import { makeAccordionAccessible } from "aria-ease/accordion";\nimport { makeCheckboxAccessible } from "aria-ease/checkbox";\n// ...`} />
                      </li>
                      <li>Review the <a href="/changelog" className={`${darkMode ? 'text-blue-400' : 'text-blue-700'} underline`}>changelog</a> for any additional breaking changes or migration notes.</li>
                      <li>Run your test suite and manually verify all interactive components for correct ARIA and keyboard behavior.</li>
                    </ol>
                  </div>
                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3 text-link-contrast'>📝 Example Migration</h3>
                    <h4 className='font-semibold mb-2 mt-4'>Before (v4.x):</h4>
                    <CodeBlockDemo code={`import { updateAccordionTriggerAriaAttributes } from "aria-ease";\n\nupdateAccordionTriggerAriaAttributes("container", "trigger", states, 0);`} />
                    <h4 className='font-semibold mb-2 mt-4'>After (v5.x):</h4>
                    <CodeBlockDemo code={`import { makeAccordionAccessible } from "aria-ease/accordion";\n\nconst accordion = makeAccordionAccessible({\n  accordionId: "container",\n  triggersClass: "trigger",\n  panelsClass: "panel"\n});\n// Use accordion.toggleItem(), accordion.expandItem(), etc.`} />
                  </div>
                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>Why the Change?</h3>
                    <ul className='list-disc ml-6 space-y-2'>
                      <li>Unified, modern API for all components</li>
                      <li>Smaller bundle size and better tree-shaking</li>
                      <li>Consistent return values and lifecycle management</li>
                      <li>Improved accessibility and keyboard support</li>
                    </ul>
                  </div>
                </section>
                

                {/* v1.x to v2.x */}
                <section className='side-body-sections-div tone-card tone-card-alt docs-section-card'>
                  <h2 className='text-3xl font-bold mb-4'>Migrating to v5.x</h2>
                  <p className='mb-6'>Version 5.0.0 introduces new features and API improvements. API changes are breaking and require code updates.</p>


                  <div className='mb-8'>
                    <h3 className='font-semibold mb-2 mt-4'>1. Menu API Changed to Object Parameters</h3>
                    <div className='mb-4'>
                      <p className='text-sm mb-1 text-contrast-medium'>v1.x (Old):</p>
                      <CodeBlockDemo code={`Menu.makeMenuAccessible(\n  "menu-id",\n  "menu-item-class",\n  "trigger-id"\n);`}/>
                    </div>
                    <div className='mb-4'>
                      <p className='text-sm mb-1 text-contrast-medium'>v2.x - v5.x (New):</p>
                      <CodeBlockDemo code={`Menu.makeMenuAccessible({\n  menuId: "menu-id",\n  menuItemsClass: "menu-item-class",\n  triggerId: "trigger-id"\n});`}/>
                    </div>

                    <h4 className='font-semibold mb-2 mt-6'>2. Parameter Name Changed: menuElementsClass → menuItemsClass</h4>
                    <p className='mb-2'>The menu items class parameter was renamed for clarity:</p>
                    <div className='mb-4'>
                      <p className='text-sm mb-1 text-contrast-medium'>v1.x:</p>
                      <CodeBlockDemo code={`menuElementsClass: "menu-item"`}/>
                    </div>
                    <div className='mb-4'>
                      <p className='text-sm mb-1 text-contrast-medium'>v2.x - v5.x (New):</p>
                      <CodeBlockDemo code={`menuItemsClass: "menu-item"`}/>
                    </div>

                    <h4 className='font-semibold mb-2 mt-6'>3. Block API Returns Object with cleanup Method</h4>
                    <div className='mb-4'>
                      <p className='text-sm mb-1 text-contrast-medium'>v1.x:</p>
                      <CodeBlockDemo code={`const cleanup = Block.makeBlockAccessible("block-id", "item-class");\ncleanup(); // Direct function call`}/>
                    </div>
                    <div className='mb-4'>
                      <p className='text-sm mb-1 text-contrast-medium'>v2.x:</p>
                      <CodeBlockDemo code={`const blockRef = Block.makeBlockAccessible("block-id", "item-class");\nblockRef.cleanup(); // Call cleanup method`}/>
                    </div>

                    <div className='mb-4'>
                      <p className='text-sm mb-1 text-contrast-medium'>v4.x:</p>
                      <CodeBlockDemo code={`const blockRef = Block.makeBlockAccessible({ blockId: "block-id", blockItemsClass: "item-class" });\nblockRef.cleanup(); // Call cleanup method`}/>
                    </div>

                    <div className='mb-4'>
                      <p className='text-sm mb-1 text-contrast-medium'>v5.x (New):</p>
                      <CodeBlockDemo code={`const accordionRef = Accordion.makeAccordionAccessible({
  accordionId: 'faq-div',
  triggersClass: 'dropdown-button',
  panelsClass: 'accordion-panel',
  allowMultipleOpen: false, // Only one panel open at a time
});\naccordionRef.cleanup(); // Call cleanup method`}/>
                    </div>

                    <h4 className='font-semibold mb-2 mt-6'>4. All Components Now Return Cleanup Objects</h4>
                    <p className='mb-2'>For consistency, all components now return objects with cleanup methods:</p>
                    <CodeBlockDemo code={`// Menu\nconst menuRef = Menu.makeMenuAccessible({...});\nmenuRef.cleanup();\n\n// Block\nconst blockRef = Block.makeBlockAccessible({ blockId: "id", blockItemsClass: "class" });\nblockRef.cleanup();`}/>
                  </div>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3 text-link-contrast'>📋 Migration Checklist</h3>
                    <ul className='space-y-3'>
                      <li>
                        <div className='flex items-center gap-2'>
                          <CheckCircleIcon size={15} className='max-w-5'/>
                          <span>Update Menu API calls to use object parameters</span>
                        </div>
                      </li>
                      <li className='flex items-start justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                          <CheckCircleIcon size={15} className='max-w-5'/>
                          <span>Replace <code>menuElementsClass</code> with <code>menuItemsClass</code></span>
                        </div>
                      </li>
                      <li className='flex items-start justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                          <CheckCircleIcon size={15} className='max-w-5'/>
                          <span>Update cleanup calls from <code>cleanup()</code> to <code>ref.cleanup()</code></span>
                        </div>
                      </li>
                      <li className='flex items-start justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                          <CheckCircleIcon size={15} className='max-w-5'/>
                          <span>Test all components after migration</span>
                        </div>
                      </li>
                      <li className='flex items-start justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                          <CheckCircleIcon size={15} className='max-w-5'/>
                          <span>Update to component-specific imports for tree-shaking</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className='mb-8'>
                    <h3 className='text-xl font-semibold mb-3'>Automated Migration Script</h3>
                    <p className='mb-3'>Use this script to automatically update most v1.x code:</p>
                    <CodeBlockDemo code={`#!/bin/bash
# Replace menuElementsClass with menuItemsClass
find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | \\
  xargs sed -i '' 's/menuElementsClass/menuItemsClass/g'

# Note: Menu API structure changes require manual updates
echo "⚠️  Manual updates required for Menu API calls"
echo "✅  menuElementsClass → menuItemsClass replacements complete"`}/>
                  </div>
                </section>

                {/* Best Practices */}
                <section className='side-body-sections-div tone-card tone-card-base docs-section-card'>
                  <h2 className='text-3xl font-bold mb-4'>Best Practices for Upgrades</h2>
                  
                  <div className='space-y-6'>
                    <div>
                      <h3 className='text-xl font-semibold mb-2'>1. Test in a Development Environment</h3>
                      <p>Always test upgrades in a non-production environment first. Run your test suite and perform manual testing.</p>
                    </div>

                    <div>
                      <h3 className='text-xl font-semibold mb-2'>2. Update Dependencies Gradually</h3>
                      <p>If you have a large codebase, update one component type at a time (e.g., all menus, then all blocks).</p>
                    </div>

                    <div>
                      <h3 className='text-xl font-semibold mb-2'>3. Use TypeScript</h3>
                      <p>TypeScript will catch API changes at compile time, making migrations safer.</p>
                      <CodeBlockDemo code={`// TypeScript will show errors for incorrect API usage\nconst menu = Menu.makeMenuAccessible({\n  menuId: "my-menu",\n  // TypeScript error if you use old parameter name\n  menuElementsClass: "item" // ❌ Error!\n});`}/>
                    </div>

                    <div>
                      <h3 className='text-xl font-semibold mb-2'>4. Check the Changelog</h3>
                      <p>Review the <a href="/changelog" className="text-blue-500 underline block-interactive">full changelog</a> for detailed information about all changes between versions.</p>
                    </div>

                    <div>
                      <h3 className='text-xl font-semibold mb-2'>5. Pin Versions in Production</h3>
                      <p>Use exact versions in package.json to avoid unexpected updates:</p>
                      <CodeBlockDemo code={`{
  "dependencies": {
    "aria-ease": "5.0.0"  // ✅ Exact version
    // Not: "^5.0.0" or "~5.0.0"
  }
}`}/>
                    </div>
                  </div>
                </section>

                {/* Getting Help */}
                <section className='side-body-sections-div tone-card tone-card-alt docs-section-card'>
                  <h2 className='text-2xl font-bold mb-4 black-white-text'>Need Help?</h2>
                  <p className='mb-4 black-grey-text'>If you encounter issues during migration:</p>
                  <ul className='list-disc ml-6 space-y-2 black-grey-text'>
                    <li><a href="https://github.com/aria-ease/aria-ease/issues" target="_blank" rel="noreferrer" className="text-link-contrast underline">Open an issue on GitHub</a></li>
                    <li><a href="https://github.com/aria-ease/aria-ease/discussions" target="_blank" rel="noreferrer" className="text-link-contrast underline">Ask questions in Discussions</a></li>
                    <li>Review the <a href="/api" className="text-link-contrast underline block-interactive">API Reference</a> for detailed documentation</li>
                  </ul>
                </section>

                <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 justify-between mt-[100px]'>
                  <a href='/api' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>API Reference</span>
                      </div>
                    </a>
                    <a href='/examples' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Examples</span>
                      </div>
                      <ChevronRightCircleIcon/>
                    </a>
                  </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      
      <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  );
};

export default MigrationGuide;

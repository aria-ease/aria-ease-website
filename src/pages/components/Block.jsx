import SlideOutNav from '../../components/SlideOutNav'
import { useState } from 'react'
import CalloutPanel from '../../components/CalloutPanel';
import { ChevronRightCircleIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import DocsFrame from '../../components/DocsFrame';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const BlockExample = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'block';

  return (

    
    <div className='block-example-page-div' id="inner-body-div">
      <Helmet>
            <title>Block | Aria-Ease</title>
            <meta name="description" content="Learn about the Block component in Aria-Ease, which provides an accessible focus management system for related interactive children items like tabs, sliders, and carousels." />
            <meta name="keywords" content="Block component, accessible focus management, ARIA attributes, keyboard interaction, tabs, sliders, carousels, React example" />
            <meta name="og:title" content="Block | Aria-Ease" />
            <meta name="og:description" content="Learn about the Block component in Aria-Ease, which provides an accessible focus management system for related interactive children items like tabs, sliders, and carousels." />
            <meta name="og:url" content="https://ariaease.site/components/block" />
            <meta name="twitter:title" content="Block | Aria-Ease" />
            <meta name="twitter:description" content="Learn about the Block component in Aria-Ease, which provides an accessible focus management system for related interactive children items like tabs, sliders, and carousels." />
            <meta name="twitter:card" content="summary_large_image" />
          </Helmet>
         
         <DocsFrame 
         page={page}
         darkMode={darkMode}
        setDarkMode={setDarkMode}
        showDropdownPage={showDropdownPage}
        setShowDropdownPage={setShowDropdownPage}>
          <div className='side-body-div docs-flow'>
                      <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
                        <span className='docs-kicker black-grey-text'>Component</span>
                        <h1 className='introduction-heading black-white-text'>Block <span className='text-gradient'>Component</span></h1>
                        <p className='mt-2'>A statically displayed component that has a list of related interactive children items e.g tabs, interactive sliders, carousels, and entire web pages.</p>
                      </div>

                      <CalloutPanel title='Bundle Size' tone='info'>
                        <p className='mt-2'>The block component is tree-shakable and weighs approximately <strong>1.7KB</strong> when imported individually.</p>
                        <code className='block mt-2 p-2 text-sm'>
                          <p>import * as Block from &quot;aria-ease/block&quot;;</p>
                          <p className='my-4'>or</p>
                          <p>import &#123; makeBlockAccessible &#125; from &quot;aria-ease/block&quot;;</p>
                        </code>
                      </CalloutPanel>

                      <section>
                          <h2>Common Use Cases</h2>
                          <ul className='list-disc ml-6 mt-2'>
                            <li>Form field groups</li>
                            <li>Interactive widgets (carousels, tabs)</li>
                            <li>Modal dialogs</li>
                            <li>Grid-based interfaces</li>
                            <li>Entire web pages</li>
                          </ul>
                        </section>

                      <section>
                        <h2>Block Component Overview</h2>
                        <p className='mt-2'>The Block component creates an accessible focus management system that:</p>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Maintains focus within a designated container</li>
                          <li>Provides consistent keyboard interaction patterns</li>
                          <li>Supports various interactive element types</li>
                          <li>Enhances screen reader navigation</li>
                        </ul>
                      </section>

                      <section>
                        <h2 className='mt-5'>Parameters:</h2>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>blockId</code> (string): ID of the block container</li>
                        <li><code>blockItemsClass</code> (string): Shared class for all block item</li>
                      </ul>
                      </section>

                  <section>
                    <h2 className='mt-5'>Returns:</h2>
                      <ul className='list-disc ml-6 mt-2'>
                        <li><code>cleanup()</code>: Remove event listeners</li>
                        <li><code>refresh()</code>: Re-initialize block (useful for dynamic content)</li>
                      </ul>
                  </section>

                  <section>
                    <h2>Keyboard Interaction</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li><code>↑</code> / <code>←</code>: Move focus to previous item</li>
                          <li><code>↓</code> / <code>→</code>: Move focus to next item</li>
                          <li><code>Home</code>: Move focus to first item</li>
                          <li><code>End</code>: Move focus to last item</li>
                          <li><code>Tab</code>: Exit the focus trap</li>
                        </ul>
                  </section>

                  <section>
                    <h2>Implementation Requirements</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Container must have a unique ID</li>
                          <li>Interactive elements must share a common class</li>
                          <li>Elements should be semantically related</li>
                          <li>Container should have a logical tab order</li>
                        </ul>
                  </section>

                      <section>
                        <h2>Best Practices</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Group related interactive elements</li>
                          <li>Maintain consistent spacing between items</li>
                          <li>Provide visible focus indicators</li>
                          <li>Consider mobile touch targets (minimum 44x44px)</li>
                          <li>Ensure logical content order matches visual order</li>
                          <li>Always call cleanup function when component unmounts</li>
                        </ul>
                      </section>

                      <CalloutPanel title='React StrictMode' tone='yellow' className='mt-10'>
                        <p className='mt-2'>If using React StrictMode, be aware it intentionally calls effects twice in development. This can cause issues with imperative DOM manipulation. Either remove <code className='px-1 py-0.5 text-sm'>&lt;React.StrictMode&gt;</code> in development, or use proper cleanup functions as shown in the examples above to prevent double-initialization.</p>
                      </CalloutPanel>

                       <section>
                        <h2>Troubleshooting</h2>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Ensure unique IDs for containers</li>
                          <li>Verify all interactive elements share the specified class</li>
                          <li>Check for proper cleanup in component unmount</li>
                          <li>Test keyboard interaction in all directions</li>
                          <li>Verify focus trap behavior with screen readers</li>
                        </ul>
                      </section>

                      

                    <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 mt-[100px] justify-between'>
                    <Link to='/components/accordion' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>Accordion Component</span>
                      </div>
                    </Link>
                    <Link to='/components/checkbox' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
                      <div className='flex flex-col w-full items-end'>
                        <span className='text-sm black-white-text'>Next</span>
                        <span className='next-link-text text-md'>Checkbox Component</span>
                      </div>
                      <ChevronRightCircleIcon/>
                    </Link>
                  </div>
                  </div>
         </DocsFrame>
        
        <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  )
}

export default BlockExample
import Header from '../components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import SideNav from '../components/SideNav'
import SlideOutNav from '../components/SlideOutNav'
import { useState, useEffect } from 'react'
import HomeTabExampleOne from '../components/tabs/HomeTabExampleOne'
import TextInputBlock from '../components/tabs/TextInputBlock'
import { makeBlockAccessible } from 'aria-ease'
import CodeBlockDemo from '../components/CodeBlock';
import ScrollTracker from '../components/ScrollTracker';


const firstBlockCode = `import { useEffect } from 'react'
import { makeBlockAccessible } from "aria-ease"

const App = () => {
  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('block-div', 'block-interactive-items');
    return accessibleBlock;
  },[])

  return (
    <div>
      <div id="block-div">
        <button className="block-interactive-items">One</button>
        <button className="block-interactive-items">Two</button>
        <button className="block-interactive-items">Three</button>
        <button className="block-interactive-items">Four</button>
      </div>
    </div>
  )
}

export default App`

const secondBlockCode = `import { makeBlockAccessible } from 'aria-ease'
import { useEffect } from 'react'

const TextInputBlock = () => {
  useEffect(() => {
    const accessibleBlock = makeBlockAccessible('text-input-block-div', 'text-input-block-items');
    return accessibleBlock;
  })

  return (
    <div id="text-input-block-div">
        <div className='each-text-input-block-div'>
          <input type="text" placeholder='Name' className='text-input-block-items'></input>
        </div>
        <div className='each-text-input-block-div'>
          <input type="text" placeholder='Email' className='text-input-block-items'></input>
        </div>
        <div className='each-text-input-block-div'>
          <input type="text" placeholder='Phone' className='text-input-block-items'></input>
        </div>
    </div>
  )
}

export default TextInputBlock`


// eslint-disable-next-line react/prop-types
const Block = ({darkMode, setDarkMode}) => {
  const[showDropdownPage, setShowDropdownPage] = useState(false);
  const page = 'tab'

    useEffect(() => {
      const accessibleBlock = makeBlockAccessible('inner-body-div', 'block-interactive');
      return accessibleBlock;
    },[])

  return (
    <div className='block-example-page-div' id="inner-body-div">
        <ScrollTracker page={page}/>
        <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} showDropdownPage={showDropdownPage} setShowDropdownPage={setShowDropdownPage}/>
        
        <div className='page-body-div'>
          <Container fluid>
            <Row>
              <SideNav page={page}/>
              <Col xs={12} sm={12} md={9} lg={9}>
                  <div className='side-body-div'>
                      <h1 className='component-example-heading'>Block</h1>
                      <p className='mt-2'>A statically displayed component that has a list of related interractive children items e.g tabs, interactive sliders, carousels, and entire web page body.</p>

                      <div className='mt-4'>
                        <h4>Block Component Overview</h4>
                        <p className='mt-2'>The Block component creates an accessible focus management system that:</p>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Maintains focus within a designated container (entire pages even)</li>
                          <li>Provides consistent keyboard navigation patterns</li>
                          <li>Supports various interactive element types</li>
                          <li>Enhances screen reader navigation</li>
                        </ul>
                      </div>

                      <div className='mt-4'>
                        <h4>Keyboard Navigation</h4>
                        <ul className='list-disc ml-6 mt-2'>
                          <li><code>↑</code> / <code>←</code>: Move focus to previous item</li>
                          <li><code>↓</code> / <code>→</code>: Move focus to next item</li>
                          <li><code>Home</code>: Move focus to first item</li>
                          <li><code>End</code>: Move focus to last item</li>
                          <li><code>Tab</code>: Exit the focus trap</li>
                        </ul>
                      </div>

                      <div className='mt-4'>
                        <h4>Implementation Requirements</h4>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Container must have a unique ID</li>
                          <li>Interactive elements must share a common class</li>
                          <li>Elements should be semantically related</li>
                          <li>Container should have a logical tab order</li>
                        </ul>
                      </div>

                      <div className='mt-4'>
                        <h4>Best Practices</h4>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Group related interactive elements</li>
                          <li>Maintain consistent spacing between items</li>
                          <li>Provide visible focus indicators</li>
                          <li>Consider mobile touch targets (minimum 44x44px)</li>
                          <li>Ensure logical content order matches visual order</li>
                        </ul>
                      </div>

                      <div className='example-each-ui-code-block-div mt-6'>
                        <h5>Buttons Block</h5>
                        <p className='mt-2'>This creates a focus trap within the buttons tab block. The Arrow keys navigates the focus within the trap in a cycle. The Space and Enter keys &#34;clicks&#34; the interactive element. The Tab key exits the trap.</p>
                        <HomeTabExampleOne/>
                        <CodeBlockDemo code={firstBlockCode}/>
                      </div>

                      <div className='example-each-ui-code-block-div mt-6'>
                        <h5>Text Input Block</h5>
                        <p className='mt-2'>This creates a focus trap within the text input block. The Arrow keys navigates the focus within the trap in a cycle. The Tab key exits the trap.</p>
                        <TextInputBlock/>
                        <div className='mt-2'>
                          <CodeBlockDemo code={secondBlockCode}/>
                        </div>

                        <div className='mt-10'>
                        <h4>Common Use Cases</h4>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Form field groups</li>
                          <li>Interactive widgets (carousels, tabs)</li>
                          <li>Modal dialogs</li>
                          <li>Grid-based interfaces</li>
                        </ul>
                      </div>

                      <div className='mt-4'>
                        <h4>Troubleshooting</h4>
                        <ul className='list-disc ml-6 mt-2'>
                          <li>Ensure unique IDs for containers</li>
                          <li>Verify all interactive elements share the specified class</li>
                          <li>Check for proper cleanup in component unmount</li>
                          <li>Test keyboard navigation in all directions</li>
                          <li>Verify focus trap behavior with screen readers</li>
                        </ul>
                      </div>
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

export default Block
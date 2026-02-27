import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import CodeBlockDemo from './CodeBlock';

/**
 * InteractivePlayground Component
 * 
 * An embedded code editor that allows users to try aria-ease directly in the docs
 * without installing anything. Similar to CodeSandbox/StackBlitz but lightweight.
 * 
 * Future enhancements:
 * - Integrate Monaco Editor for better code editing
 * - Add live preview pane with iframe
 * - Support multiple examples (Menu, Accordion, Block, etc.)
 * - Add error handling and console output
 * - Save/share functionality
 */

// eslint-disable-next-line react/prop-types
const InteractivePlayground = ({ darkMode, initialExample = 'menu' }) => {
  const [selectedExample, setSelectedExample] = useState(initialExample);
  const [isRunning, setIsRunning] = useState(false);
  const previewRef = useRef(null);

  const examples = {
    menu: {
      title: 'Dropdown Menu',
      description: 'Create an accessible dropdown menu with keyboard interaction',
      html: `<button 
  id="menu-button" 
  aria-expanded="false" 
  aria-controls="dropdown-menu"
  aria-haspopup="true"
>
  Menu
</button>

<div 
  id="dropdown-menu" 
  style="display: none;"
  aria-labelledby="menu-button"
  role="menu"
>
  <a role="menuitem" href="#" class="menu-item">Profile</a>
  <a role="menuitem" href="#" class="menu-item">Settings</a>
  <button role="menuitem" class="menu-item">Sign Out</button>
</div>`,
      js: `import * as Menu from "aria-ease/menu";

const menu = Menu.makeMenuAccessible({
  menuId: "dropdown-menu",
  menuItemsClass: "menu-item",
  triggerId: "menu-button"
});

// Toggle menu on click
document.getElementById("menu-button")
  .addEventListener("click", () => {
    const menuEl = document.getElementById("dropdown-menu");
    if (menuEl.style.display === "none") {
      menu.openMenu();
    } else {
      menu.closeMenu();
    }
  });`,
      css: `#menu-button {
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

#dropdown-menu {
  position: absolute;
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  min-width: 200px;
}

.menu-item {
  display: block;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #1f2937;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.menu-item:hover,
.menu-item:focus {
  background: #f3f4f6;
  outline: none;
}`
    },
    accordion: {
      title: "Accordion",
      description: "Update ARIA attributes for accordion panels",
      html: `<div id="accordion">
  <button 
    class="accordion-trigger" 
    aria-expanded="false"
    aria-controls="panel-1"
  >
    Section 1
  </button>
  <div id="panel-1" hidden>
    Content for section 1
  </div>
  
  <button 
    class="accordion-trigger" 
    aria-expanded="false"
    aria-controls="panel-2"
  >
    Section 2
  </button>
  <div id="panel-2" hidden>
    Content for section 2
  </div>
</div>`,
      js: `import { updateAccordionTriggerAriaAttributes } from "aria-ease/accordion";

const accordionStates = [
  { expanded: false },
  { expanded: false }
];

const triggers = document.querySelectorAll(".accordion-trigger");

triggers.forEach((trigger, index) => {
  trigger.addEventListener("click", () => {
    // Toggle the clicked panel
    accordionStates[index].expanded = !accordionStates[index].expanded;
    
    // Update ARIA attributes
    updateAccordionTriggerAriaAttributes(
      "accordion",
      "accordion-trigger",
      accordionStates,
      index
    );
    
    // Show/hide panel
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));
    panel.hidden = !accordionStates[index].expanded;
  });
});`,
      css: `.accordion-trigger {
  display: block;
  width: 100%;
  padding: 1rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  text-align: left;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.accordion-trigger:hover {
  background: #e5e7eb;
}

.accordion-trigger[aria-expanded="true"] {
  background: #2563eb;
  color: white;
}

div[id^="panel-"] {
  padding: 1rem;
  border: 1px solid #d1d5db;
  margin-bottom: 1rem;
}`
    },
    block: {
      title: "Form Block Navigation",
      description: "Enable arrow key navigation in form inputs",
      html: `<div id="form-block">
  <input 
    type="text" 
    placeholder="First Name" 
    class="form-input"
  />
  <input 
    type="text" 
    placeholder="Last Name" 
    class="form-input"
  />
  <input 
    type="email" 
    placeholder="Email" 
    class="form-input"
  />
  <input 
    type="tel" 
    placeholder="Phone" 
    class="form-input"
  />
</div>`,
      js: `import * as Block from "aria-ease/block";

const blockInstance = Block.makeBlockAccessible(
  "form-block",
  "form-input"
);

// Clean up when done
// blockInstance.cleanup();`,
      css: `.form-input {
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}`
    }
  };

  const currentExample = examples[selectedExample];

  const handleRun = () => {
    setIsRunning(true);
    // In a real implementation, this would:
    // 1. Load aria-ease from CDN
    // 2. Execute the code in an iframe
    // 3. Show the live result
    setTimeout(() => setIsRunning(false), 1000);
  };

  const handleReset = () => {
    // Reset the preview to initial state
    if (previewRef.current) {
      previewRef.current.innerHTML = '';
    }
  };

  return (
    <div className={`interactive-playground rounded-xl overflow-hidden border-2 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
      {/* Header with example selector */}
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">Try it Yourself</h3>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className={`px-3 py-1.5 rounded flex items-center gap-2 text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              aria-label="Reset playground"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`px-4 py-1.5 rounded flex items-center gap-2 text-sm font-semibold ${isRunning ? 'opacity-50 cursor-not-allowed' : ''} bg-blue-600 hover:bg-blue-700 text-white`}
              aria-label="Run code"
            >
              <Play size={14} />
              {isRunning ? 'Running...' : 'Run'}
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          {Object.keys(examples).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedExample(key)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                selectedExample === key
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {examples[key].title}
            </button>
          ))}
        </div>
        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {currentExample.description}
        </p>
      </div>

      {/* Code sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className={`p-4 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs ${darkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-100 text-orange-800'}`}>HTML</span>
              </h4>
              <div className="text-xs overflow-x-auto">
                <CodeBlockDemo code={currentExample.html} darkMode={darkMode} />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs ${darkMode ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`}>JavaScript</span>
              </h4>
              <div className="text-xs overflow-x-auto">
                <CodeBlockDemo code={currentExample.js} darkMode={darkMode} isLineNumber={true} />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs ${darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>CSS</span>
              </h4>
              <div className="text-xs overflow-x-auto">
                <CodeBlockDemo code={currentExample.css} darkMode={darkMode} />
              </div>
            </div>
          </div>
        </div>

        {/* Preview pane */}
        <div className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <h4 className="text-sm font-semibold mb-3">Live Preview</h4>
          <div 
            ref={previewRef}
            className={`min-h-[400px] p-4 rounded border-2 border-dashed ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <p className="mb-2">🎮 Interactive Preview</p>
                <p className="text-sm">Click &#34;Run&#34; to see the example in action</p>
                <p className="text-xs mt-4 text-gray-400">
                  (Coming soon: Full interactive editor powered by Monaco + iframe)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with tips */}
      <div className={`p-3 text-xs border-t ${darkMode ? 'border-gray-700 bg-gray-900 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
        <strong>💡 Tip:</strong> Try using Tab, Arrow keys, Enter, and Escape to navigate the preview
      </div>
    </div>
  );
};

export default InteractivePlayground;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './BATest.css';

// eslint-disable-next-line react/prop-types
const BATest = ({ darkMode }) => {
  const[accessibilityLevel, setAccessibilityLevel] = useState(0);
  const[showAriaLabel, setShowAriaLabel] = useState(false);
  const[showAriaChecked, setShowAriaChecked] = useState(false);
  const[isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    setShowAriaLabel(accessibilityLevel >= 30);
    setShowAriaChecked(accessibilityLevel >= 60);
  }, [accessibilityLevel]);

  const getToggleColors = () => {
    const baseColor = darkMode ? '59, 130, 246' : '37, 99, 235';
    const contrast = Math.min(100, accessibilityLevel * 1.5);
    return {
      background: `rgba(${baseColor}, ${contrast / 100})`,
      slider: `rgb(${darkMode ? '255, 255, 255' : '255, 255, 255'}, ${0.4 + (contrast / 100) * 0.6})`
    };
  };

  const toggleColors = getToggleColors();

  return (
    <div className={`mt-8 p-6 rounded-xl border border-gray-200 dark:border-gray-700`}>
      <h3 className="font-medium mb-6 test-text">Interactive Accessibility Demo</h3>
      
      <div className="mb-8">
        <div className="flex justify-between mb-2 flex-wrap gap-4">
          <span className={`text-sm test-text`}>
            Accessibility Level: {accessibilityLevel}%
          </span>
          <div className="space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full text-white ${showAriaLabel ? 'bg-green-700' : 'bg-red-700'}`}>
              aria-label
            </span>
            <span className={`px-2 py-1 text-xs rounded-full text-white ${showAriaChecked ? 'bg-green-700' : 'bg-red-700'}`}>
              aria-checked
            </span>
            <span className={`px-2 py-1 text-xs rounded-full text-white ${isChecked ? (accessibilityLevel > 67 ? 'bg-green-700' : 'bg-red-700') : (darkMode ? (accessibilityLevel > 84 ? 'bg-green-700' : 'bg-red-700') : (accessibilityLevel > 87 ? 'bg-green-700' : 'bg-red-700'))}`}>
                good color contrast
            </span>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={accessibilityLevel}
          onChange={(e) => setAccessibilityLevel(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer mt-10"
          aria-label="Adjust accessibility level"
        />
      </div>

      <div className="flex justify-center mb-8">
        <label className="switch">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            aria-label='Toggle demo switch'
            aria-checked={showAriaChecked ? isChecked : undefined}
          />
          <motion.span 
            className="slider round"
            style={{
              backgroundColor: isChecked 
                ? toggleColors.background 
                : `rgb(114, 133, 155, ${Math.max(0.3, accessibilityLevel / 100)})`,
              '--slider-color': toggleColors.slider
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </label>
      </div>

      <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <pre className="text-green-400">
          <code style={{color: 'rgb(74 222 128)'}}>
{`<label class="switch">
  <input
    type="checkbox"
    ${showAriaLabel ? 'aria-label="Toggle demo switch"\n    ' : ''}${showAriaChecked ? `aria-checked="${isChecked}"\n    ` : ''}checked={${isChecked}}
    onChange={() => setChecked(!checked)}
  />
  <span 
    class="slider round"
    style={{
      backgroundColor: "${toggleColors.background}"
    }}
  />
</label>`}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default BATest;
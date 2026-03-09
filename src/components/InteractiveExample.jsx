import { useState } from 'react';
import CodeBlockDemo from './CodeBlock';

// eslint-disable-next-line react/prop-types
const InteractiveExample = ({ title, description, initialCode, component: Component }) => {
  const [code, setCode] = useState(initialCode);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='mt-8 p-6 rounded-lg border border-gray-200 dark:border-gray-700'>
      <h3 className='text-2xl font-bold mb-2'>{title}</h3>
      <p className='mb-6 text-gray-600 dark:text-gray-400'>{description}</p>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Live Preview */}
        <div>
          <h4 className='font-semibold mb-3 text-lg'>Live Preview</h4>
          <div className='p-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900'>
            <Component />
          </div>
        </div>

        {/* Code Editor */}
        <div>
          <div className='flex justify-between items-center mb-3'>
            <h4 className='font-semibold text-lg'>Code</h4>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className='px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700'
            >
              {isEditing ? 'View Only' : 'Edit Code'}
            </button>
          </div>

          {isEditing ? (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className='w-full h-[400px] p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg border border-gray-700'
              spellCheck={false}
            />
          ) : (
            <CodeBlockDemo code={code} isLineNumber={true} />
          )}
        </div>
      </div>

      <div className='mt-4 p-4 rounded bg-blue-50 dark:bg-blue-900/20'>
        <p className='text-sm text-blue-800 dark:text-blue-200'>
          <strong>Try it:</strong> Click &quot;Edit Code&quot; to modify the example and see how it works. Use the copy button to paste into your project.
        </p>
      </div>
    </div>
  );
};

export default InteractiveExample;

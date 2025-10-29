import { CodeBlock } from 'react-code-block';
import { useCopyToClipboard } from 'react-use';
import { Clipboard, ClipboardCheck } from 'lucide-react';


// eslint-disable-next-line react/prop-types
function CodeBlockDemo({ code, isLineNumber }) {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    // Logic to copy `code`
    copyToClipboard(code);
  };

  

  return (
    <CodeBlock code={code} language='js'>
      <div className="relative">
        <CodeBlock.Code className="bg-gray-900 !p-6 rounded-xl shadow-lg code-block-code" tabIndex={0}>
          <div className="table-row">
            {(isLineNumber === true)  ? 
              <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-400 text-right select-none" /> :
              null
            }
            <CodeBlock.LineContent className="table-cell">
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>

        <button
          className="bg-white rounded-full px-3.5 py-1.5 absolute top-2 right-2 text-sm font-semibold"
          aria-label='Copy code snippet'
          onClick={copyCode}
        >
          {state.value ? <ClipboardCheck className='h-4 w-4 text-gray-800'/> : <Clipboard className='h-4 w-4 text-gray-800'/>}
        </button>
      </div>
    </CodeBlock>
  );
}

export default CodeBlockDemo;
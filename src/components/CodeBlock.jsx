import { useCopyToClipboard } from 'react-use';
import { CopyIcon, CheckIcon } from 'lucide-react';


// eslint-disable-next-line react/prop-types
function CodeBlockDemo({ code }) {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    copyToClipboard(code);
  };

  return (
    <div className="flex items-center justify-between max-w-full tone-card tone-card-base pl-4 py-3 pr-1 rounded-xl shadow-lg">
      <div className="code-block-code overflow-x-auto font-mono code w-full overflow-x-auto whitespace-nowrap" tabIndex={0}>{code}</div>
      <button className="rounded-full px-3.5 py-1.5 text-sm font-semibold" aria-label='Copy code snippet' onClick={copyCode}>
        {state.value ? <CheckIcon className='h-4 w-4 black-white-text'/> : <CopyIcon className='h-4 w-4 black-white-text'/>}
      </button>
    </div>
  );
}

export default CodeBlockDemo;
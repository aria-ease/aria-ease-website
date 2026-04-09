import { codeToHtml } from 'shiki';
import { useEffect, useState } from 'react';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { useCopyToClipboard } from 'react-use';

// eslint-disable-next-line react/prop-types
const Terminal = ({ children, darkMode, title, lang }) => {
  const[code, setCode] = useState('');
  const [state, copyToClipboard] = useCopyToClipboard();
  const[isExpanded, setIsExpanded] = useState(false);

  const copyCode = () => {
    // Logic to copy `code`
    copyToClipboard(children);
  };


  useEffect(() => {
    const formatCode = async () => {
      const html = await codeToHtml(children, {
        lang,
        theme: darkMode ? 'catppuccin-mocha' : 'github-light-high-contrast'
      })

      setCode(html);
    }

    formatCode();
  }, [children, darkMode, lang]);

  return (
    <div className={`relative w-full overflow-hidden flex flex-col rounded-xl shadow-md terminal-border ${isExpanded ? "max-h-[540px]" : "max-h-[400px]"} ${darkMode ? 'bg-gray-900/10' : 'bg-card'}`}>
      <div className={`flex items-center justify-between terminal-header px-4 py-3 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
        <span className="ml-2 font-mono text-xs text-muted-foreground black-grey-text">{title}</span>
        <button
          className="rounded-full px-3.5 py-1.5 text-sm font-semibold"
          aria-label='Copy code snippet'
          onClick={copyCode}
        >
          {state.value ? <CheckIcon className='h-4 w-4 black-white-text'/> : <CopyIcon className='h-4 w-4 black-white-text'/>}
        </button>
      </div>
      <div className={`flex-1`}>
        <div className={`space-y-1 ${isExpanded ? "max-h-[479px]" : "max-h-[339px]"} ${isExpanded ? "overflow-y-auto" : "overflow-y-hidden"}`}>
          <div
            className="w-full block"
            style={{ scrollbarGutter: 'stable' }}
            dangerouslySetInnerHTML={{
              __html: code + `<style>.shiki, .shiki pre, .shiki code { background: transparent !important; box-shadow: none !important; margin: 0; padding: 0px 0px 40px 16px; }</style>`
            }}
          />
        </div>
      </div>
      {isExpanded ? 
        (
          <button
            onClick={() => setIsExpanded(false)}
            className='absolute bottom-0 left-0 right-0 mx-auto w-[150px] mb-3 py-1.5 px-4 rounded-lg font-semibold text-sm transition-all duration-150 tone-card border border-accent shadow hover:bg-accent/10 text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
            aria-label="Collapse code block"
          >
            Collapse Code
          </button>
        ) : 
        (
          <button
            onClick={() => setIsExpanded(true)}
            className='absolute bottom-0 left-0 right-0 mx-auto w-[150px] mb-3 py-1.5 px-4 rounded-lg font-semibold text-sm transition-all duration-150 tone-card border border-accent shadow hover:bg-accent/10 text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2'
            aria-label="Expand code block"
          >
            Expand Code
          </button>
        )
      }
    </div>
  );
};

export default Terminal
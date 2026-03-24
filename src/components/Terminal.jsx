// eslint-disable-next-line react/prop-types
const Terminal = ({ children, darkMode, title }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl terminal-border shadow-2xl ${darkMode ? 'bg-gray-900/10' : 'bg-card'}`}>
      <div className={`flex items-center gap-2 terminal-header px-4 py-3 ${darkMode ? 'bg-gray-800/20' : 'bg-gray-100'}`}>
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-red-500/60" />
          <div className="size-2 rounded-full bg-yellow-500/60" />
          <div className="size-2 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-2 font-mono text-xs text-muted-foreground black-grey-text">{title}</span>
      </div>
      <div className="px-4 pb-4 font-mono text-sm">
        <div className="space-y-1">
          <pre className={darkMode ? 'text-green-400' : 'text-green-700'} tabIndex={0} aria-label={`${title} code example`}>
            <code style={{ color: darkMode ? 'rgb(74 222 128)' : 'rgb(21 128 61)' }} className="text-foreground">
              {children}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Terminal
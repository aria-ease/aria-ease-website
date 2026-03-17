/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import './animated-terminal.css';

function AnimatedTerminalDemo({
  title,
  command,
  lines,
  darkMode,
  stepMs = 850,
  pauseMs = 1800,
  loop = true,
  ariaLabel,
  section
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const outputRows = Math.max(Array.isArray(lines) ? lines.length : 0, 4);

  const toneClass = useMemo(() => {
    return {
      success: darkMode ? 'text-green-400' : 'text-green-800',
      warning: darkMode ? 'text-yellow-300' : 'text-amber-800',
      error: darkMode ? 'text-red-400' : 'text-red-800',
      info: darkMode ? 'text-blue-300' : 'text-blue-800',
      neutral: 'black-grey-text',
    };
  }, [darkMode]);

  useEffect(() => {
    if (!Array.isArray(lines) || lines.length === 0) {
      return undefined;
    }

    if (visibleCount < lines.length) {
      const timer = window.setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, stepMs);

      return () => window.clearTimeout(timer);
    }

    if (!loop) {
      return undefined;
    }

    const resetTimer = window.setTimeout(() => {
      setVisibleCount(0);
    }, pauseMs);

    return () => window.clearTimeout(resetTimer);
  }, [visibleCount, lines, loop, pauseMs, stepMs]);

  return (
    <div className={`w-full overflow-hidden rounded-xl terminal-border shadow-2xl ${darkMode ? 'bg-gray-900/10' : 'bg-card'}`} aria-label={ariaLabel}>
      <div className={`flex items-center gap-2 terminal-header px-4 py-3 ${darkMode ? 'bg-gray-800/20' : 'bg-gray-100'}`}>
        <div className="flex gap-1.5" aria-hidden="true">
          <div className="size-2 rounded-full bg-red-500/60" />
          <div className="size-2 rounded-full bg-yellow-500/60" />
          <div className="size-2 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-2 font-mono text-xs black-grey-text">{title}</span>
      </div>

      <div className="p-4 font-mono text-sm">
        <p className="black-grey-text mb-2">
          $ {command}
          <span className="terminal-caret" aria-hidden="true"> </span>
        </p>

        <div
          className={`space-y-1 terminal-output-window ${section}`}
          style={{ '--terminal-lines': outputRows }}
          aria-live="polite"
        >
          {lines.slice(0, visibleCount).map((line, idx) => (
            <p key={`${line.text}-${idx}`} className="terminal-line-enter">
              {line.prefix ? <span className={`${toneClass[line.tone]}`}>{line.prefix} </span> : null}
              <span className={toneClass[line.tone]}>{line.text}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnimatedTerminalDemo;

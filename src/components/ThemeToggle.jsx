import React from 'react';
import { useTheme } from '../App';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    if (theme === 'system') setTheme('dark');
    else if (theme === 'dark') setTheme('light');
    else setTheme('system');
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 p-2 rounded-md bg-white bg-opacity-90 backdrop-blur-sm hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {theme === 'dark' ? (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v5h5v14h-5v-5h-2v-5h2V7h5V3zm0 2c-3.31 0-6.06 1.64-7.9 4.09 2.04-1.23 5.3-4.09 7.9-4.09zm-1.66 6.89a7.96 7.96 0 0 1-2.21.55 7.93 7.93 0 0 1-1.87-2.99 7.95 7.95 0 0 1 .53-2.26 7.96 7.96 0 0 1 2.2-.56c3.17 0 5.61 1.8 7.09 4.68a7.93 7.93 0 0 1-.52 2.17 7.94 7.94 0 0 1-1.86.98z" />
        </svg>
      )}
      {theme === 'system' && <span className="text-xs text-gray-500">System</span>}
    </button>
  );
}
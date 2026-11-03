import React, { createContext, useContext, useState, useEffect } from 'react';
import './darkMode.css';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored || 'system';
  });

  useEffect(() => {
    const root = document.documentElement;
    const apply = (t) => {
      localStorage.setItem('theme', t);
      if (t === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.dataset.theme = prefersDark ? 'dark' : 'light';
      } else {
        root.dataset.theme = t;
      }
    };
    apply(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default function App({ children }) {
  return (
    <ThemeProvider>{children}</ThemeProvider>
  );
}
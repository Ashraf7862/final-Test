import React from 'react';
import { useTheme } from '../App';
import ThemeToggle from './ThemeToggle';

export default function PageHeader({ title }) {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
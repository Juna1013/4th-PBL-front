'use client';

import { Sun, Moon, Loader2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, isLoaded } = useTheme();

  const handleClick = () => {
    console.log('ThemeToggle button clicked!'); // デバッグログ
    toggleTheme();
  };

  if (!isLoaded) {
    return (
      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-300 dark:border-gray-700"
      title={theme === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      // ローカルストレージからテーマを読み込み
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme);
      } else {
        // システムの設定を確認
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      setTheme('dark'); // デフォルトはダークモード
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      // ローカルストレージに保存
      localStorage.setItem('theme', theme);
      
      // HTMLのクラスを更新
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
      
      console.log('Theme updated to:', theme); // デバッグログ
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    console.log('Toggle theme clicked, current:', theme); // デバッグログ
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      console.log('New theme:', newTheme); // デバッグログ
      return newTheme;
    });
  };

  // ローディング中も children をレンダリングして hydration mismatch を防ぐ
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
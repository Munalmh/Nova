import React, { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useChatStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

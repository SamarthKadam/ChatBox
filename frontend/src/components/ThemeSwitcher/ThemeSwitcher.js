import React, { useEffect, useState } from 'react';
import { BsSunFill } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light');
  };

  // Call getInitialTheme to get the initial theme value
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeSwitcher = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={handleThemeSwitcher}
      className="absolute mt-1.5 mr-8 top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
    >
      {theme === 'dark' ? <FaMoon className="text-yellow-500 text-lg" /> : <BsSunFill className="text-yellow-500 text-lg" />}
    </button>
  );
}

export default ThemeSwitcher;

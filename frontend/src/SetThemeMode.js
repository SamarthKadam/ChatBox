import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();
const THEME_KEY = 'thememode';

const getTheme = () => {
  return localStorage.getItem(THEME_KEY) || 'light';
};

const setThemeInLocalStorage = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

export const ThemeModeProvider = ({ children }) => {
  const [thememode, setThemeMode] = useState(getTheme());

  const toggleThemeMode = () => {
    const newTheme = thememode === 'light' ? 'dark' : 'light';
    setThemeInLocalStorage(newTheme);
    setThemeMode((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ thememode, toggleThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

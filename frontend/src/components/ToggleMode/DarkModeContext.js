import React, { createContext, useEffect, useState } from 'react';
import {FaSun,FaMoon} from 'react-icons/fa6'
export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('mode') || 'light';
    setIsDarkMode(savedMode === 'dark');
  }, []);

  const toggleMode = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      localStorage.setItem('mode', 'light');
    } else {
      setIsDarkMode(true);
      localStorage.setItem('mode', 'dark');
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode ,toggleMode}}>
        <div className='absolute right-10 top-8'><button onClick={toggleMode}>{isDarkMode?<FaSun color='white' size={'2rem'}/>:<FaMoon size={'2rem'} />}</button></div>
        {children}
     
    </DarkModeContext.Provider>
  );
}

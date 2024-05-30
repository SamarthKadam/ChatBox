import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Description from '../components/HomeComponents/Description';
import NavBar from '../components/HomeComponents/NavBar';
import LoadingPage from './LoadingPage';
import Service from './Service';

export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const cookie = localStorage.getItem('jwt');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/protect`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${cookie}`,
        },
      });

      const data = await response.json();
      if (data.status === 'success') {
        navigate('/home/message', { replace: true });
      } else {
        setIsLoading(false);
      }
    };
    checkIfLoggedIn();
  }, [navigate]);

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <>
          <div className={`h-[100vh] px-40 py-5 max-[885px]:px-20 max-[653px]:px-14 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#012478] text-black'}`}>
            <NavBar />
            <button onClick={toggleTheme} className="p-2 rounded-md bg-gray-300 dark:bg-gray-700">
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
            </button>
            <Description />
          </div>
          <Service />
        </>
      )}
    </div>
  );
}

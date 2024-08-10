import React, { useEffect, useState } from 'react'
import NavBar from '../components/HomeComponents/NavBar'
import Description from '../components/HomeComponents/Description'
import Service from './Service'
import LoadingPage from './LoadingPage'
import { TiArrowUpThick } from "react-icons/ti";

import { useNavigate } from 'react-router-dom'
export default function Home() {

  const [visible, setVisible] = useState(false)
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true)
    }
    else if (scrolled <= 300) {
      setVisible(false)
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', toggleVisible); 

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const checkIfLoggedIn = async () => {
      const cookie = localStorage.getItem('jwt');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/protect`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${cookie}`
        }
      })

      const data = await response.json();
      if (data.status === 'success') {
        navigate('/home/message', { replace: true })
      }
      else {
        setIsLoading(false);
      }

    }
    checkIfLoggedIn()
  }, [navigate])

  return (
    <div className='position-relative'>
      {isLoading && <LoadingPage></LoadingPage>}
      {!isLoading && (<><div className='h-[100vh] px-40 py-5 max-[885px]:px-20 max-[653px]:px-14 bg-[#012478]'>
        <NavBar />
        <Description></Description>
      </div>
        <Service></Service></>)}
      <button style={{display:visible?"inline":"none"}} className='fixed bottom-[20px] right-[20px] bg-[#012478] p-4 rounded-full drop-shadow-md' onClick={scrollToTop}>
        <TiArrowUpThick className='text-[24px] text-[#ff0]' />
      </button>
    </div>
  )
}

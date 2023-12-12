import React, { useEffect } from 'react'
import NavBar from '../components/HomeComponents/NavBar'
import Description from '../components/HomeComponents/Description'
import Service from './Service'
import { useState } from 'react'
import LoadingPage from './LoadingPage'

import { useNavigate } from 'react-router-dom'
export default function Home() {

  const navigate=useNavigate();
  const [isLoading,setIsLoading]=useState(true);

  useEffect(()=>{
    
    const checkIfLoggedIn=async()=>{
      const cookie=localStorage.getItem('jwt');
      const response=await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/protect`,{
      method:'post',
      headers:{
        'Content-type':'application/json',
        'Authorization':`Bearer ${cookie}`
      }
    })
  
    const data=await response.json();
    if(data.status==='success')
    {
     navigate('/home/message',{replace:true})
    }
    else{
      setIsLoading(false);
    }

  }
    checkIfLoggedIn()
  },[navigate])

  return (
     <div>
      {isLoading&&<LoadingPage></LoadingPage>}
      {!isLoading&&(<><div className='h-[100vh] px-40 py-5 max-[885px]:px-20 max-[653px]:px-14 bg-[#012478]'>
        <NavBar/>
        <Description></Description>
     </div>
     <Service></Service></>)}
     </div>
  )
}

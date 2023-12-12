import React from 'react'
import logo from '../assets/images/send-mail.png'
import Title from '../components/ChatComponents/Title'
import Menu from '../components/RootComponents/Menu'
import { Outlet } from 'react-router-dom';
import UserCard from '../components/RootComponents/UserCard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../services/Actions/User/actions';
import { redirect } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';


export default function Root() {
 const dispatch=useDispatch();
  const data=useLoaderData()

  useEffect(()=>{
    dispatch(setUser(data));
  },[dispatch,data])


//   useEffect(()=>{
    
//     const checkIfTokenExpired=async()=>{
//       const cookie=localStorage.getItem('jwt');
//       const response=await fetch(`http://127.0.0.1:4000/api/v1/users/protect`,{
//       method:'post',
//       headers:{
//         'Content-type':'application/json',
//         'Authorization':`Bearer ${cookie}`
//       }
//     })
  
//     const data=await response.json();
//     if(data.status==='success')
//     {
//       dispatch(setUser(data.user));
//     }
//     else{
//       navigate('/');
//     }
//   }
//     checkIfTokenExpired()
//   },[dispatch,navigate])

  return (
    <div className='h-[100vh] flex flex-row'>
    <div className='h-[100vh] max-[1250px]:w-[18vw] max-[1024px]:w-[8vw] w-[20vw] grid grid-rows-[1fr,6fr,0.8fr]'>
    <div className=" flex  flex-row  items-center border-[1px] border-[#f5f5f5]">
      <div className='flex flex-row ml-[15%]  items-center'>
     <img alt='logo' className="h-8 mr-1 max-[1250px]:h-7" src={logo}></img> <Title black={true} title='ChatBox'></Title>
      </div>
    </div>
    <div className='border-[1px] border-[#f5f5f5]'><Menu></Menu></div>
    <div className='border-[1px] border-[#f5f5f5] flex item-center'>
      <UserCard></UserCard>
    </div>
    </div>
    <Outlet></Outlet>
    </div>
  )
}

export  async function loader({request})
{
    const cookie=localStorage.getItem('jwt');
    const response=await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/protect`,{
    method:'post',
    headers:{
      'Content-type':'application/json',
      'Authorization':`Bearer ${cookie}`
    }
  })

  const data=await response.json();

  const parsed=JSON.stringify(data.user);
  localStorage.setItem('info',parsed);


  if(data.status!=='success')
  {
    return redirect('/');
  }
  return data.user;
} 
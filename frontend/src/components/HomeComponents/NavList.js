import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavList() {

  function ScrollDown()
  {
    const value=window.innerHeight;
    window.scrollTo({top:value,behavior:'smooth'})
  }
  

  return (
    <ul className='flex flex-row w-[40%] max-[1200px]:w-[60%] justify-around text-white font-Roboto font-semibold items-center max-[607px]:hidden'>
    <li><NavLink to='/' className={({ isActive }) => (isActive ? "text-[#FFCC33]" : '')}>Product</NavLink></li>
    <li><NavLink onClick={()=>{ScrollDown()}}>Services</NavLink></li>
    <li><NavLink to='/login'>Login</NavLink></li>
    <li><NavLink to='/signup'>Signup</NavLink></li>
    </ul>
  )
}

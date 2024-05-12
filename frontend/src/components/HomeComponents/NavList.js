import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";


export default function NavList({className}) {

  console.log(className);

  function ScrollDown()
  {
    const value=window.innerHeight;
    window.scrollTo({top:value,behavior:'smooth'})
  }
  

  return (

    <ul className={className}>
    <li><NavLink to='/' className={({ isActive }) => (isActive ? "text-[#FFCC33]" : '')}>Product</NavLink></li>
    <li><NavLink onClick={()=>{ScrollDown()}}>Services</NavLink></li>
    <li><NavLink to='/login'>Login</NavLink></li>
    <li><NavLink to='/signup'>Signup</NavLink></li>
    </ul>
    
  )
}

import React, { useState } from 'react'
import Logo from '../../assets/images/logo-large.png'
import NavList from './NavList'
import { TfiAlignJustify } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import Description from './Description';


export default function NavBar() {
  const [sideMenu , setSideMenu] = useState(false) ;
  const toggleSideMenu = () => setSideMenu(!sideMenu);


  return (
    <div className='flex items-center justify-between'>
    <div className='text-white flex flex-row'>
      <img src={Logo} alt='logo' className='w-10' />
      <div className='text-white text-2xl font-Roboto font-semibold ml-2'>ChatBox</div>
    </div>
    <NavList className='flex flex-row w-[40%] max-[1200px]:w-[60%] justify-around text-white font-Roboto font-semibold items-center max-[640px]:hidden ' />

    <div className='text-white block sm:hidden' onClick={toggleSideMenu}>
      <TfiAlignJustify className='mt-5 mb-8 text-3xl'/>
    </div>

    { sideMenu && (
      
      <div className='fixed h-full w-screen sm:hidden bg-black/50 backdrop-blur-sm top-0 right-0 rounded-l-lg '>
        <div className='text-white bg-black/70 flex-col absolute right-0 top-0 h-screen p-16 w-1/2 gap-8 flex py-10'>
          <AiOutlineClose size={20} onClick={toggleSideMenu} />
          <NavList className='sm:hidden  text-2xl h-1/2 py-11 space-y-10 text-white font-Roboto font-semibold ' />
        </div>
      </div>
    )}
  </div>
);
}

import React from 'react'
import Logo from '../../assets/images/logo-large.png'
import NavList from './NavList'
export default function NavBar() {
  return (
    <div className="fixed bg-[#012478] z-50 top-0 py-4 px-40 left-0 w-full ">
      <div className=" flex justify-between">
        <div className="text-white flex flex-row items-center">
          <img src={Logo} alt="logo" className="w-10" />
          <div className="text-white text-2xl font-Roboto font-semibold ml-2">
            ChatBox
          </div>
        </div>
        <NavList></NavList>
    </div>
    </div>
  )
}

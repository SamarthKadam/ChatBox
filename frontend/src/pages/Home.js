import React from 'react'
import NavBar from '../components/NavBar'
import Description from '../components/Description'
export default function Home() {

  return (
     <div className='h-[100vh] px-40 py-5 bg-[#012478]'>
        <NavBar/>
        <Description></Description>
     </div>
  )
}

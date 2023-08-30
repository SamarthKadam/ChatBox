import React from 'react'
import NavBar from '../components/NavBar'
import Description from '../components/Description'
import Service from './Service'
export default function Home() {
   


  return (
     <div>
     <div className='h-[100vh] px-40 py-5 max-[885px]:px-20 max-[653px]:px-14 bg-[#012478]'>
        <NavBar/>
        <Description></Description>
     </div>
     <Service></Service>
     </div>
  )
}

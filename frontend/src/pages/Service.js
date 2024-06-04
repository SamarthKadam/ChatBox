import React, { useContext } from 'react'
import Card from '../components/HomeComponents/Card'
import { DarkModeContext } from '../components/ToggleMode/DarkModeContext'

export default function Service() {
  const {isDarkMode}=useContext(DarkModeContext)
  return (
    <div className={`h-[100vh] ${isDarkMode?"bg-black text-white":""} px-40 max-[885px]:px-20 max-[653px]:px-14 py-[5%] flex justify-center items-center`}>
    <div className='flex flex-col items-center'>
      <div className='w-[60%]'>
      <div className={`text-[#384055]  ${isDarkMode?"bg-black text-white":""} text-6xl text-center font-semibold font-Poppins max-[1127px]:text-5xl max-[607px]:text-4xl max-[440px]:text-3xl`}>Get the best of all the features</div>
      </div>
      <div className=" mt-[10%] w-[70vw] max-[653px]:gap-4 grid grid-cols-1 place-items-center sm:grid-cols-2 gap-10">
        <Card title='Simple' description='With intuitive interface,ChatBox is so simple you already know how to use it'></Card>
        <Card title='Synced' description='ChatBox lets you acess your chats. Keeping it secured in databases'></Card>
        <Card title='Private' description='ChatBox messages are heavily encrypted and can self-destruct'></Card>
        <Card title='Secure' description='ChatBox keeps your messages safe from hacker attacks'></Card>
      </div>
    </div>
    </div>

  )
}

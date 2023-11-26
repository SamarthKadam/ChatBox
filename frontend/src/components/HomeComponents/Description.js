import React from 'react'
import MenImage from '../../assets/images/men.jpg'
import WomenImage from '../../assets/images/women.jpg'
import design from '../../assets/images/design.png'
import whiteball from '../../assets/images/white-ball.png'
import orangeball from '../../assets/images/orange-ball.png'
import Chat from './Chat'
import { useState,useEffect} from 'react'
import Banner from './Banner'


export default function Description() {

  const[menChat,setMenChat]=useState(['We should party for your project success tonight.']);
  const[womenChat,setWomenChat]=useState([]);

  useEffect(()=>{


  const timer1=setTimeout(()=>{
      setWomenChat((prev)=>{
        return [...prev,`Absolutely! I'll host the party tonight.`]
      }) 
    },2000)

   const timer2=setTimeout(()=>{
      setMenChat((prev)=>{
        return [...prev,`Great! Looking forward to it.`]
      })

    },4000)

    return ()=>{
      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  },[])


  return (
    <div className=' h-[85%] grid grid-cols-2 gap-4 max-[1400px]:grid-cols-[4fr,5fr] max-[1300px]:grid-cols-[3fr,5fr] max-[1127px]:grid-rows-2  max-[1127px]:grid-cols-[1fr] max-[451px]:grid-rows-1'>
        <div className='flex flex-col justify-center items-start'>
        <div className='text-white text-5xl font-semibold font-Poppins  max-[1300px]:text-3xl max-[1127px]:text-5xl max-[607px]:text-4xl'>Chat easy,chat instantly wherever you go</div>
        <p className='mt-10 text-white text-lg font-semibold font-Roboto'>The easiest & fasted way to live chat</p>
        <Banner></Banner>
        </div>
        <div className='relative max-[451px]:hidden'>
            <div className="absolute  w-[50%] top-[20%] translate-y-[-20%] left-[95%] z-[555] translate-x-[-95%] max-[1127px]:top-[-15%]">
              {menChat.map((val,ind)=>{
                return(
                  <Chat isMale={true} key={ind} message={val}></Chat>
                )
              })
              }
              </div>
            <div className='absolute w-[50%] top-[68%] translate-y-[-68%]  left-[15%]  z-[87]  translate-x-[-15%] max-[1127px]:top-[78%]'>
              {womenChat.map((val,ind)=>{
                return(
                  <Chat isMale={false} key={ind} message={val}></Chat>
                )
              })
             }
            {/* <Chat message={`Yeah definitely!, I'll throw this evening.`}></Chat> */}
              </div>
            <img alt='men pic' className="w-[55%] rounded-[20px] absolute top-[30%] z-50 translate-y-[-30%] max-[1127px]:top-[0%]  " src={MenImage}></img>
            <img alt='women pic' className="w-[55%] rounded-[20px] absolute top-[84%] translate-y-[-84%] z-30 left-[95%] max-[1127px]:top-[100%]  translate-x-[-95%]" src={WomenImage}></img>
            <img alt='dots pic' className='w-[30%] absolute top-[84%] translate-y-[-84%] left-[25%] translate-x-[-25%] ' src={design}></img>
            <img alt='ball' className='absolute top-[10%] translate-y-[-10%] left-[25%] translate-x-[-25%]  ' src={whiteball}></img>
            <img alt='ball' className=' absolute top-[84%] translate-y-[-84%] left-[5%] translate-x-[-5%]' src={orangeball}></img>
            <img alt='orange-ball' className=' absolute top-[15%] translate-y-[-15%] left-[95%] translate-x-[-95%]' src={orangeball}></img>
        </div>

    </div>
  )
}

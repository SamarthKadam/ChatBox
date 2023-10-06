import React, { useEffect,useState} from 'react'
import RecieverMessage from './RecieverMessage'
import SenderMessage from './SenderMessage'
import { useSelector } from 'react-redux';
import Advertisement from './Advertisement';
import CircularLoading from './CircularLoading';
import { isSender } from '../../helper/Reusable';

export default function ChatMessages() {
  const isSet=useSelector((state)=>state.chat.activeChat);
  const [isLoading,setIsLoading]=useState(false);
  const [data,setData]=useState([]);

  useEffect(()=>{

    if(isSet===null)
    return;

    const getData=async()=>{
      setIsLoading(true)
      const cookie=localStorage.getItem('jwt');
    const response=await fetch(`http://127.0.0.1:4000/api/v1/message/${isSet._id}`,{
      headers:{
        'Content-type':'application/json',
        'Authorization':`Bearer ${cookie}`
      }
    })
    const data=await response.json();
    if(data.status==='success')
    {
      setData(data.message);
      console.log(data.message);
    }
    setIsLoading(false);
  }
    getData()
  },[isSet])

  if(isSet===null)
  return <Advertisement></Advertisement>

  return (
    <div className='w-[100%] h-[88%] px-[3%] py-[2%] box-border relative flex flex-col'>
      {isLoading&&<CircularLoading></CircularLoading>}
      {!isLoading&&data.length>0&&<div>
        {data.map((val,index) => {
  if (isSender(val.sender._id))
    return <SenderMessage content={val.content} key={index}></SenderMessage>; 
  else
    return <RecieverMessage messages={data} index={index} content={val.content} key={index}></RecieverMessage>
})}
      </div>}
    </div>
  )
}

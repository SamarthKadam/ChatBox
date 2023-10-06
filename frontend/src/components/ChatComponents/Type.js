import React from 'react'
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Type() {

  const isSet=useSelector((state)=>state.chat.activeChat);
  const [message,setMessage]=useState('');

  const messageHandler=(e)=>{
    setMessage(e.target.value);
  }

  const sendMessage=async(event)=>{

    if(event.key!=='Enter'||message.length===0)
    return;

    event.preventDefault();
    const cookie=localStorage.getItem('jwt');
    const bodyData={
      chatId:isSet._id,
      content:message
    }
    setMessage('');
    const response=await fetch(`http://127.0.0.1:4000/api/v1/message`,{
      method:'post',
      headers:{
        'Content-type':'application/json',
        'Authorization':`Bearer ${cookie}`
      },
      body:JSON.stringify(bodyData)
    })

    const data=await response.json();


  }


  if(isSet===null)
  return <></>

  return (
    <div className="border-[1px] border-[#f5f5f5] bg-[#FFFFFF] h-[12%] flex flex-row justify-center items-center relative">
      <MicIcon sx={{width:22,cursor:'pointer'}} style={{position:'absolute',top:'50%',left:'4%',translate:'-4% -50%'}} color="info"></MicIcon>
      <SendIcon color="action" sx={{width:22}} style={{position:'absolute',top:'50%',left:'95%',translate:'-95% -50%'}}></SendIcon>
      <textarea value={message} onKeyDown={sendMessage} onChange={messageHandler} spellCheck="false"  data-gramm="false" type='text' placeholder='Type a message' className=' bg-gray-100 font-Roboto box-border px-[5%] flex  text-md w-[95%] py-[1%] outline-none h-[70%] rounded-3xl'></textarea>
    </div>
  )
}
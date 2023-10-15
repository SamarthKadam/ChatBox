import React, { useEffect } from 'react'
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import { socket } from '../../socket/socket';
import { AddMessage } from '../../services/Actions/Chat/action';

export default function Type() {

  const isSet=useSelector((state)=>state.chat.activeChat);
  const [message,setMessage]=useState('');
  const [socketConnected,setSocketConnected]=useState(false);
  const dispatch=useDispatch();
  const [typing,setTyping]=useState(false);

  const messageHandler=(e)=>{
    setMessage(e.target.value);

    if(!typing)
    {
      setTyping(true);
      socket.emit('typing',isSet._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", isSet._id);
        setTyping(false);
      }
    }, timerLength);

  }


  useEffect(()=>{

    if(isSet===null)
    return;

    const loggedUser=JSON.parse(localStorage.getItem('info'));
    socket.emit("setup",loggedUser)
    socket.on("connected",()=>{setSocketConnected(true)});

    socket.emit('join chat',isSet._id);
  },[isSet])

  useEffect(()=>{

  },[])


  const sendMessage=async(event)=>{

    if(message.length===0)
    return;

    if(event.key==='Enter'||event.type==='click')
    {
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
    dispatch(AddMessage(data.data));
    socket.emit("new message",data.data);

  }
    
  }


  if(isSet===null)
  return <></>

  return (
    <div className="border-[1px] border-[#f5f5f5] bg-[#FFFFFF] h-[12%] flex flex-row justify-center items-center relative">
      <MicIcon sx={{width:22,cursor:'pointer'}} style={{position:'absolute',top:'50%',left:'4%',translate:'-4% -50%'}} color="info"></MicIcon>
      <div onClick={sendMessage} style={{position:'absolute',top:'50%',left:'95%',translate:'-95% -50%',cursor:'pointer'}}>
      <SendIcon color="action" sx={{width:22}}></SendIcon>
      </div>
      <textarea value={message} onKeyDown={sendMessage} onChange={messageHandler} spellCheck="false"  data-gramm="false" type='text' placeholder='Type a message' className=' bg-gray-100 resize-none font-Roboto box-border px-[5%] flex  text-md w-[95%] py-[1%] outline-none h-[70%] rounded-3xl'></textarea>
    </div>
  )
}
import React from 'react'
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';

export default function Type() {
  return (
    <div className="border-[1px] border-[#f5f5f5] bg-[#FFFFFF] h-[12%] flex flex-row justify-center items-center relative">
      <MicIcon sx={{width:22,cursor:'pointer'}} style={{position:'absolute',top:'50%',left:'4%',translate:'-4% -50%'}} color="info"></MicIcon>
      <SendIcon color="action" sx={{width:22,cursor:'pointer'}} style={{position:'absolute',top:'50%',left:'95%',translate:'-95% -50%'}}></SendIcon>
      <textarea type='text' placeholder='Type a message' className=' bg-gray-100 font-Roboto box-border px-[5%] text-md w-[95%] outline-none h-[70%] rounded-3xl'>
      </textarea>
    </div>
  )
}

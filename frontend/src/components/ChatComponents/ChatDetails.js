import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { getSender } from '../../helper/Reusable';
import GroupUserList from './GroupUserList';
import { getUsersLeavingMe } from '../../helper/Reusable';
import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useRef } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:'14px',
  p: 4,
  display: 'flex', 
  alignItems: 'center',
  flexDirection: 'column',
  outline:'none'
};

export default function ChatDetails({chatModel,closeChat}) {

  const activeUser=useSelector((state)=>state.chat.activeChat);
  let data;
  const ref=useRef();


  if(activeUser===null)
  return <></>



  if(activeUser.isGroupChat)
  {
    data=activeUser;
  }
  else{
    data=getSender(activeUser.users)
  }

  const updateInfo=async()=>{
  
    const cookie=localStorage.getItem('jwt');
    const bodyData={
      chatId:activeUser._id,
      chatName:ref.current.value
    }

    const response=await fetch(`http://127.0.0.1:4000/api/v1/chat/rename`,{
      method:'put',
      headers:{
        'Content-type':'application/json',
        'Authorization':`Bearer ${cookie}`
      },
      body:JSON.stringify(bodyData)
    })
    const data=await response.json();
    console.log(data);
  }




  return (
    <div className='absolute'>
      <Modal
        open={chatModel}
        onClose={closeChat}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='text-2xl font-Poppins'>Info</div>
          <input ref={ref} defaultValue={activeUser.isGroupChat?activeUser.chatName:data.name}  spellCheck='false' placeholder='Chat Name' className=' text-lg h-[16%] w-[100%] mt-5 font-thin px-1 py-2 outline-none bg-[#F6F8FC]'></input>
         {data.isGroupChat&&<GroupUserList notCancelable={true} users={getUsersLeavingMe(data.users)}></GroupUserList>}
         <div>
         <button onClick={updateInfo} className='bg-[#0147FF] text-white text-lg px-2 py-1 mt-4 rounded-lg'><ChangeCircleIcon></ChangeCircleIcon> Update</button>
         <button onClick={closeChat} className='bg-[#FF0000] text-white text-lg  ml-2 px-2 py-1 mt-4 rounded-lg'><CancelIcon></CancelIcon> Cancel</button>
         </div>
        </Box>
      </Modal>
    </div>
  );
}

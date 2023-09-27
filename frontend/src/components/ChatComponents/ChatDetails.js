import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { getSender } from '../../helper/Reusable';
import GroupUserList from './GroupUserList';
import { getUsersLeavingMe } from '../../helper/Reusable';
import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
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

  if(activeUser===null)
  return <></>



  if(activeUser.isGroupChat)
  {
    data=activeUser;
  }
  else{
    data=getSender(activeUser.users)
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
          <input defaultValue={activeUser.isGroupChat?activeUser.chatName:data.name}  spellCheck='false' placeholder='Chat Name' className=' text-lg h-[16%] w-[100%] mt-5 font-thin px-1 py-2 outline-none bg-[#F6F8FC]'></input>
          <input  spellCheck="false" placeholder='Add Users: Steve,Jeff,Makr' className='text-lg h-[16%] w-[100%] px-1 py-2 mt-3 outline-none font-thin bg-[#F6F8FC]'></input>
         {data.isGroupChat&&<GroupUserList users={getUsersLeavingMe(data.users)}></GroupUserList>}
         <div>
         <button className='bg-[#0147FF] text-white text-xl px-4 py-2 mt-4 rounded-lg'><ChangeCircleIcon className='mr-1'></ChangeCircleIcon>Update</button>
         <button onClick={closeChat} className='bg-[#FF0000] text-white text-xl  ml-2 px-4 py-2 mt-4 rounded-lg'><CancelIcon></CancelIcon> Cancel</button>
         </div>
        </Box>
      </Modal>
    </div>
  );
}

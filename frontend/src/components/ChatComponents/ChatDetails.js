import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { getSender } from '../../helper/Reusable';
import GroupUserList from './GroupUserList';

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
        <div className='text-2xl font-Poppins'>{activeUser.isGroupChat?activeUser.chatName:data.name}</div>
          <input  spellCheck='false' placeholder='Chat Name' className=' text-lg h-[16%] w-[100%] mt-5 font-thin px-1 py-2 outline-none bg-[#F6F8FC]'></input>
          <input  spellCheck="false" placeholder='Add Users: Steve,Jeff,Makr' className='text-lg h-[16%] w-[100%] px-1 py-2 mt-3 outline-none font-thin bg-[#F6F8FC]'></input>
         {data.isGroupChat&&<GroupUserList users={data.users}></GroupUserList>}
        </Box>
      </Modal>
    </div>
  );
}

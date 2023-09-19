import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import GroupUserList from './GroupUserList';
import { useState } from 'react';
import User from './User';

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

export default function BasicModal({handleClose,open}) {

  const [searchResults,setSearchResults]=useState([]);
  const [isEmptyResults,setIsEmptyResults]=useState(false);
  const [selectedUsers,setSelectedUsers]=useState([]);

  const searchHandler=async(value)=>{
    const cookie=localStorage.getItem('jwt');
    const response=await fetch(`http://127.0.0.1:4000/api/v1/users?search=${value}`,{
    headers:{
      'Content-type':'application/json',
      'Authorization':`Bearer ${cookie}`
    }
  })
  const data=await response.json();
  data.users.length=data.users.length>2?data.users.length=2:data.users.length;

  if(data.users.length==0)
  setIsEmptyResults(true)
  else
  setIsEmptyResults(false);

  setSearchResults(data.users);

  }

  const inputHandler=(e)=>{
    
    setTimeout(()=>{
      searchHandler(e.target.value)
    },2000)
  }






  return (
    <div className='absolute'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <div className='text-2xl font-Poppins'>Create a group Chat</div>
          <input spellCheck='false' placeholder='Chat Name' className=' text-lg h-[16%] w-[100%] mt-5 font-thin px-1 py-2 outline-none bg-[#F6F8FC]'></input>
          <input onChange={inputHandler} spellCheck="false" placeholder='Add Users: Steve,Jeff,Makr' className='text-lg h-[16%] w-[100%] px-1 py-2 mt-3 outline-none font-thin bg-[#F6F8FC]'></input>
          <div className='w-[100%]'>{searchResults.map((data,index)=><User values={data} key={index}></User>)}{isEmptyResults?<p>No results found</p>:null}</div>
          <GroupUserList></GroupUserList>
          <button onClick={handleClose} className='bg-[#0147FF] text-white text-xl px-4 py-2 mt-4 rounded-lg'>Create Chat</button>
        </Box>
      </Modal>
    </div>
  );
}
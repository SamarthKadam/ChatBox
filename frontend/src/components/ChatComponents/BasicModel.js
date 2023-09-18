import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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

export default function BasicModal({handleClose,open}) {










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
          <input spellCheck="false" placeholder='Add Users: Steve,Jeff,Makr' className='text-lg h-[16%] w-[100%] px-1 py-2 mt-3 outline-none font-thin bg-[#F6F8FC]'></input>
          <GroupUserList></GroupUserList>
          <button onClick={handleClose} className='bg-[#0147FF] text-white text-xl px-4 py-2 mt-4 rounded-lg'>Create Chat</button>
        </Box>
      </Modal>
    </div>
  );
}
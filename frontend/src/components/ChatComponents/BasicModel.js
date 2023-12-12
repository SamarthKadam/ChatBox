import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import GroupUserList from './GroupUserList';
import { useState } from 'react';
import User from './User';
import Loading from './Loading';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AddGroup } from '../../services/Actions/Chat/action';
import { ToastContainer, toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: window.innerWidth/3,
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
  const [isLoading,setIsLoading]=useState(false);
  const Valref=useRef();
  const dispatch=useDispatch();

  const notify = (value,errorname)=>{

    if(value==='error')
    return toast.error(`${errorname}`, {
      position: "top-right",
      autoClose: 2222,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      


    return toast.info(`Successfully group created`, {
      position:"top-right",
      autoClose: 2222,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const searchHandler=async(value)=>{
    setIsLoading(true)
    const cookie=localStorage.getItem('jwt');
    const response=await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users?search=${value}`,{
    headers:{
      'Content-type':'application/json',
      'Authorization':`Bearer ${cookie}`
    }
  })
  const data=await response.json();
  data.users.length=data.users.length>2?data.users.length=2:data.users.length;

  setIsLoading(false);

  if(data.users.length===0)
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


  const addUserToGroup=(values)=>{


    setSelectedUsers((users)=>{
    const present=users.find((data)=>data._id===values._id);
    if(present!==undefined)
    {
      notify("error","User already in the group!")
      return [...users];
    }

    return [...users,values]
    } 
      )
  }

  const removeUserFromGroup=(value)=>{
    setSelectedUsers((users)=>{
     const result=users.filter((data)=>data._id!==value)
      return result;
    })

  }

  const createGroupHandler=async()=>{
    
    const userdata=selectedUsers.map((data)=>data._id);

    if(Valref.current.value==='')
    {
     return notify('error',"Please specify the group name!");
    }
    else if(selectedUsers.length<2)
    {
     return notify("error","Should add atleast 2 people!")
    }
    const bodyData={
      name:Valref.current.value,
      users:JSON.stringify(userdata)
    }

    const cookie=localStorage.getItem('jwt');
    const response=await fetch(`${process.env.REACT_APP_API_URL}/api/v1/chat/group`,{
      method:'post',
      headers:{
        'Content-type':'application/json',
        'Authorization':`Bearer ${cookie}`
      },
      body:JSON.stringify(bodyData)
    })
    const data=await response.json();
    if(data.status==='success')
    {
      notify();
    }
    dispatch(AddGroup(data.fgroupChat));
    setSearchResults([]);
    setSelectedUsers([]);
    handleClose();
  }






  return (
    <div className='absolute'>
      <ToastContainer/>
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
          <input ref={Valref} spellCheck='false' placeholder='Chat Name' className=' text-lg h-[16%] w-[100%] mt-5 font-thin px-1 py-2 outline-none bg-[#F6F8FC]'></input>
          <input onChange={inputHandler} spellCheck="false" placeholder='Add your Friends' className='text-lg h-[16%] w-[100%] px-1 py-2 mt-3 outline-none font-thin bg-[#F6F8FC]'></input>
          <div className='w-[100%]'>
            {!isLoading&&searchResults&&searchResults.length>0&&searchResults.map((data,index)=><User add={addUserToGroup} values={data} key={index}></User>)}
            {!isLoading&&isEmptyResults?<p>No results found</p>:null}
            {isLoading&&<Loading></Loading>}
            </div>
         {selectedUsers&&selectedUsers.length>0&&<GroupUserList remove={removeUserFromGroup} users={selectedUsers}></GroupUserList>}
         <div>
          <button onClick={createGroupHandler} className='bg-[#0147FF] text-white text-xl px-4 py-2 mt-4 rounded-lg'>Create Chat</button>
          <button onClick={()=>{
             setSearchResults([]);
             setSelectedUsers([]);
             handleClose();
          }} className=' text-[#0147FF] text-xl border-[2px] border-[#0147FF] px-4 py-1.5 ml-2 mt-4 rounded-lg'>Cancel</button>
         </div>
        </Box>
      </Modal>
    </div>
  );
}
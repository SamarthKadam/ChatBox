import React,{useState} from 'react'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect} from 'react'
import {NullifyActiveChat} from '../../services/Actions/Chat/action'
import { useDispatch } from 'react-redux'
import { FlustAllChats } from '../../services/Actions/Chat/action'
export default function UserCard() {
  const dispatch=useDispatch();
  const dataredux=useSelector((state)=>state.user.userInfo)

  const Obj=JSON.parse(localStorage.getItem('info'))
  const [Name,setName]=useState(Obj.name);
  const [Pic,setPic]=useState(Obj.pic);

  useEffect(()=>{
    if(dataredux===null)
    return;


    setName(dataredux.name);
    setPic(dataredux.pic);
  },[dataredux])


  const navigate=useNavigate();

  const logoutHandler=()=>{
    localStorage.removeItem('jwt');
    navigate('/',{replace:true});
    dispatch(NullifyActiveChat());
    dispatch(FlustAllChats());
  }

  let image=Pic;
  if(Pic.startsWith('user'))
  image=`${process.env.REACT_APP_API_URL}/${Pic}`


  return (
    <div className='flex flex-row  items-center ml-[10%] max-[1024px]:hidden'>
        <Avatar referrerPolicy="no-referrer" alt="User-pic" sx={{width:48,height:48}} src={image} />
        <div className='flex flex-col ml-2'>
            <div className='max-[1250px]:text-[12px] font-bold font-Roboto text-sm'>{Name}</div>
            <div onClick={logoutHandler} className="max-[1250px]:text-[10px] text-xs cursor-pointer text-[#979797]">Logout</div>
        </div>
    </div>
  )
}

import React, { useState } from 'react'
import SearchBar from '../components/SearchComponents/SearchBar'
import Loading from '../components/SearchComponents/Loading'
import User from '../components/SearchComponents/User'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddUser } from '../services/Actions/Chat/action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Search() {

  const dispatch=useDispatch();
  const navigate=useNavigate()
  const state=useSelector((state)=>state.chat.AllChats)

  const notify = (value)=>{
    return toast.info(`Added ${value}`, {
      position: "bottom-center",
      autoClose: 2222,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const[isLoading,SetisLoading]=useState(false);
  const [users,SetUsers]=useState([])
  // const[query,setQuery]=useState('');
  const[resultsEmpty,setResultsEmpty]=useState(false);


  const onChangeTextHandler=(e)=>{
    // setQuery(e.target.value);
    if(!e.target.value)
    {
      return;
    }

   const timeout=setTimeout(() => {
      searchHandler(e.target.value)
    }, 1000);

    return ()=>{
      clearTimeout(timeout);
    }
  }

  const searchHandler=async(value)=>{

    SetisLoading(true);
    const cookie=localStorage.getItem('jwt');
    const response=await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users?search=${value}`,{
    headers:{
      'Content-type':'application/json',
      'Authorization':`Bearer ${cookie}`
    }
  })
  const data=await response.json();
  SetisLoading(false);
  data.users.length=data.users.length>2?data.users.length=2:data.users.length;
  SetUsers(data.users)
  if(data.users.length===0)
  setResultsEmpty(true)
  else
  setResultsEmpty(false);

  }

    const accessChatHandler=(values)=>{

      const isPresent=state.find((data)=>{
        return data.email===values.email
      });
      dispatch(AddUser(values,state))
      notify(values.name);
      setTimeout(()=>{
        navigate('/home/message',{replace:true})
      },2000)
    }

  return (
    <div className='w-[80vw] relative flex flex-col'>
      <ToastContainer/>
        <SearchBar onChange={onChangeTextHandler} searchHandler={searchHandler} ></SearchBar>
        <div className=' w-[100%] flex box-border justify-center py-2 relative'>
        {!isLoading&&resultsEmpty&&<p>0 matching results found</p>}
       {isLoading&&<Loading></Loading>}
       {!isLoading&&users.length>0&&( <div className='w-[60%] border-[1px] rounded-md border-[#acacac] px-[1%] py-[1%] flex flex-col'>
{users.map((data,index)=><User accessChat={accessChatHandler} values={data} key={index}></User>)}
</div>)}
    </div>
    </div>
  )
}

import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Input from './Input'
import Square from './Square'
import {GoogleLogin} from '@react-oauth/google'
import jwt_decode from "jwt-decode";
import { useSubmit } from 'react-router-dom'
import { useNavigation } from 'react-router-dom'
import { validate } from 'react-email-validator'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Button, Paper, Typography } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function Main() {


  const navigation=useNavigation();
  const submit=useSubmit();
  const [loginData,setloginData]=useState({email:'',password:''});
  const [submitting,setSubmiting]=useState(false)



  function submitData(e,googleauth,information)
  {
    setSubmiting(true);
    setTimeout(()=>{
      setSubmiting(false);
    },5000)
    if(googleauth)
    {
      const name=information.name
      const pic=information.picture

      submit({...googleauth,name,pic},{method:'post'})
      return;
    }

    e.preventDefault();
    if(!loginData.email || !validate(loginData.email) ||!loginData.password)
    {
      alert('error');
    }
    submit(loginData,{method:'post'})
  }

  const responseMessage = (response) => {

    var token = response.credential;    ;
    var decoded = jwt_decode(token);
     setloginData({email:decoded.email,password:decoded.sub});
    submitData(1,{email:decoded.email,password:decoded.sub},{...decoded});
};
  const errorMessage = (error) => {
    console.log(error);
  };





  return (
    <div className='flex flex-col items-center h-[100vh] w-[100vw] relative overflow-hidden px-2'>
    <Square></Square>
    <Square isRight={true}></Square>
  <Paper className='z-20 w-full max-w-[370px] p-[2rem] my-auto' elevation={3}>

        <div className='font-Poppins text-3xl font-extrabold flex items-center flex-col'>
        <LockOpenIcon fontSize='large' color='primary'/>
          <Typography variant='h5'>Log In</Typography>
        </div>
<br />
<hr></hr>
<form className='mt-6 relative'>
  <Input onSetData={setloginData}  name='email' text="Email ID" placeholder="Email address" type='text'></Input>
  <Input onSetData={setloginData}  name='password'  text='Password' type='password' placeholder='Password'></Input>
  <div className='flex flex-row justify-center mt-10'>
    <Button sx={{padding:".5rem 4rem"}} onClick={submitData} variant="contained">
    {!submitting&&<div>LOG IN</div>}
    {submitting&&<Box sx={{ display: 'flex' }}>
      <CircularProgress size={25} style={{ color: '#FFFFFF' }} />
    </Box>}
    </Button>
  </div>
  <Typography className='text-center py-3'>Already have and account ? <Link className='text-blue-600' to="/signup">SignUp</Link></Typography>

  <div className='h-[1px] w-[100%] mt-10 bg-[#808080]'></div>
  <div className='flex flex-col items-center mt-6'>
      <div className='mt-[2%]'>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
  </div>
</form>
</Paper>
</div>
  )
}

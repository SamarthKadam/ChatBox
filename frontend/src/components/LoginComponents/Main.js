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
import { Button, Paper, Typography, IconButton } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { ToastContainer, toast } from "react-toastify";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {FaArrowCircleLeft} from 'react-icons/fa'
export default function Main() {


  const submit=useSubmit();
  const [loginData,setloginData]=useState({email:'',password:''});
  const [submitting,setSubmiting]=useState(false)
  const [showPassword, setShowPassword] = useState(false);


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
      return toast.error("Please enter valid email and password", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"colored"
      });
        
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



  const handleClickShowPassword = () => setShowPassword(!showPassword); // Toggle password visibility
  const handleMouseDownPassword = (event) => event.preventDefault(); // Prevent default action on mouse down

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen w-full p-4 overflow-hidden'>
  <Square />
  <Square isRight={true} />
  <Paper className='z-20 w-full max-w-[370px] p-4 md:p-6 my-auto' elevation={3}>
    <Link to="/">
      <FaArrowCircleLeft className="text-blue-600 cursor-pointer text-2xl mb-4" />
    </Link>
    <div className='font-Poppins text-2xl font-extrabold text-center mb-4'>
      <LockOpenIcon fontSize='large' color='primary' />
      <Typography variant='h5'>Log In</Typography>
    </div>
    <form className='mt-4 flex flex-col space-y-4'>
      <Input onSetData={setloginData} name='email' text="Email ID" placeholder="Email address" type='text' />
      <div className='relative'>
        <Input
          onSetData={setloginData}
          name='password'
          text='Password'
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
        />
        <IconButton
          aria-label='toggle password visibility'
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge='end'
          style={{ position: 'absolute', right: '10px', top: '50%' }}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </div>
      <div className='flex justify-center'>
        <Button sx={{ padding: ".5rem 2rem" }} onClick={submitData} variant="contained">
          {!submitting && <div>LOG IN</div>}
          {submitting && <Box sx={{ display: 'flex' }}>
            <CircularProgress size={25} style={{ color: '#FFFFFF' }} />
          </Box>}
        </Button>
      </div>
      <Typography className='text-center py-2 text-sm'>Don't have an account? <Link className='text-blue-600' to="/signup">Sign Up</Link></Typography>
      <div className='h-[1px] w-full bg-[#808080]' />
      <div className='flex flex-col items-center mt-4'>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
    </form>
  </Paper>
</div>

  
  )
}

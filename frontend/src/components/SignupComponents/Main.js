import React,{useState} from 'react'
import Input from '../LoginComponents/Input'
import Square from '../LoginComponents/Square'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from "jwt-decode";
import {Link, useNavigation} from 'react-router-dom'
import { useSubmit } from 'react-router-dom';
import { validate } from 'react-email-validator';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Button, Paper, Typography, IconButton } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { ToastContainer, toast } from "react-toastify";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Main() {


  const navigation=useNavigation();
  const submit=useSubmit();
  const [SignUpData,setSignUpData]=useState({name:'',email:'',password:''});
  const[submiting,setSubmiting]=useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function sendData(e,googleauth)
  {
    setSubmiting(true);
    setTimeout(()=>{
      setSubmiting(false);
    },5000)
    if(googleauth)
    {
      submit(googleauth,{method:'post'})
      return;
    }
    
    e.preventDefault();
    if(!SignUpData.email ||!SignUpData.password)
      {
        return toast.error("Please fill all required the fields ", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme:"colored"})
      }
      if (!validate(SignUpData.email)){
        return toast.error("Please enter valid email", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme:"colored"})
      }
      if(SignUpData.password.length >0 && SignUpData.password.length <8)
        {
          return toast.error("Please enter a password of length 8-12 characters", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:"colored"})
        }
        if (SignUpData.password.length > 12) {
          return toast.error("You have entered more than 12 characters", {
              position: "top-center",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
          });
      }

      const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
      const numberRegex = /[0-9]/;
      const uppercaseRegex = /[A-Z]/;

      if (!numberRegex.test(SignUpData.password)) {
        return toast.error("Password must contain at least one number", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      }
      if (!uppercaseRegex.test(SignUpData.password)) {
        return toast.error("Password must contain at least one uppercase letter", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      }
      if (!specialCharacterRegex.test(SignUpData.password)) {
        return toast.error("Password must contain at least one special character", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      }
    
    else{
      submit(SignUpData,{method:'post'})
    }

  }
  const responseMessage = (response) => {
    var token = response.credential;    ;
    var decoded = jwt_decode(token);
    setSignUpData({name:decoded.name,email:decoded.email,password:decoded.sub});
    sendData(1,{name:decoded.name,email:decoded.email,password:decoded.sub,isGoogle:true,pic:decoded.picture});
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword); // Toggle password visibility
  const handleMouseDownPassword = (event) => event.preventDefault(); // Prevent default action on mouse down
  return (
    <div className='flex flex-col items-center h-[100vh] w-[100vw] relative overflow-hidden px-2'>
    <Square></Square>
    <Square isRight={true}></Square>
  <Paper className='z-20 w-full max-w-[370px] p-[2rem] my-auto' elevation={3}>
        <div className='font-Poppins text-3xl font-extrabold flex items-center flex-col'>
        <HowToRegIcon fontSize='large' color='primary'/>
          <Typography variant='h5'>Sign Up</Typography>
        </div>
<br />
<hr></hr>
<form className='mt-6 relative'>
  <Input onSetData={setSignUpData} name='name' text='Name' placeholder='Enter your name' type='text'></Input>
  <Input onSetData={setSignUpData} name='email' text="Email ID" placeholder="" type='text'></Input>
  <div className='relative'>
            <Input
              onSetData={setSignUpData}
              name='password'
              text='Password'
              type={showPassword ? 'text' : 'password'} // Toggle between text and password
              placeholder='Password'
            />
             <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
              style={{ position: 'absolute', right: '10px', top: '70%', transform: 'translateY(-50%)' }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
  <div className='flex flex-row justify-center mt-8'>
    <Button sx={{padding:".5rem 4rem"}} onClick={sendData} variant="contained">
    {!submiting&&<div>SIGN UP</div>}
    {submiting&&<Box sx={{ display: 'flex' }}>
      <CircularProgress size={25} style={{ color: '#FFFFFF' }} />
    </Box>}
  </Button>
  </div>
  <Typography className='text-center py-3'>Already have and account ? <Link className='text-blue-600' to="/login">LogIn</Link></Typography>
  <div className='h-[1px] w-[100%] mt-4 bg-[#808080]'></div>
  <div className='flex flex-col items-center mt-6'>
      {/* <Link to='/signup' className='text-[#5A5A5A] font-medium border-2 border-[#5A5A5A] hover:border-black px-32 rounded-[40px] mt-7 py-4 tracking-wide'>SIGN UP FOR SPOTIFY</Link> */}
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
  </div>
</form>
    </Paper>
</div>
  )
}

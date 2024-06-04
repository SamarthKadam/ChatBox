import React,{useContext, useState} from 'react'
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
import { DarkModeContext } from '../ToggleMode/DarkModeContext'
import {FaSun,FaMoon} from 'react-icons/fa6'

export default function Main() {


  const submit=useSubmit();
  const {isDarkMode,toggleMode}=useContext(DarkModeContext)
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
    <>
   
                    <div className='absolute right-10 z-[99] top-8'><button onClick={toggleMode}>{isDarkMode?<FaSun color='white' className='z-[99]' size={'2rem'}/>:<FaMoon size={'2rem'} className='z-[99]' />}</button></div>

    <div className={`flex flex-col ${isDarkMode?"bg-black":""} items-center h-[100vh] w-[100vw] relative overflow-hidden px-2`}>

    <Square></Square>
    <Square isRight={true}></Square>
  <Paper className={`  z-20 w-full max-w-[370px] p-[2rem] my-auto`} style={{backgroundColor:`${isDarkMode?"rgba(255,255,255,0.1)":""}`}} elevation={3}>

        <div className={`${isDarkMode?"text-white":""} font-Poppins text-3xl font-extrabold flex items-center flex-col`}>
        <LockOpenIcon fontSize='large' color='primary'/>
          <Typography variant='h5'>Log In</Typography>
        </div>
<br />
<hr></hr>
<form className={` mt-6 relative`}>
  <Input onSetData={setloginData}  name='email' text="Email ID" placeholder="Email address" type='text'></Input>
  <div className='relative'>
            <Input
              onSetData={setloginData}
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
  <div className='flex flex-row justify-center mt-10'>
    <Button sx={{padding:".5rem 4rem"}} onClick={submitData} variant="contained">
    {!submitting&&<div>LOG IN</div>}
    {submitting&&<Box sx={{ display: 'flex' }}>
      <CircularProgress size={25} style={{ color: '#FFFFFF' }} />
    </Box>}
    </Button>
  </div>
  <Typography className={`${isDarkMode?"text-white":""} text-center py-3`}>Already have and account ? <Link className='text-blue-600' to="/signup">SignUp</Link></Typography>

  <div className='h-[1px] w-[100%] mt-10 bg-[#808080]'></div>
  <div className='flex flex-col items-center mt-6'>
      <div className='mt-[2%]'>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>
  </div>
</form>
</Paper>
</div>
</>
  )
}

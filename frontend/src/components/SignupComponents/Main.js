import React, { useState, useEffect } from 'react';
import Input from '../LoginComponents/Input';
import Square from '../LoginComponents/Square';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Link, useNavigation } from 'react-router-dom';
import { useSubmit } from 'react-router-dom';
import { validate } from 'react-email-validator';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Button, Paper, Typography, IconButton } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { ToastContainer, toast } from "react-toastify";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FaArrowCircleLeft } from 'react-icons/fa';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const PasswordRequirements = ({ password }) => {
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const numberRegex = /[0-9]/;
  const uppercaseRegex = /[A-Z]/;

  const boxStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '4px',
    marginTop: '8px',
    backgroundColor: '#f9f9f9'
  };

  return (
    <div style={boxStyle}>
      <ul>
        <li style={{ color: password.length >= 8 && password.length <= 12 ? 'green' : 'red' }}>
          {password.length >= 8 && password.length <= 12 ? <CheckCircleIcon /> : <CancelIcon />} 8-12 characters
        </li>
        <li style={{ color: numberRegex.test(password) ? 'green' : 'red' }}>
          {numberRegex.test(password) ? <CheckCircleIcon /> : <CancelIcon />} At least one number
        </li>
        <li style={{ color: uppercaseRegex.test(password) ? 'green' : 'red' }}>
          {uppercaseRegex.test(password) ? <CheckCircleIcon /> : <CancelIcon />} At least one uppercase letter
        </li>
        <li style={{ color: specialCharacterRegex.test(password) ? 'green' : 'red' }}>
          {specialCharacterRegex.test(password) ? <CheckCircleIcon /> : <CancelIcon />} At least one special character
        </li>
      </ul>
    </div>
  );
};

export default function Main() {
  const navigation = useNavigation();
  const submit = useSubmit();
  const [SignUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  useEffect(() => {
    // Update the component when password changes
  }, [SignUpData.password]);

  function sendData(e, googleauth) {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 5000);

    if (googleauth) {
      submit(googleauth, { method: 'post' });
      return;
    }

    e.preventDefault();
    setShowPasswordRequirements(true); // Show password requirements

    if (!SignUpData.email || !SignUpData.password) {
      return toast.error("Please fill all required the fields ", {
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
    if (!validate(SignUpData.email)) {
      return toast.error("Please enter valid email", {
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
    if (SignUpData.password.length > 0 && SignUpData.password.length < 8) {
      return toast.error("Invalid password", {
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
    if (SignUpData.password.length > 12) {
      return toast.error("Invalid password", {
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
      return toast.error("Invalid password", {
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
      return toast.error("Invalid password", {
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
      return toast.error("Invalid password", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    } else {
      submit(SignUpData, { method: 'post' });
    }
  }

  const responseMessage = (response) => {
    var token = response.credential;
    var decoded = jwt_decode(token);
    setSignUpData({ name: decoded.name, email: decoded.email, password: decoded.sub });
    sendData(1, { name: decoded.name, email: decoded.email, password: decoded.sub, isGoogle: true, pic: decoded.picture });
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
        <Link to="/"><FaArrowCircleLeft className="text-blue-600 cursor-pointer text-2xl"></FaArrowCircleLeft></Link>
        <div className='font-Poppins text-3xl font-extrabold flex items-center flex-col'>
          <HowToRegIcon fontSize='large' color='primary' />
          <Typography variant='h5'>Sign Up</Typography>
        </div>
        <br />
        <hr></hr>
        <form className='mt-6 relative'>
          <Input onSetData={setSignUpData} name='name' text='Name' placeholder='Enter your name' type='text'></Input>
          <Input onSetData={setSignUpData} name='email' text="Email ID" placeholder="Enter Email Address" type='text'></Input>
          <div className='relative'>
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
                style={{ position: 'absolute', right: '10px', top: '71%', transform: 'translateY(-50%)' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {showPasswordRequirements && <PasswordRequirements password={SignUpData.password} />}
          </div>
          <div className='flex flex-row justify-center mt-8'>
            <Button sx={{ padding: ".5rem 4rem" }} onClick={sendData} variant="contained">
              {!submitting && <div>SIGN UP</div>}
              {submitting && <Box sx={{ display: 'flex' }}>
                <CircularProgress size={25} style={{ color: '#FFFFFF' }} />
              </Box>}
            </Button>
          </div>
          <Typography className='text-center py-3'>Already have an account? <Link className='text-blue-600' to="/login">LogIn</Link></Typography>
          <div className='h-[1px] w-[100%] mt-4 bg-[#808080]'></div>
          <div className='flex flex-col items-center mt-6'>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </div>
        </form>
      </Paper>
    </div>
  )
}

import React, { useState } from 'react'
import { Link, useNavigation, useSubmit } from 'react-router-dom';
import Square from '../LoginComponents/Square';
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import Input from '../LoginComponents/Input';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function Main() {


  const navigation = useNavigation();
  const submit = useSubmit();
  const [inputData, setInputData] = useState({email: ""});
  const [submitting, setSubmiting] = useState(false)



  function submitData(e) {
    setSubmiting(true);
    setTimeout(() => {
      setSubmiting(false);
    }, 5000)

    e.preventDefault();
    if (!inputData.email) {
      alert('error');
    }
    submit({email: inputData.email}, { method: 'post' })
  }



  return (
    <div className='flex flex-col items-center h-[100vh] w-[100vw] relative overflow-hidden px-2'>
      <Square></Square>
      <Square isRight={true}></Square>
      <Paper className='z-20 w-full max-w-[370px] p-[2rem] my-auto' elevation={3}>

        <div className='font-Poppins text-3xl font-extrabold flex items-center flex-col'>
          <LockOpenIcon fontSize='large' color='primary' />
          <Typography variant='h5'>Forget Password</Typography>
        </div>
        <br />
        <form className='mt-6 relative'>
          <Input onSetData={setInputData} name='email' text="Email ID" placeholder="Email address" type='text'></Input>

          <div className='flex flex-row justify-center mt-6'>
            <Button sx={{ padding: ".5rem 4rem" }} onClick={submitData} variant="contained">
              {!submitting && <div>SEND</div>}
              {submitting && <Box sx={{ display: 'flex' }}>
                <CircularProgress size={25} style={{ color: '#FFFFFF' }} />
              </Box>}
            </Button>
          </div>
          <Typography className='text-center py-3'><Link className='text-blue-600' to="/login">Back to Login</Link></Typography>
        </form>
      </Paper>
    </div>
  )
}

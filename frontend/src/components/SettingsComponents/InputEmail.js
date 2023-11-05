import React from 'react'
import { TextField } from '@mui/material'

export default function InputEmail({email,setEmail}) {

  const emailHandler=(e)=>{
    setEmail(e.target.value);
  }

  return (
    <TextField
    id="outlined-read-only-input"
    label="Email"
    onChange={emailHandler}
    value={email}
    style={{width:'40%'}}
  />
  )
}

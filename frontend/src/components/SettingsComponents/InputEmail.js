import React from 'react'
import { TextField } from '@mui/material'

export default function InputEmail() {

    const {email}=JSON.parse(localStorage.getItem('info'));

  return (
    <TextField
    id="outlined-read-only-input"
    label="Email"
    defaultValue={email}
    style={{width:'40%'}}
  />
  )
}

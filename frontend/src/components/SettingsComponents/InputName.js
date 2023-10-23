import React from 'react'
import { TextField } from '@mui/material'

export default function InputName() {
    const {name}=JSON.parse(localStorage.getItem('info'));


  return (
    <TextField
    id="outlined-read-only-input"
    label="Name"
    defaultValue={name}
    style={{width:'40%'}}
  />
  )
}

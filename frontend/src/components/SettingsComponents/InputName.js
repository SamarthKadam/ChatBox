import React from 'react'
import { TextField } from '@mui/material'

export default function InputName({name,setName}) {

  const nameHandler=(e)=>{
    setName(e.target.value);
  }

  return (
    <TextField
    value={name}
    onChange={nameHandler}
    id="outlined-read-only-input"
    label="Name"
    style={{width:'40%'}}
  />
  )
}

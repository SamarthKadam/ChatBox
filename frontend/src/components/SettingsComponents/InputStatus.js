import React from 'react'
import { TextField } from '@mui/material'

export default function InputName({status,setStatus}) {

  const nameHandler=(e)=>{
    setStatus(e.target.value);
  }

  return (
    <TextField
    value={status}
    onChange={nameHandler}
    id="outlined-read-only-input"
    label="Status"
    style={{width:'40%'}}
  />
  )
}

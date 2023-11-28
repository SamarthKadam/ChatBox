import React from 'react'
import { Chip } from '@mui/material'
import Avatar from '@mui/material/Avatar'

export default function ChipExtend({value,remove}) {

    // const color=randomColor({luminosity:"dark"});
    const handleDelete=()=>{
      remove(value._id);
    }


  return (
    <Chip color="primary"  style={{color:'black',fontSize:'14px',fontWeight:"bold",marginLeft:"5px",marginTop:"5px"}} avatar={<Avatar referrerPolicy="no-referrer" alt="Natacha" src={value.pic.startsWith('user')?`http://127.0.0.1:4000/${value.pic}`:`${value.pic}`}/>} onDelete={handleDelete} label={value.name.split(' ')[0]} variant="outlined"/>
  )
}

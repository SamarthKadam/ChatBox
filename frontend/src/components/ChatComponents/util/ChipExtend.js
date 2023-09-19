import React from 'react'
import { Chip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import img from '../../../assets/images/user-img.jpg'
import {randomColor} from 'randomcolor'

export default function ChipExtend({value}) {

    const color=randomColor({luminosity:"dark"});
    console.log(value);
    const handleDelete=()=>{

    }


  return (
    <Chip  style={{backgroundColor:`${color}`,color:"white",fontSize:'14px',marginLeft:"5px",marginTop:"5px"}} avatar={<Avatar alt="Natacha" src={value.pic}/>} onDelete={handleDelete} label={value.name.split(' ')[0]} variant="filled"/>
  )
}

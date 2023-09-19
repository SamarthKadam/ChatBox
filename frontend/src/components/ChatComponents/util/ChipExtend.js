import React from 'react'
import { Chip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import img from '../../../assets/images/user-img.jpg'
import {randomColor} from 'randomcolor'

export default function ChipExtend() {

    const value=randomColor({luminosity:"dark"});

    const handleDelete=()=>{

    }



  return (
    <Chip  style={{backgroundColor:`${value}`,color:"white",fontSize:'14px',marginLeft:"5px",marginTop:"5px"}} avatar={<Avatar alt="Natacha" src={img}/>} onDelete={handleDelete} label="Samuel" variant="filled"/>
  )
}

import React from 'react'
import { Chip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import {randomColor} from 'randomcolor'

export default function NormalChip({value}) {

    const color=randomColor({luminosity:"dark"});

    return (
        <Chip style={{backgroundColor:`${color}`,color:"white",fontSize:'14px',marginLeft:"5px",marginTop:"5px"}} avatar={<Avatar referrerPolicy="no-referrer" alt="Natacha" src={value.pic}/>} label={value.name.split(' ')[0]} variant="filled"/>
      )
}

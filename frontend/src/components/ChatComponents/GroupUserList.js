import React from 'react'
import Avatar from '@mui/material/Avatar'
import { Chip } from '@mui/material'
export default function GroupUserList() {



  return (
    <div className='self-start flex flex-row mt-4 flex-wrap'>
    <Chip style={{backgroundColor:"Scrollbar"}} avatar={<Avatar alt="Natacha" src="../../assets/images/user-img.jpg" />} label="Samuel" variant="filled"/>
    <Chip style={{backgroundColor:"Scrollbar"}} avatar={<Avatar alt="Natacha" src="../../assets/images/user-img.jpg" />} label="Samuel" variant="filled"/>
    <Chip style={{backgroundColor:"Scrollbar"}} avatar={<Avatar alt="Natacha" src="../../assets/images/user-img.jpg" />} label="Samuel" variant="filled"/>
    <Chip style={{backgroundColor:"Scrollbar"}} avatar={<Avatar alt="Natacha" src="../../assets/images/user-img.jpg" />} label="Samuel" variant="filled"/>
    </div>
  )
}

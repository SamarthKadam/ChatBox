import React from 'react'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { MotionAnimate } from 'react-motion-animate';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { NavLink } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
const iconComponent=[<GridViewOutlinedIcon/>,<ForumOutlinedIcon/>,<SearchOutlinedIcon/>,<SettingsOutlinedIcon/>]
export default function Item({text,to,val}) {
  return (
    <MotionAnimate reset={true}>
    <NavLink to={to} style={(value)=>{return value.isActive?{backgroundColor:'#0147FF',color:'white'}:{}}} className='w-[80%] transition ease-in-out delay-250 flex flex-row px-[5%] py-[3%] rounded-lg my-[10%]'>
     {iconComponent[val]}
      <div className="ml-[12%]">{text}</div>
    </NavLink>
    </MotionAnimate>
  )
}


// className={value=>{return value.isActive?'bg-blue-700':''}

import * as React from 'react';
import { useState } from 'react';
import Item from './Item';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { NavLink } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';

export default function Menu() {

  const [activeTab,setActiveTab]=useState(0);
  const changeTab=(value)=>{
    setActiveTab(value);
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='w-[80%]'>
      <Item val={0} to='dashboard' text='Dashboard'></Item>
      <Item val={1} to='analitycs' text='Analitycs'></Item>
      <Item val={2} to='message' text='Messages'></Item>
      <Item val={3} to='settings' text='Settings'></Item>
      </div>
    </div>
  );
}

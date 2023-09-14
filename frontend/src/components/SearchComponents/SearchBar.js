import React from 'react'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { IconButton } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

export default function SearchBar({onChange,searchHandler}) {
  return (
    <div className=' h-[10%] w-[100%] flex box-border justify-center py-2 relative'>
        {/* <SearchOutlined className='absolute l-[0%]'></SearchOutlined>
        <input className='w-[60%] font-Roboto text-lg border-2 p-2 rounded-md focus:border-[#4BB8FE] focus:outline-none' type='text'></input> */}
        <FormControl sx={{ m: 1, width: '60%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
          <OutlinedInput
          onChange={onChange}
            id="outlined-adornment-password"
            type='text'
            spellCheck={false}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={searchHandler}>
                <SearchOutlined></SearchOutlined>
                </IconButton>
            </InputAdornment>
            }
            label="Search"
          />
        </FormControl>
    </div>
  )
}

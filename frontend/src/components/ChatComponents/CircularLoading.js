import React from 'react'
import { CircularProgress } from '@mui/material'

export default function CircularLoading() {
  return (
    <div className='h-[100%] w-[100%] flex justify-center items-center'>
        <CircularProgress />
    </div>
  )
}

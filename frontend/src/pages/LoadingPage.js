import React from 'react'
import {LinearProgress} from '@mui/material'

export default function LoadingPage() {
  return (
    <div className="dark:bg-gray-900 flex justify-center items-center h-[100vh]">
        <div className='w-[80vh]'>
        <LinearProgress />
        </div>
    </div>
  )
}

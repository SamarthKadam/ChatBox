import React from 'react'
import LoadingGif from '../assets/images/loading.gif';

export default function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className='w-[80vh] flex justify-center'>
        <img src={LoadingGif} alt="Loading..." />
      </div>
    </div>
  )
}

import React from 'react'
import User from './User'
import { Skeleton } from '@mui/material'
import { useState } from 'react'
import Loading from './Loading'

export default function Result() {

const[isLoading,SetisLoading]=useState();
const [users,SetUsers]=useState([1,2,3])

    


  return (
    <div className=' w-[100%] flex box-border justify-center py-2 relative'>
       {isLoading&&<Loading></Loading>}
       {users.length>0&&( <div className='w-[60%] border-[1px] rounded-md border-[#acacac] px-[1%] py-[1%] flex flex-col'>
{users.map((data)=><User></User>)}
</div>)}
    </div>
  )
}
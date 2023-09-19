import React from 'react'
import ChipExtend from './util/ChipExtend'
export default function GroupUserList({users}) {



  return (
    <div className='self-start flex flex-row mt-4 flex-wrap'>
      {users.map((data,index)=><ChipExtend value={data} key={index}></ChipExtend>)}
    </div>
  )
}

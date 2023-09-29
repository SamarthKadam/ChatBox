import React from 'react'
import ChipExtend from './util/ChipExtend'
import NormalChip from './util/NormalChip'
export default function GroupUserList({users,remove,notCancelable}) {

  if(notCancelable)
  return (
    <div className='self-start flex flex-row mt-4 flex-wrap'>
    {users.map((data,index)=><NormalChip  value={data} key={index}></NormalChip>)}
  </div>
)


  return (
    <div className='self-start flex flex-row mt-4 flex-wrap'>
      {users.map((data,index)=><ChipExtend remove={remove} value={data} key={index}></ChipExtend>)}
    </div>
  )
}

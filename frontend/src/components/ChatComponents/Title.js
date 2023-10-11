import React from 'react'

export default function Title({title,black}) {

  if(black===true)
  return <div className="font-serif tracking-tighter text-3xl font-bold text-black">{title}</div>

  return (
    <div className="font-serif tracking-tighter text-3xl font-bold text-[#0538FF]">{title}</div>
  )
}

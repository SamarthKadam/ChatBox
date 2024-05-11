import React from 'react'
export default function Input({text,type,placeholder,onSetData,name}) {

  function setInput(e)
  {
    onSetData((data)=>{

      let obj={...data};
      obj[`${name}`]=e.target.value;
      return obj;
    })
  }

  return (
    <div className='mt-3 '>
          <div className='font-poppiins font-medium mb-2 text-[#BFBFBF] '>{text}</div>
          <input spellCheck="false" onChange={setInput}type={type} className='outline-0 border-[1px] rounded-md w-[100%] px-2 py-2  font-poppins border-[#BFBFBF]'></input>
        </div>
  )
}

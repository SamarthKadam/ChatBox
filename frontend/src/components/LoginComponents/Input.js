import React, { useContext, useState } from 'react'
import { DarkModeContext } from '../ToggleMode/DarkModeContext';
export default function Input({text,type,placeholder,onSetData,name}) {
  const {isDarkMode}=useContext(DarkModeContext)
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
          <div className={`font-poppiins font-medium mb-2 text-[#BFBFBF] ${isDarkMode?"text-white outline-none border-none border-b-2 border-white":""}`}>{text}</div>
          <input spellCheck="false" onChange={setInput}type={type} className={` outline-0 border-[1px] rounded-md w-[100%] px-2 py-2  font-poppins border-[#BFBFBF]`}   placeholder={placeholder}></input>
        </div>
  )
}

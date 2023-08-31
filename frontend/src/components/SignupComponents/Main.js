import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../LoginComponents/Input'
import Square from '../LoginComponents/Square'


export default function Main() {
  return (
    <div className='flex flex-col  items-center py-[5%] h-[100vh] w-[100vw] relative overflow-hidden'>
    <Square></Square>
    <Square isRight={true}></Square>
        <div className='font-Poppins text-3xl font-extrabold'>Sign Up</div>
<hr></hr>
<form className='w-[35%] mt-6 relative'>
  <Input name='name' text='Name' placeholder='Enter your name' type='text'></Input>
  <Input name='email' text="Email ID" placeholder="Email address" type='text'></Input>
  <Input name='password'  text='Password' type='password' placeholder='Password'></Input>
  <div className='flex flex-row justify-center mt-10'>
  <button className='px-10 rounded-[30px] bg-[#0270F7] text-lg font-medium py-4 hover:px-[44px] text-white '>SIGN IN</button>
  </div>
  <div className='h-[1px] w-[100%] mt-10 bg-[#808080]'></div>
  <div className='flex flex-col items-center mt-6'>
      <Link to='/signup' className='text-[#5A5A5A] font-medium border-2 border-[#5A5A5A] hover:border-black px-32 rounded-[40px] mt-7 py-4 tracking-wide'>SIGN UP FOR SPOTIFY</Link>
  </div>
</form>
</div>
  )
}

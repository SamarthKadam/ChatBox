import React from 'react'
import { Link } from 'react-router-dom'

export default function NavList() {
  return (
    <ul className='flex flex-row w-[40%] max-[1200px]:w-[60%] justify-around text-white font-Roboto font-semibold items-center'>
    <li><Link>Product</Link></li>
    <li><Link>Services</Link></li>
    <li><Link>Contact Us</Link></li>
    <li><Link>Download App</Link></li>
    </ul>
  )
}

import React from "react";
import Square from '../LoginComponents/Square';

export default function Error(){
    return (
        <div className='flex flex-col items-center justify-center h-[100vh] w-[100vw] relative overflow-hidden px-2'>
            <Square></Square>
            <Square isRight={true}></Square>

            <div>
                <h1 className="text-3xl text-gray-700">Token is Expiry or Unvalid...!</h1>
            </div>
        </div>
    )
}
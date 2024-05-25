import React from 'react';

export default function SenderMessage({ content, reactions = [] }) {
  return (
    <div className='w-[60%] ml-auto'>
      <div className='flex flex-row justify-end my-1'>
        <div className='bg-[#014DFE] rounded-tl-xl font-Roboto rounded-bl-xl rounded-br-xl text-white box-border px-2 py-2 max-[900px]:text-sm mr-2'>
          {content}
        </div>
      </div>
      <div>
        {reactions.map((reaction, index) => (
          <span key={index}>{reaction.type} </span>
        ))}
      </div>
    </div>
  );
}


import React from 'react';
import Card from '../components/HomeComponents/Card'; 
import NavList from '../components/HomeComponents/NavList'; 

export default function Service() {
  return (
    <div>
      <NavList />
      <div className='h-[100vh] px-40 max-[885px]:px-20 max-[653px]:px-14 py-[5%] flex justify-center items-center'>
        <div className='flex flex-col items-center'>
          <div className='w-[60%]'>
            <div className='text-[#384055] text-6xl text-center font-semibold font-Poppins max-[1127px]:text-5xl max-[607px]:text-4xl max-[440px]:text-3xl'>Get the best of all the features</div>
          </div>
          <div className="mt-[10%] w-[70vw] max-[653px]:gap-4 grid grid-cols-1 place-items-center sm:grid-cols-2 gap-10">
            <Card title='Simple' description='With intuitive interface, ChatBox is so simple you already know how to use it' />
            <Card title='Synced' description='ChatBox lets you access your chats. Keeping it secured in databases' />
            <Card title='Private' description='ChatBox messages are heavily encrypted and can self-destruct' />
            <Card title='Secure' description='ChatBox keeps your messages safe from hacker attacks' />
          </div>
        </div>
      </div>
    </div>
  );
}

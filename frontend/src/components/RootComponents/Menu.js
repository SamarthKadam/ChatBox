
import * as React from 'react';
import Item from './Item';

export default function Menu() {

  return (
    <div className='flex flex-col items-center'>
      <div className='w-[80%]'>
      <Item val={0} to='dashboard' text='Dashboard'></Item>
      <Item val={1} to='analitycs' text='Analitycs'></Item>
      <Item val={2} to='message' text='Messages'></Item>
      <Item val={3} to='search' text='Search'></Item>
      <Item val={4} to='settings' text='Settings'></Item>
      </div>
    </div>
  );
}

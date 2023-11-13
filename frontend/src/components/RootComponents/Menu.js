
import * as React from 'react';
import Item from './Item';

export default function Menu() {

  return (
    <div className='flex flex-col items-center'>
      <div className='w-[80%]'>
      <Item val={1} to='search' text='Search'></Item>
      <Item val={0} to='message' text='Messages'></Item>
      <Item val={3} to='settings' text='Settings'></Item>
      <Item val={2} to='dashboard' text='About'></Item>
      </div>
    </div>
  );
}

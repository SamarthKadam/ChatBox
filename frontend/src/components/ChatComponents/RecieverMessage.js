import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { isSameUser } from '../../helper/Reusable';

export default function ReceiverMessage({ img, content, messages, index, name, isGroupChat, messageId }) {
  const [reaction, setReaction] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const toggleReaction = async (newReaction) => {
    const updatedReaction = reaction === newReaction ? null : newReaction;
    setReaction(updatedReaction);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/message/react`, {
        messageId,
        reactionType: updatedReaction,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      });
    } catch (error) {
      console.error('Failed to update reaction:', error);
    }
  };

  const messageContent = (
    <div
      className='relative bg-[#FFFFFF] rounded-tr-xl ml-[1%] font-Roboto rounded-br-xl rounded-bl-xl box-border px-2 py-2 max-[900px]:text-sm'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {reaction && (
        <div className="reaction-container">
          <span className="reaction" onClick={() => toggleReaction(reaction)}>{reaction}</span>
        </div>
      )}
      <div>{content}</div>
      {isHovered && (
        <div className="reaction-buttons-container">
          <div className="flex flex-row space-x-1 mt-1">
            <button onClick={() => toggleReaction('👍')} className="reaction-button">👍</button>
            <button onClick={() => toggleReaction('❤️')} className="reaction-button">❤️</button>
            <button onClick={() => toggleReaction('😆')} className="reaction-button">😆</button>
          </div>
        </div>
      )}
    </div>
  );

  if (isGroupChat && messages && index !== undefined && isSameUser(messages, index)) {
    return (
      <div className='flex flex-row justify-start my-1'>
        <div className='bg-[#FFFFFF] rounded-tr-xl ml-[45px] font-Roboto rounded-br-xl rounded-bl-xl box-border px-2 py-2 max-[900px]:text-sm'>
          {messageContent}
        </div>
      </div>
    );
  }

  return (
    <div className='w-[60%]'>
      <div className='flex flex-row justify-start my-1'>
        {isGroupChat && (
          <Tooltip title={name} arrow placement="top-start">
            <Avatar referrerPolicy="no-referrer" src={img.startsWith('user') ? `${process.env.REACT_APP_API_URL}/${img}` : img}></Avatar>
          </Tooltip>
        )}
        {messageContent}
      </div>
      <style jsx>{`
        .reaction-button {
          cursor: pointer;
          background: none;
          border: none;
          font-size: 1.25rem;
          padding: 0.25rem;
          transition: transform 0.1s;
        }

        .reaction-button:hover {
          transform: scale(1.2);
        }

        .reaction {
          font-size: 1rem;
          margin-right: 0.25rem;
          cursor: pointer;
        }

        .reaction-container {
          position: absolute;
          top: -1.5rem;
          left: 0;
          background-color: white;
          padding: 0.25rem;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .reaction-buttons-container {
          position: absolute;
          top: 0;
          left: 0;
          margin-top: 2rem;
          background-color: white;
          padding: 0.25rem;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}

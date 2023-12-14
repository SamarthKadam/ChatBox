import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useSelector } from "react-redux";
import { getSender } from "../../helper/Reusable";
import { socket } from "../../socket/socket";
import groupLogo from '../../assets/images/group.png'

export default function ChatTitle({ openChatModel }) {
  const data = useSelector((state) => state.chat.activeChat);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (data === null) return;


    const setTypeHandler=(room)=>{
      setIsTyping(data._id===room)
    }
  
    const unsetTypeHandler=(room)=>{
      setIsTyping(false);
    }
  

    socket.on("typing", setTypeHandler);
    socket.on("stop typing",unsetTypeHandler);

    return ()=>{
      socket.off("typing",setTypeHandler);
      socket.off("stop typing",unsetTypeHandler);
    }

  }, [data]);

  if (data === null) return <></>;

  const isGroupChat = data.isGroupChat;
  let user;
  if (isGroupChat) {
    user = { name: data.chatName };
  } else {
    user = getSender(data.users);
  }

  return (
    <div className="flex flex-row px-[5%] box-border justify-between w-[100%]">
      <div className="flex flex-row">
        <Avatar
          referrerPolicy="no-referrer"
          alt="Group-pic"
          sx={{ width: 48, height: 48 }}
          src={isGroupChat?groupLogo:(user.pic.startsWith('user')?`${process.env.REACT_APP_API_URL}/${user.pic}`:user.pic)}
        ></Avatar>
        <div className="flex flex-col ml-3">
          <div className="text-xl font-Roboto font-semibold">{user.name}</div>
          {isTyping && (
            <div className="text-xs font-normal  text-[#30C730]">
              {data.isGroupChat ? "Someone" : user.name} is typing...
            </div>
          )}
        </div>
      </div>
      <div onClick={openChatModel}>
        <MoreHorizOutlinedIcon
          style={{ cursor: "pointer" }}
          color="action"
        ></MoreHorizOutlinedIcon>
      </div>
    </div>
  );
}

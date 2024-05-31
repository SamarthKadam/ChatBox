import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useSelector } from "react-redux";
import { getSender } from "../../helper/Reusable";
import { socket } from "../../socket/socket";
import groupLogo from "../../assets/images/group.png";
import moment from "moment";

export default function ChatTitle({ openChatModel }) {
  const data = useSelector((state) => state.chat.activeChat);
  const [isTyping, setIsTyping] = useState(false);
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    if (data === null) return;

    const setTypeHandler = (room) => {
      setIsTyping(data._id === room);
    };

    const unsetTypeHandler = (room) => {
      setIsTyping(false);
    };

    const statusUpdateHandler = (statusUpdate) => {
      if (data && !data.isGroupChat && statusUpdate.userId === user._id) {
        setUserStatus(statusUpdate);
      }
    };

    socket.on("typing", setTypeHandler);
    socket.on("stop typing", unsetTypeHandler);
    socket.on("status update", statusUpdateHandler);

    return () => {
      socket.off("typing", setTypeHandler);
      socket.off("stop typing", unsetTypeHandler);
      socket.off("status update", statusUpdateHandler);
    };
  }, [data]);

  if (data === null) return <></>;

  const isGroupChat = data.isGroupChat;
  let user;
  if (isGroupChat) {
    user = { name: data.chatName };
  } else {
    user = getSender(data.users);
  }

  const currentStatus = userStatus || user;

  return (
    <div className="flex flex-row px-[5%] box-border justify-between w-[100%]">
      <div className="flex flex-row">
        <Avatar
          referrerPolicy="no-referrer"
          alt="Group-pic"
          sx={{ width: 48, height: 48 }}
          src={
            isGroupChat
              ? groupLogo
              : user.pic.startsWith("user")
              ? `${process.env.REACT_APP_API_URL}/${user.pic}`
              : user.pic
          }
        ></Avatar>
        <div className="flex flex-col ml-3">
          <div className="flex justify-between items-center">
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-Roboto font-semibold">
              {user.name}
            </div>
            {!isTyping &&
              (currentStatus.isOnline ? (
                <div className="flex w-2 h-2 bg-green-600 rounded-full ml-3 my-2"></div>
              ) : (
                <div></div>
              ))}
          </div>
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

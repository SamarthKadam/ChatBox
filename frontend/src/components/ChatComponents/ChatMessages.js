import React, { useEffect, useRef, useState } from "react";
import RecieverMessage from "./RecieverMessage";
import SenderMessage from "./SenderMessage";
import { useSelector } from "react-redux";
import Advertisement from "./Advertisement";
import CircularLoading from "./CircularLoading";
import { isSender } from "../../helper/Reusable";
import { socket } from "../../socket/socket";
import { InitializeChatMessages } from "../../services/Actions/Chat/action";
import { useDispatch } from "react-redux";
import { AddMessage } from "../../services/Actions/Chat/action";
import EmptyMessages from "./EmptyMessages";
import { ActiveChatNotify } from "../../services/Actions/Chat/action";

export default function ChatMessages() {
  const isSet = useSelector((state) => state.chat.activeChat);
  const [isLoading, setIsLoading] = useState(false);
  const data = useSelector((state) => state.chat.activeChatMessages);
  const div = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSet === null) return;

    const getData = async () => {
      setIsLoading(true);
      const cookie = localStorage.getItem("jwt");
      const response = await fetch(
        `http://127.0.0.1:4000/api/v1/message/${isSet._id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        dispatch(InitializeChatMessages(data.message));
      }
      setIsLoading(false);
    };
    getData();
  }, [isSet,dispatch]);

  useEffect(() => {
    if (isSet == null) return;

    const messageFn = (newMessageRecieved) => {
      console.log("-------------------------------");
      console.log(isSet._id, newMessageRecieved.chat._id);
      if (isSet !== null && isSet._id !== newMessageRecieved.chat._id) {
        console.log(
          "Add a notification on chatId",
          newMessageRecieved.chat._id
        );
        // dispatch(ActiveChatNotify(newMessageRecieved.chat._id));
      } else if (isSet !== null && isSet._id === newMessageRecieved.chat._id) {
        console.log("why here?");
        dispatch(AddMessage(newMessageRecieved));
      }
    };

    socket.on("message recieved", messageFn);
    return () => {
      socket.off("message recieved", messageFn);
    };
  }, [isSet,dispatch]);
  useEffect(() => {
    if (data.length === 0) return;

    let timer;

    if (div.current) {
      timer = setTimeout(() => {
        div.current.scrollTop = div.current.scrollHeight;
      }, 0);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  if (isSet === null) return <Advertisement></Advertisement>;

  return (
    <div
      ref={div}
      className="w-[100%] h-[88%] px-[3%] overflow-y-scroll no-scrollbar py-[2%] box-border relative flex flex-col"
    >
      {isLoading && <CircularLoading></CircularLoading>}
      {!isLoading && data.length === 0 && <EmptyMessages></EmptyMessages>}
      {!isLoading && data.length > 0 && (
        <>
          {data.map((val, index) => {
            if (isSender(val.sender._id))
              return (
                <SenderMessage
                  content={val.content}
                  key={index}
                ></SenderMessage>
              );
            else
              return (
                <RecieverMessage
                  isGroupChat={isSet.isGroupChat}
                  name={val.sender.name}
                  img={val.sender.pic}
                  messages={data}
                  index={index}
                  content={val.content}
                  key={index}
                ></RecieverMessage>
              );
          })}
        </>
      )}
    </div>
  );
}
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
import { moveChatToTop } from "../../services/Actions/Chat/action";
import { updateChatBar } from "../../services/Actions/Chat/action";
import useSound from "use-sound";
import { addIncomingUserChatBar } from "../../services/Actions/Chat/action";
import notifySound from "../../assets/sounds/notification.mp3";

export default function ChatMessages() {
  const isSet = useSelector((state) => state.chat.activeChat);
  const AllChats = useSelector((state) => state.chat.AllChats);
  const [isLoading, setIsLoading] = useState(false);
  const data = useSelector((state) => state.chat.activeChatMessages);
  const div = useRef(null);
  const dispatch = useDispatch();
  const [play] = useSound(notifySound);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("info"));
    socket.emit("setup", loggedUser);
  }, []);

  useEffect(() => {
    const messageFn = (newMessageRecieved) => {
      const isChatBarPresent = AllChats.find(
        (val) => val._id === newMessageRecieved.chat._id
      );

      console.log("Lets test");
      if (!isChatBarPresent)
      {
        dispatch(addIncomingUserChatBar(newMessageRecieved.chat));
        dispatch(updateChatBar(newMessageRecieved.chat._id, newMessageRecieved.content));
        return;
      }

      play();
      if (isSet !== null && isSet._id !== newMessageRecieved.chat._id) {
        dispatch(moveChatToTop(newMessageRecieved.chat._id));
        dispatch(
          updateChatBar(newMessageRecieved.chat._id, newMessageRecieved.content)
        );
      } else if (isSet !== null && isSet._id === newMessageRecieved.chat._id) {
        dispatch(AddMessage(newMessageRecieved));
        dispatch(moveChatToTop(newMessageRecieved.chat._id));
        dispatch(
          updateChatBar(newMessageRecieved.chat._id, newMessageRecieved.content)
        );
      } else if (isSet === null) {
        dispatch(moveChatToTop(newMessageRecieved.chat._id));
        dispatch(
          updateChatBar(newMessageRecieved.chat._id, newMessageRecieved.content)
        );
      }
    };

    socket.on("message recieved", messageFn);
    return () => {
      socket.off("message recieved", messageFn);
    };
  }, [isSet, dispatch, AllChats]);

  useEffect(() => {
    if (isSet === null) return;

    const getData = async () => {
      setIsLoading(true);
      const cookie = localStorage.getItem("jwt");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/message/${isSet._id}`,
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
  }, [isSet, dispatch]);

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

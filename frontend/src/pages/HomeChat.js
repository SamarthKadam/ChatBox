import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InitializeChat, SetActiveChat, removeChat, NullifyActiveChat } from "../services/Actions/Chat/action";
import TopBar from "../components/ChatComponents/TopBar";
import ChatBar from "../components/ChatComponents/ChatBar";
import ChatTitle from "../components/ChatComponents/ChatTitle";
import ChatMessages from "../components/ChatComponents/ChatMessages";
import Type from "../components/ChatComponents/Type";
import BasicModal from "../components/ChatComponents/BasicModel";
import ChatDetails from "../components/ChatComponents/ChatDetails";
import Loading from "./util/Loading";
import NoChats from "./util/NoChats";
import { socket } from "../socket/socket";
import { MotionAnimate } from "react-motion-animate";

export default function HomeChat() {
  const state = useSelector((state) => state.chat.AllChats);
  const dispatch = useDispatch();
  const [chatModel, setChatModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const chatfn = (chatid) => {
      console.log("Remove the chatbar for the id", chatid);
      dispatch(removeChat(chatid));
      dispatch(NullifyActiveChat());
    };

    socket.on('removechatbar-recieve', chatfn);
    return () => {
      socket.off('removechatbar', chatfn);
    };
  }, [dispatch]);

  useEffect(() => {
    const getAllChats = async () => {
      setIsLoading(true);
      setRequestSent(true);
      const cookie = localStorage.getItem("jwt");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/chat`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
      });
      const data = await response.json();
      if (data.data.length === 0) setIsEmpty(true);

      setIsLoading(false);
      dispatch(InitializeChat(data.data));
    };
    if (state.length > 0) {
      return;
    }
    getAllChats();
  }, [dispatch, state.length]);

  const selectChat = (data) => {
    dispatch(SetActiveChat(data));
  };

  const createGroupChat = () => {
    handleOpen();
  };

  const openChatDetails = () => {
    setChatModel(true);
  };

  const closeChatDetails = () => {
    setChatModel(false);
  };

  console.log("This is chat state", state);

  return (
    <div className="flex flex-col h-screen md:grid md:grid-cols-[1fr,2fr] lg:grid-cols-[1fr,3fr]">
      <BasicModal handleClose={handleClose} open={open} />
      <ChatDetails closeChat={closeChatDetails} chatModel={chatModel} />
      <div className="flex flex-col md:col-span-1 border-r border-gray-200 bg-white">
        <TopBar createGroup={createGroupChat} />
        <ChatTitle openChatModel={openChatDetails} />
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading && <Loading />}
          {!isLoading && state && state.map((data, index) => (
            <MotionAnimate key={index} animation="fadeInUp">
              <ChatBar select={selectChat} data={data} />
            </MotionAnimate>
          ))}
          {isEmpty && state.length === 0 && <NoChats />}
        </div>
      </div>
      <div className="flex flex-col md:col-span-2 lg:col-span-3 bg-gray-100 relative overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <ChatMessages />
        </div>
        <div className="p-4 border-t border-gray-200 bg-white">
          <Type />
        </div>
      </div>
    </div>
  );
}

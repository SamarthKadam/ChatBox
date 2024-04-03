import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { getSender } from "../../helper/Reusable";
import GroupUserList from "./GroupUserList";
import { getUsersLeavingMe } from "../../helper/Reusable";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRef, useState } from "react";
import User from "./User";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import {
  RenameGlobalChat,
  addNewUserToGroup,
} from "../../services/Actions/Chat/action";
import { addNewUserToActive } from "../../services/Actions/Chat/action";
import { RenameChat } from "../../services/Actions/Chat/action";
import { ToastContainer, toast } from "react-toastify";
import { removeUserFromGroup } from "../../services/Actions/Chat/action";
import { removeUserFromActive } from "../../services/Actions/Chat/action";
import { NullifyActiveChat } from "../../services/Actions/Chat/action";
import { removeChat } from "../../services/Actions/Chat/action";
import { socket } from "../../socket/socket";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth/3,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "14px",
  p: 4,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  outline: "none",
};

export default function ChatDetails({ chatModel, closeChat }) {
  const activeUser = useSelector((state) => state.chat.activeChat);
  const dispatch = useDispatch();
  let data;
  const ref = useRef();
  const [Results, setResults] = useState([]);
  const [isEmptyResults, setIsEmptyResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (activeUser === null) return <></>;

  if (activeUser.isGroupChat) {
    data = activeUser;
  } else {
    data = getSender(activeUser.users);
  }

  const notify = (errorname, value) => {
    if (errorname === "error") {
      return toast.error(`${value}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    return toast.error(`${errorname}`, {
      position: "top-center",
      autoClose: 2222,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const closeModelHandler = () => {
    setResults([]);
    closeChat();
  };
  const searchHandler = async (value) => {
    setIsLoading(true);
    const cookie = localStorage.getItem("jwt");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/users?search=${value}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
      }
    );

    setIsLoading(false);
    const data = await response.json();
    data.users.length =
      data.users.length > 2 ? (data.users.length = 2) : data.users.length;
    setResults(data.users);
    if (data.users.length === 0) setIsEmptyResults(true);
    else setIsEmptyResults(false);
  };

  const inputHandler = (e) => {
    setTimeout(() => {
      searchHandler(e.target.value);
    }, 2000);
  };

  const updateInfo = async () => {
    const cookie = localStorage.getItem("jwt");
    const bodyData = {
      chatId: activeUser._id,
      chatName: ref.current.value,
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/chat/rename`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify(bodyData),
    });
    const data = await response.json();
    if (data.status === "success") {
      closeChat();
      dispatch(RenameChat(ref.current.value));
      dispatch(RenameGlobalChat(ref.current.value, activeUser._id));
    }
  };

  const addHandler = async (user) => {
    const cookie = localStorage.getItem("jwt");
    const bodyData = {
      chatId: activeUser._id,
      userId: user._id,
    };
    const loggedUser = JSON.parse(localStorage.getItem("info"));
    if (loggedUser._id !== activeUser.groupAdmin._id)
      return notify("Only administrators are allowed to add new users.");

    const isPresent = activeUser.users.find((data) => data._id === user._id);
    if (isPresent !== undefined) {
      return notify("error", "User already in the group!");
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/chat/groupadd`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify(bodyData),
    });
    const data = await response.json();
    if (data.status === "success") {
      dispatch(addNewUserToGroup(user, activeUser._id));
      dispatch(addNewUserToActive(user));
    }
  };

  const removeHandler = async (userId) => {
    const cookie = localStorage.getItem("jwt");
    const bodyData = {
      chatId: activeUser._id,
      userId: userId,
    };
    const loggedUser = JSON.parse(localStorage.getItem("info"));
    if (loggedUser._id !== activeUser.groupAdmin._id)
      return notify("Only administrators are allowed to remove users.");

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/chat/groupremove`,
      {
        method: "put",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify(bodyData),
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      dispatch(removeUserFromGroup(userId, activeUser._id));
      dispatch(removeUserFromActive(userId));
    }
  };

  const deleteChatHandler = () => {
    const deleteData = async () => {
      const bodyData = {
        chatId: activeUser._id,
      };
      const cookie = localStorage.getItem("jwt");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/chat/deleteChat`,
        {
          method: "delete",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${cookie}`,
          },
          body: JSON.stringify(bodyData),
        }
      );
      socket.emit("removechatbar-send",activeUser._id)
      dispatch(NullifyActiveChat());
      dispatch(removeChat(activeUser._id));
      // const data=await response.json();
    };
    const loggedUser = JSON.parse(localStorage.getItem("info"));
    if (activeUser.isGroupChat && loggedUser._id !== activeUser.groupAdmin._id)
      return notify("Only administrators are allowed to delete the group.");
    deleteData();
    closeModelHandler();
  };

  return (
    <div className="absolute">
      <ToastContainer></ToastContainer>
      <Modal
        open={chatModel}
        onClose={closeChat}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-2xl font-Poppins">Info</div>
          <div className="flex w-[100%]">
            <input
              ref={ref}
              defaultValue={
                activeUser.isGroupChat ? activeUser.chatName : data.name
              }
              disabled={!data.isGroupChat}
              spellCheck="false"
              placeholder="Chat Name"
              className=" text-lg h-[16%] w-[100%] mt-5 font-thin px-1 py-2 outline-none bg-[#F6F8FC]"
            ></input>
            {data.isGroupChat && (
              <button
                onClick={updateInfo}
                className="bg-[#014DFE] text-white text-lg  ml-2 px-2 py-1 mt-4 rounded-sm"
              >
                Change
              </button>
            )}
          </div>
          {data.isGroupChat && (
            <input
              onChange={inputHandler}
              spellCheck="false"
              placeholder="Add your Friends"
              className="text-lg h-[16%] w-[100%] px-1 py-2 mt-3 outline-none font-thin bg-[#F6F8FC]"
            ></input>
          )}
          {data.isGroupChat && (
            <div className="w-[100%]">
              {!isLoading &&
                Results &&
                Results.length > 0 &&
                Results.map((data, index) => (
                  <User add={addHandler} values={data} key={index}></User>
                ))}
              {!isLoading && isEmptyResults ? <p>No results found</p> : null}
              {isLoading && <Loading></Loading>}
              {
                <GroupUserList
                  remove={removeHandler}
                  users={getUsersLeavingMe(data.users)}
                ></GroupUserList>
              }
            </div>
          )}
          <div>
            <button
              onClick={closeModelHandler}
              className=" text-[#0147FF] text-xl border-[2px] border-[#0147FF] px-4 py-1 ml-2 mt-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={deleteChatHandler}
              className="bg-[#EF5350] text-white text-lg  ml-2 px-2 py-1.5 mt-4 rounded-lg"
            >
              <CancelIcon className="mr-2"></CancelIcon>
              {data.isGroupChat ? "Delete Group" : "Delete Chat"}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

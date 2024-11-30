import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { AddUser } from "../services/Actions/Chat/action";

export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const dispatch=useDispatch();
  const state=useSelector((state)=>state.chat.AllChats);
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const cookie = localStorage.getItem("jwt");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      const data = await response.json();

      setUserData(data.users);
    };
    getData();
  }, [id]);

  const accessChatHandler = (values) => {
    const isPresent = state.find((data) => {
      return data.email === values.email;
    });
    dispatch(AddUser(values, state));
    setTimeout(() => {
      navigate("/home/message", { replace: true });
    }, 2000);
  };

  if (userData === null) return <LoadingPage></LoadingPage>;

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div className="flex sm:gap-8 text-center flex-col sm:pt-10">
        <Avatar
          referrerPolicy="no-referrer"
          alt="User-pic"
          sx={{ width: 150, height: 150 }}
          src={userData.pic}
        />
        <h1 className="text-lg sm:text-xl font-semibold">{userData.name}</h1>
      </div>
      <div className="flex flex-col items-start justify-start p-5">
        <div className="flex gap-1">
          <p>Email :</p>
          <h1 className=" font-medium">{userData.email}</h1>
        </div>
        <div className="flex gap-1">
          <p>Gender :</p>
          <h1 className=" font-medium">{userData.gender}</h1>
        </div>
      </div>
      <button onClick={()=>accessChatHandler(userData)} className="bg-[#202142] flex items-center justify-center gap-2 p-2 px-4 text-white rounded-lg">
        <p>Start Messaging</p>
        <SendIcon className="-rotate-45 animate-pulse w-4" />
      </button>
    </div>
  );
}

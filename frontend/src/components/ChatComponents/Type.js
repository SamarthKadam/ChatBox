import React, { useEffect } from "react";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { socket } from "../../socket/socket";
import { AddMessage } from "../../services/Actions/Chat/action";
import { moveChatToTop } from "../../services/Actions/Chat/action";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import CancelIcon from "@mui/icons-material/Cancel";
import {updateChatBar} from '../../services/Actions/Chat/action'

export default function Type() {
  const isSet = useSelector((state) => state.chat.activeChat);
  const AllChats = useSelector((state) => state.chat.AllChats);
  const [message, setMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const dispatch = useDispatch();
  const [typing, setTyping] = useState(false);
  const [Microphone, setMircophone] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();



  useEffect(() => {
    setMessage(transcript);
  }, [transcript, resetTranscript]);

  const messageHandler = (e) => {
    setMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", isSet._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", isSet._id);
        setTyping(false);
      }
      socket.emit("stop typing",isSet._id);
    }, timerLength);

  };

  useEffect(() => {
    if (isSet === null) return;

    const loggedUser = JSON.parse(localStorage.getItem("info"));
    socket.emit("setup", loggedUser);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.emit("join chat", isSet._id);
  }, [isSet]);

  useEffect(() => {

    if(isSet==null)
    return;

    resetTranscript();
    SpeechRecognition.stopListening();
    setMircophone(false);
    setMessage('');

  }, [isSet]);

  const sendMessage = async (event) => {
    if (message.length === 0) return;

    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      const cookie = localStorage.getItem("jwt");
      const bodyData = {
        chatId: isSet._id,
        content: message,
      };
      setMessage("");
      resetTranscript();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/message`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
      dispatch(AddMessage(data.data));
      dispatch(updateChatBar(isSet._id,data.data.content));
      if (AllChats[0]._id !== isSet._id) {
        dispatch(moveChatToTop(isSet._id));
      }
      socket.emit("new message", data.data);
    }
  };

  const startListening=()=>{
    SpeechRecognition.startListening({ continuous: true,language:'en-IN'})
    setMircophone(true);
  }

  const stopListening=()=>{
    SpeechRecognition.stopListening()
    setMircophone(false);
  }


  if (isSet === null) return <></>;


  return (
    <div className="border-[1px] border-[#f5f5f5] bg-[#FFFFFF] h-[12%] flex flex-row justify-center items-center relative">
      {!Microphone&&(<div onClick={startListening}>
        <MicIcon
          sx={{ width: 22, cursor: "pointer" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "4%",
            translate: "-4% -50%",
          }}
          color="info"
        ></MicIcon>
        </div>)}
      {Microphone&&(<div onClick={stopListening}><CancelIcon
        sx={{ width: 22, cursor: "pointer" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "4%",
          translate: "-4% -50%",
        }}
        color="info"
      ></CancelIcon>
      </div>)
      }
      <div
        onClick={sendMessage}
        style={{
          position: "absolute",
          top: "50%",
          left: "95%",
          translate: "-95% -50%",
          cursor: "pointer",
        }}
      >
        <SendIcon color="action" sx={{ width: 22 }}></SendIcon>
      </div>
      <textarea
        value={message}
        onKeyDown={sendMessage}
        onChange={messageHandler}
        spellCheck="false"
        data-gramm="false"
        type="text"
        placeholder="Type a message"
        className=" bg-gray-100 resize-none font-Roboto box-border max-[1024px]:px-8 px-[5%] flex  text-md max-[900px]:text-sm w-[95%] py-[1%] outline-none h-[70%] rounded-3xl"
      ></textarea>
    </div>
  );
}

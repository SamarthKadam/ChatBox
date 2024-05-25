import React, { useEffect, useRef } from "react";
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
import { updateChatBar } from "../../services/Actions/Chat/action";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Box } from "@mui/material";
import useTheme from "@mui/system/useTheme";
import { IconButton } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

export default function Type() {
  const isSet = useSelector((state) => state.chat.activeChat);
  const AllChats = useSelector((state) => state.chat.AllChats);
  const [message, setMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const dispatch = useDispatch();
  const [typing, setTyping] = useState(false);
  const [Microphone, setMircophone] = useState(false);
  const inputRef = useRef(null);
  const [openPicker, setOpenPicker] = React.useState(false);
  const theme = useTheme();
  const emojiPickerRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setMessage(transcript);
  }, [transcript, resetTranscript]);

  const messageHandler = (e) => {
    setMessage(e.target.value);
    if (!message) return;
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
      socket.emit("stop typing", isSet._id);
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
    if (isSet == null) return;

    resetTranscript();
    SpeechRecognition.stopListening();
    setMircophone(false);
    setMessage("");
  }, [isSet]);

  const sendMessage = async (event) => {
    if (message.length === 0) return;

    if ((event.type === "keydown" && event.key === "Enter" && !event.shiftKey) || event.type === "click") {
      event.preventDefault();
      if (!message.trim()) return;
      const cookie = localStorage.getItem("jwt");
      const bodyData = {
        chatId: isSet._id,
        content: message.trim()
      };
      setMessage("");
      resetTranscript();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/message`,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${cookie}`,
          },
          body: JSON.stringify(bodyData),
        }
      );
      const data = await response.json();
      dispatch(AddMessage(data.data));
      dispatch(updateChatBar(isSet._id, data.data.content));
      if (AllChats[0]._id !== isSet._id) {
        dispatch(moveChatToTop(isSet._id));
      }
      socket.emit("new message", data.data);
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setMircophone(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setMircophone(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setOpenPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleEmojiClick(emoji) {
    const input = inputRef.current;
    // setMessage(emoji)
    console.log("LL", input);
    if (emoji) {
      setMessage(message + emoji);
    }
  }
  if (isSet === null) return <></>;

  return (
    <div
      className="border-[1px] border-[#f5f5f5] bg-[#FFFFFF] h-[12%] flex flex-row justify-center items-center relative"
      ref={emojiPickerRef}
    >
      {!Microphone && (
        <div onClick={startListening}>
          <MicIcon
            sx={{ width: 38, cursor: "pointer" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "5%",
              translate: "-4% -50%",
            }}
            color="info"
          ></MicIcon>
        </div>
      )}
      <Box
        style={{
          zIndex: 10,
          left: "47%",
          position: "fixed",
          display: openPicker ? "inline" : "none",
          bottom: 81,
        }}
      >
        <Picker
          theme={theme.palette.mode}
          data={data}
          onEmojiSelect={(emoji) => {
            handleEmojiClick(emoji.native);
          }}
        />
      </Box>

      {Microphone && (
        <div onClick={stopListening}>
          <CancelIcon
            sx={{ width: 22, cursor: "pointer" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "4%",
              translate: "-4% -50%",
            }}
            color="info"
          ></CancelIcon>
        </div>
      )}
      <IconButton
        onClick={() => {
          setOpenPicker(!openPicker);
        }}
      >
        <InsertEmoticonIcon />
      </IconButton>
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
        inputRef={inputRef}
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

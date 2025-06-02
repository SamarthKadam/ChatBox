import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { socket } from "../../socket/socket";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { AddMessage, moveChatToTop, updateChatBar } from "../../services/Actions/Chat/action";
import CancelIcon from "@mui/icons-material/Cancel";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Box, IconButton } from "@mui/material";
import useTheme from "@mui/system/useTheme";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import onMicSoundFile from "../../assets/sounds/onMic.mp3";
import offMicSoundFile from "../../assets/sounds/offMic.mp3";

export default function Type() {
  const isSet = useSelector((state) => state.chat.activeChat);
  const AllChats = useSelector((state) => state.chat.AllChats);
  const [message, setMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const dispatch = useDispatch();
  const [typing, setTyping] = useState(false);
  const [Microphone, setMircophone] = useState(false);
  const inputRef = useRef(null);
  const [openPicker, setOpenPicker] = useState(false);
  const theme = useTheme();
  const emojiPickerRef = useRef(null);
  const [noSoundTimeout, setNoSoundTimeout] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setMessage(transcript);
    resetNoSoundTimeout();
  }, [transcript]);

  const resetNoSoundTimeout = () => {
    if (noSoundTimeout) {
      clearTimeout(noSoundTimeout);
    }
    setNoSoundTimeout(setTimeout(stopListening, 5000));
  };

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

  const isValidMessage = (message) => {
    return message.trim() !== "";
  };

  const sendMessage = async (event) => {
    if (!isValidMessage(message)) return;

    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      const cookie = localStorage.getItem("jwt");
      const bodyData = {
        chatId: isSet._id,
        content: message,
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

  const onMicSound = () => {
    const audio = new Audio(onMicSoundFile);
    audio.play();
  };

  const offMicSound = () => {
    const audio = new Audio(offMicSoundFile);
    audio.play();
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setMircophone(true);
    if (hasMounted) onMicSound();
    resetNoSoundTimeout();
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setMircophone(false);
    if (hasMounted) offMicSound();
    if (noSoundTimeout) {
      clearTimeout(noSoundTimeout);
      setNoSoundTimeout(null);
    }
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

  useEffect(() => {
    setHasMounted(true);
  }, []);

  function handleEmojiClick(emoji) {
    const input = inputRef.current;
    if (emoji) {
      setMessage(message + emoji);
    }
  }

  if (isSet === null) return <></>;

  return (
    <div
      className=" bg-[#FFFFFF] h-[12%] flex py-5 flex-row justify-center items-center"
      ref={emojiPickerRef}
    >
      {!Microphone && (
        <div onClick={startListening} className="px-1">
          <MicIcon
            sx={{ width: 38, cursor: "pointer" }}
            color="info"
          ></MicIcon>
        </div>
      )}
      {Microphone && (
        <div onClick={stopListening} className="px-1">
          <CancelIcon
            sx={{ width: 38, cursor: "pointer" }}
            color="info"
          ></CancelIcon>
        </div>
      )}
      <div className="bg-gray-100 rounded-xl mx-2 flex flex-row w-full items-center justify-between">
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

        <IconButton
          onClick={() => {
            setOpenPicker(!openPicker);
          }}
        >
          <InsertEmoticonIcon />
        </IconButton>

        <textarea
          ref={inputRef}
          value={message}
          onKeyDown={sendMessage}
          onChange={messageHandler}
          spellCheck="false"
          data-gramm="false"
          type="text"
          className="resize-none bg-gray-100 font-Roboto box-border text-md max-[900px]:text-sm w-full max-w-[100%] outline-none rounded-3xl  pt-[2%] leading-[normal]"
          placeholder="Type a message"
        ></textarea>
        <div className="mx-5"
          onClick={sendMessage}
        >
          <SendIcon color="action" sx={{ width: 22 }}></SendIcon>
        </div>
      </div>
    </div>
  );
}

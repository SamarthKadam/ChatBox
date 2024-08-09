import React from "react";

export default function SenderMessage({ time, content }) {
  const messageTime = new Date(time);

  return (
    <div className="max-w-[60%] ml-auto h-auto">
      <div className="flex flex-row relative justify-end my-1 max-w-[100%] h-auto">
        <div className="bg-[#014DFE] min-w-[50px] max-w-[100%] rounded-tl-lg font-Roboto rounded-bl-xl rounded-br-lg rouned-bl-lg text-white box-border px-2 pe-5 py-2 flex flex-col flex-wrap items-end max-[900px]:text-sm mr-2 flex justify-around"> 
          <p className="w-[100%] text-left text-wrap mr-5 mb-2" style={{wordWrap:"break-word"}}>{content}</p>
          <p className="absolute bottom-[3px] right-4 text-[9px] pl-2 flex items-end font-normal">{`${String(messageTime.getHours()%12 || 12).padStart(2,'0')}:${String(messageTime.getMinutes()).padStart(2,'0')} ${messageTime.getHours()>=12?'pm':'am'}`}</p>
        </div>
      </div>
    </div>
  );
}

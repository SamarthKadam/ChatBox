import React from "react";

export default function SenderMessage({ time, content }) {
  const messageTime = new Date(time);

  return (
    <div className="w-[60%] ml-auto">
      <div className="flex flex-row justify-end my-1 ">
        <div className="bg-[#014DFE] rounded-tl-xl font-Roboto rounded-bl-xl rounded-br-xl rouned-bl-xl text-white box-border px-2 py-2  max-[900px]:text-sm mr-2 flex justify-between">
          <div>{content}</div>
          <p className=" text-[11px] pl-2 pt-3 flex items-end font-normal">{`${String(messageTime.getHours()%12 || 12).padStart(2,'0')}:${String(messageTime.getMinutes()).padStart(2,'0')} ${messageTime.getHours()>=12?'pm':'am'}`}</p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Avatar } from "@mui/material";

export default function Profile() {
  const data = JSON.parse(localStorage.getItem("info"));
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the selected file here, e.g., you can upload it to a server or display a preview.
    // For this example, we will simply update the selected file in the state.
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-row items-center gap-10 mt-[2%]">
      <Avatar
        referrerPolicy="no-referrer"
        alt="User-pic"
        sx={{ width: 150, height: 150 }}
        src={data.pic}
      />
      <div className="flex flex-col gap-5">
        <label
          htmlFor="fileInput"
          className="bg-[#202142] hover:bg-[#202162] text-white cursor-pointer px-4 py-2 rounded-md font-Roboto tracking-tight"
        >
          Select Picture
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="font-medium border-[1px] cursor-pointer border-[#000000] px-4 py-2 rounded-md font-Roboto tracking-tight">
          Delete picture
        </div>
      </div>
    </div>
  );
}

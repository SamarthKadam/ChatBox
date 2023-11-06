import React, { useState } from "react";
import { Avatar } from "@mui/material";

export default function Profile() {
  const data = JSON.parse(localStorage.getItem("info"));
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      console.log(selectedFile);
      formData.append("photo", selectedFile);

      const cookie = localStorage.getItem("jwt");
      fetch("http://127.0.0.1:4000/api/v1/users/uploadPhoto", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors that occur during the upload.
          console.error("Error uploading image:", error);
        });
    }
  };

  let image = data.pic;
  if (data.pic.startsWith("user")) image = `http://127.0.0.1:4000/${data.pic}`;

  return (
    <div className="flex flex-row items-center gap-10 mt-[2%]">
      <Avatar
        referrerPolicy="no-referrer"
        alt="User-pic"
        sx={{ width: 150, height: 150 }}
        src={image}
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
        <div
          onClick={handleUpload}
          className="font-medium border-[1px] cursor-pointer border-[#000000] px-4 py-2 rounded-md font-Roboto tracking-tight"
        >
          Upload Picture
        </div>
      </div>
    </div>
  );
}

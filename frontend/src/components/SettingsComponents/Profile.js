import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../services/Actions/User/actions";
import toast from "react-toastify";
import Alert from "../../helper/Alert.js";

export default function Profile() {
  const dispatch = useDispatch();
  const dataredux = useSelector((state) => state.user.userInfo);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const data = JSON.parse(localStorage.getItem("info"));
  const [Pic, setPic] = useState(data.pic);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (dataredux === null) return;
    setPic(dataredux.pic);
  }, [dataredux]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Ask for confirmation before uploading
      setShowConfirm(true);
      if (!isConfirm) return;

      const formData = new FormData();
      formData.append("photo", selectedFile);
      setIsConfirm(false);
      const cookie = localStorage.getItem("jwt");
      fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/uploadPhoto`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Alert if image uploaded successfully
          setShowConfirm(false);
          setIsOpen(true);
          dispatch(setUser(data.data.user));
        })
        .catch((error) => {
          // Handle any errors that occur during the upload.
          console.error("Error uploading image:", error);
        });
    } else {
      setShowModal(true);
    }
  };

  let image = Pic;
  if (Pic.startsWith("user")) image = `${process.env.REACT_APP_API_URL}/${Pic}`;

  return (
    <div className="flex flex-row items-center gap-10 mt-[2%]">
      <Avatar
        referrerPolicy="no-referrer"
        alt="User-pic"
        sx={{ width: 150, height: 150 }}
        src={image}
      />
      <div className="flex justify-center flex-col gap-5">
        <label
          htmlFor="fileInput"
          className="bg-[#202142] hover:bg-[#202162] text-white cursor-pointer px-4 py-2 max-[1024px]:px-2 max-[1024px]:py-1 max-[1024px]:text-sm rounded-md font-Roboto tracking-tight"
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
          className="font-medium border-[1px] cursor-pointer border-[#000000] px-4 py-2 rounded-md font-Roboto tracking-tight max-[1024px]:px-2 max-[1024px]:py-1 max-[1024px]:text-sm"
        >
          Upload Picture
        </div>
      </div>
      <Alert
        text={"Image uploaded successfully!"}
        status={"success"}
        onClose={() => setIsOpen(false)}
        isVisible={modalIsOpen}
      />
      <Alert
        text={"Please select an image to upload."}
        status="failure"
        onClose={() => setShowModal(false)}
        isVisible={showModal}
      />
      <Alert
        text={"Are you sure you want to upload this image?"}
        status="confirm"
        onClose={() => {setShowConfirm(false); setIsConfirm(false)}}
        isVisible={showConfirm}
        onConfirm={()=> {setIsConfirm(true); setShowConfirm(false); handleUpload()}}
      />
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../services/Actions/User/actions";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { FaPen } from "react-icons/fa";

export default function Profile() {
  const dispatch = useDispatch();
  const dataredux = useSelector((state) => state.user.userInfo);

  const data = JSON.parse(localStorage.getItem("info"));
  const [Pic, setPic] = useState(data.pic);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const cropperRef = useRef(null);

  useEffect(() => {
    if (dataredux === null) return;
    setPic(dataredux.pic);
  }, [dataredux]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedImageDataUrl = cropperRef.current.cropper.getCroppedCanvas().toDataURL();

      // Convert the base64 URL to a Blob
      const blob = dataURLtoBlob(croppedImageDataUrl);
      const formData = new FormData();
      formData.append("photo", blob);

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
          alert("Image uploaded successfully!");
          dispatch(setUser(data.data.user));
          setPic(data.data.user.pic); // Update the profile picture
          setImagePreview(null);
        })
        .catch((error) => {
          // Handle any errors that occur during the upload.
          console.error("Error uploading image:", error);
        });
    } else {
      alert("Please select an image to upload.");
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  let image = Pic;
  if (Pic.startsWith("user")) image = `${process.env.REACT_APP_API_URL}/${Pic}`;

  return (
    <div className="flex flex-row items-center gap-10 mt-[2%]">
      <div className="flex items-center">
      <Avatar
        referrerPolicy="no-referrer"
        alt="User-pic"
        sx={{ width: 150, height: 150 }}
        src={image}
      />
        <label
          htmlFor="fileInput"
          className="cursor-pointer ml-2"
        >
          <FaPen className="h-6 w-6" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        </div>
        {imagePreview && (
        <div className="flex flex-col items-start">
          <Cropper
            src={imagePreview}
            style={{ height: 200, width: "60%" }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
          />
          <div className="flex gap-4 mt-4">
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
            <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
      </div>
  );
}
  




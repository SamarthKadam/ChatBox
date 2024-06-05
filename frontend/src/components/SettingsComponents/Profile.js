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
      const croppedImageDataUrl = cropperRef.current.cropper.getCroppedCanvas({
        width: 150,
        height: 150,
        fillColor: '#fff',
      }).toDataURL();

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
          <FaPen className="h-4 w-4" style={{ width: 16, height: 16 }}/>
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
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
          <Cropper
            src={imagePreview}
            style={{ height: 200, width: '200px', filter: 'grayscale(50%)', borderRadius: '50%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
            viewMode={1}
              background={false}
              responsive={true}
              checkOrientation={false}
              autoCropArea={1}
          />
          <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                boxShadow: '0 0 0 2000px rgba(225, 225, 225, 0.5)',
                pointerEvents: 'none',
                border: '2px solid #000'
              }}
            ></div>
          </div>
          <div className="flex gap-2 mt-4">
            <div  onClick={handleUpload} className= "bg-[#202142] hover:bg-[#202162] text-white font-medium cursor-pointer border-[#000000] px-4 py-2 max-[1024px]:px-2 max-[1024px]:py-1 max-[1024px]:text-sm rounded-md font-Roboto tracking-tight">Upload</div>
            <div onClick={handleCancel} className="bg-[#C6CED1] text-white font-medium cursor-pointer border-[#000000] px-4 py-2 rounded-md font-Roboto tracking-tight max-[1024px]:px-2 max-[1024px]:py-1 max-[1024px]:text-sm">Cancel</div>
          </div>
        </div>
      )}
      </div>
  );
}
  




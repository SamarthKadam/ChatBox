import React, { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import { useLocation } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";

export default function ShareProfile({ id }) {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const copyToClipboard = async () => {
    console.log(window.location.origin);
    toast.info("Copied!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return await window.navigator.clipboard.writeText(
      `${window.location.origin}/home/${id}`
    );
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex sm:gap-2 text-sm sm:text-xl font-medium items-center justify-center bg-[#202142] hover:bg-[#202162] text-white cursor-pointer border-[#000000]  px-4 py-2 max-[1024px]:px-2 max-[1024px]:py-1 rounded-md font-Roboto tracking-tight"
      >
        <ShareIcon fontSize="small" />
        <p className="hidden sm:inline text-lg">Share Profile</p>
      </button>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        className="flex items-center justify-center"
      >
        <div className="flex gap-4 flex-col p-5 rounded-xl text-white items-center bg-[#202142] justify-start">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-lg sm:text-xl">Share Profile</h1>
            <button onClick={() => setShowModal(false)} className="">
              <CloseIcon />
            </button>
          </div>
          <div className="flex w-full items-center justify-start gap-4">
            <div className="border hidden sm:inline  text-gray-400 border-gray-500 bg-[#16173485] p-4 rounded-lg">
              <h1>{`${window.location.origin}/home/${id}`}</h1>
            </div>
            <button
              className="flex gap-4 border  border-gray-500 p-2 rounded-lg sm:rounded-none sm:p-0 sm:border-none"
              onClick={() => copyToClipboard()}
            >
              <p className="sm:hidden">Click to copy!</p>
              <ContentCopyIcon />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

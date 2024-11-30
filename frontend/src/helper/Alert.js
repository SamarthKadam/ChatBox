import React from "react";
import Modal from "react-modal";
import { FaCheckCircle,FaExclamationCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30vw",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "#0147FF",
  },
};

const Alert = ({ text, status, onClose, isVisible,onConfirm }) => {
  return (
    <div>
      <Modal isOpen={isVisible} onRequestClose={onClose} style={customStyles}>
        {status === "success" &&
          <FaCheckCircle className="text-white lg:text-6xl mx-auto md:text-4xl sm:text-2xl" />}
        {status==="failure" &&  <IoIosCloseCircle className="text-white lg:text-6xl mx-auto md:text-4xl sm:text-2xl" />
        }
        {status==="confirm" &&  <FaExclamationCircle className="text-white lg:text-6xl mx-auto md:text-4xl sm:text-2xl" />
        }
        <div className="mx-auto font-semibold text-lg text-white">{text}</div>
        {(status === "success" || status ==="failure") && <button
          onClick={() => onClose()}
          className="bg-white p-2 font-bold hover:bg-[#bccefd] "
        >
          Close
        </button>}
        {(status === "confirm" && 
        <div className="flex gap-2 sm:flex-col lg:flex-row">
        <button
          onClick={() => onConfirm()}
          className="bg-white p-2 font-bold hover:bg-[#bccefd] lg:w-24 sm:w-full"
        >Ok</button>
        <button
          onClick={() => onClose()}
          className="bg-white p-2 font-bold hover:bg-[#bccefd] lg:w-24 sm:w-full"
        >Cancel</button>
        </div>
        )}
      </Modal>
    </div>
  );
};

export default Alert;

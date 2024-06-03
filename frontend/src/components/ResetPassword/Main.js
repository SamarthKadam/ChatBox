import React, { useEffect, useState } from "react";
import Input from "../LoginComponents/Input";
import Square from "../LoginComponents/Square";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { Link, useNavigation } from "react-router-dom";
import { useSubmit } from "react-router-dom";
import { validate } from "react-email-validator";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button, Paper, Typography } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useSelector } from "react-redux";

export default function Main() {
  const code = useSelector((state) => state.user.otp);
  const navigation = useNavigation();
  const submit = useSubmit();
  const [resetData, setResetData] = useState({
    email: "",
    password: "",
    userOtp: null,
  });
  const [submitting, setSubmiting] = useState(false);

  function sendData(e) {
    e.preventDefault();
    setSubmiting(true);
    setTimeout(() => {
      setSubmiting(false);
    }, 5000);
    if (code === null) {
      let CheckError = 0;

      if (!validate(resetData.email)) {
        CheckError = 1;
      }

      if (CheckError === 1) {
        alert("error");
      } else {
        submit(resetData, { method: "post" });
      }
    } else {
      if (resetData.userOtp == code) {
        const keys = Object.keys(resetData);
        let CheckError = 0;

        keys.forEach((data) => {
          if (resetData[data] === "" || resetData[data] === null) {
            CheckError = 1;
          }
        });

        if (CheckError === 1) {
          alert("error");
        } else {
          submit(resetData, { method: "put" });
        }
      } else {
        alert("Your OTP is wrong");
      }
    }
  }

  return (
    <div className="flex flex-col items-center h-[100vh] w-[100vw] relative overflow-hidden px-2">
      <Square></Square>
      <Square isRight={true}></Square>
      <Paper
        className="z-20 w-full max-w-[370px] p-[2rem] my-auto"
        elevation={3}
      >
        <div className="font-Poppins text-3xl font-extrabold flex items-center flex-col">
          <HowToRegIcon fontSize="large" color="primary" />
          <Typography variant="h5">Reset Password</Typography>
        </div>
        <br />
        <hr></hr>
        <form className="mt-6 relative">
          <Input
            onSetData={setResetData}
            name="email"
            text="Email ID"
            placeholder="Email address"
            type="text"
          ></Input>
          {code === null ? (
            ""
          ) : (
            <>
              <Input
                onSetData={setResetData}
                name="userOtp"
                text="number"
                type="number"
                placeholder="Enter your otp"
              ></Input>
              <Input
                onSetData={setResetData}
                name="password"
                text="Password"
                type="password"
                placeholder="New Password"
              ></Input>
            </>
          )}
          <div className="flex flex-row justify-center mt-8">
            <Button
              sx={{ padding: ".5rem 4rem" }}
              onClick={sendData}
              variant="contained"
            >
              {submitting && (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress size={25} style={{ color: "#FFFFFF" }} />
                </Box>
              )}
              {!submitting && (
                <div>{code === null ? "Send Code" : "Update Password"}</div>
              )}
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

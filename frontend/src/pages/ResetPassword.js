import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import Main from "../components/ResetPassword/Main";
import { redirect } from "react-router-dom";
import { setOtp } from "../services/Actions/User/actions";
import store from "../services/store";

export default function ResetPassword() {
  return (
    <GoogleOAuthProvider clientId="438058612514-mr6pvrfg97crajaid4grj88l95vo8u82.apps.googleusercontent.com">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Main></Main>
    </GoogleOAuthProvider>
  );
}

const notify = (message) => {
  return toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export async function action({ request }) {
  const data = await request.formData();
  //this PUT request update the PASSWORD in data base
  if (data.get("password") !== "") {
    const authData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    let information = authData;

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/users/updatePassword`,
      {
        method: request.method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(information),
      }
    );

    const responseData = await response.json();
    if (responseData.status === "fail") {
      notify("Something went wrong");
      return null;
    }
    localStorage.setItem("jwt", responseData.token);
    //updating the SETOTP to null in STORE
    store.dispatch(setOtp(null));
    return redirect("/home/message");
  } else {
    //this POST method is for generating the CODE
    const authData = {
      email: data.get("email"),
    };

    let information = authData;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/users/sendCode`,
      {
        method: request.method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(information),
      }
    );

    const responseData = await response.json();
    //updating the SETOTP to OTP in STORE
    store.dispatch(setOtp(responseData.otp));
    if (responseData.status === "fail") {
      notify("Something went wrong");
      return null;
    }
    return null;
  }
}

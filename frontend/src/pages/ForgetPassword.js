import React from "react";
import Main from "../components/ForgetPassword/Main";
import { ToastContainer, toast } from "react-toastify";
import { redirect } from "react-router-dom";

const notify = (message, success) => {

    if(success){
        return toast.success(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
    else{
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
    }
  };

export default function ForgetPassword() {
    return (
        <>
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
        </>
    )
}

export  async function action({request})
{

  const data=await request.formData();
  const email = data.get('email')
  const response=await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/forget-password`,{
    method:request.method,
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify({email})
  })
  const responseData=await response.json();

  if(responseData.status==='success')
  {
    notify('Mail sent successfully.', true);
    return null;
  }
  else{
    notify('Something went wrong', false);
    return null;
  }
}
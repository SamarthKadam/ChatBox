import React, { useEffect, useState } from "react";
import Main from "../components/ResetPassword/Main";
import { ToastContainer, toast } from "react-toastify";
import { redirect, useLoaderData, useParams } from "react-router-dom";
import Error from "../components/ResetPassword/Error";

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

export default function ResetPassword() {
    const params = useParams();
    const valid = useLoaderData();

    // useEffect(()=>{
    //     const verifyToken = async()=>{
    //         const response=await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/forget-verification`,{
    //             method:"POST",
    //             headers:{
    //               'Content-type':'application/json'
    //             },
    //             body:JSON.stringify(params)
    //           })
    //           const responseData=await response.json();
    //           if(responseData.status==='success')
    //             {
    //               setIsValid(true);
    //             }
    //     }
    //     verifyToken();
    // },[])

    if(!valid){
        return <Error />
    }

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
            <Main userId={params.userId}></Main>
        </>
    )
}

export async function loader({params}){
  const response=await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/forget-verification`,{
    method:"POST",
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(params)
  })
  const responseData=await response.json();
  if(responseData.status==='success')
    {
      return true;
    }
  return false;
}

export  async function action({request})
{

  const data=await request.formData();
  const password = data.get('password');
  const userId = data.get('id');
  console.log(password, userId, request.method)
  const response=await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/reset-password`,{
    method:request.method,
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify({userId, newPassword: password})
  })
  const responseData=await response.json();

  if(responseData.status==='success')
  {
    return redirect("/login");
  }
  else{
    notify('Something went wrong', false);
    return null;
  }
}
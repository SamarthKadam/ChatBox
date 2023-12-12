import React from 'react'
import Main from '../components/SignupComponents/Main'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Signup() {
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
  )
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


export async function action({request})
{
  const data=await request.formData();
  const authData={
    name:data.get('name'),
    email:data.get('email'),
    password:data.get('password'),
  }

  const isGoogleSignIn=data.get('isGoogle');
  if(isGoogleSignIn)
  {
    const tData={...authData,pic:data.get('pic')}
    const gresponse=await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/ispresent`,{
      method:request.method,
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(tData)
    });

    const gresponseData=await gresponse.json();
    if(gresponseData.status==='success')
    {
      localStorage.setItem('jwt',gresponseData.token);
      return redirect('/home/message');
    }

  }

  let information=authData;
  if(isGoogleSignIn)
  {
    information={...authData,pic:data.get('pic')}
  }

  const response=await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/signup`,{
    method:request.method,
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(information)
  });

  const responseData=await response.json();

  if(responseData.status==='fail')
  {
    notify('Something went wrong')
    return null;
  }
  localStorage.setItem('jwt',responseData.token);
  return redirect('/home/message');
}

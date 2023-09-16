import React from 'react'
import Main from '../components/SignupComponents/Main'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { redirect } from 'react-router-dom'

export default function Signup() {
  return (
    <GoogleOAuthProvider clientId="438058612514-mr6pvrfg97crajaid4grj88l95vo8u82.apps.googleusercontent.com">
    <Main></Main>
  </GoogleOAuthProvider>
  )
}

export async function action({request})
{
  const data=await request.formData();
  const authData={
    name:data.get('name'),
    email:data.get('email'),
    password:data.get('password'),
    pic:data.get('pic')
  }

  const isGoogleSignIn=data.get('isGoogle');
  if(isGoogleSignIn)
  {
    const gresponse=await fetch(`http://127.0.0.1:4000/api/v1/users/ispresent`,{
      method:request.method,
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(authData)
    });

    const gresponseData=await gresponse.json();
    if(gresponseData.status==='success')
    {
      localStorage.setItem('jwt',gresponseData.token);
      return redirect('/home/message');
    }

  }

  const response=await fetch(`http://127.0.0.1:4000/api/v1/users/signup`,{
    method:request.method,
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(authData)
  });

  const responseData=await response.json();

  if(responseData.status==='fail')
  {
    alert('error')
    return null;
  }
  localStorage.setItem('jwt',responseData.token);
  return redirect('/home/message');
}

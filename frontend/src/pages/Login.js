import React from 'react'
import Main from '../components/LoginComponents/Main'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { redirect } from 'react-router-dom';

export default function Login() {
  return (
    <GoogleOAuthProvider clientId="438058612514-mr6pvrfg97crajaid4grj88l95vo8u82.apps.googleusercontent.com">
      <Main></Main>
    </GoogleOAuthProvider>
  )
}

export  async function action({request})
{

  const data=await request.formData();
  const authdata={
    email:data.get('email'),
    password:data.get('password')
  }

  const isGoogleAuth=data.get('name');
  console.log(isGoogleAuth);
  if(isGoogleAuth){
    const response=await fetch(`http://127.0.0.1:4000/api/v1/users/login`,{
      method:request.method,
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(authdata)
    })
  
    const responseData=await response.json();
    console.log(responseData);
  
    if(responseData.status!=='fail')
    {
      localStorage.setItem('jwt',responseData.token);
      return redirect('/home')
    }

    const authData2={...authdata,name:isGoogleAuth}
    console.log(authData2);
    const response2=await fetch(`http://127.0.0.1:4000/api/v1/users/signup`,{
      method:request.method,
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(authData2)
    });

    const responseData2=await response2.json();

  if(responseData2.status==='fail')
  {
    console.log(responseData2);
    alert('error')
    return null;
  }
  localStorage.setItem('jwt',responseData2.token);
  return redirect('/home');


  }


  const response=await fetch(`http://127.0.0.1:4000/api/v1/users/login`,{
    method:request.method,
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(authdata)
  })

  const responseData=await response.json();
  console.log(responseData);

  if(responseData.status==='fail')
  {
    alert(responseData.message);
    return null;
  }

  localStorage.setItem('jwt',responseData.token);
  return redirect('/home')


} 
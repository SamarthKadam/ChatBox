 export const getSender=(users)=>{
    const loggedUser=JSON.parse(localStorage.getItem('info'));
    const user=users[0]._id===loggedUser._id?users[1]:users[0];
    return user;
 }

 export const getUsersLeavingMe=(users)=>{
   const loggedUser=JSON.parse(localStorage.getItem('info'));
   const newArray=users.filter((data)=>data._id!==loggedUser._id);
   return newArray
 }

 export const isSender=(id)=>{
  const loggedUser=JSON.parse(localStorage.getItem('info'));
  return loggedUser._id===id;
 }

 export const isSameUser=(messages,index)=>{

  if(index!==0&&messages[index].sender._id===messages[index-1].sender._id)
  return true;
  else
  return false;
 }
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
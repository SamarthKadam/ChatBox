// export const AddUser= (user) => {
//     return {
//       type: "ADD_USER",
//       payload:{...user},
//     };
//   };
  

export const AddUser= (user,users) => {

  return async (dispatch,getState)=>{

      const info={userId:user._id};
      const cookie=localStorage.getItem('jwt');
      const response=await fetch(`http://127.0.0.1:4000/api/v1/chat/`,{
        method:'post',
        headers:{
          'Content-type':'application/json',
          'Authorization':`Bearer ${cookie}`
        },
        body:JSON.stringify(info)
      })
      const data=await response.json();
      
      dispatch({
        type : 'ADD_USER',
        payload : {...data}
      });
}
};


export const AddGroup=(group)=>{
  return {
    type:"ADD_GROUP",
    payload:group
  }
}

export const InitializeChat=(chats)=>{
  return {
    type:"INIT_CHATS",
    payload:[...chats]
  }
}
export const SetActiveChat=(chatId)=>{
  return {
    type:"ACTIVE_CHAT",
    payload:chatId
  }
}

export const updateChatDetails=(chatId)=>{
  return {
    type:"UPDATE_CHAT",
    payload:chatId
  }
}

export const addNewUserToGroup=(user,activeChatId)=>{
  return {
    type:"ADD_USER_GROUP",
    payload:{user,activeChatId}
  }
}


export const addNewUserToActive=(user)=>{
return {
  type:"ADD_USER_ACTIVE",
  payload:user
}
}

export const RenameChat=(name)=>{
  return{
    type:"EDIT_ACTIVE_CHAT",
    payload:name
  }
}



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
      const response=await fetch(`${process.env.REACT_APP_API_URL}/api/v1/chat/`,{
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

export const FlustAllChats=()=>{
  return {
    type:"FLUSH_CHATS",
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

export const removeUserFromGroup=(userId,activeChatId)=>{
  return {
    type:"REMOVE_USER_GROUP",
    payload:{userId,activeChatId}
  }
}


export const addNewUserToActive=(user)=>{
return {
  type:"ADD_USER_ACTIVE",
  payload:user
}
}

export const removeUserFromActive=(userId)=>{
  return{
    type:"REMOVE_USER_ACTIVE",
    payload:userId
  }
}

export const RenameChat=(name)=>{
  return{
    type:"EDIT_ACTIVE_CHAT",
    payload:name
  }
}

export const RenameGlobalChat=(name,id)=>{
  return {
    type:"RENAME_CHAT",
    payload:{name,id}
  }
}

export const NullifyActiveChat=()=>{
  return {
    type:"NULL_ACTIVE_CHAT",
  }
}

export const InitializeChatMessages=(data)=>{
  return {
    type:"INIT_CHAT_MESSAGES",
    payload:data
  }
}

export const AddMessage=(message)=>{
  return {
    type:"ADD_MESSAGE",
    payload:message
  }
}
export const removeChat=(id)=>{
  return {
    type:"REMOVE_CHAT",
    payload:id
  }
}
export const ActiveChatNotify=(chatId)=>{
  return {
    type:"CHAT_NOTIFY",
    payload:chatId
  }
}
export const InActivateNotify=(chatId)=>{
  return {
    type:"INACT_CHAT_NOTIFY",
    payload:chatId
  }
}

export const moveChatToTop=(chatId)=>{
  return {
    type:"MOVE_TO_TOP_CHAT",
    payload:chatId
  }
}

export const updateChatBar=(chatId,latestMessage)=>{
  return {
    type:"UPDATE_CHAT_BAR",
    payload:{id:chatId,latestMessage}
  }
}

export const addIncomingUserChatBar=(data)=>{
  return {
    type:"ADD_INCOMING_USER_CHAT",
    payload:data
  }
}
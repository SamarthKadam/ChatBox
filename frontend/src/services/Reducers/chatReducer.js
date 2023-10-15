const chatState = {
    AllChats:[],
    activeChat:null,
    activeChatMessages:[]
    };
    
    const chatReducer= (state = chatState, action) => {
      switch (action.type) {
  
        case 'ADD_USER':
        const contains=state.AllChats.find((data)=>data._id===action.payload._id)
        if(contains===undefined)
        state.AllChats.unshift(action.payload);
        return {
          ...state,
        }

        case "INIT_CHATS":
        state.AllChats=action.payload
        return  {
          ...state
        }

        case "ADD_GROUP":
        state.AllChats.unshift(action.payload)
        return {
          ...state
        }

        case "ACTIVE_CHAT":
          state.activeChat=action.payload
          return {
            ...state
          }

          case "ADD_USER_GROUP":
            return {
              ...state,
              AllChats: state.AllChats.map(chat => {
                if (chat._id === action.payload.activeChatId) {
                  return {
                    ...chat,
                    users: [...chat.users, action.payload.user]
                  };
                }
                return chat;
              })
            };

            case "REMOVE_USER_GROUP":
              return {
                ...state,
                AllChats:state.AllChats.map(chat=>{
                  if(chat._id===action.payload.activeChatId)
                  {
                    return {
                      ...chat,
                      users:chat.users.filter((data)=>data._id!==action.payload.userId)
                    }
                  }
                  return chat;
                })
              }

            case "REMOVE_USER_ACTIVE":
              state.activeChat.users=state.activeChat.users.filter((data)=>data._id!==action.payload)
              return {
                ...state
              }
            
          case "ADD_USER_ACTIVE":
          state.activeChat.users.push(action.payload)
          return {
            ...state
          } 
          
          case "EDIT_ACTIVE_CHAT":
            state.activeChat.chatName=action.payload
            return {
              ...state
            }

            case "RENAME_CHAT":
              state.AllChats = state.AllChats.map((data) => {
                if (data._id === action.payload.id) {
                  return { ...data, chatName: action.payload.name };
                }
                return data;
              });
              return {
                ...state,
              };

          case "NULL_ACTIVE_CHAT":
            state.activeChat=null
            return {
              ...state
            } 
            
          case "INIT_CHAT_MESSAGES":
            state.activeChatMessages=action.payload;
            return {
              ...state
            }

          case "ADD_MESSAGE":
            return {
              ...state,
              activeChatMessages:[...state.activeChatMessages,action.payload]
            }

          case "REMOVE_CHAT":
            state.AllChats=state.AllChats.filter((data)=>data._id!==action.payload);
            return {
              ...state
            }
          case "CHAT_NOTIFY":
            state.AllChats=state.AllChats.map((val)=>{
              if(val._id===action.payload)
              {
                return {...val,notify:true}
              }
              return val;
            })

          // case "INACT_CHAT_NOTIFY":
          //   state.AllChats=state.AllChats.map((data)=>{
          //     if(data._id===action.payload)
          //     {

          //     }
          //   })
            
        default:
          return state;
      }
    };
    
  
  export default chatReducer;
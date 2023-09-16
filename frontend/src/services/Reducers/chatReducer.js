const chatState = {
    AllChats:[],
    activeChat:null
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
  
        default:
          return state;
      }
    };
    
  
  export default chatReducer;
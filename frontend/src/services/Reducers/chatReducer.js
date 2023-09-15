const chatState = {
    AllChats:[],
    activeChat:null
    };
    
    const chatReducer= (state = chatState, action) => {
      switch (action.type) {
  
        case 'ADD_USER':
        state.AllChats.unshift(action.payload);
        return {
          ...state,
        }
  
        default:
          return state;
      }
    };
    
  
  export default chatReducer;
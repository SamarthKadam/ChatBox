// export const AddUser= (user) => {
//     return {
//       type: "ADD_USER",
//       payload:{...user},
//     };
//   };
  

export const AddUser= (user) => {


  return async (dispatch,getState)=>{
  
    // Fetching results from an API : asynchronous action
    const response = await fetch(
        'https://dummyjson.com/products/1');
    const data = await response.json();
    console.log(data);
    // Dispatching the action when async
    // action has completed.
    dispatch({
        type : 'ADD_DATA',
        payload : {...user}
    });
}
};

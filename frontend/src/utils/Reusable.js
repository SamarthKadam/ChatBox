 export const getSender=(users)=>{

    const loggedUser=localStorage.getItem('info');
    return users[0]._id===loggedUser._id?users[1]:users[0];
 }
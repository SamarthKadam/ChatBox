 export const getSender=(users)=>{
    const loggedUser=localStorage.getItem('info');
    return users[0].__id===loggedUser.id?users[1]:users[0];
 }
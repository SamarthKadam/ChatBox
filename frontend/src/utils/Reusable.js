 export const getSender=(users)=>{

    const loggedUser=JSON.parse(localStorage.getItem('info'));
    const user=users[0]._id===loggedUser._id?users[1]:users[0];
    return user;
 }
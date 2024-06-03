const userState = {
  userInfo: null,
  otp: null,
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userInfo: action.payload,
      };

    case "SET_OTP":
      return {
        ...state,
        otp: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;

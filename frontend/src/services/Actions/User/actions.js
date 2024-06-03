export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: { ...user },
  };
};

export const setOtp = (otp) => {
  return {
    type: "SET_OTP",
    payload: otp,
  };
};

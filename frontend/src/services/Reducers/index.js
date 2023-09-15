import { combineReducers } from "redux";
import userReducer from "./userReducer";
import chatReducer from "./chatReducer";

const rootReducer = combineReducers({
  user:userReducer,
  chat:chatReducer
});

export default rootReducer;
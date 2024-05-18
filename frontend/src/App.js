import './input.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Service from './pages/Service';
import Login,{action as LoginAction}from './pages/Login';
import Signup,{action as SignupAction} from './pages/Signup';
import HomeChat from './pages/HomeChat';
import Info from './pages/Info';
import Settings from './pages/Settings';

import Root,{loader as loadingAction} from './pages/Root';
import Search from './pages/Search';
import ForgetPassword, { action as ForgetAction } from './pages/ForgetPassword';
import ResetPassword, { loader as ResetLoader, action as ResetAction } from './pages/ResetPassword';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path:'service',
    element:<Service></Service>
  },
  {
    path:'login',
    element:<Login></Login>,
    action:LoginAction
  },
  {
    path:'signup',
    element:<Signup></Signup>,
    action:SignupAction
  },
  //forget password and reset password routes
  {
    path:'forget-password',
    element:<ForgetPassword />,
    action: ForgetAction
  },
  {
    path:'reset-password/:userId/:verificationToken',
    element:<ResetPassword />,
    action: ResetAction,
    loader: ResetLoader
  },
  {
    path:'home',
    element:<Root></Root>,
    loader:loadingAction,
    children:[
      {
        path:'message',
        element:<HomeChat></HomeChat>
      },
      {
        path:'dashboard',
        element:<Info></Info>
      },
      {
        path:"settings",
        element:<Settings></Settings>
      },
      {
        path:"search",
        element:<Search></Search>
      }
    ]

  }
]);
function App() {
  return (<RouterProvider router={router} />);
}

export default App;


///todo 
//messages not incoming when ad is showw
//responsiveness
//loading spinner
//
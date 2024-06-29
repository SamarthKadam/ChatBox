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
import NotFoundPage from './pages/404Page';

import Root,{loader as loadingAction} from './pages/Root';
import Search from './pages/Search';


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

  },
  {
    path:'*',
    element:<NotFoundPage></NotFoundPage>
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
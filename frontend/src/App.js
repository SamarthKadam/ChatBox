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
import Analitycs from './pages/Analitycs';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

import Root from './pages/Root';


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
    children:[
      {
        path:'message',
        element:<HomeChat></HomeChat>
      },
      {
        path:'analitycs',
        element:<Analitycs></Analitycs>
      },
      {
        path:'dashboard',
        element:<Dashboard></Dashboard>
      },
      {
        path:"settings",
        element:<Settings></Settings>
      }
    ]

  }
]);
function App() {
  return (<RouterProvider router={router} />);
}

export default App;

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path:'/service',
    element:<Service></Service>
  },
  {
    path:'/login',
    element:<Login></Login>,
    action:LoginAction
  },
  {
    path:'/signup',
    element:<Signup></Signup>,
    action:SignupAction
  },
  {
    path:'/home',
    element:<HomeChat></HomeChat>

  }
]);
function App() {
  return (<RouterProvider router={router} />);
}

export default App;

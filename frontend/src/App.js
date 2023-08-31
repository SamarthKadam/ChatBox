import './input.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Service from './pages/Service';
import Login from './pages/Login';
import Signup from './pages/Signup';

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
    element:<Login></Login>
  },
  {
    path:'/signup',
    element:<Signup></Signup>
  }
]);
function App() {
  return (<RouterProvider router={router} />);
}

export default App;

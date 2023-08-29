import './input.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Service from './pages/Service';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path:'/service',
    element:<Service></Service>
  }
]);
function App() {
  return (<RouterProvider router={router} />);
}

export default App;

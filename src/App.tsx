import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Dashboard/>,
        },
        {
            path: "/users",
            element: <Users/>,
        },
    ]);

  return (
      <RouterProvider router={router} />
  )
}


export default App

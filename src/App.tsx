import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Edit from "./Pages/Edit";
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
        {
            path: "add",
            element: <Edit/>,
        },
        {
            path: "edit/:id",
            element: <Edit/>,
        }
    ]);

  return (
      <RouterProvider router={router} />
  )
}


export default App

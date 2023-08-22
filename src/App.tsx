import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Edit from "./Pages/Edit";
import {ErrorPage} from "./Pages/Error";
import AddUser from "./Pages/AddUser";

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
            element: <AddUser/>,
        },
        {
            path: "edit/:id",
            element: <Edit/>,
        },
        {
            path: "*",
            element: <ErrorPage/>,
        }
    ]);

  return (
      <RouterProvider router={router} />
  )
}


export default App

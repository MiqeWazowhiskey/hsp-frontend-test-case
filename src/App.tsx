import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import {ErrorPage} from "./Pages/Error";
import {lazy, Suspense} from "react";

const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Users = lazy(() => import('./Pages/Users'));
const Edit = lazy(() => import('./Pages/Edit'));
const AddUser = lazy(() => import('./Pages/AddUser'));

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
              <Suspense fallback={null}>
                  <RouterProvider router={router} />
              </Suspense>
  )
}


export default App

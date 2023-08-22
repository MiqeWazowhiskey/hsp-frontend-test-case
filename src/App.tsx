import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import {ErrorPage} from "./Pages/Error";
import {lazy, Suspense} from "react";

const Dashboard = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return import('./Pages/Dashboard');
});
const Users = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return import('./Pages/Users');
});

const Edit = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return import('./Pages/Edit');
});
const AddUser = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return import('./Pages/AddUser');
});
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
              <Suspense fallback={
                  <div className={'w-screen h-screen suspense-fallback active'}>
                      <img alt={'logo'} src={'../Public/logo.png'} className={'w-[50%] ml-auto mr-auto mt-[8%]'}/>
                      <h3 className={'w-full text-center text-3xl font-bold mt-5'}>Loading...</h3>
                  </div>
              }>
                  <RouterProvider router={router} />
              </Suspense>
  )
}


export default App

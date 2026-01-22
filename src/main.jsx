import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <div>Login Page</div>

  },
  {
    path: "/register",
    element: <div>Register Page</div>

  },
  {
    path: "/user",
    element: <div>User Page</div>

  },
  {
    path: "/product",
    element: <div>Product Page</div>

  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)

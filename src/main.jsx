import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Home from './pages/Home';
import Register from './pages/Register';
import AuthProvider from './provider/AuthProvider';
import Login from './pages/Login';
import Terms from './pages/Terms';
import About from './pages/About';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <h2>Error Not Found!!</h2>,
    children:[
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/terms",
        element: <Terms></Terms>
      },
      {
        path:"/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

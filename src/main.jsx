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
import AddBook from './pages/AddBook';
import PrivateRoute from './PrivateRoute';
import AllBooks from './pages/AllBooks';
import CategoryBooks from './pages/CategoryBooks';
import BookDetails from './pages/BookDetails';



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
        path: "/category/:category",
        element: <CategoryBooks></CategoryBooks>
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-book",
        element: (
          <PrivateRoute>
            <AllBooks></AllBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook></AddBook>
          </PrivateRoute>
        ),
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

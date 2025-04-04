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
import BorrowedBooks from './pages/BorrowedBooks';
import UpdateBook from './pages/UpdateBook';
import ErrorPage from './pages/ErrorPage';
import { HelmetProvider } from 'react-helmet-async';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/borrowed-books",
        element: (
          <PrivateRoute>
            <BorrowedBooks></BorrowedBooks>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook></UpdateBook>
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
    <HelmetProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)

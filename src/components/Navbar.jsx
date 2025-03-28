import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../provider/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showUserName, setShowUserName] = useState(false);
  const location = useLocation();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Successfully logged out");
      })
      .catch((error) => {
        console.log("Failed to log out");
      });
  };

  return (
    <div>
      <nav className="sticky top-0 z-50 bg-blue-50 shadow-md">
        <section className="mx-auto flex w-11/12 max-w-screen-xl items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/bookCove.png" className="h-8" alt="BookCove Logo" />
            <span className="text-2xl font-semibold">BookCove</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium hover:text-blue-500 ${
                  isActive ? "text-blue-500 font-bold" : "text-gray-700"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-medium hover:text-blue-500 ${
                  isActive ? "text-blue-500 font-bold" : "text-gray-700"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/terms"
              className={({ isActive }) =>
                `font-medium hover:text-blue-500 ${
                  isActive ? "text-blue-500 font-bold" : "text-gray-700"
                }`
              }
            >
              Terms & Conditions
            </NavLink>

            {/* ইউজার লগইন থাকলে নিচের মেনুগুলো দেখাবে */}
            {user && (
              <>
                <NavLink
                  to="/all-book"
                  className={({ isActive }) =>
                    `font-medium hover:text-blue-500 ${
                      isActive ? "text-blue-500 font-bold" : "text-gray-700"
                    }`
                  }
                >
                  All Book
                </NavLink>
                <NavLink
                  to="/add-book"
                  className={({ isActive }) =>
                    `font-medium hover:text-blue-500 ${
                      isActive ? "text-blue-500 font-bold" : "text-gray-700"
                    }`
                  }
                >
                  Add Book
                </NavLink>
                <NavLink
                  to="/borrowed-books"
                  className={({ isActive }) =>
                    `font-medium hover:text-blue-500 ${
                      isActive ? "text-blue-500 font-bold" : "text-gray-700"
                    }`
                  }
                >
                  Borrowed Books
                </NavLink>
              </>
            )}
          </div>

          {/* Login/Register Buttons or User Profile */}
          <div className="hidden lg:flex gap-4 items-center">
            {user ? (
              <>
                <div
                  className="relative cursor-pointer"
                  onMouseEnter={() => setShowUserName(true)}
                  onMouseLeave={() => setShowUserName(false)}
                >
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  {showUserName && (
                    <span className="absolute top-10 left-0 text-sm text-gray-700 bg-white px-2 py-1 rounded-lg shadow-md">
                      {user.displayName}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogOut}
                  className="border border-blue-500 bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <button
                    className={`border border-blue-500 px-4 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white ${
                      location.pathname === "/login"
                        ? "bg-blue-500 text-white font-bold"
                        : "text-blue-500"
                    }`}
                  >
                    Login
                  </button>
                </NavLink>
                <NavLink to="/register">
                  <button
                    className={`border border-blue-500 px-4 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white ${
                      location.pathname === "/register"
                        ? "bg-blue-500 text-white font-bold"
                        : "text-blue-500"
                    }`}
                  >
                    Register
                  </button>
                </NavLink>
              </>
            )}
          </div>
        </section>
      </nav>
    </div>
  );
};

export default Navbar;

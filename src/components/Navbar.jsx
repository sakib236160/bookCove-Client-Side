import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AuthContext from "../provider/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showUserName, setShowUserName] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const navLinkClasses = ({ isActive }) =>
    `font-medium hover:text-blue-500 ${
      isActive ? "text-blue-500 font-bold" : "text-gray-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-blue-50 shadow-md">
      <section className="mx-auto w-11/12 max-w-screen-xl py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/bookCove.png" className="h-8" alt="BookCove Logo" />
          <span className="text-2xl font-semibold">BookCove</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClasses}>
            About
          </NavLink>
          <NavLink to="/terms" className={navLinkClasses}>
            Terms & Conditions
          </NavLink>

          {user && (
            <>
              <NavLink to="/all-book" className={navLinkClasses}>
                All Book
              </NavLink>
              <NavLink to="/add-book" className={navLinkClasses}>
                Add Book
              </NavLink>
              <NavLink to="/borrowed-books" className={navLinkClasses}>
                Borrowed Books
              </NavLink>
            </>
          )}
        </div>

        {/* Auth Buttons - Desktop */}
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

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </section>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4">
          <div className="flex flex-col gap-2">
            <NavLink to="/" className={navLinkClasses} onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClasses} onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
            <NavLink to="/terms" className={navLinkClasses} onClick={() => setMenuOpen(false)}>
              Terms & Conditions
            </NavLink>

            {user && (
              <>
                <NavLink to="/all-book" className={navLinkClasses} onClick={() => setMenuOpen(false)}>
                  All Book
                </NavLink>
                <NavLink to="/add-book" className={navLinkClasses} onClick={() => setMenuOpen(false)}>
                  Add Book
                </NavLink>
                <NavLink to="/borrowed-books" className={navLinkClasses} onClick={() => setMenuOpen(false)}>
                  Borrowed Books
                </NavLink>
              </>
            )}

            {user ? (
              <button
                onClick={() => {
                  handleLogOut();
                  setMenuOpen(false);
                }}
                className="mt-2 border border-blue-500 bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600"
              >
                Log Out
              </button>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  <button
                    className={`w-full text-left border border-blue-500 px-4 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white ${
                      location.pathname === "/login"
                        ? "bg-blue-500 text-white font-bold"
                        : "text-blue-500"
                    }`}
                  >
                    Login
                  </button>
                </NavLink>
                <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                  <button
                    className={`w-full text-left border border-blue-500 px-4 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white ${
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import AuthContext from "../provider/AuthContext";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { userLogin, googleLogIn, setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    // Password validation regex (same as in Register page)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Invalid Password! Password must have at least 6 characters with both uppercase and lowercase letters."
      );
      toast.error("Invalid Password! Follow the rules.");
      return;
    }

    // Log in the user
    userLogin(email, password)
      .then((result) => {
        const user = { email: email };
        // JWT token request
        axios
          .post(`${import.meta.env.VITE_API_URL}/jwt`, user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });

        toast.success("Login Successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
        toast.error(`${error.message}`);
      });
  };

  // ✅ Google Login Handler - moved outside
  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((result) => {
        const user = result.user;
        setUser(user);

        // JWT for Google login
        const loggedUser = { email: user.email };
        axios
          .post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            toast.success("Login Successful!");
            navigate("/");
          });
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
        setError(error.message);
        toast.error(`${error.message}`);
      });
  };

  return (
    <section className="mx-auto w-11/12 max-w-screen-xl py-16">
      <Helmet>
        <title>Log In | Visa Navigator</title>
      </Helmet>
      <div className="mx-auto flex max-w-[500px] items-center justify-center">
        <div className="w-full rounded-lg p-8 shadow-lg">
          <h1 className="pb-8 text-center text-3xl font-semibold">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="email">
              <p>Email</p>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                id="email"
                className="w-full rounded-lg border p-2"
                required
              />
            </label>
            <label htmlFor="password">
              <p>Password</p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  id="password"
                  className="w-full rounded-lg border p-2"
                  required
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaRegEye
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </label>

            {error && (
              <p className="text-justify text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-500 p-2 font-bold text-white"
            >
              Login
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center">
            <hr className="h-1 w-full" /> <span className="px-4">or</span>
            <hr className="h-1 w-full" />
          </div>

          <button
            onClick={handleGoogleLogIn}
            className="mt-4 w-full rounded-lg border border-indigo-500 p-2 font-bold text-indigo-500"
          >
            Continue with Google
          </button>

          <div className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
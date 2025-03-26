// import { useState } from "react";

import { useContext } from "react";
import AuthContext from "../provider/AuthContext";

const Login = () => {
    //  const [error, setError] = useState("");
    const {userLogin} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
    
        // Password validation: কমপক্ষে ৬ ডিজিট + অন্তত ১টা বড় হাতের অক্ষর
        const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
          setError(
            "পাসওয়ার্ড কমপক্ষে ৬ ডিজিট হতে হবে এবং অন্তত ১টি বড় হাতের অক্ষর থাকতে হবে!"
          );
          return;
        }
        // সব ঠিক থাকলে কনসোলে দেখাবে
        console.log("Login Successfully:", email, password);
        // setError(""); // এরর ক্লিয়ার করবে
        // ইনপুট ফিল্ড ক্লিয়ার করবে
        form.reset();
    
        console.log(email,password);
        userLogin(email, password)
          .then((result) => {
            console.log(result.user);
          })
          .catch((error) => {
            console.log(error.message);
          });
      };


  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* <div className="text-center lg:text-left w-96">
          <Lottie animationData={registerLottieData}></Lottie>
        </div> */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="ml-8 mt-4 text-5xl font-bold">
            {" "}
            <span className="text-indigo-500">Login</span> now!
          </h1>
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
              />
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn bg-indigo-500 text-white font-semibold mt-4">
                Login
              </button>
            </fieldset>
          </form>
          {/* <SocialLogin></SocialLogin> */}
        </div>
      </div>
    </div>
  );
};

export default Login;

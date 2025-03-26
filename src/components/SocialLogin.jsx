import { useContext } from "react";
import AuthContext from "../provider/AuthContext";
import { Link } from "react-router-dom";

const SocialLogin = () => {
    const {googleLogIn} = useContext(AuthContext);
    const handleGoogleLogIn = ()=>{
        googleLogIn()
        .then(result=>{
            console.log(result.user)
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
    return (
        <div>
            {/* <button onClick={handleGoogleLogIn} className="border border-blue-500 bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600">Register</button> */}
            <div className="mt-4 flex items-center justify-center">
              <hr className="h-1 w-full" /> <span className="px-4">or</span>
              <hr className="h-1 w-full" />
            </div>
            <button
              onClick={handleGoogleLogIn}
              className="mt-4 w-full rounded-lg border border-blue-500 p-2 font-bold text-blue-500"
            >
              Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;
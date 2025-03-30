import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase.config";
import axios, { Axios } from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create a new user
  const createNewUser = (email, password, name, photoUrl) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update user profile after registration
        if (user) {
          updateProfile(user, {
            displayName: name,
            photoURL: photoUrl,
          })
            .then(() => {
              setUser(user); 
              setLoading(false); 
            })
            .catch((error) => {
              console.error("Profile update failed:", error);
              setLoading(false);
              setUser(null); 
            });
        }
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setLoading(false);
        setUser(null); 
      });
  };

  // User login
  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // User logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("start captured", currentUser?.email);
      if(currentUser?.email){
        const user = {email: currentUser.email};

        axios.post(`${import.meta.env.VITE_API_URL}/jwt`,user,{
          withCredentials: true
        })
        .then(res=> {
          console.log('login token',res.data);
          setLoading(false);
        })
      }
      else{
        axios.post(`${import.meta.env.VITE_API_URL}/logout`,{},{
          withCredentials: true
        })
        .then(res=>{
          console.log('logout',res.data);
          setLoading(false);
        })
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    createNewUser,
    userLogin,
    logOut,
    googleLogIn,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

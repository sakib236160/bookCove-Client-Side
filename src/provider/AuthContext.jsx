// import { createContext } from "react";

// const AuthContext = createContext(null);

// export default AuthContext;


import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;

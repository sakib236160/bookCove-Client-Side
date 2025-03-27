import { Navigate, useLocation } from "react-router-dom";
import Loading from "./components/Loading";
import PropTypes from "prop-types";
import AuthContext from "./provider/AuthContext";
import { useContext } from "react";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) return <Loading />;
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
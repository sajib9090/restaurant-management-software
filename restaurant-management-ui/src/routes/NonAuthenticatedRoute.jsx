/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { currentUser } from "../redux/features/auth/authSlice";

const NonAuthenticatedRoute = ({ children }) => {
  const user = useSelector(currentUser);
  const location = useLocation();

  if (user) {
    return <Navigate to="/user" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default NonAuthenticatedRoute;

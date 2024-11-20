import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn, selectIsReFreshing } from "../redux/auth/selectors";
import updateTokens from "utils/updateToken";


const PrivateRoute =  ({ component: Component, redirectTo }) => {

  const localAccessToken = updateTokens()
  // localStorage.getItem("accessToken");

  return localAccessToken ? <Component /> : <Navigate to={redirectTo} />;
};
export default PrivateRoute;
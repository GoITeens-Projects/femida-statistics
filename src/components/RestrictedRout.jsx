import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn, selectIsReFreshing } from "../redux/auth/selectors";
import updateTokens from "utils/updateToken";

const RestrictedRouter = ({ component: Component, redirectTo }) => {




  const localAccessToken = updateTokens()
  // localStorage.getItem("accessToken");
  console.log("restricted router:", localAccessToken)

  return !localAccessToken ? <Navigate to={redirectTo} /> : <Component />;
};
export default RestrictedRouter
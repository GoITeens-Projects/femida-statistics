import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn, selectIsReFreshing } from "../redux/auth/selectors";

const RestrictedRouter = ({ component: Component, redirectTo }) => {




  const localAccessToken = localStorage.getItem("accessToken");

  return localAccessToken ? <Navigate to={redirectTo} /> : <Component />;
};
export default RestrictedRouter
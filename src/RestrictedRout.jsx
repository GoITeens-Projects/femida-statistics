import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn, selectIsReFreshing } from "../redux/auth/selectors";

const RestrictedRouter = ({component: Component, redirecTo }) => {
 


 
  const localUserId = localStorage.getItem("id");

  return localUserId ? <Navigate to={redirecTo} /> : <Component /> ;
};
export default RestrictedRouter
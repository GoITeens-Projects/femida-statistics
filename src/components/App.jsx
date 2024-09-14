import { NavLink, Outlet } from "react-router-dom";
import { Status } from "../pages/Status";
import Login from "./Login/Login";
import { Navigation } from "./Navigation/Navigation";

export const App = () => {
  return (
    <>
     <Navigation/>

      <Outlet />
    </>
  )
};

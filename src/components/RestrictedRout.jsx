import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn, selectIsReFreshing, selectUpdateToken } from "../redux/auth/selectors";
import updateTokens from "utils/updateToken";
import { useDispatch } from "react-redux";
import { updateToken } from "../redux/auth/operation";

const RestrictedRouter = ({ component: Component, redirectTo }) => {
  // const localAccessToken = useSelector(selectUpdateToken)

  // const dispatch = useDispatch()

  //  useEffect(()=> {
  //    dispatch(updateToken)
  //  }, [])
 
  // const awaitUpdateToken = async () => {
  //   const token = await updateTokens()
  //    console.log("await restricted router:", token)
  //  return token
  
  // }

  // const localAccessToken = awaitUpdateToken()

  // let  localAccessToken = null

  const [localAccessToken, setLocalAccessToken] = useState(null)

   useEffect(()=> {
    const awaitUpdateToken = async () => {
      const token = await updateTokens()
      console.log("await restricted router:", token)
      setLocalAccessToken(token)
     return token
    //  console.log("await restricted router:", localAccessToken)
    }
  
    //  const accessToken = 
     awaitUpdateToken()
      // setLocalAccessToken(accessToken)
   }, [])

  // const localAccessToken = updateTokens().then(res => res )
  // localStorage.getItem("accessToken");
  console.log("restricted router:", localAccessToken)

  return localAccessToken ? <Navigate to={redirectTo} /> : <Component />;
};
export default RestrictedRouter
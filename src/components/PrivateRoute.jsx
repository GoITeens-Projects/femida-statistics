import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn, selectIsReFreshing, selectUpdateToken } from "../redux/auth/selectors";
import updateTokens from "utils/updateToken";
import { updateToken } from "../redux/auth/operation";
import { useDispatch } from "react-redux";


const PrivateRoute =  ({ component: Component, redirectTo }) => {
  //  const localAccessToken = useSelector(selectUpdateToken)
  //  const dispatch = useDispatch()
  const [localAccessToken, setLocalAccessToken] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const awaitUpdateToken = async () => {
      try {
        const token = await updateTokens(); // Припускаємо, що updateTokens() повертає токен
        console.log("await restricted router:", token);
        setLocalAccessToken(token);
      } catch (error) {
        console.error("Error updating tokens:", error);
      } finally {
        setLoading(false); // Завершення завантаження
      }
    };
 
    // const accessToken = 
    awaitUpdateToken()
    //  setLocalAccessToken(accessToken)
  }, [])
 
  // const localAccessToken = updateTokens().then(res => res )
  // localStorage.getItem("accessToken");
  console.log("privet router:", localAccessToken)
  if (loading) {
    return <div>Loading...</div>;
  }

  // Перевіряємо наявність токена і повертаємо відповідний компонент
  return localAccessToken ? <Component /> : <Navigate to={redirectTo} />;
};
export default PrivateRoute;
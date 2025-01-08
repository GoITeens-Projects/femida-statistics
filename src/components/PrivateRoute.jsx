import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn, selectIsReFreshing, selectUpdateToken } from "../redux/auth/selectors";
import updateTokens from "utils/updateToken";
import { updateToken } from "../redux/auth/operation";
import { useDispatch } from "react-redux";
import { ClimbingBoxLoader } from 'react-spinners';
// import { updateToken } from '../redux/auth/operation';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchStatistics } from '../redux/statistics/operation';
import s from './Main.module.css';


const PrivateRoute =  ({ component: Component, redirectTo }) => {
  //  const localAccessToken = useSelector(selectUpdateToken)
   const dispatch = useDispatch()
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
        setLoading(false); 
        dispatch(fetchStatistics)
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
    return <div className={s.mainLoadingCountainer}>  </div>
  //    <div className={s.mainLoadingCountainer}><motion.div
  //   initial={{ opacity: 0, y: -50 }} // Початковий стан
  //   animate={{ opacity: 1, y: 0 }} // Анімований стан
  //   exit={{ opacity: 0, y: 50 }} // Стан при зникненні
  //   transition={{ duration: 2.5 }} // Тривалість переходу
  // >
  //   <ClimbingBoxLoader
  //     color={'var(--shadow-secondary-color)'}
  //     loading={loading}
  //     size={30}
  //     aria-label="Loading Spinner"
  //     data-testid="loader"
  //   />
    
  // </motion.div>
  // </div>  ;
  }

  // Перевіряємо наявність токена і повертаємо відповідний компонент
  return localAccessToken ? <Component /> : <Navigate to={redirectTo} />;
};
export default PrivateRoute;
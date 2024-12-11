import { NavLink, Outlet, useFetcher } from 'react-router-dom';
import { Status } from '../pages/Status';
import Login from './Login/Login';
import { Navigation } from './Navigation/Navigation';
import { nanoid } from 'nanoid';
import TopChannels from './Tops/Tops';
import Header from './Header/Header';
import { ServerMembers } from './ServerMembers/ServerMembers';
import { MessagesChart } from './MessagesChart/MessagesChart';
import { StatusChart } from './StatusChart/StatusChart';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowWidth } from '../redux/filter/operation';
import s from './Main.module.css';
import { Filter } from './Filter/Filter';
import { fetchStatistics } from '../redux/statistics/operation';
import Footer from './Footer/Footer';
import { selectLoading } from '../redux/statistics/selectors';
import { ClimbingBoxLoader} from 'react-spinners';



export const App = () => {
  const dispatch = useDispatch();
   const loading = useSelector(selectLoading)

  useEffect(() => {
    dispatch(setWindowWidth(window.innerWidth));
    dispatch(fetchStatistics);
  }, []);
  
  return (
    <>
      <Header />
      <div className={s.countainer}>
        <div className={s.navigationCountainer}>
          <Navigation />
        </div>
        
        
          {loading ? (<div className={s.mainLoadingCountainer}><ClimbingBoxLoader
        color={"var(--shadow-secondary-color)"}
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>):(<div className={s.mainCountainer}><Filter />
          <Outlet /></div>)}
        
      </div>
      {/* <Footer/> */}
    </>
  );
};

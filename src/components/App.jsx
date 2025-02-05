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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWindowWidth } from '../redux/filter/operation';
import s from './Main.module.css';
import { Filter } from './Filter/Filter';
import {
  fetchStatistics,
  fetchVoiceAndStage,
} from '../redux/statistics/operation';
import Footer from './Footer/Footer';
import {
  selectLoading,
  selectReloadProtocol,
} from '../redux/statistics/selectors';
import { ClimbingBoxLoader } from 'react-spinners';
import { updateToken } from '../redux/auth/operation';
import { motion, AnimatePresence } from 'framer-motion';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import LimitsScope from './LimitsScope/LimitsScope';
import { Bounce, ToastContainer } from 'react-toastify';

export const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const reloadProtocol = useSelector(selectReloadProtocol);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  console.log('app render');
  useEffect(() => {
    console.log('app effect');
    dispatch(setWindowWidth(window.innerWidth));
    dispatch(fetchStatistics());
    dispatch(fetchVoiceAndStage());
    // dispatch(updateToken)
  }, []);
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  if (reloadProtocol) {
    console.log('reload protocol active');
    dispatch(fetchStatistics());
  }

  const sideContainerVariants = {
    true: {
      width: '15%',
    },
    false: {
      width: '6%',
      transition: {
        duration: 0.5,
        delay: 0.1,
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        {/* <p>Just p</p> */}
        <Header isOpenBurger={isOpenBurger} setIsOpenBurger={setIsOpenBurger} />
        {isOpenBurger && <BurgerMenu />}

        <div className={s.countainer}>
          <motion.div
            className={s.navigationCountainer}
            data-Open={isMenuOpen}
            variants={sideContainerVariants}
            initial={`${isMenuOpen}`}
            animate={`${isMenuOpen}`}
          >
            <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </motion.div>

          {loading && (
            <AnimatePresence>
              <div className={s.mainLoadingCountainer}>
                <motion.div
                  initial={{ opacity: 0, y: -50 }} // Початковий стан
                  animate={{ opacity: 1, y: 0 }} // Анімований стан
                  exit={{ opacity: 0, y: 50 }} // Стан при зникненні
                  transition={{ duration: 2.5 }} // Тривалість переходу
                >
                  <ClimbingBoxLoader
                    color={'var(--shadow-secondary-color)'}
                    loading={loading}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </motion.div>
              </div>
            </AnimatePresence>
          )}
          {!loading && (
            <AnimatePresence>
              <div className={s.mainFilterCountainer}>
                <motion.div
                  initial={{ opacity: 0, y: -50 }} // Початковий стан
                  animate={{ opacity: 1, y: 0 }} // Анімований стан
                  exit={{ opacity: 0, y: 200 }} // Стан при зникненні
                  transition={{ duration: 1.5 }} // Тривалість переходу
                >
                  <Filter />
                </motion.div>
              </div>
              <div className={s.mainCountainer}>
                <Outlet />
                <LimitsScope />
              </div>
            </AnimatePresence>
          )}
        </div>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </AnimatePresence>
    </>
  );
};

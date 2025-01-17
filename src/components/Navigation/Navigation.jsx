import s from './Navigation.module.css';
import femidaImg from '../../imgs/femida.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  RiBarChart2Line,
  RiMessage2Line,
  RiVolumeUpLine,
  RiUserLocationLine,
  RiLineChartLine,
} from 'react-icons/ri';
import { motion } from 'framer-motion';
import { IoMdSkipBackward } from 'react-icons/io';
import { MdSkipNext, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

import Shadow from 'components/Shadow/Shadow';

export const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(true);

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  const sideContainerVariants = {
    true: {
      width: '15%',
    },
    false: {
      transition: {
        delay: 0.6,
      },
    },
  };

  return (
    <div>
      <div
        className={`${s.navServerBox} ${
          isMenuOpen ? '' : s.navServerBoxDisabled
        }`}
      >
        <div className={s.navServer}>
          <Shadow />
          <div>
            <h2 className={s.navServerSubtitle}>Статистика серверу</h2>
          </div>
          <div className={s.test}>
            <img src={femidaImg} alt="femida-img" className={s.navFemidaImg} />
            <h3 className={s.navServerTitle}>Femida</h3>
          </div>
        </div>
      </div>

      <ul className={s.navigationList}>
        <li className={s.navigationItem}>
          <NavLink to="/Overview" className={s.testLink}>
            <RiBarChart2Line
              className={`sidebarIcon ${isMenuOpen ? '' : `${s.iconFocused}`}`}
            />
            {isMenuOpen ? (
              <p className={s.sidebarText}>Загальна статистика</p>
            ) : (
              ''
            )}
          </NavLink>
        </li>
        <li className={s.navigationItem}>
          <NavLink to="/messages" className={s.testLink}>
            <RiMessage2Line
              className={`sidebarIcon ${isMenuOpen ? '' : `${s.iconFocused}`}`}
            />
            {isMenuOpen ? <p className={s.sidebarText}>Повідомлення</p> : ''}
          </NavLink>
        </li>
        <li className={s.navigationItem}>
          <NavLink to="/voice" className={s.testLink}>
            <RiVolumeUpLine
              className={`sidebarIcon ${isMenuOpen ? '' : `${s.iconFocused}`}`}
            />
            {isMenuOpen ? <p className={s.sidebarText}>Голосові канали</p> : ''}
          </NavLink>
        </li>
        <li className={s.navigationItem}>
          <NavLink to="/stage" className={s.testLink}>
            <RiVolumeUpLine
              className={`sidebarIcon ${isMenuOpen ? '' : `${s.iconFocused}`}`}
            />
            {isMenuOpen ? <p className={s.sidebarText}>Трибуни</p> : ''}
          </NavLink>
        </li>
        <li className={s.navigationItem}>
          <NavLink to="/status" className={s.testLink}>
            <RiUserLocationLine
              className={`sidebarIcon ${isMenuOpen ? '' : `${s.iconFocused}`}`}
            />
            {isMenuOpen ? <p className={s.sidebarText}>Статус</p> : ''}
          </NavLink>
        </li>
        <motion.li className={s.navigationItem}>
          <NavLink to="/economic" className={s.testLink}>
            <RiLineChartLine
              className={`sidebarIcon ${isMenuOpen ? '' : `${s.iconFocused}`}`}
            />
            {isMenuOpen ? <p className={s.sidebarText}>Економіка</p> : ''}
          </NavLink>
        </motion.li>
      </ul>
      <button
        type="button"
        className={s.hideSideBarBtn}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <MdOutlineKeyboardDoubleArrowRight className={s.hideSideBarSvg}/>
        ) : (
          <MdOutlineKeyboardDoubleArrowRight />
        )}
      </button>
    </div>
  );
};

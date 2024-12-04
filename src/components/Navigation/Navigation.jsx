import s from './Navigation.module.css';
import femidaImg from '../../imgs/femida.png';
import { NavLink } from 'react-router-dom';
import {
  RiBarChart2Line,
  RiMessage2Line,
  RiVolumeUpLine,
  RiUserLocationLine,
  RiLineChartLine,
} from 'react-icons/ri';
import Shadow from 'components/Shadow/Shadow';

export const Navigation = () => {
  return (
    <div>
      <div className={s.navServerBox}>
        <div className={s.navServer}>
          {/* <div className={s.firstTestBorder}></div> */}
          <Shadow />
          <div>
            <h2 className={s.navServerSubtitle}>Статистика серверу</h2>
          </div>
          <div className={s.test}>
            <img src={femidaImg} alt="femida-img" className={s.navFemidaImg} />
            <h3 className={s.navServerTitle}>Femida</h3>
          </div>
          {/* <div className={s.secondTestBorder}></div> */}
        </div>
      </div>
      <ul className={s.navigationList}>
        <li className={s.navigationItem}>
          <NavLink to="/Overview" className={s.testLink}>
            <RiBarChart2Line /> Загальна статистика
          </NavLink>
        </li>
        <li className={s.navigationItem}>
          <NavLink to="/messages" className={s.testLink}>
            <RiMessage2Line /> Повідомлення
          </NavLink>
        </li>
        <li className={s.navigationItem}>
          <NavLink to="/voice" className={s.testLink}>
            <RiVolumeUpLine /> Голосові канали
          </NavLink>
        </li>
        <li className={s.navigationItem}>
          <NavLink to="/status" className={s.testLink}>
            <RiUserLocationLine /> Статус
          </NavLink>
        </li>
        <li className={s.navigationItem}>
          <NavLink to="/economic" className={s.testLink}>
            <RiLineChartLine />
            Економіка
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

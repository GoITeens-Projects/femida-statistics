import styles from './Header.module.css';
import logo from '../../imgs/logo.png';
import { useSelector } from 'react-redux';
import { selectWindowWidth } from '../../redux/filter/selectors';
import ToggleTheme from 'components/ToggleTheme/ToggleTheme';
import WhenLoginBox from 'components/WhenLoginBox/WhenLoginBox';
// import { data } from 'components/ServerMembers/DataServerMmbers';

const Header = ({ isOpenBurger, setIsOpenBurger }) => {
  const size = useSelector(selectWindowWidth);

  const logout = async evt => {
    // evt.preventDefault();
    // const data = await axios.post(
    //   'https://femida-api.onrender.com/auth/logout',
    //   {
    //     withCredentials: true,
    //   }
    // );
    fetch('https://femida-api.onrender.com/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      withCredentials: true,
    })
      .then(res => res.json)
      .then(data => {
        return data;
      });
    localStorage.removeItem('token');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerBlock}>
          <img src={logo} alt="logo" className={styles.headerLogo} />
          <nav className={styles.headerNav}>
            <ul className={styles.headerList}>
              <li className={styles.headerItem}>
                <a href="./" className={styles.headerLink}>
                  Запросити бота
                </a>
              </li>
              <li className={styles.headerItem}>
                <a href="./" className={styles.headerLink}>
                  Доки і команди
                </a>
              </li>
              <li className={styles.headerItem}>
                <a href="./" className={styles.headerLink}>
                  Допомога
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {size < 768 ? (
          false
        ) : (
          <div className={styles.headerBox}>
            <ToggleTheme />
            <WhenLoginBox onlogout={logout} />
          </div>
        )}
        {isOpenBurger ? (
          <button
            type="button"
            className={styles.headerOpenMenuBtn}
            onClick={() => setIsOpenBurger(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
            >
              <path
                d="M11.6066 11.6066L1 1"
                stroke="#6EABD4"
                stroke-linecap="round"
              />
              <path
                d="M11.6066 1.3934L1 12"
                stroke="#6EABD4"
                stroke-linecap="round"
              />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            className={styles.headerOpenMenuBtn}
            onClick={() => setIsOpenBurger(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="12"
              viewBox="0 0 17 12"
              fill="none"
            >
              <path d="M16 1L1 1" stroke="#6EABD4" stroke-linecap="round" />
              <path d="M16 6L1 6" stroke="#6EABD4" stroke-linecap="round" />
              <path d="M16 11L1 11" stroke="#6EABD4" stroke-linecap="round" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

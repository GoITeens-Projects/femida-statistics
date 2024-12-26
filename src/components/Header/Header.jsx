import styles from './Header.module.css';
import logo from '../../imgs/logo.png';
import { useCallback, useEffect, useState } from 'react';
import femidaImg from '../../imgs/femida.png';
import { selectUser } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { data } from 'components/ServerMembers/DataServerMmbers';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = useCallback(() => {
    const root = document.querySelector('html');
    const value = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', value);
    localStorage.setItem('theme', value);
    setIsDarkMode(value === 'dark');
  }, []);

  // Перевірка теми при завантаженні компонента
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.querySelector('html').setAttribute('data-theme', savedTheme);
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const userName = useSelector(selectUser);

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

      {localStorage.getItem('token') ? (
        <div className={styles.headerWhenLoginBox}>
          {/* перемикач */}

          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
          <div className={styles.navUserBox}>
            <img src={femidaImg} alt="femida" className={styles.navFemidaImg} />
            <p className={styles.navUsernameText}>{userName}</p>
          </div>
          {/* {userName} */}
          {/* </p> */}


          <div className={styles.headerNavSettingsBox}>
            <Link to="/settings" className={styles.headerNavSettingsBox}>
              <button type="button" className={styles.navSettingBtn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                >
                  <path
                    d="M9.50007 12.7C10.9938 12.7 12.2047 11.4912 12.2047 9.99999C12.2047 8.50882 10.9938 7.29999 9.50007 7.29999C8.00633 7.29999 6.79541 8.50882 6.79541 9.99999C6.79541 11.4912 8.00633 12.7 9.50007 12.7Z"
                    stroke={
                      localStorage.getItem('theme') === 'dark'
                        ? 'white'
                        : 'black'
                    }
                    stroke-width="1.25"
                  />
                  <path
                    d="M1.98196 8.776C2.40839 9.0424 2.68246 9.4978 2.68246 10C2.68246 10.5022 2.40839 10.9576 1.98196 11.224C1.69256 11.4067 1.50504 11.5516 1.37251 11.7244C1.22834 11.912 1.12261 12.1261 1.06135 12.3545C1.00009 12.5829 0.984511 12.8211 1.01549 13.0555C1.06237 13.4101 1.27244 13.7737 1.69166 14.5C2.11268 15.2263 2.32274 15.589 2.60673 15.8077C2.79465 15.9516 3.00913 16.0572 3.23791 16.1183C3.4667 16.1795 3.70532 16.195 3.94013 16.1641C4.1565 16.1353 4.37558 16.0471 4.6785 15.8869C4.89536 15.7687 5.13872 15.7074 5.3858 15.7086C5.63287 15.7099 5.87559 15.7737 6.09123 15.8941C6.52668 16.1461 6.78543 16.6096 6.80346 17.1118C6.81608 17.4538 6.84854 17.6878 6.93238 17.8885C7.023 18.107 7.15587 18.3056 7.3234 18.4728C7.49094 18.6401 7.68985 18.7727 7.90876 18.8632C8.23963 19 8.65975 19 9.5 19C10.3402 19 10.7604 19 11.0912 18.8632C11.3102 18.7727 11.5091 18.6401 11.6766 18.4728C11.8441 18.3056 11.977 18.107 12.0676 17.8885C12.1506 17.6878 12.1839 17.4538 12.1965 17.1118C12.2146 16.6096 12.4733 16.1452 12.9088 15.8941C13.1244 15.7737 13.3671 15.7099 13.6142 15.7086C13.8613 15.7074 14.1046 15.7687 14.3215 15.8869C14.6244 16.0471 14.8444 16.1353 15.0608 16.1641C15.5347 16.2263 16.014 16.0981 16.3933 15.8077C16.6773 15.5899 16.8873 15.2263 17.3074 14.5C17.495 14.176 17.6401 13.9249 17.7483 13.7143M17.018 11.2249C16.8071 11.0966 16.6323 10.9171 16.5098 10.703C16.3873 10.489 16.3211 10.2474 16.3175 10.0009C16.3175 9.4978 16.5916 9.0424 17.018 8.7751C17.3074 8.5933 17.4941 8.4484 17.6275 8.2756C17.7717 8.08801 17.8774 7.8739 17.9386 7.64551C17.9999 7.41711 18.0155 7.17891 17.9845 6.9445C17.9376 6.5899 17.7276 6.2263 17.3083 5.5C16.8873 4.7737 16.6773 4.411 16.3933 4.1923C16.2054 4.04838 15.9909 3.94283 15.7621 3.88168C15.5333 3.82053 15.2947 3.80497 15.0599 3.8359C14.8435 3.8647 14.6244 3.9529 14.3206 4.1131C14.1038 4.23113 13.8607 4.29238 13.6138 4.29112C13.3669 4.28986 13.1243 4.22613 12.9088 4.1059C12.6966 3.97962 12.5199 3.80168 12.3954 3.58872C12.2708 3.37576 12.2024 3.13474 12.1965 2.8882C12.1839 2.5462 12.1515 2.3122 12.0676 2.1115C11.977 1.89296 11.8441 1.6944 11.6766 1.52715C11.5091 1.35991 11.3102 1.22726 11.0912 1.1368C10.7604 1 10.3402 1 9.5 1C8.65975 1 8.23963 1 7.90876 1.1368C7.68985 1.22726 7.49094 1.35991 7.3234 1.52715C7.15587 1.6944 7.023 1.89296 6.93238 2.1115C6.84944 2.3122 6.81608 2.5462 6.80346 2.8882C6.79759 3.13474 6.72917 3.37576 6.60461 3.58872C6.48005 3.80168 6.30342 3.97962 6.09123 4.1059C5.87559 4.22629 5.63287 4.29011 5.3858 4.29136C5.13872 4.29262 4.89536 4.23129 4.6785 4.1131C4.37558 3.9529 4.1556 3.8647 3.93923 3.8359C3.4653 3.77368 2.98602 3.90188 2.60673 4.1923C2.32365 4.411 2.11268 4.7737 1.69256 5.5C1.50504 5.824 1.35989 6.0751 1.2517 6.2857"
                    stroke={
                      localStorage.getItem('theme') === 'dark'
                        ? 'white'
                        : 'black'
                    }
                    stroke-width="1.25"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </Link>
            <button
              type="button"
              className={styles.navLogoutBtn}
              onClick={logout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
              >
                <path
                  d="M11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H11M15 10L11 6M15 10L11 14M15 10H5"
                  stroke="#E05744"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

          </div>
        </div>
      ) : (
        <div className={styles.headerBox}>
          <svg
            onClick={toggleTheme}
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="20"
            viewBox="0 0 50 20"
            fill="none"
          >
            <rect width="50" height="20" rx="10" fill="#FFD2C2" />
            <circle cx="10" cy="10" r="9.5" fill="white" stroke="#DEAB9A" />
            <path
              d="M9.6 5.6V4.4C9.6 4.29391 9.64214 4.19217 9.71716 4.11716C9.79217 4.04214 9.89391 4 10 4C10.1061 4 10.2078 4.04214 10.2828 4.11716C10.3579 4.19217 10.4 4.29391 10.4 4.4V5.6C10.4 5.70609 10.3579 5.80783 10.2828 5.88284C10.2078 5.95786 10.1061 6 10 6C9.89391 6 9.79217 5.95786 9.71716 5.88284C9.64214 5.80783 9.6 5.70609 9.6 5.6ZM13.2 10C13.2 10.6329 13.0123 11.2516 12.6607 11.7778C12.3091 12.3041 11.8093 12.7142 11.2246 12.9564C10.6399 13.1986 9.99645 13.262 9.37571 13.1385C8.75497 13.015 8.18479 12.7103 7.73726 12.2627C7.28973 11.8152 6.98496 11.245 6.86149 10.6243C6.73801 10.0035 6.80139 9.36014 7.04359 8.77541C7.28579 8.19069 7.69594 7.69092 8.22218 7.3393C8.74841 6.98768 9.3671 6.8 10 6.8C10.8484 6.80093 11.6618 7.13837 12.2617 7.73828C12.8616 8.3382 13.1991 9.15159 13.2 10ZM12.4 10C12.4 9.52532 12.2592 9.06131 11.9955 8.66663C11.7318 8.27195 11.357 7.96434 10.9184 7.78269C10.4799 7.60104 9.99734 7.55351 9.53178 7.64612C9.06623 7.73872 8.63859 7.9673 8.30294 8.30294C7.9673 8.63859 7.73872 9.06623 7.64612 9.53178C7.55351 9.99734 7.60104 10.4799 7.78269 10.9184C7.96434 11.357 8.27195 11.7318 8.66663 11.9955C9.06131 12.2592 9.52532 12.4 10 12.4C10.6363 12.3993 11.2464 12.1463 11.6963 11.6963C12.1463 11.2464 12.3993 10.6363 12.4 10ZM6.517 7.083C6.59206 7.15806 6.69385 7.20022 6.8 7.20022C6.90615 7.20022 7.00794 7.15806 7.083 7.083C7.15806 7.00794 7.20022 6.90615 7.20022 6.8C7.20022 6.69385 7.15806 6.59206 7.083 6.517L6.283 5.717C6.20794 5.64194 6.10615 5.59978 6 5.59978C5.89385 5.59978 5.79206 5.64194 5.717 5.717C5.64194 5.79206 5.59978 5.89385 5.59978 6C5.59978 6.10615 5.64194 6.20794 5.717 6.283L6.517 7.083ZM6.517 12.917L5.717 13.717C5.64194 13.7921 5.59978 13.8939 5.59978 14C5.59978 14.1061 5.64194 14.2079 5.717 14.283C5.79206 14.3581 5.89385 14.4002 6 14.4002C6.10615 14.4002 6.20794 14.3581 6.283 14.283L7.083 13.483C7.12016 13.4458 7.14964 13.4017 7.16976 13.3532C7.18987 13.3046 7.20022 13.2526 7.20022 13.2C7.20022 13.1474 7.18987 13.0954 7.16976 13.0468C7.14964 12.9983 7.12016 12.9542 7.083 12.917C7.04584 12.8798 7.00172 12.8504 6.95316 12.8302C6.9046 12.8101 6.85256 12.7998 6.8 12.7998C6.74744 12.7998 6.6954 12.8101 6.64684 12.8302C6.59828 12.8504 6.55416 12.8798 6.517 12.917ZM13.2 7.2C13.2525 7.20004 13.3046 7.18973 13.3531 7.16965C13.4017 7.14958 13.4458 7.12013 13.483 7.083L14.283 6.283C14.3581 6.20794 14.4002 6.10615 14.4002 6C14.4002 5.89385 14.3581 5.79206 14.283 5.717C14.2079 5.64194 14.1061 5.59978 14 5.59978C13.8939 5.59978 13.7921 5.64194 13.717 5.717L12.917 6.517C12.861 6.57294 12.8228 6.64424 12.8074 6.72188C12.7919 6.79951 12.7999 6.87999 12.8302 6.95312C12.8605 7.02625 12.9118 7.08874 12.9776 7.13269C13.0434 7.17664 13.1208 7.20006 13.2 7.2ZM13.483 12.917C13.4079 12.8419 13.3061 12.7998 13.2 12.7998C13.0939 12.7998 12.9921 12.8419 12.917 12.917C12.8419 12.9921 12.7998 13.0939 12.7998 13.2C12.7998 13.3061 12.8419 13.4079 12.917 13.483L13.717 14.283C13.7542 14.3202 13.7983 14.3496 13.8468 14.3698C13.8954 14.3899 13.9474 14.4002 14 14.4002C14.0526 14.4002 14.1046 14.3899 14.1532 14.3698C14.2017 14.3496 14.2458 14.3202 14.283 14.283C14.3202 14.2458 14.3496 14.2017 14.3698 14.1532C14.3899 14.1046 14.4002 14.0526 14.4002 14C14.4002 13.9474 14.3899 13.8954 14.3698 13.8468C14.3496 13.7983 14.3202 13.7542 14.283 13.717L13.483 12.917ZM6 10C6 9.89391 5.95786 9.79217 5.88284 9.71716C5.80783 9.64214 5.70609 9.6 5.6 9.6H4.4C4.29391 9.6 4.19217 9.64214 4.11716 9.71716C4.04214 9.79217 4 9.89391 4 10C4 10.1061 4.04214 10.2078 4.11716 10.2828C4.19217 10.3579 4.29391 10.4 4.4 10.4H5.6C5.70609 10.4 5.80783 10.3579 5.88284 10.2828C5.95786 10.2078 6 10.1061 6 10ZM10 14C9.89391 14 9.79217 14.0421 9.71716 14.1172C9.64214 14.1922 9.6 14.2939 9.6 14.4V15.6C9.6 15.7061 9.64214 15.8078 9.71716 15.8828C9.79217 15.9579 9.89391 16 10 16C10.1061 16 10.2078 15.9579 10.2828 15.8828C10.3579 15.8078 10.4 15.7061 10.4 15.6V14.4C10.4 14.2939 10.3579 14.1922 10.2828 14.1172C10.2078 14.0421 10.1061 14 10 14ZM15.6 9.6H14.4C14.2939 9.6 14.1922 9.64214 14.1172 9.71716C14.0421 9.79217 14 9.89391 14 10C14 10.1061 14.0421 10.2078 14.1172 10.2828C14.1922 10.3579 14.2939 10.4 14.4 10.4H15.6C15.7061 10.4 15.8078 10.3579 15.8828 10.2828C15.9579 10.2078 16 10.1061 16 10C16 9.89391 15.9579 9.79217 15.8828 9.71716C15.8078 9.64214 15.7061 9.6 15.6 9.6Z"
              fill="#DEAB9A"
            />
          </svg>
          <button type="button" className={styles.headerLogBtn}>
            Увійти
          </button>
        </div>
      )}
      {/* <svg
          onClick={toggleTheme}
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="20"
          viewBox="0 0 50 20"
          fill="none"
        >
          <rect width="50" height="20" rx="10" fill="#FFD2C2" />
          <circle cx="10" cy="10" r="9.5" fill="white" stroke="#DEAB9A" />
          <path
            d="M9.6 5.6V4.4C9.6 4.29391 9.64214 4.19217 9.71716 4.11716C9.79217 4.04214 9.89391 4 10 4C10.1061 4 10.2078 4.04214 10.2828 4.11716C10.3579 4.19217 10.4 4.29391 10.4 4.4V5.6C10.4 5.70609 10.3579 5.80783 10.2828 5.88284C10.2078 5.95786 10.1061 6 10 6C9.89391 6 9.79217 5.95786 9.71716 5.88284C9.64214 5.80783 9.6 5.70609 9.6 5.6ZM13.2 10C13.2 10.6329 13.0123 11.2516 12.6607 11.7778C12.3091 12.3041 11.8093 12.7142 11.2246 12.9564C10.6399 13.1986 9.99645 13.262 9.37571 13.1385C8.75497 13.015 8.18479 12.7103 7.73726 12.2627C7.28973 11.8152 6.98496 11.245 6.86149 10.6243C6.73801 10.0035 6.80139 9.36014 7.04359 8.77541C7.28579 8.19069 7.69594 7.69092 8.22218 7.3393C8.74841 6.98768 9.3671 6.8 10 6.8C10.8484 6.80093 11.6618 7.13837 12.2617 7.73828C12.8616 8.3382 13.1991 9.15159 13.2 10ZM12.4 10C12.4 9.52532 12.2592 9.06131 11.9955 8.66663C11.7318 8.27195 11.357 7.96434 10.9184 7.78269C10.4799 7.60104 9.99734 7.55351 9.53178 7.64612C9.06623 7.73872 8.63859 7.9673 8.30294 8.30294C7.9673 8.63859 7.73872 9.06623 7.64612 9.53178C7.55351 9.99734 7.60104 10.4799 7.78269 10.9184C7.96434 11.357 8.27195 11.7318 8.66663 11.9955C9.06131 12.2592 9.52532 12.4 10 12.4C10.6363 12.3993 11.2464 12.1463 11.6963 11.6963C12.1463 11.2464 12.3993 10.6363 12.4 10ZM6.517 7.083C6.59206 7.15806 6.69385 7.20022 6.8 7.20022C6.90615 7.20022 7.00794 7.15806 7.083 7.083C7.15806 7.00794 7.20022 6.90615 7.20022 6.8C7.20022 6.69385 7.15806 6.59206 7.083 6.517L6.283 5.717C6.20794 5.64194 6.10615 5.59978 6 5.59978C5.89385 5.59978 5.79206 5.64194 5.717 5.717C5.64194 5.79206 5.59978 5.89385 5.59978 6C5.59978 6.10615 5.64194 6.20794 5.717 6.283L6.517 7.083ZM6.517 12.917L5.717 13.717C5.64194 13.7921 5.59978 13.8939 5.59978 14C5.59978 14.1061 5.64194 14.2079 5.717 14.283C5.79206 14.3581 5.89385 14.4002 6 14.4002C6.10615 14.4002 6.20794 14.3581 6.283 14.283L7.083 13.483C7.12016 13.4458 7.14964 13.4017 7.16976 13.3532C7.18987 13.3046 7.20022 13.2526 7.20022 13.2C7.20022 13.1474 7.18987 13.0954 7.16976 13.0468C7.14964 12.9983 7.12016 12.9542 7.083 12.917C7.04584 12.8798 7.00172 12.8504 6.95316 12.8302C6.9046 12.8101 6.85256 12.7998 6.8 12.7998C6.74744 12.7998 6.6954 12.8101 6.64684 12.8302C6.59828 12.8504 6.55416 12.8798 6.517 12.917ZM13.2 7.2C13.2525 7.20004 13.3046 7.18973 13.3531 7.16965C13.4017 7.14958 13.4458 7.12013 13.483 7.083L14.283 6.283C14.3581 6.20794 14.4002 6.10615 14.4002 6C14.4002 5.89385 14.3581 5.79206 14.283 5.717C14.2079 5.64194 14.1061 5.59978 14 5.59978C13.8939 5.59978 13.7921 5.64194 13.717 5.717L12.917 6.517C12.861 6.57294 12.8228 6.64424 12.8074 6.72188C12.7919 6.79951 12.7999 6.87999 12.8302 6.95312C12.8605 7.02625 12.9118 7.08874 12.9776 7.13269C13.0434 7.17664 13.1208 7.20006 13.2 7.2ZM13.483 12.917C13.4079 12.8419 13.3061 12.7998 13.2 12.7998C13.0939 12.7998 12.9921 12.8419 12.917 12.917C12.8419 12.9921 12.7998 13.0939 12.7998 13.2C12.7998 13.3061 12.8419 13.4079 12.917 13.483L13.717 14.283C13.7542 14.3202 13.7983 14.3496 13.8468 14.3698C13.8954 14.3899 13.9474 14.4002 14 14.4002C14.0526 14.4002 14.1046 14.3899 14.1532 14.3698C14.2017 14.3496 14.2458 14.3202 14.283 14.283C14.3202 14.2458 14.3496 14.2017 14.3698 14.1532C14.3899 14.1046 14.4002 14.0526 14.4002 14C14.4002 13.9474 14.3899 13.8954 14.3698 13.8468C14.3496 13.7983 14.3202 13.7542 14.283 13.717L13.483 12.917ZM6 10C6 9.89391 5.95786 9.79217 5.88284 9.71716C5.80783 9.64214 5.70609 9.6 5.6 9.6H4.4C4.29391 9.6 4.19217 9.64214 4.11716 9.71716C4.04214 9.79217 4 9.89391 4 10C4 10.1061 4.04214 10.2078 4.11716 10.2828C4.19217 10.3579 4.29391 10.4 4.4 10.4H5.6C5.70609 10.4 5.80783 10.3579 5.88284 10.2828C5.95786 10.2078 6 10.1061 6 10ZM10 14C9.89391 14 9.79217 14.0421 9.71716 14.1172C9.64214 14.1922 9.6 14.2939 9.6 14.4V15.6C9.6 15.7061 9.64214 15.8078 9.71716 15.8828C9.79217 15.9579 9.89391 16 10 16C10.1061 16 10.2078 15.9579 10.2828 15.8828C10.3579 15.8078 10.4 15.7061 10.4 15.6V14.4C10.4 14.2939 10.3579 14.1922 10.2828 14.1172C10.2078 14.0421 10.1061 14 10 14ZM15.6 9.6H14.4C14.2939 9.6 14.1922 9.64214 14.1172 9.71716C14.0421 9.79217 14 9.89391 14 10C14 10.1061 14.0421 10.2078 14.1172 10.2828C14.1922 10.3579 14.2939 10.4 14.4 10.4H15.6C15.7061 10.4 15.8078 10.3579 15.8828 10.2828C15.9579 10.2078 16 10.1061 16 10C16 9.89391 15.9579 9.79217 15.8828 9.71716C15.8078 9.64214 15.7061 9.6 15.6 9.6Z"
            fill="#DEAB9A"
          />
        </svg>
        <button type="button" className={styles.headerLogBtn}>
          Увійти
        </button> */}
      {/* </div> */}
    </header>
  );
};

export default Header;

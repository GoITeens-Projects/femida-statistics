import css from './Login.module.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operation';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const auth = useSelector(state => state.auth);

  //? State
  // const accessToken = auth.accessToken;

  const handleLogin = e => {
    e.preventDefault();
    const loginData = {
      username: username,
      password: password,
    };
    console.log(loginData);
    dispatch(login(loginData));
  };
  return (
    <div className={css['login-overlay']}>
      <img
        className={css.login__logo}
        src="anypath"
        alt="GoIteens&Femida logo"
      />
      <div className={css['login-modal']}>
        <div className={css['login-title-box']}>
          <h2 className={css.login__title}>Увійти</h2>
        </div>
        <form className={css.login__form} onSubmit={handleLogin}>
          <label className={css.login__label}>
            Ім’я користувача
            <input
              className={css.login__input}
              type="text"
              placeholder="Ім’я користувача"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
          <label className={css.login__label}>
            Пароль
            <input
              className={css.login__input}
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <button className={css.login__btn} type="submit">
            Увійти
          </button>
        </form>
        <div className={css['login-block']}>
          <h3 className={css.login__subtitle}>Або увійдіть за допомогою</h3>
          <ul className={css.login__list}>
            <li className={css.login__item}>
              <a href="https://discord.com" className={css.login__link}>
                <button
                  type="button"
                  className={css['login__link-btn']}
                ></button>
              </a>
            </li>
            <li className={css.login__item}>
              <a href="https://femida-api.onrender.com/auth/discord" className={css.login__link}>
                <button
                  type="button"
                  className={`${css['login__link-btn']} ${css['login-discord-icon']}`}
                ></button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;

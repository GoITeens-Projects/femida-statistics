import css from './Login.module.css';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operation';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);

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
        <h2 className={css.login__title}>Увійти</h2>
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
        <div className="login-block">
          <h3 className={css.login__subtitle}>Або увійдіть за допомогою</h3>
          <a className={css.login__link} href="https://discord.com">
            <button className={css['login__social-btn']} type="button"></button>
          </a>
          <a className={css.login__link} href="https://discord.com">
            <button className={css['login__social-btn']} type="button"></button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

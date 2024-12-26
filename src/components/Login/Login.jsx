import css from './Login.module.css';
import Logo from '../../imgs/logo.png';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operation';
import Shadow from 'components/Shadow/Shadow';

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
    <div className={css.loginOverlay}>
      <img className={css.loginLogo} src={Logo} alt="GoIteens&Femida logo" />
      <div className={css['loginModal']}>
        <Shadow leftFirst={-5} rightSecond={1} bottomSecond={-5} />
        <div className={css['loginTitleBox']}>
          <h2 className={css.loginTitle}>Увійти</h2>
        </div>
        <form className={css.loginForm} onSubmit={handleLogin}>
          <label className={css.loginLabel}>
            Ім’я користувача
            <input
              className={css.loginInput}
              type="text"
              placeholder="Ім’я користувача"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
          <label className={css.loginLabel}>
            Пароль
            <input
              className={css.loginInput}
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <button className={css.loginBtn} type="submit">
            Увійти
          </button>
        </form>
        <div className={css['loginBlock']}>
          <h3 className={css.loginSubtitle}>Або увійдіть за допомогою</h3>
          <ul className={css.loginList}>
            <li className={css.loginItem}>
              <a href="https://discord.com" className={css.loginLink}>
                <button type="button" className={css['loginLinkBtn']}></button>
              </a>
            </li>
            <li className={css.loginItem}>
              <a
                href="https://femida-api.onrender.com/auth/discord"
                className={css.loginLink}
              >
                <button
                  type="button"
                  className={`${css['loginLinkBtn']} ${css['loginDiscordIcon']}`}
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

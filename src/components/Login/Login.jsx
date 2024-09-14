import styles from './Login.module.css';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operation';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth);

  const handleLogin = () => {
    const loginData = {
      username: username,
      password: password,
    };

    dispatch(login(loginData));
  };
  return (
    <div>
      <h2>Вхід в акаунт</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Увійти</button>

      {auth.loading && <p>Завантаження...</p>}
      {auth.error && <p>{auth.error}</p>}
    </div>
  );
};

export default Login;

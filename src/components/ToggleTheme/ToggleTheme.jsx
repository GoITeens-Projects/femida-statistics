import { useState, useEffect, useCallback } from 'react';
import styles from './ToggleTheme.module.css';

const ToggleTheme = () => {
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

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default ToggleTheme;

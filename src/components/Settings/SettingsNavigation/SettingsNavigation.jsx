import styles from './SettingsNavigation.module.css';
import { Link } from 'react-router-dom';

export const SettingsNavigation = ({ onHandleSave, onHandleBackClick }) => {
  return (
    <div className={styles.ConatinerNavigation}>
      <button type="button" onClick={onHandleBackClick} className={styles.ExitButton}>
        <svg
          width="8"
          height="10"
          viewBox="0 0 4 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 1L1 3L3 5"
            stroke="#678F95"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Назад
      </button>
      <button onClick={onHandleSave} className={styles.SaveButton}>
        Зберегти
      </button>
    </div>
  );
};
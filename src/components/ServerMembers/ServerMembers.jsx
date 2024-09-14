import { useDispatch, useSelector } from 'react-redux';
import styles from './ServerMembers.module.css';
import { useEffect } from 'react';
import { fetchStatistics } from '../../redux/statistics/operation';

export const ServerMembers = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(state => state.statistics); // Замініть на правильний шлях до вашого стейту

  const handleFetchStatistics = () => {
    dispatch(fetchStatistics());
  };

  return (
    <>
      <h1>Скільки користувачів зайшло і вийшло на сервер</h1>
      <button onClick={handleFetchStatistics} className={styles.button}>
        Отримати статистику
      </button>
      {/* Додайте виведення статистики, якщо потрібно */}
    </>
  );
};

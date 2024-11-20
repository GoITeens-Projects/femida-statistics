import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../redux/filter/operation';
import { fetchStatistics } from '../../redux/statistics/operation';
import {
  selectFilterInterval,
  selectFilterPeriod,
  selectFilterUnit,
} from '../../redux/filter/selectors';
import styles from './Filter.module.css';
import { selectWindowWidth } from '../../redux/filter/selectors';
import Shadow from 'components/Shadow/Shadow';

export const FilterModal = ({ delince }) => {
  const ww = useSelector(selectWindowWidth);
  const size = (ww * 0.85 - 120) / 2;
  
  const dispatch = useDispatch();
  const selInterval = useSelector(selectFilterInterval);
  const selUnit = useSelector(selectFilterUnit);
  const selPeriod = useSelector(selectFilterPeriod);

  const [interval, setIntervals] = useState(selInterval);
  const [unit, setUnit] = useState(selUnit);
  const [period, setPeriod] = useState(selPeriod);

  const changeFilter = () => {
    dispatch(
      updateFilter({
        interval,
        unit,
        period,
      })
    );
    dispatch(fetchStatistics({
      interval,
      unit,
      period,
    }))
    
    delince()
  };

  const foundCorrectPeriod = ({ interval, period }) => {
    switch (interval) {
      case 'hours':
        if (period === 1) {
          return 'година';
        } else if (period < 5) {
          return 'години';
        } else {
          return 'годин';
        }

      case 'days':
        if (period === 1) {
          return 'день';
        } else if (period < 5) {
          return 'дні';
        } else {
          return 'днів';
        }

      case 'weeks':
        if (period === 1) {
          return 'тиждень';
        } else if (period < 5) {
          return 'тижні';
        } else {
          return 'тижнів';
        }

      case 'months':
        if (period === 1) {
          return 'місяць';
        } else if (period < 5) {
          return 'місяця';
        } else {
          return 'місяців';
        }
      default:
        break;
    }
  };

  const chooseInterval = int => {
    setIntervals(int);
    switch (int) {
      case 'hours':
        if (period > 24) setPeriod(24);
        break;
      case 'days':
        if (period > 30) setPeriod(30);
        break;
      case 'weeks':
        if (period > 24) setPeriod(24);
        break;
      case 'months':
        if (period > 6) setPeriod(6);
        break;

      default:
        break;
    }
  };

  return (
    <div className={styles.filterModal}>
      <Shadow
        leftFirst={-5}
        backgroundBoth={'var(--shadow-secondary-color)'}
        rightSecond={1}
        bottomSecond={-5}
        borderColorBoth={'var(--shadow-secondary-border)'}
      />
      <div className={styles.headerFilterModal}>
        <button onClick={delince} className={styles.backButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="6"
            viewBox="0 0 4 6"
            fill="none"
          >
            <path
              d="M3 1L1 3L3 5"
              stroke="--text-accent-color"
              stroke-width="0.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Назад
        </button>
        <h5 className={styles.filterNameTitle}>Фільтр: час</h5>
      </div>
      <div className={styles.filterLine}></div>
      <div className={styles.intervalBox}>
        <h5 className={styles.intervalTitle}>Інтервали</h5>
        <p className={styles.dispalyTimeTitle}>
          Як час відображається на шкалі
        </p>
        <ul className={styles.chooseIntervalList}>
          <li className={styles.chooseIntervalItem}>
            <button
              onClick={() => chooseInterval('hours')}
              className={`${styles.chooseIntevalBtn} ${
                interval === 'hours' && styles.chooseBtnActive
              }`}
            >
              Години
            </button>
          </li>
          <li className={styles.chooseIntervalItem}>
            <button
              onClick={() => chooseInterval('days')}
              className={`${styles.chooseIntevalBtn} ${
                interval === 'days' && styles.chooseBtnActive
              }`}
            >
              Дні
            </button>
          </li>
          <li className={styles.chooseIntervalItem}>
            <button
              onClick={() => chooseInterval('weeks')}
              className={`${styles.chooseIntevalBtn} ${
                interval === 'weeks' && styles.chooseBtnActive
              }`}
            >
              Тижні
            </button>
          </li>
          <li className={styles.chooseIntervalItem}>
            <button
              onClick={() => chooseInterval('months')}
              className={`${styles.chooseIntevalBtn} ${
                interval === 'months' && styles.chooseBtnActive
              }`}
            >
              Місяці
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.unitsOfTimeBox}>
        <h5 className={styles.unitsOfTimeTitle}>Одиниці часу</h5>
        <p className={styles.unitsOfTimeSubtitle}>
          В яких одиницях відображаться активність голосових каналів
        </p>
        <ul className={styles.unitsOfTimeList}>
          <li className={styles.unitsOfTimeItem}>
            <button
              onClick={() => setUnit('minutes')}
              className={`${styles.unitsOfTimeBtn} ${
                unit === 'minutes' && styles.chooseBtnActive
              }`}
            >
              Хвилини
            </button>
          </li>
          <li className={styles.unitsOfTimeItem}>
            <button
              onClick={() => setUnit('hours')}
              className={`${styles.unitsOfTimeBtn} ${
                unit === 'hours' && styles.chooseBtnActive
              }`}
            >
              Години
            </button>
          </li>
          <li className={styles.unitsOfTimeItem}>
            <button
              onClick={() => setUnit('days')}
              className={`${styles.unitsOfTimeBtn} ${
                unit === 'days' && styles.chooseBtnActive
              }`}
            >
              Дні
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.periodOfTimeBox}>
        <h5 className={styles.periodOfTimeTitle}>Проміжок часу</h5>
        <p className={styles.periodOfTimeSubtitle}>Проміжок часу статистики</p>
        {interval === 'hours' && (
          <input
            type="range"
            min="1"
            max="24"
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className={styles.periodOfTimeInput}
          ></input>
        )}
        {interval === 'days' && (
          <input
            type="range"
            min="1"
            max="30"
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className={styles.periodOfTimeInput}
          ></input>
        )}
        {interval === 'weeks' && (
          <input
            type="range"
            min="1"
            max="24"
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className={styles.periodOfTimeInput}
          ></input>
        )}
        {interval === 'months' && (
          <input
            type="range"
            min="1"
            max="6"
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className={styles.periodOfTimeInput}
          ></input>
        )}
        <p className={styles.chosenPeriodText}>
          {period}
          {foundCorrectPeriod({ interval, period })}
        </p>
      </div>
      <button onClick={changeFilter} className={styles.saveFilterBtn}>
        Зберегти
      </button>
    </div>
  );
};

import styles from './PeriodsSettings.module.css';
import Shadow from '../../Shadow/Shadow';
import { useState } from 'react';
import flatpickr from 'flatpickr';
import LimitsScope from 'components/LimitsScope/LimitsScope';

export const PeriodsSettings = ({
  id,
  thisStartDate,
  thisEndDate,
  thisCountOfXP,
  thisDisabled,
  onSubmitChanges,
  onDelete,
  thisStartDateStr,
  thisEndDateStr,
}) => {
  const [startDate, setStartDate] = useState(thisStartDate);
  const [endDate, setEndDate] = useState(thisEndDate);
  const [startDateStr, setStartDateStr] = useState(thisStartDateStr);
  const [endDateStr, setEndDateStr] = useState(thisEndDateStr);
  const [countOfXP, setCountOfXP] = useState(thisCountOfXP);
  const [disabled, setDisabled] = useState(thisDisabled);

  const onCheckbox = () => {
    disabled ? setDisabled(false) : setDisabled(true);
  };

  flatpickr('#start', {
    dateFormat: 'd/m/y',
    disableMobile: true,
    minDate: 'today',
    // locale: 'uk',
    // allowInput: true,
    onChange: (selectedDates, dateStr) => {
      setStartDate(selectedDates[0]);
      setStartDateStr(dateStr);
    },
  });

  flatpickr('#end', {
    dateFormat: 'd/m/y',
    disableMobile: true,
    minDate: 'today',
    // locale: 'uk',
    // allowInput: true,
    onChange: (selectedDates, dateStr) => {
      setEndDate(selectedDates[0]);
      setEndDateStr(dateStr);
    },
  });

  // const
  return (
    <>
      <div className={styles['container']}>
        <Shadow
          leftFirst={-7}
          widthFirst={5}
          heightSecond={5}
          rightSecond={3}
          bottomSecond={-7}
          backgroundBoth={'var(--chart-accent-color)'}
          borderColorBoth={'var(--border-accent-color)'}
        />
        <button type="button" className={styles['close-button']}>
          ◄
        </button>
        <p className={styles['subtitle']}>Період видачі ХР</p>
        <div className={styles['date-subcountainer']}>
          <div className={styles['date-countainer']}>
            <p>З</p>
            <label
              className={styles[`date-label${disabled ? '-disabled' : ''}`]}
            >
              <Shadow
                leftFirst={-7}
                widthFirst={5}
                heightSecond={5}
                rightSecond={3}
                bottomSecond={-7}
                backgroundBoth={'var(--shadow-secondary-border)'}
                borderColorBoth={'var( --shadow-settings-border)'}
              />
              <input
                className={styles['date-input']}
                disabled={disabled}
                type="text"
                autocomplete="off"
                name="start"
                id="start"
                value={startDateStr}
                readOnly={true}
                placeholder="DD/MM/YYYY"
              />
            </label>
            <p>до</p>
            <label
              className={styles[`date-label${disabled ? '-disabled' : ''}`]}
            >
              <Shadow
                leftFirst={-7}
                widthFirst={5}
                heightSecond={5}
                rightSecond={3}
                bottomSecond={-7}
                backgroundBoth={'var(--shadow-secondary-border)'}
                borderColorBoth={'var(--shadow-settings-border)'}
              />
              <input
                className={styles['date-input']}
                disabled={disabled}
                type="text"
                autocomplete="off"
                name="end"
                id="end"
                readOnly={true}
                value={endDateStr}
                placeholder="DD/MM/YYYY"
              />
            </label>
          </div>
          <div className={styles['checkbox-container']}>
            <label className={styles.limitsScopesCheckboxLabel}>
              <input type="checkbox" onChange={onCheckbox} checked={disabled} />
              <span className={styles.limitsScopesCheckboxSpan}></span>
            </label>
            <p className={styles.limitsScopeSubtitle}>Необмежений</p>
          </div>
        </div>

        <p className={styles['subtitle']}>Кількість ХР</p>
        <label className={styles['count-label']}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--shadow-settings-border)'}
          />
          <input
            className={styles['count-input']}
            type="number"
            min={0}
            autocomplete="off"
            name="number"
            id="number"
            placeholder="00 000"
            value={`${countOfXP}`}
            onChange={e => setCountOfXP(Number(e.currentTarget.value))}
          />
        </label>
        <div>
          <p className={styles['subtitle']}>
            Область дії видачі ХР за певний період
          </p>

          <LimitsScope />
        </div>
        <div>
          <button
            type="button"
            className={styles['confirm-changes-button']}
            onClick={() =>
              onSubmitChanges(
                `${startDate}`,
                `${endDate}`,
                startDateStr,
                endDateStr,
                countOfXP,
                disabled,
                id
              )
            }
          >
            Підтвердити зміни
          </button>
        </div>

        <button
          type="button"
          className={styles['delete-button']}
          onClick={() => onDelete(id)}
        >
          <svg
            width="15"
            height="17"
            viewBox="0 0 15 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4.33333H14M5.875 7.66667V12.6667M9.125 7.66667V12.6667M1.8125 4.33333L2.625 14.3333C2.625 14.7754 2.7962 15.1993 3.10095 15.5118C3.4057 15.8244 3.81902 16 4.25 16H10.75C11.181 16 11.5943 15.8244 11.899 15.5118C12.2038 15.1993 12.375 14.7754 12.375 14.3333L13.1875 4.33333M5.0625 4.33333V1.83333C5.0625 1.61232 5.1481 1.40036 5.30048 1.24408C5.45285 1.0878 5.65951 1 5.875 1H9.125C9.34049 1 9.54715 1.0878 9.69952 1.24408C9.8519 1.40036 9.9375 1.61232 9.9375 1.83333V4.33333"
              stroke="#C32D2D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
};


import styles from './PeriodsSettings.module.css';
import Shadow from '../../Shadow/Shadow';
import { useState } from 'react';
import flatpickr from 'flatpickr';
import LimitsScope from 'components/LimitsScope/LimitsScope';
import { nanoid } from 'nanoid';

export const PeriodsSettings = () => {
  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('За повідомлення');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [countOfXP, setCountOfXP] = useState(0);
  const [disabled, setDisabled] = useState(false);
  
  const onCheckbox = () => {
    disabled ? setDisabled(false) : setDisabled(true);
    setStartDate('')
    setEndDate('')
  };
  const options = ['За повідомлення', 'За войс', 'За триюуну', 'За буст'];
  flatpickr('#start', {
    dateFormat: 'd/m/y',
    disableMobile: true,
    minDate: 'today',
    locale: 'uk',
    allowInput: true,
  });

  flatpickr('#end', {
    dateFormat: 'd/m/y',
    disableMobile: true,
    minDate: 'today',
    locale: 'uk',
    allowInput: true,
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
        <p className={styles['subtitle']}>Умови видачі ХР</p>
        <div className={styles['dropdown-display']}>
        <Shadow
                leftFirst={-7}
                widthFirst={5}
                heightSecond={5}
                rightSecond={3}
                bottomSecond={-7}
                backgroundBoth={'var(--shadow-secondary-border)'}
                borderColorBoth={'var( --shadow-settings-border)'}
              />
          <button
            className={styles['dropdown-button']}
            onClick={() => setIsActivityDropdownOpen(!isActivityDropdownOpen)}
          >
            {selectedActivity}
            <span className={styles['dropdown-arrow']}>
              {isActivityDropdownOpen ? '◄' : '▼'}{' '}
            </span>
          </button>
          {isActivityDropdownOpen && (
            <ul className={styles['dropdown-list']}>
              {options.map((option, index) => (
                <li
                  key={index}
                  className={styles['dropdown-item']}
                  onClick={() => {
                    setSelectedActivity(option);
                    setIsActivityDropdownOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

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
                placeholder={startDate === '' ? 'DD/MM/YYYY' : startDate}
                onChange={e => setStartDate(e.currentTarget.value)}
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
                placeholder={endDate === '' ? 'DD/MM/YYYY' : endDate}
                onChange={e => setEndDate(e.currentTarget.value)}
              />
            </label>
          </div>
          <div className={styles['checkbox-container']}>
            <label className={styles.limitsScopesCheckboxLabel}>
              <input type="checkbox" onChange={onCheckbox} />
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
            name="number"
            id="number"
            placeholder="00 000"
            value={countOfXP}
            onChange={e => setCountOfXP(e.currentTarget.value)}
          />
        </label>
        <div>
          <p className={styles['subtitle']}>
            Область дії видачі ХР за певний період
          </p>

          <LimitsScope />
        </div>
        <div>
          <button type="button" className={styles['confirm-changes-button']}>
            Підтвердити зміни
          </button>
        </div>

        <button type="button" className={styles['delete-button']}>
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

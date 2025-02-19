import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PeriodOfLimits.module.css';
import limitsScopeStyles from '../LimitsScope/LimitsScope.module.css';
import Shadow from 'components/Shadow/Shadow';
import { PatchSettings } from '../../redux/settings/operation';
import { selectSettingsData } from '../../redux/settings/selectors';

const PeriodOfLimits = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettingsData);
  console.log(settings);
  const [isOpenRoles, setIsOpenRoles] = useState(false);
  const [selectedTargetRoles, setSelectedTargetRoles] = useState([]);
  const [isOpenChannels, setIsOpenChannels] = useState(false);
  const [selectedTargetChannels, setSelectedTargetChannels] = useState([]);

  const options = ['Адміністратор', 'Користувач', 'Модератор'];

  // !events state
  const [isEventMessages, setIsEventMessages] = useState('');
  const [isEventVoice, setIsEventVoice] = useState('');
  const [isEventStage, setIsEventStage] = useState('');
  const [isEventBoost, setIsEventBoost] = useState('');

  const [isIgnoreAdmins, setIsIgnoreAdmins] = useState(false);
  const [isPeriodUnlimited, setIsPeriodUnlimited] = useState('');

  const [startDateLimit, setStartDateLimit] = useState('');
  const [endDateLimit, setEndDateLimit] = useState('');
  const [coefficient, setCoefficient] = useState('');

  const handleCofficient = evt => {
    let inputValue = evt.target.value.replace(/\D/g, '');
    inputValue = inputValue.replace(/(\d{2})(\d{3})/, '$1.$2');
    setCoefficient(inputValue);
    const numericValue = parseFloat(inputValue.replace('.', ''));
    console.log(numericValue);
  };

  const handleAddNewPeriod = () => {
    const startDate = new Date(
      `20${startDateLimit.slice(-2)}-${startDateLimit.slice(
        3,
        5
      )}-${startDateLimit.slice(0, 2)}`
    );
    const endDate = new Date(
      `20${endDateLimit.slice(-2)}-${endDateLimit.slice(
        3,
        5
      )}-${endDateLimit.slice(0, 2)}`
    );

    console.log(selectedTargetChannels);
    console.log(selectedTargetRoles);

    // dispatch(
    //   PatchSettings({
    //     settings: {
    //       events: [
    //         {
    //           activities: {
    //             messages: isEventMessages,
    //             voice: isEventVoice,
    //             stage: isEventStage,
    //             boosts: isEventBoost,
    //           },
    //           // k: { type: Number, default: 1 },
    //           kLimit: Number(coefficient),
    //           startDate: startDate,
    //           endDate: endDate,
    //           targetChannels: [String],
    //           targetRoles: [String],
    //         },
    //       ],
    //     },
    //   })
    // );
  };

  return (
    <div className={styles.periodOfLimits}>
      <button
        type="button"
        className={styles.addNewPeriodBtn}
        onClick={handleAddNewPeriod}
      >
        Додати новий період
      </button>

      <h3 className={styles.periodOfLimitsTitle}>Період лімітів</h3>

      <div className={styles.selectPeriodOfLimitsBox}>
        <span className={styles.periodOfLimitsSubtext}>З</span>
        <div className={styles['input-container']}>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            value={startDateLimit}
            onChange={evt => {
              let value = evt.target.value;
              value = value.replace(/[^0-9/]/g, '');
              if (value.length === 2 || value.length === 5) {
                value += '/';
              }
              if (value.length > 10) {
                return;
              }
              setStartDateLimit(value);
            }}
            maxLength="10"
          />
          <Shadow
            leftFirst={-4}
            widthFirst={3}
            heightSecond={3}
            rightSecond={0}
            bottomSecond={-4}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
        </div>
        <span className={styles.periodOfLimitsSubtext}>до</span>
        <div className={styles['input-container']}>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            value={endDateLimit}
            onChange={evt => {
              let value = evt.target.value;
              value = value.replace(/[^0-9/]/g, '');
              if (value.length === 2 || value.length === 5) {
                value += '/';
              }
              if (value.length > 10) {
                return;
              }
              setEndDateLimit(value);
            }}
            maxLength="10"
          />
          <Shadow
            leftFirst={-4}
            widthFirst={3}
            heightSecond={3}
            rightSecond={0}
            bottomSecond={-4}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
        </div>
        <div className={styles.isPeriodUnlimitedBox}>
          <label className={styles.periodOfLimitsCheckboxLabel}>
            <input
              type="checkbox"
              onChange={evt => setIsPeriodUnlimited(evt.target.checked)}
            />
            <span className={styles.periodOfLimitsCheckboxSpan}></span>
          </label>
          <p className={styles.periodOfLimitsSubtitle}>Необмежений</p>
        </div>
      </div>

      <div className={styles.periodOfLimitsCoefficientBox}>
        <h3 className={styles.periodOfLimitsTitle}>Коефіцієнт</h3>
        <div className={styles.periodOfLimitsCoefficientBlock}>
          <input
            type="text"
            className={styles.periodOfLimitsCoefficientInput}
            onChange={handleCofficient}
            placeholder="00 000"
            value={coefficient}
            maxLength="6"
          />
          <Shadow
            leftFirst={-4}
            widthFirst={3}
            heightSecond={3}
            rightSecond={0}
            bottomSecond={-4}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
        </div>
      </div>

      <div className={styles.activitiesBox}>
        <h3 className={styles.periodOfLimitsTitle}>Активності</h3>
        <div className={styles.periodOfLimitsGeneralBox}>
          <div className={styles.activitiesBlock}>
            <label className={styles.periodOfLimitsCheckboxLabel}>
              <input
                type="checkbox"
                onChange={evt => setIsEventMessages(evt.target.checked)}
              />
              <span className={styles.periodOfLimitsCheckboxSpan}></span>
            </label>
            <p className={styles.periodOfLimitsSubtitle}>
              Спілкування в текстових каналах
            </p>
          </div>
          <div className={styles.activitiesBlock}>
            <label className={styles.periodOfLimitsCheckboxLabel}>
              <input
                type="checkbox"
                onChange={evt => setIsEventVoice(evt.target.checked)}
              />
              <span className={styles.periodOfLimitsCheckboxSpan}></span>
            </label>
            <p className={styles.periodOfLimitsSubtitle}>
              Спілкування в голосових чатах
            </p>
          </div>
          <div className={styles.activitiesBlock}>
            <label className={styles.periodOfLimitsCheckboxLabel}>
              <input
                type="checkbox"
                onChange={evt => setIsEventStage(evt.target.checked)}
              />
              <span className={styles.periodOfLimitsCheckboxSpan}></span>
            </label>
            <p className={styles.periodOfLimitsSubtitle}>
              Перебування на трибунах
            </p>
          </div>
          <div className={styles.activitiesBlock}>
            <label className={styles.periodOfLimitsCheckboxLabel}>
              <input
                type="checkbox"
                onChange={evt => setIsEventBoost(evt.target.checked)}
              />
              <span className={styles.periodOfLimitsCheckboxSpan}></span>
            </label>
            <p className={styles.periodOfLimitsSubtitle}>
              Буст серверу(під питанням)
            </p>
          </div>
        </div>
      </div>

      <div className={styles.periodOfLimitsScopeBox}>
        <h3 className={styles.periodOfLimitsTitle}>
          Область дії лімітів за певний період
        </h3>
        <div className={styles.periodOfLimitsScopeBlock}>
          <label className={styles.periodOfLimitsCheckboxLabel}>
            <input
              type="checkbox"
              onChange={evt => setIsIgnoreAdmins(evt.target.checked)}
            />
            <span className={styles.periodOfLimitsCheckboxSpan}></span>
          </label>
          <p className={styles.periodOfLimitsSubtitle}>
            Не поширювати на Адміністраторів і Модераторів
          </p>
        </div>
      </div>
      <ul className={limitsScopeStyles.limitsScopeList}>
        {/* <li className={limitsScopeStyles.limitsScopeItem}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
          <div className={limitsScopeStyles['dropdown-container']}>
            <button
              className={limitsScopeStyles['dropdown-button']}
              onClick={() => setIsOpenRoles(!isOpenRoles)}
            >
              {selectedTargetRoles}
              <span className={limitsScopeStyles['dropdown-arrow']}>▼</span>
            </button>
            {isOpenRoles && (
              <ul className={limitsScopeStyles['dropdown-list']}>
                {options.map((option, index) => (
                  <li
                    key={index}
                    className={limitsScopeStyles['dropdown-item']}
                    onClick={() => {
                      setSelectedTargetRoles(option);
                      setIsOpenRoles(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li> */}
        <li className={limitsScopeStyles.limitsScopeItem}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
          <div className={limitsScopeStyles['dropdown-container']}>
            <button
              className={limitsScopeStyles['dropdown-button']}
              onClick={() => setIsOpenRoles(!isOpenRoles)}
            >
              {selectedTargetRoles.length > 0
                ? selectedTargetRoles.join(', ')
                : 'Цільові ролі'}
              <span className={limitsScopeStyles['dropdown-arrow']}>▼</span>
            </button>
            {isOpenRoles && (
              <ul className={limitsScopeStyles['dropdown-list']}>
                {options.map((option, index) => (
                  <li
                    key={index}
                    className={limitsScopeStyles['dropdown-item']}
                  >
                    <label className={styles.periodOfLimitsCheckboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedTargetRoles.includes(option)} // Перевірка на вибір
                        onChange={evt =>
                          setSelectedTargetRoles(prevState => {
                            if (evt.target.checked) {
                              return [...prevState, option];
                            } else {
                              return prevState.filter(item => item !== option);
                            }
                          })
                        } // Обробка зміни
                      />
                      <span
                        className={styles.periodOfLimitsCheckboxSpan}
                      ></span>
                    </label>
                    <p
                      className={styles.periodOfLimitsSubtitle}
                      onClick={() => {
                        const isSelected = selectedTargetRoles.includes(option);
                        setSelectedTargetRoles(prevState => {
                          if (!isSelected) {
                            return [...prevState, option];
                          } else {
                            return prevState.filter(item => item !== option);
                          }
                        });
                      }} // Обробник кліку на текст
                    >
                      {option}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>

        <li className={limitsScopeStyles.limitsScopeItem}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
          <div className={limitsScopeStyles['dropdown-container']}>
            <button
              className={limitsScopeStyles['dropdown-button']}
              onClick={() => setIsOpenChannels(!isOpenChannels)}
            >
              {selectedTargetChannels.length > 0
                ? selectedTargetChannels.join(', ')
                : 'Цільові канали'}
              <span className={limitsScopeStyles['dropdown-arrow']}>▼</span>
            </button>
            {isOpenChannels && (
              <ul className={limitsScopeStyles['dropdown-list']}>
                {options.map((option, index) => (
                  <li
                    key={index}
                    className={limitsScopeStyles['dropdown-item']}
                  >
                    <label className={styles.periodOfLimitsCheckboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedTargetChannels.includes(option)}
                        onChange={evt =>
                          setSelectedTargetChannels(prevState => {
                            if (evt.target.checked) {
                              return [...prevState, option];
                            } else {
                              return prevState.filter(item => item !== option);
                            }
                          })
                        }
                      />
                      <span
                        className={styles.periodOfLimitsCheckboxSpan}
                      ></span>
                    </label>
                    <p
                      className={styles.periodOfLimitsSubtitle}
                      onClick={() => {
                        const isSelected =
                          selectedTargetChannels.includes(option);
                        setSelectedTargetChannels(prevState => {
                          if (!isSelected) {
                            return [...prevState, option];
                          } else {
                            return prevState.filter(item => item !== option);
                          }
                        });
                      }} // Обробник кліку на текст
                    >
                      {option}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>

        {/* <li className={limitsScopeStyles.limitsScopeItem}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
          <div className={limitsScopeStyles['dropdown-container']}>
            <button
              className={limitsScopeStyles['dropdown-button']}
              onClick={() => setIsOpenChannels(!isOpenChannels)}
            >
              {selectedTargetChannels}
              <span className={limitsScopeStyles['dropdown-arrow']}>▼</span>
            </button>
            {isOpenChannels && (
              <ul className={limitsScopeStyles['dropdown-list']}>
                {options.map((option, index) => (
                  <li
                    key={index}
                    className={limitsScopeStyles['dropdown-item']}
                    onClick={() => {
                      setSelectedTargetChannels(option);
                      setIsOpenChannels(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li> */}
      </ul>
    </div>
  );
};

export default PeriodOfLimits;

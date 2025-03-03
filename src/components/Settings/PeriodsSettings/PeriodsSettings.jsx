import s from './PeriodsSettings.module.css';
import Shadow from '../../Shadow/Shadow';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import flatpickr from 'flatpickr';
import LimitsScope from 'components/LimitsScope/LimitsScope';
import {
  selectSettingsTextChannels,
  selectSettingsVoiceChannels,
  selectSettingsRoles,
} from '../../../redux/settings/selectors';

export const PeriodsSettings = ({
  id,
  thisStartDate,
  thisEndDate,
  thisCountOfXP,
  onSubmitChanges,
  onDelete,
  thisTargetRoles,
  thisTargetChannels,
  thisMessages,
  thisVoice,
  thisStage,
  thisBoosts,
  thisType,
}) => {
  const textChannels = useSelector(selectSettingsTextChannels);
  const voiceChannels = useSelector(selectSettingsVoiceChannels);
  const channels = [...textChannels, ...voiceChannels];
  const roles = useSelector(selectSettingsRoles);
  const [startDate, setStartDate] = useState(
    thisStartDate === null ? '' : thisStartDate.slice(0, 10)
  );
  const [endDate, setEndDate] = useState(
    thisEndDate === null ? '' : thisEndDate.slice(0, 10)
  );
  const [requireEndDate, setRequireEndDate] = useState(thisEndDate);
  const [requireStartDate, setRequireStartDate] = useState(thisStartDate);
  // const [ta, setStartDateStr] = useState(thisTargetRoles);
  // const [endDateStr, setEndDateStr] = useState(thisTargetChannels);
  const [countOfXP, setCountOfXP] = useState(thisCountOfXP);
  // const [disabled, setDisabled] = useState(thisDisabled);
  const [isIgnoreAdmins, setIsIgnoreAdmins] = useState(false);
  const [isOpenRoles, setIsOpenRoles] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState(
    roles.filter(role => thisTargetRoles.some(cur => role.id === cur))
  );
  const [isOpenChannels, setIsOpenChannels] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState(
    channels.filter(role => thisTargetChannels.some(cur => role.id === cur))
  );
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(thisMessages);
  const [voice, setVoice] = useState(thisVoice);
  const [stage, setStage] = useState(thisStage);
  const [boosts, setBoosts] = useState(thisBoosts);
  console.log('requireStartDate', requireStartDate);

  const onCheckbox = (type) => {
   if(type === 'messages') {
     setMessages(!messages);
   } else if(type === 'voice') {
     setVoice(!voice);
   }else if(type === 'stage') {
     setStage(!stage);
   } else if(type === 'boosts') {
     setBoosts(!boosts);
   }  
  };

  flatpickr('#start', {
    dateFormat: 'd/m/y',
    disableMobile: true,
    minDate: 'today',
    // locale: 'uk',
    // allowInput: true,
    onChange: (selectedDates, dateStr) => {
      setStartDate(dateStr);
      // console.log('selectedDates', selectedDates);
      const date = new Date(selectedDates[0]);
      setRequireStartDate(date.toJSON());
      // setStartDateStr(dateStr);
    },
  });

  flatpickr('#end', {
    dateFormat: 'd/m/y',
    disableMobile: true,
    minDate: 'today',
    // locale: 'uk',
    // allowInput: true,
    onChange: (selectedDates, dateStr) => {
      setEndDate(dateStr);
      const date = new Date(selectedDates[0]);
      setRequireEndDate(date.toJSON());
      // console.log(date.toJSON());
    },
  });

  const onChennelChoose = channel => {
    let newArray = [];

    if (selectedChannels.includes(channel)) {
      newArray = selectedChannels.filter(el => {
        const fltr = Object.values(el).includes(channel.id);
        console.log('fltr', fltr);
        return !fltr;
      });
    } else {
      newArray = [channel, ...selectedChannels];
    }
    console.log('new:', newArray);
    setSelectedChannels(newArray);
  };

  const onRoleChoose = role => {
    let newArray = [];
    if (selectedRoles.includes(role)) {
      newArray = selectedRoles.filter(el => {
        const fltr = Object.values(el).includes(role.id);
        console.log('fltr', fltr);
        return !fltr;
      });
    } else {
      newArray = [role, ...selectedRoles];
    }

    console.log('new:', newArray);
    setSelectedRoles(newArray);
  };

  const onSubmitClick = () => {
    onSubmitChanges(
      requireStartDate,
      requireEndDate,
      countOfXP,
      id,
      selectedChannels,
      selectedRoles,
      messages,
      voice,
      stage,
      boosts
    );
  };
  // const
  return (
    <>
      {isOpen ? (
        <div className={s['container']}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--chart-accent-color)'}
            borderColorBoth={'var(--border-accent-color)'}
          />
          <button
            type="button"
            className={s['close-button']}
            onClick={evt => setIsOpen(false)}
          >
            ◄
          </button>
          <p className={s['subtitle']}>Період видачі ХР</p>
          <div className={s['date-subcountainer']}>
            <div className={s['date-countainer']}>
              <p>З</p>
              <label className={s[`date-label`]}>
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
                  className={s['date-input']}
                  // disabled={disabled}
                  type="text"
                  autocomplete="off"
                  name="start"
                  id="start"
                  value={startDate}
                  readOnly={true}
                  placeholder="DD/MM/YYYY"
                />
              </label>
              <p>до</p>
              <label className={s[`date-label`]}>
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
                  className={s['date-input']}
                  // disabled={disabled}
                  type="text"
                  autocomplete="off"
                  name="end"
                  id="end"
                  readOnly={true}
                  value={endDate}
                  placeholder="DD/MM/YYYY"
                />
              </label>
            </div>

            {/* <div className={s['checkbox-container']}>
            <label className={s.limitsScopesCheckboxLabel}>
              <input type="checkbox" onChange={onCheckbox} checked={disabled} />
              <span className={s.limitsScopesCheckboxSpan}></span>
            </label>
            <p className={s.limitsScopeSubtitle}>Необмежений</p>
          </div> */}
          </div>

          <p className={s['subtitle']}>Кількість ХР</p>
          <label className={s['count-label']}>
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
              className={s['count-input']}
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
          {thisType === 'xp' && <div>
            <p className={s['subtitle']}>На що впливає</p>
            <ul className={s['list']}>
            <li>
              <div className={s['checkbox-container']}>
                <label className={s.limitsScopesCheckboxLabel}>
                  <input
                    type="checkbox"
                    onChange={evt => onCheckbox('messages')}
                    checked={messages}
                  />
                  <span className={s.limitsScopesCheckboxSpan}></span>
                </label>
                <p className={s.limitsScopeSubtitle}>Повідомлення</p>
              </div>
            </li>
            <li>
              <div className={s['checkbox-container']}>
                <label className={s.limitsScopesCheckboxLabel}>
                  <input
                    type="checkbox"
                    onChange={evt => onCheckbox('voice')}
                    checked={voice}
                  />
                  <span className={s.limitsScopesCheckboxSpan}></span>
                </label>
                <p className={s.limitsScopeSubtitle}>Голосові канали</p>
              </div>
            </li>
            <li>
              <div className={s['checkbox-container']}>
                <label className={s.limitsScopesCheckboxLabel}>
                  <input
                    type="checkbox"
                    onChange={evt => onCheckbox('stage')}
                    checked={stage}
                  />
                  <span className={s.limitsScopesCheckboxSpan}></span>
                </label>
                <p className={s.limitsScopeSubtitle}>Трибуну</p>
              </div>
            </li>
            <li>
              <div className={s['checkbox-container']}>
                <label className={s.limitsScopesCheckboxLabel}>
                  <input
                    type="checkbox"
                    onChange={evt => onCheckbox('boosts')}
                    checked={boosts}
                  />
                  <span className={s.limitsScopesCheckboxSpan}></span>
                </label>
                <p className={s.limitsScopeSubtitle}>Бусти</p>
              </div>
            </li>
          </ul>
          </div>}
          
          <div className={s.subcountainer}>
            <p className={s['subtitle']}>
              Область дії видачі ХР за певний період
            </p>
            <div className={s.limitsScopeAdminBox}>
              <label className={s.limitsScopesCheckboxLabel}>
                <input
                  type="checkbox"
                  onChange={evt => {
                    setIsIgnoreAdmins(evt.target.checked);
                  }}
                />
                <span className={s.limitsScopesCheckboxSpan}></span>
              </label>
              <p className={s.limitsScopeSubtitle}>
                Не поширювати на Адміністраторів і Модераторів
              </p>
            </div>
            <ul className={s.limitsScopeList}>
              <li className={s.limitsScopeItem}>
                <Shadow
                  leftFirst={-7}
                  widthFirst={5}
                  heightSecond={5}
                  rightSecond={3}
                  bottomSecond={-7}
                  backgroundBoth={'var(--shadow-secondary-border)'}
                  borderColorBoth={'var(--chart-accent-color)'}
                />
                <div className={s['dropdown-container']}>
                  <button
                    className={s['dropdown-button']}
                    onClick={() => setIsOpenRoles(!isOpenRoles)}
                  >
                    {selectedRoles.length > 0
                      ? selectedRoles.map(ch => ch.name).join('; ').length > 40
                        ? `${selectedRoles
                            .map(ch => ch.name)
                            .join('; ')
                            .slice(0, 40)}...`
                        : selectedRoles.map(ch => ch.name).join('; ')
                      : 'Цільові ролі'}
                    <span className={s['dropdown-arrow']}>
                      {isOpenRoles ? '▼' : '◄'}
                    </span>
                  </button>
                  {isOpenRoles && (
                    <ul className={s['dropdown-list']}>
                      {roles.map((option, index) => (
                        <li key={index} className={s['dropdown-item']}>
                          <div className={s.limitsScopeBox}>
                            <label className={s.limitsScopesCheckboxLabel}>
                              <input
                                type="checkbox"
                                onChange={() => {
                                  onRoleChoose(option);
                                }}
                                checked={selectedRoles.includes(option)}
                              />
                              <span
                                className={s.limitsScopesCheckboxSpan}
                              ></span>
                            </label>
                            <p className={s.limitsScopeSubtitle}>
                              {option.name}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
              <li className={s.limitsScopeItem}>
                <Shadow
                  leftFirst={-7}
                  widthFirst={5}
                  heightSecond={5}
                  rightSecond={3}
                  bottomSecond={-7}
                  backgroundBoth={'var(--shadow-secondary-border)'}
                  borderColorBoth={'var(--chart-accent-color)'}
                />
                <div className={s['dropdown-container']}>
                  <button
                    className={s['dropdown-button']}
                    onClick={() => setIsOpenChannels(!isOpenChannels)}
                  >
                    {selectedChannels.length > 0
                      ? selectedChannels.map(ch => ch.name).join('; ').length >
                        40
                        ? `${selectedChannels
                            .map(ch => ch.name)
                            .join('; ')
                            .slice(0, 40)}...`
                        : selectedChannels.map(ch => ch.name).join('; ')
                      : 'Цільові канали'}
                    <span className={s['dropdown-arrow']}>
                      {isOpenChannels ? '▼' : '◄'}
                    </span>
                  </button>
                  {isOpenChannels && (
                    <ul className={s['dropdown-list']}>
                      {channels.map((option, index) => (
                        <li key={index} className={s['dropdown-item']}>
                          <div className={s.limitsScopeBox}>
                            <label className={s.limitsScopesCheckboxLabel}>
                              <input
                                type="checkbox"
                                onChange={() => {
                                  onChennelChoose(option);
                                }}
                                checked={selectedChannels.includes(option)}
                              />
                              <span
                                className={s.limitsScopesCheckboxSpan}
                              ></span>
                            </label>
                          </div>
                          <p className={s.limitsScopeSubtitle}>{option.name}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </div>
          <div>
            <button
              type="button"
              className={s['confirm-changes-button']}
              onClick={onSubmitClick}
            >
              Підтвердити зміни
            </button>
          </div>

          <button
            type="button"
            className={s['delete-button']}
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
      ) : (
        <div className={s['closed-container']}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--chart-accent-color)'}
            borderColorBoth={'var(--border-accent-color)'}
          />
          <button
            type="button"
            className={s['close-button']}
            onClick={evt => setIsOpen(true)}
          >
            ▼
          </button>
          <p>
            Видача з {startDate ? startDate : '___'} до{' '}
            {endDate ? endDate : '___'}{' '}
          </p>
          <button
            type="button"
            className={s['second-delete-button']}
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
      )}
    </>
  );
};

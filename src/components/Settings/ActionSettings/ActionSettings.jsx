

import Shadow from "components/Shadow/Shadow";
import s from "./ActionSettings.module.css";



import {
  selectSettingsTextChannels,
  selectSettingsVoiceChannels,
  selectSettingsRoles,
} from '../../../redux/settings/selectors';


import 'react-toastify/dist/ReactToastify.css';
import CustomDropdown from "../CustomDropdown";
import { ScrollableNumbers } from "./ScrollableNumbers";
import { useSelector } from "react-redux";
import { useStateManager } from "react-select";
import { useEffect, useState } from "react";

const padNumber = (num) => String(num).padStart(2, "0");

export const ActionSettings = ({
  onDaysChange,
  onHoursChange,
  onMinutesChange,
  onSelectedActionChange,
  onIsCheckedAdminChange,
  onIsDeleteMessageChange,
  onIsDeleteMessage,
  onSelectedAction,
  onDays,
  onHours,
  onMinutes,
  onIsCheckedAdmin,
  onThisTargetRoles,
  onThisTargetChannels,
  onSetTargetRoles,
  onSetTargetChannels,
  thisTargetRoles,
  thisTargetChannels
}
) => {
  const textChannels = useSelector(selectSettingsTextChannels);
  const voiceChannels = useSelector(selectSettingsVoiceChannels);
  const channels = [...textChannels, ...voiceChannels];
  const roles = useSelector(selectSettingsRoles);

  const [isOpenRoles, setIsOpenRoles] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState(
    roles.filter(role => onThisTargetRoles.some(cur => role.id === cur))
  );
  const [isOpenChannels, setIsOpenChannels] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState(
    channels.filter(role => onThisTargetChannels.some(cur => role.id === cur))
  );
  useEffect(() => {
    setSelectedRoles(roles.filter(role => onThisTargetRoles.includes(role.id)));
  }, [onThisTargetRoles, roles]);

  useEffect(() => {
    const newSelectedChannels = channels.filter(channel => onThisTargetChannels.includes(channel.id));

    // Перевіряємо, чи значення дійсно змінилося перед встановленням стану
    if (JSON.stringify(newSelectedChannels) !== JSON.stringify(selectedChannels)) {
      setSelectedChannels(newSelectedChannels);
    }
  }, [onThisTargetChannels, channels]);

  // 🎭 Функція для вибору ролей
  const onRoleChoose = role => {
    let newArray = selectedRoles.some(el => el.id === role.id)
      ? selectedRoles.filter(el => el.id !== role.id) // Видаляємо роль, якщо вона вибрана
      : [...selectedRoles, role]; // Додаємо нову роль

    setSelectedRoles(newArray);
    onSetTargetRoles(newArray.map(el => el.id)); // Оновлюємо в батьківському компоненті
  };

  // 🎤 Функція для вибору каналів
  const onChennelChoose = channel => {
    
    let newArray = selectedChannels.some(el => el.id === channel.id)
      ? selectedChannels.filter(el => el.id !== channel.id) // Видаляємо канал
      : [...selectedChannels, channel]; // Додаємо канал
   
    setSelectedChannels(newArray);
    onSetTargetChannels(newArray.map(el => el.id)); // Оновлюємо в батьківському компоненті
  };

  
  console.log('voiceChannels', voiceChannels);















  // Обробка зміни чекбокса для адміністраторів
  const handleCheckboxChangeAdmin = (event) => {
    onIsCheckedAdminChange(event.target.checked); // Встановлення стану для чекбокса
  };
  const handleCheckboxChange = () => {
    onIsDeleteMessageChange(!onIsDeleteMessage); // Перемикання стану чекбокса для видалення повідомлень
  };
  const handleSelectChange = (selectedOption) => {
    onSelectedActionChange(selectedOption?.value || 'null'); // Змінення вибору дії

  };


  const options = [
    { value: 'null', label: 'Немає', color: 'var(--text-color)' },
    { value: 'warning', label: 'Видати попередження', color: 'var(--text-color)' },
    { value: 'mute', label: 'Заглушити', color: 'var(--text-color)' },
    { value: 'muteWarning', label: 'Заглушити + Видати попередження', color: 'var(--text-color)' },
  ];


  return (

    <div className={s.BadWordActionContainer}>
      <Shadow
        leftFirst={-7}
        widthFirst={5}
        heightSecond={5}
        rightSecond={3}
        bottomSecond={-7}
        backgroundBoth={'#6EABD4'}
        borderColorBoth={'#558DB2'}
      />
      <h3 className={s.TitleAction}>Налаштування дії</h3>

      <div className={s.ActionSelectContainer}>

        <CustomDropdown
          options={options}
          placeholder="Оберіть дію"
          onChange={handleSelectChange}
          value={options.find(option => option.value === onSelectedAction)} // Початкове значення
        />
        <div className={s.ContainerCheckBoxAction}>
          <label className={s.CustomCheckbox}>
            <input
              type="checkbox"
              checked={onIsDeleteMessage}
              onChange={handleCheckboxChange}
            />
            <span className={s.CheckboxMark}></span>
            Видалити повідомлення з порушенням
          </label>
        </div>
      </div>
      <h3 className={s.TitleAction}>Час дії</h3>
      <div className={s.NumbersContainer}>
        <ScrollableNumbers maxNumber={31} label="Дні" value={onDays} onChange={onDaysChange} />
        <ScrollableNumbers maxNumber={23} label="Години" value={onHours} onChange={onHoursChange} />
        <ScrollableNumbers maxNumber={59} label="Хвилини" value={onMinutes} onChange={onMinutesChange} />
        <div>
          <svg className={s.Decor} width="200" height="40" viewBox="0 0 183 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1H183" stroke="#ACD0D6" stroke-dasharray="6 6" />
          </svg>
        </div>
        <p className={s.TotalNumber}>{`${padNumber(onDays)} днів, ${padNumber(onHours)} годин, ${padNumber(onMinutes)} хвилин`}</p>
      </div>
      <div className={s.subcountainer}>
        <h3 className={s.TitleAction}>Область дії</h3>
        {/* <div className={s.limitsScopeAdminBox}>
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
            </div> */}
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
    </div>


  )
}
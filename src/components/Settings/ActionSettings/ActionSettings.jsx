

import Shadow from "components/Shadow/Shadow";
import styles from "./ActionSettings.module.css";



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
import { useState } from "react";

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
    onThisTargetChannels
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
    const onChennelChoose = channel => {
        let newArray = selectedChannels.includes(channel)
            ? selectedChannels.filter(el => el.id !== channel.id)
            : [channel, ...selectedChannels];

        setSelectedChannels(newArray);
    };

    const onRoleChoose = role => {
        let newArray = selectedRoles.includes(role)
            ? selectedRoles.filter(el => el.id !== role.id)
            : [role, ...selectedRoles];

        setSelectedRoles(newArray);
    };















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
    ];
    return (

        <div className={styles.BadWordActionContainer}>
            <Shadow
                leftFirst={-7}
                widthFirst={5}
                heightSecond={5}
                rightSecond={3}
                bottomSecond={-7}
                backgroundBoth={'#6EABD4'}
                borderColorBoth={'#558DB2'}
            />
            <h3 className={styles.TitleAction}>Налаштування дії</h3>

            <div className={styles.ActionSelectContainer}>

                <CustomDropdown
                    options={options}
                    placeholder="Оберіть дію"
                    onChange={handleSelectChange}
                    value={options.find(option => option.value === onSelectedAction)} // Початкове значення
                />
                <div className={styles.ContainerCheckBoxAction}>
                    <label className={styles.CustomCheckbox}>
                        <input
                            type="checkbox"
                            checked={onIsDeleteMessage}
                            onChange={handleCheckboxChange}
                        />
                        <span className={styles.CheckboxMark}></span>
                        Видалити повідомлення з порушенням
                    </label>
                </div>
            </div>
            <h3 className={styles.TitleAction}>Час дії</h3>
            <div className={styles.NumbersContainer}>
                <ScrollableNumbers maxNumber={31} label="Дні" value={onDays} onChange={onDaysChange} />
                <ScrollableNumbers maxNumber={23} label="Години" value={onHours} onChange={onHoursChange} />
                <ScrollableNumbers maxNumber={59} label="Хвилини" value={onMinutes} onChange={onMinutesChange} />
                <div>
                    <svg className={styles.Decor} width="200" height="40" viewBox="0 0 183 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1H183" stroke="#ACD0D6" stroke-dasharray="6 6" />
                    </svg>
                </div>
                <p className={styles.TotalNumber}>{`${padNumber(onDays)} днів, ${padNumber(onHours)} годин, ${padNumber(onMinutes)} хвилин`}</p>
            </div>
            <h3 className={styles.TitleAction}>Область дії</h3>
            <div className={styles.ContainerCheckBoxAction2}>
                <label className={styles.CustomCheckbox}>
                    <input
                        type="checkbox"
                        checked={onIsCheckedAdmin}
                        onChange={handleCheckboxChangeAdmin}
                    />
                    <span className={styles.CheckboxMark}></span>
                    Не поширювати на Адміністраторів і Модераторів
                </label>
            </div>
            <ul className={styles.limitsScopeList}>
                <li className={styles.limitsScopeItem}>
                    <Shadow
                        leftFirst={-7}
                        widthFirst={5}
                        heightSecond={5}
                        rightSecond={3}
                        bottomSecond={-7}
                        backgroundBoth={'var(--shadow-secondary-border)'}
                        borderColorBoth={'var(--chart-accent-color)'}
                    />
                    <div className={styles['dropdown-container']}>
                        <button
                            className={styles['dropdown-button']}
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
                            <span className={styles['dropdown-arrow']}>
                                {isOpenRoles ? '▼' : '◄'}
                            </span>
                        </button>
                        {isOpenRoles && (
                            <ul className={styles['dropdown-list']}>
                                {roles.map((option, index) => (
                                    <li key={index} className={styles['dropdown-item']}>
                                        <div className={styles.limitsScopeBox}>
                                            <label className={styles.limitsScopesCheckboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => {
                                                        onRoleChoose(option);
                                                    }}
                                                    checked={selectedRoles.includes(option)}
                                                />
                                                <span
                                                    className={styles.limitsScopesCheckboxSpan}
                                                ></span>
                                            </label>
                                            <p className={styles.limitsScopeSubtitle}>
                                                {option.name}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </li>
                <li className={styles.limitsScopeItem}>
                    <Shadow
                        leftFirst={-7}
                        widthFirst={5}
                        heightSecond={5}
                        rightSecond={3}
                        bottomSecond={-7}
                        backgroundBoth={'var(--shadow-secondary-border)'}
                        borderColorBoth={'var(--chart-accent-color)'}
                    />
                    <div className={styles['dropdown-container']}>
                        <button
                            className={styles['dropdown-button']}
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
                            <span className={styles['dropdown-arrow']}>
                                {isOpenChannels ? '▼' : '◄'}
                            </span>
                        </button>
                        {isOpenChannels && (
                            <ul className={styles['dropdown-list']}>
                                {channels.map((option, index) => (
                                    <li key={index} className={styles['dropdown-item']}>
                                        <div className={styles.limitsScopeBox}>
                                            <label className={styles.limitsScopesCheckboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => {
                                                        onChennelChoose(option);
                                                    }}
                                                    checked={selectedChannels.includes(option)}
                                                />
                                                <span
                                                    className={styles.limitsScopesCheckboxSpan}
                                                ></span>
                                            </label>
                                        </div>
                                        <p className={styles.limitsScopeSubtitle}>{option.name}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </li>
            </ul>
        </div>


    )
}
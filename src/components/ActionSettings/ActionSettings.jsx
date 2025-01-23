

import Shadow from "components/Shadow/Shadow";
import styles from "./ActionSettings.module.css";






import 'react-toastify/dist/ReactToastify.css';
import CustomDropdown from "./CustomDropdown";
import { ScrollableNumbers } from "./ScrollableNumbers";

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
    onIsCheckedAdmin
}
) => {
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

        </div>


    )
}
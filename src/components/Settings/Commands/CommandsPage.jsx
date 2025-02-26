import { useDispatch, useSelector } from "react-redux";
import { SettingsNavigation } from "../SettingsNavigation/SettingsNavigation";
import { useNavigate } from "react-router-dom";
import styles from './Commands.module.css';
import Shadow from "components/Shadow/Shadow";
import { useEffect, useState } from "react";
import { fetchSettings, PatchSettings } from "../../../redux/settings/operation";
import { UnsavedChangesModal } from "../BadWord/UnsavedChangesModal";

export const CommandsPage = () => {
    const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState('cry');
    const options = ['cry', 'hug', 'highfive', 'nope', 'pat', 'poke', 'slap', 'wave', 'wink'];
    const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState(false); // Стан для модального вікна невнесених змін
    const { data: settings, loading, error } = useSelector((state) => state.settings); // Отримання налаштувань з Redux
    // Ініціалізація рівнів нулем для кожної команди
    const [commandLevels, setCommandLevels] = useState(() => {
        return options.reduce((acc, command) => {
            acc[command] = 0; // Початкове значення рівня - 0
            return acc;
        }, {});
    });
    const commandsDescriptions = {
        cry: "Ця команда надає змогу поплакати в чаті, якщо хочеться ＞︿＜",
        highfive: "Ця команда дозволяє подати п’ять учаснику для вираження підтримки (　＾＾)人(＾＾　)",
        hug: "Ця команда дозволяє обійняти учасника в чаті ⸜(｡˃ ᵕ ˂ )⸝♡",
        nope: "Ця команда дозволяє виразити незгоду з думкою іншого учасника (`ε´)",
        pat: "Ця команда дозволяє погладити учасника, що заслужив увагу (*^.^*)",
        poke: "Ця команда дає можливість тицьнути учасника для привернення уваги (｡- .•)",
        slap: "Ця команда дозволяє дати ляпаса учаснику, якщо це необхідно (ヽ（≧□≦）ノ)",
        wave: "Ця команда дозволяє привітати учасника в чаті (*＾▽＾)／",
        wink: "Ця команда дозволяє підморгнути учаснику для вираження дружнього жесту (｡•̀ᴗ-)"
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (settings?.settings?.funCommands) {
            setCommandLevels(prevLevels => {
                const newLevels = { ...prevLevels };
                Object.keys(newLevels).forEach(command => {
                    newLevels[command] = settings.settings.funCommands[`${command}Lvl`] ?? 0;
                });
                return newLevels;
            });
        }
    }, [settings]);

    const handleLevelChange = (event) => {
        const newValue = event.target.value;

        setCommandLevels(prevLevels => ({
            ...prevLevels,
            [selectedActivity]: newValue === '' ? '' : Number(newValue)
        }));
    };

    const handleActivityChange = (option) => {
        setSelectedActivity(option);
        setIsActivityDropdownOpen(false);
    };
    const handleSave = () => {
        const formattedLevels = Object.entries(commandLevels).reduce((acc, [command, level]) => {
            acc[`${command}Lvl`] = level;
            return acc;
        }, {});

        dispatch(
            PatchSettings({
                settings: {
                    funCommands: formattedLevels
                },
            })
        ).then(() => {
            // localStorage.setItem('toastMessage', 'Дані збережено!'); // Збереження повідомлення у локальне сховище

            // setTimeout(() => {
            //     localStorage.removeItem('toastMessage'); // Видалення повідомлення через 5 секунд

            navigate("/settings"); // Перенаправлення на сторінку налаштувань

        });
    };

    // Функція для збереження змін у модальному вікні


    // Обробка видалення слова зі списку

    const handleBackClick = () => {
        // Перетворюємо стейт у формат, який використовуємо у БД
        const formattedLevels = Object.entries(commandLevels).reduce((acc, [command, level]) => {
            acc[`${command}Lvl`] = level;
            return acc;
        }, {});

        // Перевіряємо, чи відрізняються збережені дані від поточного стейту
        const hasChanges = Object.keys(formattedLevels).some(key =>
            formattedLevels[key] !== (settings?.settings?.funCommands?.[key] ?? 0)
        );

        if (hasChanges) {
            setIsUnsavedModalOpen(true); // Відкриваємо модальне вікно
        } else {
            navigate("/settings"); // Перенаправлення, якщо змін немає
        }

    };

    const handleDiscardChanges = () => {
        setIsUnsavedModalOpen(false);
        navigate("/settings"); // Переход на сторінку налаштувань
    };
    return (
        <section>
            <SettingsNavigation
                onHandleBackClick={handleBackClick}
                onHandleSave={handleSave}
            />
            <div className={styles.Container}>
                <h1 className={styles.TitleBadWords}>Команди</h1>
                <div className={styles.FromContainer}>
                    <Shadow leftFirst={-7} widthFirst={5} heightSecond={5} rightSecond={3} bottomSecond={-7} backgroundBoth={'#6EABD4'} borderColorBoth={'#558DB2'} />
                    <p className={styles['subtitle']}>Назви команд</p>
                    <div className={styles['dropdown-display']}>
                        <Shadow leftFirst={-7} widthFirst={5} heightSecond={5} rightSecond={3} bottomSecond={-7} backgroundBoth={'var(--shadow-secondary-border)'} borderColorBoth={'var( --shadow-settings-border)'} />
                        <button className={styles['dropdown-button']} onClick={() => setIsActivityDropdownOpen(!isActivityDropdownOpen)}>
                            {selectedActivity} <span className={styles['dropdown-arrow']}>{isActivityDropdownOpen ? '◄' : '▼'}</span>
                        </button>
                        {isActivityDropdownOpen && (
                            <ul className={styles['dropdown-list']}>
                                {options.map((option, index) => (
                                    <li key={index} className={styles['dropdown-item']} onClick={() => handleActivityChange(option)}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className={styles.FromContainer2}>
                    <Shadow leftFirst={-7} widthFirst={5} heightSecond={5} rightSecond={3} bottomSecond={-7} backgroundBoth={'#6EABD4'} borderColorBoth={'#558DB2'} />
                    <p className={styles['subtitle']}>Опис команди</p>
                    <p className={styles.CommandsDescriptions}>{commandsDescriptions[selectedActivity]}</p>

                    <p className={styles['subtitle-2']}>Рівень доступу</p>
                    <div className={styles.FromContainer3}>
                        <input
                            type="text"
                            value={commandLevels[selectedActivity] === 0 ? (commandLevels[selectedActivity] === '' ? '' : 0) : commandLevels[selectedActivity]}
                            onChange={handleLevelChange}
                            className={styles.InputInsideContainer}
                            placeholder="Введіть рівень..."
                        />
                        <Shadow leftFirst={-8} widthFirst={5} heightSecond={5} rightSecond={4} bottomSecond={-8} backgroundBoth={'var(--shadow-secondary-border)'} borderColorBoth={'var(--chart-accent-color)'} />
                    </div>
                </div>
            </div>
            {isUnsavedModalOpen && (
                <UnsavedChangesModal onClose={handleDiscardChanges} onSave={handleSave} />
            )}
        </section>
    );
};

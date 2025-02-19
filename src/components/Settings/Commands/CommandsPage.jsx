import { useDispatch, useSelector } from "react-redux";
import { SettingsNavigation } from "../SettingsNavigation/SettingsNavigation"
import { useNavigate } from "react-router-dom";
import styles from './Commands.module.css'
import Shadow from "components/Shadow/Shadow";
import { useEffect, useState } from "react";
import { fetchSettings, PatchSettings } from "../../../redux/settings/operation";








export const CommandsPage = () => {

    const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState('cry');

    const options = ['cry', 'hug', 'highfive', 'nope', 'pat', 'poke', 'slap', 'wave', 'wink'];
    const { data: settings, loading, error } = useSelector((state) => state.settings);

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

    // Об'єднуємо рівні доступу та затримку в один об'єкт
    const [commandSettings, setCommandSettings] = useState({
        levels: {
            cry: null,
            highfive: null,
            hug: null,
            nope: null,
            pat: null,
            poke: null,
            slap: null,
            wave: null,
            wink: null,
        },
        inputDelay: 0
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    useEffect(() => {
        if (settings?.settings?.funCommands) {
            setCommandSettings({
                levels: {
                    cry: settings.settings.funCommands.cryLvl,
                    highfive: settings.settings.funCommands.highfiveLvl,
                    hug: settings.settings.funCommands.hugLvl,
                    nope: settings.settings.funCommands.nopeLvl,
                    pat: settings.settings.funCommands.patLvl,
                    poke: settings.settings.funCommands.pokeLvl,
                    slap: settings.settings.funCommands.slapLvl,
                    wave: settings.settings.funCommands.waveLvl,
                    wink: settings.settings.funCommands.winkLvl,
                },
                inputDelay: settings.settings.funCommands[selectedActivity + "Lvl"] || 0
            });
        }
    }, [settings, selectedActivity]);

    const handleSave = () => {
        const funCommands = {
            winkLvl: commandSettings.levels.wink,
            cryLvl: commandSettings.levels.cry,
            patLvl: commandSettings.levels.pat,
            nopeLvl: commandSettings.levels.nope,
            waveLvl: commandSettings.levels.wave,
            highfiveLvl: commandSettings.levels.highfive,
            hugLvl: commandSettings.levels.hug,
            pokeLvl: commandSettings.levels.poke,
            slapLvl: commandSettings.levels.slap
        };

        dispatch(
            PatchSettings({
                settings: { funCommands },
            })
        ).then(() => {
            navigate("/settings");
        }).catch((error) => {
            console.error("Помилка збереження даних:", error);
        });
    };

    const handleBackClick = (e) => {
        e.preventDefault();
        navigate("/settings");
    };

    const handleActivityChange = (activity) => {
        setSelectedActivity(activity);
        setCommandSettings(prevState => ({
            ...prevState,
            inputDelay: prevState.levels[activity] || 0 // Оновлюємо inputDelay після зміни активності
        }));
        setIsActivityDropdownOpen(false);
    };

    const handleInputChange = (e) => {
        const newLevel = e.target.value;

        setCommandSettings(prevState => ({
            ...prevState,
            inputDelay: newLevel, // Оновлюємо inputDelay
            levels: {
                ...prevState.levels,
                [selectedActivity]: newLevel // Оновлюємо рівень для вибраної активності
            }
        }));
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
                    <Shadow
                        leftFirst={-7}
                        widthFirst={5}
                        heightSecond={5}
                        rightSecond={3}
                        bottomSecond={-7}
                        backgroundBoth={'#6EABD4'}
                        borderColorBoth={'#558DB2'}
                    />
                    <p className={styles['subtitle']}>Назви команд</p>
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
                                        onClick={() => handleActivityChange(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className={styles.FromContainer2}>
                    <Shadow
                        leftFirst={-7}
                        widthFirst={5}
                        heightSecond={5}
                        rightSecond={3}
                        bottomSecond={-7}
                        backgroundBoth={'#6EABD4'}
                        borderColorBoth={'#558DB2'}
                    />
                    <p className={styles['subtitle']}>Опис команди</p>
                    <p>{commandsDescriptions[selectedActivity]}</p>

                    <p className={styles['subtitle-2']}>Рівень доступу</p>
                    <div className={styles.InputContainer}>
                        <input
                            type="number"
                            value={commandSettings.inputDelay}
                            onChange={handleInputChange}
                            className={styles.InputInsideContainer}
                            placeholder="Введіть число..."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
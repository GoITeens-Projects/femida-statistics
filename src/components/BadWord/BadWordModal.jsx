import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../redux/settings/operation"; // Дія для отримання налаштувань
import { badWord } from "../../redux/badword/operation"; // Дія для збереження нових слів
import styles from "./BadWord.module.css";
import * as monaco from "monaco-editor";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Shadow from "components/Shadow/Shadow";
import { MdDeleteForever } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { CodeEditor } from "./CodeEditor";
import { Modal } from "./ModalCodeEditor";
import { UnsavedChangesModal } from "./UnsavedChangesModal";
import { ScrollableNumbers } from "./ScrollableNumbers";


import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomDropdown from "./CustomDropdown";




const padNumber = (num) => String(num).padStart(2, "0");


export const BadWordPage = () => {


    const [days, setDays] = useState(0); // Стан для днів
    const [hours, setHours] = useState(0); // Стан для годин
    const [minutes, setMinutes] = useState(0); // Стан для хвилин
    const [selectedAction, setSelectedAction] = useState("null"); // Стан для вибору дії
    const [isCheckedAdmin, setIsChecked] = useState(false); // Стан для перевірки адмінських прав
    const [isDeleteMessage, setIsDeleteMessage] = useState(false); // Стан для видалення повідомлень








    const [inputValue, setInputValue] = useState(""); // Стан для введення тексту
    const [editorInstance, setEditorInstance] = useState(null); // Стан для посилання на редактор коду
    const [isModalOpen, setIsModalOpen] = useState(false); // Стан для відкриття/закриття модального вікна
    const dispatch = useDispatch(); // Диспетчер Redux
    const { data: settings, loading, error } = useSelector((state) => state.settings); // Отримання налаштувань з Redux



    const [addedWords, setAddedWords] = useState([]); // Список доданих слів
    const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState(false); // Стан для модального вікна невнесених змін



    const [isCheckedNotifyUser, setIsCheckedNotifyUser] = useState(false); // Стан для повідомлення користувача

    const handleChangeNotifyUser = (e) => {
        setIsCheckedNotifyUser(e.target.checked); // Обробка зміни чекбокса "Повідомляти учасника"
    };

    // Функція для розпарсингу часу з мілісекунд
    const parseMuteTime = (timeInMs) => {
        const totalMinutes = Math.floor(timeInMs / 60000);
        const days = Math.floor(totalMinutes / (24 * 60));
        const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
        const minutes = totalMinutes % 60;

        return { days, hours, minutes };
    };

    // Обробка зміни чекбокса для адміністраторів
    const handleCheckboxChangeAdmin = (event) => {
        setIsChecked(event.target.checked); // Встановлення стану для чекбокса
    };
    const handleCheckboxChange = () => {
        setIsDeleteMessage(!isDeleteMessage); // Перемикання стану чекбокса для видалення повідомлень
    };
    const handleSelectChange = (selectedOption) => {
        setSelectedAction(selectedOption?.value || 'null'); // Змінення вибору дії
    };
    const navigate = useNavigate(); // Для ручного перенаправлення

    // Завантаження налаштувань при рендері компонента
    useEffect(() => {
        dispatch(fetchSettings()); // Виклик дії для завантаження налаштувань
    }, [dispatch]);

    // Оновлення доданих слів при змінах налаштувань
    useEffect(() => {
        if (settings?.settings?.badwords?.words) {
            setAddedWords(settings.settings.badwords.words);
        }
    }, [settings]);

    // Встановлення слів з addedWords у редактор при відкритті
    useEffect(() => {
        if (editorInstance) {
            editorInstance.setValue(addedWords.join("\n")); // Заповнення редактора поточними словами
        }
    }, [addedWords, editorInstance]);

    // Встановлення часу дії з налаштувань при рендері компонента
    useEffect(() => {
        if (settings?.settings?.badwords?.actions?.mute?.muteTimeMs) {
            const { days, hours, minutes } = parseMuteTime(
                settings.settings.badwords.actions.mute.muteTimeMs
            );
            setDays(days);
            setHours(hours);
            setMinutes(minutes);
        }
        if (settings?.settings?.badwords?.actions) {
            const { enabled, giveWarn, deleteMsg, ignoreAdmins, notifyUser } = settings.settings.badwords.actions;

            setSelectedAction(enabled ? 'mute' : giveWarn ? 'warning' : 'null'); // Встановлення вибору дії
            setIsDeleteMessage(!!deleteMsg); // Встановлення стану для видалення повідомлень
            setIsChecked(!!ignoreAdmins); // Встановлення стану для адміністраторів
            setIsCheckedNotifyUser(notifyUser); // Встановлення стану для повідомлення користувача
        }
    }, [settings]);

    // Обробка натискання клавіші Enter для додавання слова
    const handleInputKeyPress = (event) => {
        if (event.key === "Enter" && inputValue.trim()) {
            setAddedWords((prevWords) => [...prevWords, inputValue.trim()]);
            setInputValue(""); // Очищення inputValue після додавання
        }
    };

    // Обробка збереження налаштувань
    const handleSave = () => {
        const muteTimeMs = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000; // Розрахунок часу муту у мілісекундах

        const isMuteEnabled = selectedAction === "mute";
        const isGiveWarn = selectedAction === "warning";

        dispatch(
            badWord({
                settings: {
                    badwords: {
                        words: addedWords,
                        actions: {
                            mute: {
                                enabled: isMuteEnabled,
                                muteTimeMs,
                            },
                            giveWarn: isGiveWarn,
                            deleteMsg: isDeleteMessage,
                            ignoreAdmins: isCheckedAdmin,
                            notifyUser: isCheckedNotifyUser,
                        },
                    },
                },
            })
        ).then(() => {
            localStorage.setItem('toastMessage', 'Дані збережено!'); // Збереження повідомлення у локальне сховище

            setTimeout(() => {
                localStorage.removeItem('toastMessage'); // Видалення повідомлення через 5 секунд
            }, 5000);
            navigate("/settings"); // Перенаправлення на сторінку налаштувань
        });
    };

    // Функція для збереження змін у модальному вікні
    const handleSaveModal = () => {
        if (editorInstance) {
            const content = editorInstance.getValue();
            const updatedBadWords = content
                .split("\n")
                .map((word) => word.trim())
                .filter(Boolean);

            setAddedWords(updatedBadWords); // Оновлення доданих слів
        }

        setTimeout(() => {
            setIsModalOpen(false); // Закриття модального вікна
        }, 300);
    };

    // Обробка видалення слова зі списку
    const handleDeleteWord = (word) => {
        setAddedWords((prevWords) => prevWords.filter((w) => w !== word));
    };
    const handleBackClick = (e) => {
        // Перевірка на зміни перед переходом
        const isMuteEnabledChanged = settings?.settings?.badwords?.actions?.mute?.enabled !== (selectedAction === "mute");
        const muteTimeMs = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000;
        const isWordsChanged = JSON.stringify(settings?.settings?.badwords?.words) !== JSON.stringify(addedWords);
        const isMuteTimeChanged = settings?.settings?.badwords?.actions?.mute?.muteTimeMs !== muteTimeMs;
        const isActionChanged = settings?.settings?.badwords?.actions?.selectedAction !== selectedAction;
        const isGiveWarnChanged = settings?.settings?.badwords?.actions?.giveWarn !== (selectedAction === "warning");
        const isDeleteMsgChanged = settings?.settings?.badwords?.actions?.deleteMsg !== isDeleteMessage;
        const isCheckedAdminChanged = settings?.settings?.badwords?.actions?.ignoreAdmins !== isCheckedAdmin;
        const isCheckedNotifyUserChanged = settings?.settings?.badwords?.actions?.notifyUser !== isCheckedNotifyUser;

        if (isWordsChanged || isMuteEnabledChanged || isMuteTimeChanged || isActionChanged || isGiveWarnChanged || isDeleteMsgChanged || isCheckedAdminChanged || isCheckedNotifyUserChanged) {
            setIsUnsavedModalOpen(true); // Відкриття модального вікна невнесених змін
        } else {
            navigate("/settings");
        }
    };

    const handleDiscardChanges = () => {
        setIsUnsavedModalOpen(false);
        navigate("/settings"); // Переход на сторінку налаштувань
    };

    const options = [
        { value: 'null', label: 'Немає', color: 'var(--text-color)' },
        { value: 'warning', label: 'Видати попередження', color: 'var(--text-color)' },
        { value: 'mute', label: 'Заглушити', color: 'var(--text-color)' },
    ];

    // if (loading) return <p>Завантаження...</p>;
    // if (error) return <p>Помилка: {error}</p>;
    return (
        <section>
            <div className={styles.ConatinerNavigation}>
                <button onClick={handleBackClick} className={styles.ExitButton}><svg width="8" height="10" viewBox="0 0 4 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 1L1 3L3 5" stroke="#678F95" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>Назад</button>
                <button onClick={handleSave} className={styles.SaveButton}>
                    Зберегти
                </button>
            </div>


            <div className={styles.Container}>
                <h1 className={styles.TitleBadWords}>Погані слова</h1>

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
                    <label className={styles.LabelFormBadWords} >Налаштування фільтрування</label>

                    <div className={styles.InputContainer}>

                        <div className={styles.WordCards}>
                            {addedWords.slice(0, 10).map((word, index) => ( // Забезпечуємо відображення максимум 10 карток
                                <div key={index} className={styles.WordCard}>
                                    {word}
                                    <svg
                                        className={styles.DeleteIcon}
                                        onClick={() => handleDeleteWord(word)}
                                        width="25"
                                        height="25"
                                        viewBox="0 0 6 6"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.5 4.49976L4.49996 1.49979"
                                            stroke="#678F95"
                                            strokeWidth="0.5"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M4.5 4.49976L1.50004 1.49979"
                                            stroke="#678F95"
                                            strokeWidth="0.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            ))}
                            {/* Умовний рендеринг іконки */}
                            {addedWords.length > 10 && (
                                <div className={styles.BadWordListContainer} onClick={() => setIsModalOpen(true)}>
                                    <p className={styles.BadWordListText} onClick={() => setIsModalOpen(true)}>+ ще {addedWords.length - 10}</p>
                                    <CiBoxList
                                        onClick={() => setIsModalOpen(true)}
                                        className={styles.IconBoxList}
                                    />
                                </div>
                            )}
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleInputKeyPress}
                                className={styles.InputInsideContainer}
                                placeholder="Введіть слово..."
                            />
                        </div>
                    </div>




                </div>

                <div className={styles.SliderContainer}>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={isCheckedNotifyUser}
                            onChange={handleChangeNotifyUser}
                        />
                        <span className={`${styles.slider} ${styles.round}`}></span>
                    </label>
                    <p className={styles.SliderText}>Повідомляти учасника про порушення</p>

                </div>



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
                            value={options.find(option => option.value === selectedAction)} // Початкове значення
                        />
                        <div className={styles.ContainerCheckBoxAction}>
                            <label className={styles.CustomCheckbox}>
                                <input
                                    type="checkbox"
                                    checked={isDeleteMessage}
                                    onChange={handleCheckboxChange}
                                />
                                <span className={styles.CheckboxMark}></span>
                                Видалити повідомлення з порушенням
                            </label>
                        </div>
                    </div>
                    <h3 className={styles.TitleAction}>Час дії</h3>
                    <div className={styles.NumbersContainer}>
                        <ScrollableNumbers maxNumber={31} label="Дні" value={days} onChange={setDays} />
                        <ScrollableNumbers maxNumber={23} label="Години" value={hours} onChange={setHours} />
                        <ScrollableNumbers maxNumber={59} label="Хвилини" value={minutes} onChange={setMinutes} />
                        <div>
                            <svg className={styles.Decor} width="200" height="40" viewBox="0 0 183 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 1H183" stroke="#ACD0D6" stroke-dasharray="6 6" />
                            </svg>
                        </div>
                        <p className={styles.TotalNumber}>{`${padNumber(days)} днів, ${padNumber(hours)} годин, ${padNumber(minutes)} хвилин`}</p>
                    </div>
                    <h3 className={styles.TitleAction}>Область дії</h3>
                    <div className={styles.ContainerCheckBoxAction2}>
                        <label className={styles.CustomCheckbox}>
                            <input
                                type="checkbox"
                                checked={isCheckedAdmin}
                                onChange={handleCheckboxChangeAdmin}
                            />
                            <span className={styles.CheckboxMark}></span>
                            Не поширювати на Адміністраторів і Модераторів
                        </label>
                    </div>

                </div>







                {/* <CodeEditor
                    value={settings?.badwords?.words?.join("\n") || ""}
                    setEditorInstance={setEditorInstance}
                /> */}
                {/* Модальне вікно */}

                {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)} onSave={handleSaveModal}>
                        <h2 className={styles.TitleBadWords}>Редагування поганих слів</h2>
                        <CodeEditor
                            value={settings?.settings?.badwords?.words?.join("\n") || ""}
                            setEditorInstance={setEditorInstance}
                        />
                    </Modal>
                )}
                {isUnsavedModalOpen && (
                    <UnsavedChangesModal onClose={handleDiscardChanges} onSave={handleSave} />
                )}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </section>
    );
};

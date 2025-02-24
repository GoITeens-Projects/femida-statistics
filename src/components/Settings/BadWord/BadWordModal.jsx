import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../../redux/settings/operation"; // Дія для отримання налаштувань
import { PatchSettings } from "../../../redux/settings/operation"; // Дія для збереження нових слів
import styles from "./BadWord.module.css";
import * as monaco from "monaco-editor";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Shadow from "components/Shadow/Shadow";

import { CiBoxList } from "react-icons/ci";
import { CodeEditor } from "./CodeEditor";
import { Modal } from "./ModalCodeEditor";
import { UnsavedChangesModal } from "./UnsavedChangesModal";



import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { SettingsNavigation } from "../SettingsNavigation/SettingsNavigation";
import { ActionSettings } from "../ActionSettings/ActionSettings";
import { FormContainer } from "../FormContainer.jsx/FormContainer";







export const BadWordPage = () => {


    const [days, setDays] = useState(0); // Стан для днів
    const [hours, setHours] = useState(0); // Стан для годин
    const [minutes, setMinutes] = useState(0); // Стан для хвилин
    const [selectedAction, setSelectedAction] = useState("null"); // Стан для вибору дії
    const [isCheckedAdmin, setIsChecked] = useState(false); // Стан для перевірки адмінських прав
    const [isDeleteMessage, setIsDeleteMessage] = useState(false); // Стан для видалення повідомлень



    // форм стейти
    const [addedWords, setAddedWords] = useState([]); // Список доданих слів
    const [inputValue, setInputValue] = useState(""); // Стан для введення тексту
    const handleDeleteWord = (word) => {
        setAddedWords((prevWords) => prevWords.filter((w) => w !== word));
    };
    const [isModalOpen, setIsModalOpen] = useState(false); // Стан для відкриття/закриття модального вікна









    const navigate = useNavigate(); // Для ручного перенаправлення


    const [editorInstance, setEditorInstance] = useState(null); // Стан для посилання на редактор коду

    const dispatch = useDispatch(); // Диспетчер Redux
    const { data: settings, loading, error } = useSelector((state) => state.settings); // Отримання налаштувань з Redux




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

            const isMuteEnabled = settings?.settings?.spam?.actions?.mute?.enabled;
            const isGiveWarnEnabled = settings?.settings?.spam?.actions?.giveWarn;

            if (isMuteEnabled) {
                setSelectedAction('mute');
            } else if (isGiveWarnEnabled) {
                setSelectedAction('warning');
            } else {
                setSelectedAction('null');
            }
            setIsDeleteMessage(!!deleteMsg); // Встановлення стану для видалення повідомлень
            setIsChecked(!!ignoreAdmins); // Встановлення стану для адміністраторів
            setIsCheckedNotifyUser(notifyUser.enabled); // Встановлення стану для повідомлення користувача
        }
    }, [settings]);

    // Обробка збереження налаштувань
    const handleSave = () => {
        const muteTimeMs = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000; // Розрахунок часу муту у мілісекундах

        const isMuteEnabled = selectedAction === "mute";
        const isGiveWarn = selectedAction === "warning";

        dispatch(
            PatchSettings({
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
                            notifyUser: {
                                enabled: isCheckedNotifyUser,
                                messageFn: JSON.stringify((username) => `${username}! якийсь текст`),
                            },
                        },
                    },
                },
            })
        ).then(() => {
            // localStorage.setItem('toastMessage', 'Дані збережено!'); // Збереження повідомлення у локальне сховище

            // setTimeout(() => {
            //     localStorage.removeItem('toastMessage'); // Видалення повідомлення через 5 секунд

            navigate("/settings"); // Перенаправлення на сторінку налаштувань
            toast.success("Дані збережено!", {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });
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

    const handleBackClick = (e) => {
        e.preventDefault();




        const muteTimeMs = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000;

        const isWordsChanged = JSON.stringify(settings?.settings?.badwords?.words) !== JSON.stringify(addedWords);
        const isMuteTimeChanged = settings?.settings?.badwords?.actions?.mute?.muteTimeMs !== muteTimeMs;
        const isGiveWarnChanged = settings?.settings?.badwords?.actions?.giveWarn !== (selectedAction === "warning");
        const isDeleteMsgChanged = settings?.settings?.badwords?.actions?.deleteMsg !== isDeleteMessage;
        const isCheckedAdminChanged = settings?.settings?.badwords?.actions?.ignoreAdmins !== isCheckedAdmin;
        const isCheckedNotifyUserChanged = settings?.settings?.badwords?.actions?.notifyUser?.enabled !== isCheckedNotifyUser;



        if (isWordsChanged || isMuteTimeChanged || isGiveWarnChanged || isDeleteMsgChanged || isCheckedAdminChanged || isCheckedNotifyUserChanged) {
            setIsUnsavedModalOpen(true); // Відкриття модального вікна невнесених змін

        } else {

            navigate("/settings");
        }
    };

    const handleDiscardChanges = () => {
        setIsUnsavedModalOpen(false);
        navigate("/settings"); // Переход на сторінку налаштувань
    };

    console.log(selectedAction);



    // if (loading) return <p>Завантаження...</p>;
    // if (error) return <p>Помилка: {error}</p>;
    return (
        <section>


            <SettingsNavigation
                onHandleBackClick={handleBackClick}
                onHandleSave={handleSave}
            />
            <div className={styles.Container}>
                <h1 className={styles.TitleBadWords}>Погані слова</h1>

                <FormContainer
                    addedWords={addedWords} // Передача списку слів
                    inputValue={inputValue} // Передача значення інпуту
                    onInputChange={setInputValue} // Передача функції для оновлення інпуту
                    onAddWord={(word) => setAddedWords((prev) => [...prev, word.trim()])} // Передача функції для додавання слова
                    onHandleDeleteWord={handleDeleteWord} // Передача функції видалення слова
                    onOpenModal={() => setIsModalOpen(true)} // Відкрити модальне вікно
                />


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





                <ActionSettings
                    onDaysChange={setDays}
                    onHoursChange={setHours}
                    onMinutesChange={setMinutes}
                    onSelectedActionChange={setSelectedAction}
                    onIsCheckedAdminChange={setIsChecked}
                    onIsDeleteMessageChange={setIsDeleteMessage}
                    onIsDeleteMessage={isDeleteMessage}
                    onSelectedAction={selectedAction}
                    onDays={days}
                    onHours={hours}
                    onMinutes={minutes}
                    onIsCheckedAdmin={isCheckedAdmin}

                />




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






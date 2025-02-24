import { useDispatch, useSelector } from "react-redux";
import { SettingsNavigation } from "../SettingsNavigation/SettingsNavigation"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Spam.module.css'
import Shadow from "components/Shadow/Shadow";
import { UnsavedChangesModal } from "../BadWord/UnsavedChangesModal";
import { ActionSettings } from "../ActionSettings/ActionSettings";
import { fetchSettings, PatchSettings } from "../../../redux/settings/operation";
import TextEditor from "../TextEditor/TextEditor";
export const SpamPage = () => {
    const [days, setDays] = useState(0); // Стан для днів
    const [hours, setHours] = useState(0); // Стан для годин
    const [minutes, setMinutes] = useState(0); // Стан для хвилин
    const [selectedAction, setSelectedAction] = useState("null"); // Стан для вибору дії
    const [isCheckedAdmin, setIsChecked] = useState(false); // Стан для перевірки адмінських прав
    const [isDeleteMessage, setIsDeleteMessage] = useState(false); // Стан для видалення повідомлень

    const { data: settings, loading, error } = useSelector((state) => state.settings); // Отримання налаштувань з Redux

    const [content, setContent] = useState(""); // Стейт для збереження вмісту редактора


    const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState(false); // Стан для модального вікна невнесених змін
    const dispatch = useDispatch(); // Диспетчер Redux
    const navigate = useNavigate(); // Для ручного перенаправлення

    const [inputValue, setInputValue] = useState(""); // Стан для введення тексту
    const [inputValueDelay, setInputValueDelay] = useState(1); // Стан для введення тексту
    const [isSequence, setSequence] = useState(false); // Стан для перевірки адмінських прав

    const [isResetSpam, setResetSpam] = useState(false); // Стан для перевірки адмінських прав
    const handleCheckboxChangeSequence = (event) => {
        setSequence(event.target.checked); // Встановлення стану для чекбокса
    };
    const handleCheckboxChangeReset = (event) => {
        setResetSpam(event.target.checked); // Встановлення стану для чекбокса
    };

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

    useEffect(() => {
        if (settings?.settings?.spam?.actions?.mute?.muteTimeMs) {
            const { days, hours, minutes } = parseMuteTime(
                settings.settings.spam.actions.mute.muteTimeMs
            );
            setDays(days);
            setHours(hours);
            setMinutes(minutes);
        }

        if (settings?.settings?.spam?.actions) {
            const {
                enabled,
                giveWarn,
                deleteMsg,
                ignoreAdmins,
                notifyUser,
                deleteTimeoutMs
            } = settings.settings.spam.actions;

            const isMuteEnabled = settings?.settings?.spam?.actions?.mute?.enabled;
            const isGiveWarnEnabled = settings?.settings?.spam?.actions?.giveWarn;

            if (isMuteEnabled) {
                setSelectedAction('mute');
            } else if (isGiveWarnEnabled) {
                setSelectedAction('warning');
            } else {
                setSelectedAction('null');
            }
            setIsDeleteMessage(!!deleteMsg);
            setIsChecked(!!ignoreAdmins);
            setIsCheckedNotifyUser(notifyUser.enabled);
        }

        if (settings?.settings?.spam?.messagesLimit !== undefined) {
            setInputValue(settings.settings.spam.messagesLimit);
        }
        if (settings?.settings?.spam?.resetCounter !== undefined) {
            setResetSpam(settings.settings.spam.resetCounter);
        }

    }, [settings]);

    const isFirstLoad = useRef(true);
    useEffect(() => {

        if (settings?.settings?.spam?.actions?.notifyUser?.deleteTimeoutMs) {
            const newValue = settings?.settings?.spam?.actions?.notifyUser?.deleteTimeoutMs / 1000;


            if (isFirstLoad.current) {
                setInputValueDelay(newValue); // Записуємо значення при першому завантаженні
                isFirstLoad.current = false;
            }
        }
    }, [settings]);

    const handleSave = () => {
        const muteTimeMs = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000; // Розрахунок часу муту у мілісекундах

        const isMuteEnabled = selectedAction === "mute";
        const isGiveWarn = selectedAction === "warning";

        dispatch(
            PatchSettings({
                settings: {
                    spam: {
                        actions: {
                            mute: {
                                enabled: isMuteEnabled,
                                muteTimeMs,
                            },
                            notifyUser: {
                                enabled: isCheckedNotifyUser,
                                messageFn: content,
                                deleteTimeoutMs: parseInt(inputValueDelay) * 1000 || 0, // Конвертація введеного часу видалення
                            },
                            giveWarn: isGiveWarn,
                            deleteMsg: isDeleteMessage,
                            ignoreAdmins: isCheckedAdmin,
                        },
                        messagesLimit: inputValue,
                        resetCounter: isResetSpam
                    },
                },
            })
        ).then(() => {

            navigate("/settings"); // Перенаправлення на сторінку налаштувань
        });
    };


    const handleBackClick = (e) => {
        e.preventDefault();
        // Перевірка на зміни перед переходом
        const muteTimeMs = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000;

        const isMuteTimeChanged = settings?.settings?.spam?.actions?.mute?.muteTimeMs !== muteTimeMs;
        const isGiveWarnChanged = settings?.settings?.spam?.actions?.giveWarn !== (selectedAction === "warning");
        const isDeleteMsgChanged = settings?.settings?.spam?.actions?.deleteMsg !== isDeleteMessage;
        const isCheckedAdminChanged = settings?.settings?.spam?.actions?.ignoreAdmins !== isCheckedAdmin;
        // const isCheckedNotifyUserChanged = settings?.settings?.spam?.actions?.notifyUser?.enabled !== isCheckedNotifyUser;
        const isDeleteTimeoutChanged = settings?.settings?.spam?.actions?.notifyUser?.deleteTimeoutMs !== (parseInt(inputValueDelay) * 1000 || 0);
        const isSequenceChanged = settings?.settings?.spam?.actions?.sequence !== isSequence;
        const isResetSpamChanged = settings?.settings?.spam?.actions?.resetCounter !== isResetSpam;

        if (
            isMuteTimeChanged ||
            isGiveWarnChanged ||
            isDeleteMsgChanged ||
            isCheckedAdminChanged ||
            isDeleteTimeoutChanged
        ) {
            setIsUnsavedModalOpen(true); // Відкриття модального вікна невнесених змін
        } else {
            navigate("/settings");
        }
    };


    const handleDiscardChanges = () => {
        setIsUnsavedModalOpen(false);
        navigate("/settings"); // Переход на сторінку налаштувань
    };

    console.log("редактор", content);

    return (<>

        <section>
            <SettingsNavigation
                onHandleBackClick={handleBackClick}
                onHandleSave={handleSave}
            />




            <div className={styles.Container}>
                <h1 className={styles.TitleBadWords}>Повторний текст</h1>
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
                    <label className={styles.LabelFormBadWords}>Кількість однакових повідомлень</label>
                    <div className={styles.FromContainer2}>



                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}

                            placeholder="Введіть число..."
                        />


                        <Shadow
                            leftFirst={-8}
                            widthFirst={5}
                            heightSecond={5}
                            rightSecond={4}
                            bottomSecond={-8}
                            backgroundBoth={'var(--shadow-secondary-border)'}
                            borderColorBoth={'var(--chart-accent-color)'}
                        />
                    </div >

                    <div className={styles.ContainerCheckBoxAction1}>
                        <label className={styles.CustomCheckbox}>
                            <input
                                type="checkbox"
                                checked={isSequence}
                                onChange={handleCheckboxChangeSequence}
                            />
                            <span className={styles.CheckboxMark}></span>
                            Враховувати тільки послідовні повідомлення
                        </label>
                    </div>


                    <div className={styles.ContainerCheckBoxAction2}>
                        <label className={styles.CustomCheckbox}>
                            <input
                                type="checkbox"
                                checked={isResetSpam}
                                onChange={handleCheckboxChangeReset}
                            />
                            <span className={styles.CheckboxMark}></span>
                            Скидати лічильник спаму після спрацьовування
                        </label>
                    </div>







                </div>
                {/* <div className={styles.FromContainer}>


                    <label className={styles.LabelFormBadWords}>Кількість однакових повідомлень</label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}

                        placeholder="Введіть число..."
                    />


                    <Shadow
                        leftFirst={-8}
                        widthFirst={5}
                        heightSecond={5}
                        rightSecond={4}
                        bottomSecond={-8}
                        backgroundBoth={'var(--shadow-secondary-border)'}
                        borderColorBoth={'var(--chart-accent-color)'}
                    />
                </div > */}

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

                    <label className={styles.LabelFormBadWords}>Затримка видалення повідомлення</label>

                    <div className={styles.FromContainer2}>



                        <input
                            type="number"
                            value={inputValueDelay}
                            onChange={(e) => setInputValueDelay(e.target.value)}


                            placeholder="Введіть число..."
                        />


                        <Shadow
                            leftFirst={-8}
                            widthFirst={5}
                            heightSecond={5}
                            rightSecond={4}
                            bottomSecond={-8}
                            backgroundBoth={'var(--shadow-secondary-border)'}
                            borderColorBoth={'var(--chart-accent-color)'}
                        />
                        <p className={styles.Sec} >сек.</p>
                    </div >









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

                <TextEditor onChange={setContent} initialContent={settings?.settings?.spam?.actions?.notifyUser?.messageFn || ""} />
            </div>

            {isUnsavedModalOpen && (
                <UnsavedChangesModal onClose={handleDiscardChanges} onSave={handleSave} />
            )}
        </section>
    </>)
}
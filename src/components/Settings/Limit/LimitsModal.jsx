import { useState } from "react";
import { UnsavedChangesModal } from "../BadWord/UnsavedChangesModal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SettingsNavigation } from "../SettingsNavigation/SettingsNavigation";
import styles from "./Limits.module.css";
import Shadow from "components/Shadow/Shadow";
export const LimitsPage = () => {

    const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState(false); // Стан для модального вікна невнесених змін
    const dispatch = useDispatch(); // Диспетчер Redux
    const navigate = useNavigate(); // Для ручного перенаправлення
    const handleSave = () => {
        // const muteTimeMs = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000; // Розрахунок часу муту у мілісекундах

        // const isMuteEnabled = selectedAction === "mute";
        // const isGiveWarn = selectedAction === "warning";

        dispatch(
            // badWord({
            //     settings: {
            //         badwords: {
            //             words: addedWords,
            //             actions: {
            //                 mute: {
            //                     enabled: isMuteEnabled,
            //                     muteTimeMs,
            //                 },
            //                 giveWarn: isGiveWarn,
            //                 deleteMsg: isDeleteMessage,
            //                 ignoreAdmins: isCheckedAdmin,
            //                 notifyUser: {
            //                     enabled: isCheckedNotifyUser,
            //                     messageFn: JSON.stringify((username) => `${username}! якийсь текст`),
            //                 },
            //             },
            //         },
            //     },
            // })
        ).then(() => {
            localStorage.setItem('toastMessage', 'Дані збережено!'); // Збереження повідомлення у локальне сховище

            setTimeout(() => {
                localStorage.removeItem('toastMessage'); // Видалення повідомлення через 5 секунд
            }, 5000);
            navigate("/settings"); // Перенаправлення на сторінку налаштувань
        });
    };


    const handleBackClick = (e) => {
        // Перевірка на зміни перед переходом

        // const muteTimeMs = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000;
        // const isWordsChanged = JSON.stringify(settings?.settings?.badwords?.words) !== JSON.stringify(addedWords);
        // const isMuteTimeChanged = settings?.settings?.badwords?.actions?.mute?.muteTimeMs !== muteTimeMs;

        // const isGiveWarnChanged = settings?.settings?.badwords?.actions?.giveWarn !== (selectedAction === "warning");
        // const isDeleteMsgChanged = settings?.settings?.badwords?.actions?.deleteMsg !== isDeleteMessage;
        // const isCheckedAdminChanged = settings?.settings?.badwords?.actions?.ignoreAdmins !== isCheckedAdmin;
        // const isCheckedNotifyUserChanged = settings?.settings?.badwords?.actions?.notifyUser !== isCheckedNotifyUser;

        // if (isWordsChanged || isMuteTimeChanged || isGiveWarnChanged || isDeleteMsgChanged || isCheckedAdminChanged || isCheckedNotifyUserChanged) {
        //     setIsUnsavedModalOpen(true); // Відкриття модального вікна невнесених змін
        // } else {
        //     navigate("/settings");
        // }
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
                <h1 className={styles.TitleBadWords}>Ліміти</h1>
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






                </div>
            </div>
            {isUnsavedModalOpen && (
                <UnsavedChangesModal onClose={handleDiscardChanges} onSave={handleSave} />
            )}
        </section>
    )
}
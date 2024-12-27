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


export const BadWordPage = () => {
    const [inputValue, setInputValue] = useState(""); // Поле для вводу
    const [editorInstance, setEditorInstance] = useState(null); // Посилання на редактор
    const [isModalOpen, setIsModalOpen] = useState(false); // Стан модального вікна
    const dispatch = useDispatch();
    const { data: settings, loading, error } = useSelector((state) => state.settings);
    const [addedWords, setAddedWords] = useState([]);
    const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState(false);
    const navigate = useNavigate(); // Для ручного перенаправлення
    // Завантаження налаштувань
    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    useEffect(() => {
        if (settings?.settings?.badwords?.words) {
            setAddedWords(settings.settings.badwords.words);
        }
    }, [settings]);

    useEffect(() => {
        if (editorInstance) {
            // Встановлюємо слова з addedWords в редактор при відкритті
            editorInstance.setValue(addedWords.join("\n"));
        }
    }, [addedWords, editorInstance]);

    const handleInputKeyPress = (event) => {
        if (event.key === "Enter" && inputValue.trim()) {
            setAddedWords((prevWords) => [...prevWords, inputValue.trim()]);
            setInputValue("");
        }
    };
    const handleSave = () => {
        // Відправляємо список addedWords в БД
        dispatch(badWord({ settings: { badwords: { words: addedWords } } })).then(() => {
            console.log("Слова збережено у БД:", addedWords);
            navigate("/settings");
        });
    };

    // Функція для заміни слів в addedWords з редактора
    const handleSaveModal = () => {
        if (editorInstance) {
            const content = editorInstance.getValue();
            const updatedBadWords = content
                .split("\n")
                .map((word) => word.trim())
                .filter(Boolean);

            // Оновлюємо список слів в addedWords
            setAddedWords(updatedBadWords);
        }

        // Закриваємо модалку через 300 мс після збереження
        setTimeout(() => {
            setIsModalOpen(false); // Закриваємо модалку
        }, 300); // Затримка 300 мс
    };
    console.log(addedWords);
    const handleDeleteWord = (word) => {
        setAddedWords((prevWords) => prevWords.filter((w) => w !== word));
    };
    const handleBackClick = (e) => {
        // Перевіряємо, чи були зміни
        if (JSON.stringify(settings?.settings?.badwords?.words) !== JSON.stringify(addedWords)) {

            setIsUnsavedModalOpen(true); // Відкриваємо модалку
        } else {
            navigate("/settings");
        }
    };
    const handleDiscardChanges = () => {
        setIsUnsavedModalOpen(false);
        navigate("/settings"); // Перенаправляємо на settings
    };

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


                    <div className={styles.ContainerCheckBox}>
                        <label className={styles.CustomCheckbox}>

                            <input
                                type="checkbox"
                            // checked={checkedFullWords}
                            // onChange={() => setCheckedFullWords(!checkedFullWords)}
                            />
                            <span className={styles.CheckboxMark}></span>
                            Шукати тільки повні слова
                        </label>

                        <label className={styles.CustomCheckbox}>
                            <input
                                type="checkbox"
                            // checked={checkedCase}
                            // onChange={() => setCheckedCase(!checkedCase)}
                            />
                            <span className={styles.CheckboxMark}></span>
                            Не враховувати реєстр
                        </label>
                    </div>

                </div>

                <div className={styles.SliderContainer}>
                    <label className={styles.switch}>

                        <input
                            type="checkbox"


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

        </section>
    );
};

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../redux/settings/operation"; // Дія для отримання налаштувань
import { badWord } from "../../redux/badword/operation"; // Дія для збереження нових слів
import styles from "./BadWord.module.css";
import * as monaco from "monaco-editor";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Shadow from "components/Shadow/Shadow";

export const CodeEditor = ({ value, setEditorInstance }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        // Отримуємо збережену тему з localStorage
        const savedTheme = localStorage.getItem("theme");
        // Встановлюємо тему редактора на основі значення
        const editorTheme = savedTheme === "light" ? "vs" : "vs-dark";

        // Створюємо інстанс редактора
        const editor = monaco.editor.create(editorRef.current, {
            value: value || "",
            language: "plaintext",
            theme: editorTheme,
            automaticLayout: true,
            minimap: { enabled: false },
        });

        // Передаємо редактор через колбек
        setEditorInstance(editor);

        // Очищення ресурсу при розмонтуванні
        return () => {
            editor.dispose();
        };
    }, [value, setEditorInstance]);

    return <div ref={editorRef} className={styles.EditorContainer}></div>;
};




const Modal = ({ children, onClose }) => {
    return (
        <div className={styles.ModalOverlay} onClick={onClose}>
            <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};




















export const BadWordPage = () => {
    const [inputValue, setInputValue] = useState(""); // Поле для вводу
    const [editorInstance, setEditorInstance] = useState(null); // Посилання на редактор
    const [isModalOpen, setIsModalOpen] = useState(false); // Стан модального вікна
    const dispatch = useDispatch();
    const { data: settings, loading, error } = useSelector((state) => state.settings);
    const [addedWords, setAddedWords] = useState([]);

    // Завантаження налаштувань
    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    useEffect(() => {
        if (settings?.settings?.badwords?.words) {
            setAddedWords(settings.settings.badwords.words);
        }
    }, [settings, editorInstance]);

    const handleInputKeyPress = (event) => {
        if (event.key === "Enter" && inputValue.trim()) {
            if (editorInstance) {
                const currentContent = editorInstance.getValue();
                editorInstance.setValue(`${currentContent}\n${inputValue.trim()}`.trim());
            }
            setAddedWords((prevWords) => [...prevWords, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleSave = () => {
        if (editorInstance) {
            const content = editorInstance.getValue();
            const updatedBadWords = content
                .split("\n")
                .map((word) => word.trim())
                .filter(Boolean);

            dispatch(badWord({ settings: { badwords: { words: updatedBadWords } } })).then(() => {
                console.log("Слова збережено у БД:", updatedBadWords);
            });
        }
    };

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>Помилка: {error}</p>;


    return (
        <section>
            <div className={styles.ConatinerNavigation}>
                <Link className={styles.ExitButton} to="/settings"><svg width="8" height="10" viewBox="0 0 4 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 1L1 3L3 5" stroke="#678F95" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                    Назад</Link>
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

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleInputKeyPress}
                        className={styles.InputBadWord}
                        placeholder="Введіть слово..."
                    />


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

                {/* <CodeEditor
                    value={settings?.badwords?.words?.join("\n") || ""}
                    setEditorInstance={setEditorInstance}
                /> */}
                {/* Модальне вікно */}
                <button onClick={() => setIsModalOpen(true)} className={styles.OpenModalButton}>
                    Відкрити редактор
                </button>
                {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)}>
                        <h2>Редагування поганих слів</h2>
                        <CodeEditor
                            value={settings?.settings?.badwords?.words?.join("\n") || ""}
                            setEditorInstance={setEditorInstance}
                        />
                        <button onClick={handleSave} className={styles.SaveButton}>
                            Зберегти
                        </button>
                        <button onClick={() => setIsModalOpen(false)} className={styles.CloseButton}>
                            Закрити
                        </button>
                    </Modal>
                )}
            </div>

        </section>
    );
};

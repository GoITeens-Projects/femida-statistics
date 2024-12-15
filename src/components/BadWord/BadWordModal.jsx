import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { badWord } from "../../redux/badword/operation";
import styles from "./BadWord.module.css";
import { IoMdClose } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { MdOutlineSaveAs } from "react-icons/md";
import * as monaco from "monaco-editor";

export const CodeEditor = ({ onConfirm, value }) => {
    const editorRef = useRef(null);
    const [editorInstance, setEditorInstance] = useState(null);

    useEffect(() => {
        const editor = monaco.editor.create(editorRef.current, {
            value: value || "",
            language: "plaintext",
            theme: "vs-dark",
            automaticLayout: true,
            minimap: { enabled: false },
            suggest: { showWords: false },
        });

        setEditorInstance(editor);

        return () => {
            editor.dispose();
        };
    }, []);

    useEffect(() => {
        if (editorInstance) {
            editorInstance.setValue(value || "");
        }
    }, [value, editorInstance]);

    const handleConfirm = () => {
        if (editorInstance) {
            const content = editorInstance.getValue();
            onConfirm(content);
        }
    };

    return (
        <div>
            <div ref={editorRef} className={styles.editorContainer}></div>
            <button onClick={handleConfirm} className={styles.confirmButton}>
                Підтвердити текст
            </button>
        </div>
    );
};

export const Modal = ({ onClose }) => {
    const [inputValue, setInputValue] = useState("");
    const [badWordsList, setBadWordsList] = useState([]); // Один список для всіх слів
    const [newBadWordsList, setnewBadWordsList] = useState([]);
    const [isClosing, setIsClosing] = useState(false);
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const dispatch = useDispatch();
    const { data: settings } = useSelector((state) => state.settings);

    const badWords = settings?.settings?.badwords?.words || [];

    // Синхронізація стану badWordsList з badWords тільки один раз
    useEffect(() => {
        if (!isInitialized && badWords.length > 0) {
            setBadWordsList(badWords);
            setIsInitialized(true);
        }
    }, [badWords, isInitialized]);

    useEffect(() => {
        console.log("Оновлений список слів (через інпут):", newBadWordsList);
    }, [newBadWordsList]);

    const handleAddWord = () => {
        if (!inputValue.trim()) return;
        console.log(inputValue);

        if (!badWordsList.includes(inputValue)) {
            const updatedList = [...badWordsList, inputValue]; // Додаємо нове слово до списку

            setBadWordsList(updatedList); // Оновлюємо список
            setnewBadWordsList((prevList) => {
                const updatedNewList = [...prevList, inputValue];
                console.log("Оновлений список слів (через інпут) в setState:", newBadWordsList);
                return updatedNewList;
            });

        } else {
            console.log("Слово вже існує в списку.");
        }
        setInputValue("");
    };

    const handleSave = () => {
        if (!badWordsList.length) return;

        const body = {
            settings: {
                badwords: {
                    words: badWordsList,
                },
            },
        };

        dispatch(badWord(body)).then(() => {
            console.log("Слова збережено у БД.");
        });
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 500);
    };

    const handleConfirmText = (text) => {
        console.log("Отриманий текст з редактора:", text);
        const updatedList = text.split("\n").filter((word) => word.trim());

        // Додаємо нові слова з редактора до основного списку
        const newWords = updatedList.filter((word) => !badWordsList.includes(word));

        if (newWords.length) {
            const combinedList = [...badWordsList, ...newWords];
            setBadWordsList(combinedList);

            setnewBadWordsList((prevList) => [...prevList, ...newWords]);
            console.log("Оновлений список слів (через ):", newBadWordsList);
        } else {
            console.log("Нових слів немає.");
        }
    };

    const openEditorModal = () => {
        setIsEditorModalOpen(true);
    };

    const closeEditorModal = () => {
        setIsEditorModalOpen(false);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${isClosing ? styles.closing : ""}`}>
                <div className={styles.modalHeader}>
                    <IoMdClose className={styles.closeIcon} onClick={handleClose} />
                    <h3 className={styles.modalTitle}>Погані слова</h3>
                    <div className={styles.actionButtons}>
                        <button className={styles.saveButton}>
                            <IoSaveOutline onClick={handleSave} /> Зберегти
                        </button>
                        <button className={styles.saveButton} onClick={handleSave}>
                            <MdOutlineSaveAs onClick={handleSave} /> Зберегти і закрити
                        </button>
                    </div>
                </div>
                <p className={styles.description}>
                    Тут ви можете налаштувати фільтр поганих слів.
                </p>
                <div className={styles.formGroup}>
                    <label htmlFor="wordInput" className={styles.formLabel}>
                        Додати слова
                    </label>
                    <input
                        id="wordInput"
                        type="text"
                        className={styles.textInput}
                        placeholder="Введіть слово..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={handleAddWord} className={styles.addButton}>
                        Додати
                    </button>
                </div>

                <button onClick={openEditorModal} className={styles.openEditorButton}>
                    Відкрити редактор слів
                </button>

                {isEditorModalOpen && (
                    <div className={styles.modalOverlay2}>
                        <div className={styles.modalContent}>
                            <IoMdClose
                                className={styles.closeIcon}
                                onClick={closeEditorModal}
                            />
                            <h3 className={styles.modalTitle}>Редактор слів</h3>
                            <CodeEditor
                                onConfirm={handleConfirmText}
                                value={badWordsList.join("\n")} // Відображаємо список слів
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

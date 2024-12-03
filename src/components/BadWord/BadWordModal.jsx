
import { useState } from "react";
import { useDispatch } from "react-redux";
import { badWord } from "../../redux/badword/operation";
import styles from "./BadWord.module.css";
import { IoMdClose } from "react-icons/io";
export const Modal = ({ onClose }) => {
    const [inputValue, setInputValue] = useState(""); // Стейт для введеного слова
    const dispatch = useDispatch();

    const handleSave = () => {
        if (!inputValue.trim()) return;

        // Формуємо тіло запиту
        const body = {
            badwords: {
                words: [inputValue], // Додаємо введене слово до списку
            },
        };

        // Відправка запиту на бекенд
        dispatch(badWord(body)).then(() => {
            setInputValue(""); // Очищуємо поле вводу

        });
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h3>Налаштування</h3>
                    <IoMdClose className={styles.closeIcon} onClick={onClose} />
                </div>
                <p>Тут ви можете налаштувати фільтр поганих слів.</p>
                <div className={styles.inputContainer}>
                    <h4>Додати погані слова</h4>
                    <input
                        type="text"
                        className={styles.textInput}
                        placeholder="Введіть слово..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} // Обробка зміни тексту
                    />
                    <button className={styles.saveButton} onClick={handleSave}>
                        Зберегти
                    </button>
                </div>
            </div>
        </div>
    );
};

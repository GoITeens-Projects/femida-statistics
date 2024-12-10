import { useState } from "react";
import { useDispatch } from "react-redux";
import { badWord } from "../../redux/badword/operation";
import styles from "./BadWord.module.css";
import { IoMdClose } from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import { MdOutlineSaveAs } from "react-icons/md";

export const Modal = ({ onClose }) => {
    const [inputValue, setInputValue] = useState("");
    const [isClosing, setIsClosing] = useState(false);
    const dispatch = useDispatch();

    const handleSave = () => {
        if (!inputValue.trim()) return;

        const body = {
            settings: {
                badwords: {
                    words: [inputValue],
                },
            },
        };

        dispatch(badWord(body)).then(() => {
            setInputValue("");
        });
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 500);
    };

    return (
        <div className={styles.modalOverlay}>
            <div
                className={`${styles.modalContent} ${isClosing ? styles.closing : ""}`}
            >
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
                <div className={styles.customCheckboxContainer}>
                    <input
                        type="checkbox"
                        id="customCheckbox"
                        className={styles.customCheckbox}
                    />
                    <label htmlFor="customCheckbox" className={styles.checkboxLabel}>
                        Видаляти повідомлення з порушенням
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="lang" className={styles.formLabel}>
                        Покарання
                    </label>
                    <select name="languages" id="lang" className={styles.selectBox}>
                        <option value="none">Відсутнє</option>
                        <option value="warning">Видати попередження</option>
                        <option value="kick">Кікнути учасника</option>
                        <option value="ban">Забанити учасника</option>
                        <option value="mute">Зам'ютити учасника</option>
                    </select>
                </div>
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
                </div>

            </div>
        </div>
    );
};

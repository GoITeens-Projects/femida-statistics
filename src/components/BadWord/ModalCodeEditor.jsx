
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



export const Modal = ({ children, onClose, onSave }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [theme, setTheme] = useState("light"); // Тема за замовчуванням

    useEffect(() => {
        setIsVisible(true);
        // Отримуємо тему з localStorage
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    // Динамічний стиль для модального вікна
    const modalStyle = {
        backgroundColor: theme === "light" ? "#fff" : "#191919",

    };

    return (
        <div
            className={`${styles.ModalOverlay} ${isVisible ? styles.ModalOpen : styles.ModalClose}`}
            onClick={handleClose}
        >
            <div
                style={modalStyle} // Додаємо динамічний стиль
                className={`${styles.ModalContent} ${isVisible ? styles.ModalContentOpen : styles.ModalContentClose}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                <div className={styles.ModalButtonContainer}>
                    <button onClick={handleClose} className={styles.SaveButton}>Відмінити</button>
                    <button onClick={onSave} className={styles.SaveButton}>Зберегти</button>
                </div>
            </div>
        </div>
    );
};


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




const padNumber = (num) => String(num).padStart(2, "0");

export const ScrollableNumbers = ({ maxNumber, label, value = 0, onChange }) => {
    const [current, setCurrent] = useState(value);

    // Синхронізація початкового значення з пропсом value
    useEffect(() => {
        setCurrent(value);
    }, [value]);

    const prevNumber = (current - 1 + maxNumber + 1) % (maxNumber + 1);
    const nextNumber = (current + 1) % (maxNumber + 1);

    const handlePrev = () => {
        setCurrent((prev) => {
            const newValue = (prev - 1 + maxNumber + 1) % (maxNumber + 1);
            onChange(newValue);
            return newValue;
        });
    };

    const handleNext = () => {
        setCurrent((prev) => {
            const newValue = (prev + 1) % (maxNumber + 1);
            onChange(newValue);
            return newValue;
        });
    };

    return (
        <div className={styles.scrollableContainer}>
            <p className={styles.NumberText}>{label}</p>
            <div className={styles.scrollableControls}>
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 4 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handlePrev}
                >
                    <path d="M0 2.5L3.75 0.334936V4.66506L0 2.5Z" fill="#6EABD4" />
                </svg>

                <div className={styles.numbers}>
                    <div className={`${styles.number} ${styles.faded}`}>{padNumber(prevNumber)}</div>
                    <div className={`${styles.number} ${styles.selected}`}>{padNumber(current)}</div>
                    <div className={`${styles.number} ${styles.faded}`}>{padNumber(nextNumber)}</div>
                </div>

                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 4 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleNext}
                >
                    <path d="M4 2.5L0.25 4.66506L0.25 0.334936L4 2.5Z" fill="#6EABD4" />
                </svg>
            </div>
        </div>
    );
};

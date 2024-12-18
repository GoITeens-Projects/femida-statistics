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


export const UnsavedChangesModal = ({ onClose, onSave }) => {
    return (
        <div className={styles.ModalOverlay} onClick={onClose}>
            <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.TitleBadWords} >Увага!</h2>
                <p className={styles.BadWordListText}>У вас є незбережені зміни. Ви хочете зберегти їх перед переходом?</p>
                <div className={styles.ModalButtonContainer}>
                    <button onClick={onClose} className={styles.SaveButton}>Не зберігати</button>
                    <button onClick={onSave} className={styles.SaveButton}>Зберегти та перейти</button>
                </div>
            </div>
        </div>
    );
};


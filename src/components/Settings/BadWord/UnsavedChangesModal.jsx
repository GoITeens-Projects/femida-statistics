
import styles from "./BadWord.module.css";


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


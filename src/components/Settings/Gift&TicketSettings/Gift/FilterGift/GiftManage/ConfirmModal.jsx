import React from 'react';
import styles from './ConfirmModal.module.css';

export const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.Overlay}>
      <div className={styles.Modal}>
        <p className={styles.Text}>Ви впевнені, що хочете видалити подарунок?</p>
        <div className={styles.Buttons}>
          <button className={styles.CancelBtn} onClick={onCancel}>Скасувати</button>
          <button className={styles.DeleteBtn} onClick={onConfirm}>Видалити</button>
        </div>
      </div>
    </div>
  );
};

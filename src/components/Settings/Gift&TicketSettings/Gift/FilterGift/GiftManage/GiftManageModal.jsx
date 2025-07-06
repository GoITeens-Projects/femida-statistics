import React from 'react';
import styles from './GiftManageModal.module.css';
import Shadow from 'components/Shadow/Shadow';
import importIcon from './Group 498.svg'
export const GiftManageModal = ({ gift, onClose }) => {
  if (!gift) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}   /* щоб не закривалося при кліку всередині */
      >
          
        <button className={styles.close} onClick={onClose}>×</button>

        <div className={styles.body}>
             <Shadow
                    leftFirst={-7} widthFirst={5} heightSecond={5} rightSecond={3} bottomSecond={-7}
                    backgroundBoth="#6EABD4" borderColorBoth="#558DB2"
                  />
          <h5 className={styles.Title}>Редагування подарунку</h5>

<div className={styles.Container}>
    <label className={styles.TitleInput} >
        Назва подарунку
        <input className={styles.Input} type="text"  />
    </label>
</div>
<div className={styles.Container}>
    <label className={styles.TitleInput} >
        Опис подарунку
        <input className={styles.InputDescription} type="text"  />
    </label>
</div>
<div className={styles.Container}>
    <label className={styles.TitleInput} >
        Вартість в ХР
        <input className={styles.Input} type="text"  />
        XP
    </label>
</div>
<div className={styles.ContainerImport}>
   <p className={styles.TitleInput} >Зображення</p>
   <img src={importIcon} alt="" />
</div>
        
        </div>
      </div>
    </div>
  );
};

import React from 'react';
// import styles from
import styles from '../CountOfXp/CountOfXPPage.module.css';
import {SettingsNavigation} from '../SettingsNavigation/SettingsNavigation';
import {useState} from 'react';
import Shadow from '../../Shadow/Shadow';
import s from '../PeriodsSettings/PeriodsSettings.module.css';
import {ActionSettings} from '../ActionSettings/ActionSettings';
import TextEditor from '../TextEditor/TextEditor';
import { useSelector } from 'react-redux';

export const Emojis = () => {
    const [maxEmojis, setMaxEmojis] = useState(0);
    const [content, setContent] = useState("");
    const [isEnabled, setIsEnabled] = useState(false); // Стан для активації/деактивації
    const [days, setDays] = useState(0); // Стан для днів
    const [hours, setHours] = useState(0); // Стан для годин
    const [minutes, setMinutes] = useState(0); // Стан для хвилин
    const [selectedAction, setSelectedAction] = useState("null"); // Стан для вибору дії
    const [isCheckedAdmin, setIsChecked] = useState(false); // Стан для перевірки адмінських прав
    const [isDeleteMessage, setIsDeleteMessage] = useState(false); // Стан для видалення повідомлень

    const { data: settings, loading, error } = useSelector((state) => state.settings);
    const activeSlider = settings?.emojisSpam?.actions?.notifyUser?.enabled;

    const handleToggle = () => {
        setIsEnabled(!isEnabled);
        // dispatch(PatchSettings({ settings: { [nameForUpdate]: { enabled: !isEnabled } } }));
      };
    return (
        <>
           <div className={styles['navigation-container']}>
        <SettingsNavigation 
        // onHandleSave={save} onHandleBackClick={()=> navigate('/settings')}
        />
      </div>
      <div className={styles['helper-container']}>
      <h1 className={styles['title']}>Емоджі</h1>
      </div>
      <div
       className={s['container']}
      >
      <Shadow
          leftFirst={-7}
          widthFirst={5}
          heightSecond={5}
          rightSecond={3}
          bottomSecond={-7}
          backgroundBoth={'var(--chart-accent-color)'}
          borderColorBoth={'var(--border-accent-color)'}
        />
         <p className={s['subtitle']}>Максимальна кількість емоцій</p>
      <label className={s['count-label']}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--shadow-settings-border)'}
          />
          <input
            className={s['count-input']}
            type="number"
            min={0}
            autocomplete="off"
            name="number"
            id="number"
            placeholder="0"
            value={`${maxEmojis}`}
            onChange={e => setMaxEmojis(Number(e.currentTarget.value))}
          />
        </label>
        </div>
        <div className={styles['helper-container']}>
            <div className={styles['second-helper-container']}>
                 <label className={styles.switch}>
          <input
            type="checkbox"
            checked={!activeSlider ? true : isEnabled} // Якщо `activeSlider === false`, завжди увімкнений
            disabled={!activeSlider} // Якщо `activeSlider === false`, неактивний
            onChange={activeSlider ? handleToggle : undefined} // Блокуємо зміну стану
          />
          <span
            className={`${styles.slider} ${styles.round}`}
            style={{
              filter: !activeSlider ? 'grayscale(40%)' : 'none',
              opacity: !activeSlider ? '0.75' : '1',

            }}
          ></span>

        </label>
        <p>Повідомляти учасника про порушення</p>
        </div>
        </div>
        <ActionSettings
                    onDaysChange={setDays}
                    onHoursChange={setHours}
                    onMinutesChange={setMinutes}
                    onSelectedActionChange={setSelectedAction}
                    onIsCheckedAdminChange={setIsChecked}
                    onIsDeleteMessageChange={setIsDeleteMessage}
                    onIsDeleteMessage={isDeleteMessage}
                    onSelectedAction={selectedAction}
                    onDays={days}
                    onHours={hours}
                    onMinutes={minutes}
                    onIsCheckedAdmin={isCheckedAdmin}

                />
             
<div className={styles.subhelp}>
                <TextEditor 
                onChange={setContent} initialContent={settings?.emojisSpam?.actions?.notifyUser?.messageFn || ""} 
                />
                </div>
                <div  className={styles['helper-container']}>
                    
                <p className={`${s['subtitle']}`}>Затримка видалення повідомлення</p>
                <label className={s['count-label']}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--shadow-settings-border)'}
          />
          <input
            className={s['count-input']}
            type="number"
            min={0}
            autocomplete="off"
            name="number"
            id="number"
            placeholder="0"
            value={`${maxEmojis}`}
            onChange={e => setMaxEmojis(Number(e.currentTarget.value))}
          />
           <p className={styles.Sec} >сек.</p>
        </label>
       
        </div>
        </>
    );
};


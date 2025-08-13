import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Events/EventsPage.module.css';
import { SettingsNavigation } from '../SettingsNavigation/SettingsNavigation';
import Shadow from '../../Shadow/Shadow';
import s from '../PeriodsSettings/PeriodsSettings.module.css';
import { ActionSettings } from '../ActionSettings/ActionSettings';
import TextEditor from '../TextEditor/TextEditor';
import { fetchSettings, PatchSettings } from '../../../redux/settings/operation';
import { useNavigate } from 'react-router-dom';

const parseMuteTime = (timeInMs) => {
  const totalMinutes = Math.floor(timeInMs / 60000);
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes };
};

export const Emojis = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: settings,
    loading,
    error,
  } = useSelector(state => state.settings);

  const [maxEmojis, setMaxEmojis] = useState(0);
  const [content, setContent] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [selectedAction, setSelectedAction] = useState('null');
  const [isCheckedAdmin, setIsChecked] = useState(false);
  const [isDeleteMessage, setIsDeleteMessage] = useState(false);
  const [isDeleteTimeoutSec, setIsDeleteTimeoutSec] = useState(0);

  const [thisTargetRoles, setThisTargetRoles] = useState([]);

  const [thisTargetChannels, setThisTargetChannels] = useState([]);

useEffect(() => {
  dispatch(fetchSettings());
}, [dispatch]);

  useEffect(() => {
    if (settings) {
      setIsEnabled(settings?.settings?.emojisSpam?.actions?.giveWarn);
      if (settings?.settings?.emojisSpam?.actions?.mute?.muteTimeMs) {
        const { days, hours, minutes } = parseMuteTime(
            settings.settings.spam.actions.mute.muteTimeMs
        );
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
    }
      setIsChecked(settings?.settings?.emojisSpam?.actions?.ignoreAdmins);
      setIsDeleteMessage(settings?.settings?.emojisSpam?.actions?.deleteMsg);
      setIsDeleteTimeoutSec(
        settings?.settings?.emojisSpam?.actions?.notifyUser?.deleteTimeoutMs /
          1000
      );
      setThisTargetChannels(
        settings?.settings?.emojisSpam?.targetChannels || []
      );
      setThisTargetRoles(settings?.settings?.emojisSpam?.targetRoles || []);
      setMaxEmojis(settings?.settings?.emojisSpam?.maxEmojis || 0);
      console.log(settings?.settings?.emojisSpam?.targetRoles);
      console.log(settings?.settings?.emojisSpam?.maxEmojis);
      // console.log('hominutesurs', settings?.settings?.emojisSpam?.actions?.mute?.muteTimeMs)
    }
  }, [settings]);

const save = () => {
  dispatch(
    PatchSettings({
      settings: {
        emojisSpam: {
          maxEmojis: maxEmojis,
          targetChannels: thisTargetChannels,
          targetRoles: thisTargetRoles,
          actions: {
            deleteMsg: isDeleteMessage,
            giveWarn: isEnabled,
            ignoreAdmins: isCheckedAdmin,
            mute: {
              enabled: selectedAction === 'mute',
              muteTimeMs: days * 86400000 + hours * 3600000 + minutes * 60000,
            },
            notifyUser: {
              enabled: selectedAction === 'warning',
              messageFn: content,
              deleteTimeoutMs: isDeleteTimeoutSec * 1000,
            },
          },
        },
      },
    })
  ).then(() => {
 
   
    navigate('/settings');
  });
};

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <>
      <div className={styles['navigation-container']}>
        <SettingsNavigation
          onHandleSave={save}
          onHandleBackClick={() => navigate('/settings')}
        />
      </div>
      <div className={styles['helper-container']}>
        <h1 className={styles['title']}>Емоджі</h1>
      </div>
      <div className={s['container']}>
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
            autoComplete="off"
            name="number"
            id="number"
            placeholder="0"
            value={maxEmojis}
            onChange={e => setMaxEmojis(Number(e.currentTarget.value))}
          />
        </label>
      </div>
      <div className={styles['helper-container']}>
        <div className={styles['second-helper-container']}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={handleToggle}
            />
            <span
              className={`${styles.slider} ${styles.round}`}
              style={{
                filter: 'none',
                opacity: '1',
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
        onThisTargetRoles={thisTargetRoles}
        onThisTargetChannels={thisTargetChannels}
        onSetTargetRoles={setThisTargetRoles}
        onSetTargetChannels={setThisTargetChannels}
      />
      <div className={styles.subhelp}>
        <TextEditor
          onChange={setContent}
          initialContent={
            settings?.settings?.emojisSpam?.actions?.notifyUser?.messageFn || ''
          }
        />
      </div>
      <div className={styles['helper-container']}>
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
            autoComplete="off"
            name="number"
            id="number"
            placeholder="0"
            value={isDeleteTimeoutSec}
            onChange={e => setIsDeleteTimeoutSec(Number(e.currentTarget.value))}
          />
          <p className={styles.Sec}>сек.</p>
        </label>
      </div>
    </>
  );
};

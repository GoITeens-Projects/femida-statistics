import { useState, useEffect } from 'react';
import { UnsavedChangesModal } from '../BadWord/UnsavedChangesModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SettingsNavigation } from '../SettingsNavigation/SettingsNavigation';
import styles from './Limits.module.css';
import Shadow from 'components/Shadow/Shadow';
import LimitsScope from 'components/LimitsScope/LimitsScope';
import PeriodOfLimits from 'components/PereiodOfLimits/PeriodOfLimits';
import { fetchSettings } from '../../../redux/settings/operation';
import { selectSettingsData } from '../../../redux/settings/selectors';
import { PatchSettings } from '../../../redux/settings/operation';
import { Trash2, ChevronDown } from 'lucide-react';

export const LimitsPage = () => {
  const [isChangesSaved, setIsChangesSaved] = useState(true);
  const [selectedTargetRoles, setSelectedTargetRoles] = useState([]);
  const [selectedTargetChannels, setSelectedTargetChannels] = useState([]);
  const [isEventMessages, setIsEventMessages] = useState(false);
  const [isEventVoice, setIsEventVoice] = useState(false);
  const [isEventStage, setIsEventStage] = useState(false);
  const [isEventBoost, setIsEventBoost] = useState(false);
  const [isIgnoreAdmins, setIsIgnoreAdmins] = useState(false);
  const [isOpenEvent, setIsOpenEvent] = useState(false);

  const [startDateLimit, setStartDateLimit] = useState('');
  const [endDateLimit, setEndDateLimit] = useState('');
  const [coefficient, setCoefficient] = useState('');
  const [isPeriodUnlimited, setIsPeriodUnlimited] = useState('');

  const [events, setEvents] = useState([]);
  const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = useSelector(selectSettingsData);

  useEffect(() => {
    dispatch(fetchSettings()); // Виклик дії для завантаження налаштувань
  }, [dispatch]);

  // Оновлення доданих слів при змінах налаштувань
  useEffect(() => {
    if (settings?.settings?.events) {
      setEvents(settings.settings.events);
    }
  }, [settings]);

  // const handleSave = () => {

  // };
  const handleSave = () => {
    const startDate = new Date(
      `20${startDateLimit.slice(-2)}-${startDateLimit.slice(
        3,
        5
      )}-${startDateLimit.slice(0, 2)}`
    );
    const endDate = new Date(
      `20${endDateLimit.slice(-2)}-${endDateLimit.slice(
        3,
        5
      )}-${endDateLimit.slice(0, 2)}`
    );

    console.log(selectedTargetChannels);
    console.log(selectedTargetRoles);

    dispatch(
      PatchSettings({
        settings: {
          events: [
            {
              activities: {
                messages: isEventMessages,
                voice: isEventVoice,
                stage: isEventStage,
                boosts: isEventBoost,
              },
              // k: { type: Number, default: 1 },
              kLimit: Number(coefficient),
              startDate: startDate,
              endDate: endDate,
              targetChannels: selectedTargetChannels,
              targetRoles: selectedTargetRoles,
            },
          ],
        },
      })
    );
  };

  const handleBackClick = e => {
    const isStartDateEmpty = startDateLimit.length !== 0;
    const isEndDateEmpty = endDateLimit.length !== 0;
    const isCoefficientEmpty = coefficient.length !== 0;
    const isEventMessagesChanged = isEventMessages !== false;
    const isEventVoiceChanged = isEventVoice !== false;
    const isEventStageChanged = isEventStage !== false;
    const isEventBoostChanged = isEventBoost !== false;

    if (
      isStartDateEmpty ||
      isEndDateEmpty ||
      isCoefficientEmpty ||
      isEventMessagesChanged ||
      isEventVoiceChanged ||
      isEventStageChanged ||
      isEventBoostChanged
    ) {
      setIsChangesSaved(false);
    } else {
      navigate('/settings');
    }
  };

  const handleDiscardChanges = () => {
    setIsChangesSaved(true);
    navigate('/settings'); // Переход на сторінку налаштувань
  };

  return (
    <section>
      <SettingsNavigation
        onHandleBackClick={handleBackClick}
        onHandleSave={handleSave}
      />

      <div className={styles.Container}>
        <h1 className={styles.TitleBadWords}>Ліміти</h1>
        <div className={styles.FromContainer}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'#6EABD4'}
            borderColorBoth={'#558DB2'}
          />
        </div>
      </div>
      {!isChangesSaved && (
        <UnsavedChangesModal
          onClose={handleDiscardChanges}
          onSave={handleSave}
        />
      )}

      <div style={{ marginTop: '50px' }}>
        <PeriodOfLimits
          selectedTargetRoles={selectedTargetRoles}
          setSelectedTargetRoles={setSelectedTargetRoles}
          selectedTargetChannels={selectedTargetChannels}
          setSelectedTargetChannels={setSelectedTargetChannels}
          isEventMessages={isEventMessages}
          setIsEventMessages={setIsEventMessages}
          isEventVoice={isEventVoice}
          setIsEventVoice={setIsEventVoice}
          isEventStage={isEventStage}
          setIsEventStage={setIsEventStage}
          isEventBoost={isEventBoost}
          setIsEventBoost={setIsEventBoost}
          isIgnoreAdmins={isIgnoreAdmins}
          setIsIgnoreAdmins={setIsIgnoreAdmins}
          startDateLimit={startDateLimit}
          setStartDateLimit={setStartDateLimit}
          endDateLimit={endDateLimit}
          setEndDateLimit={setEndDateLimit}
          coefficient={coefficient}
          setCoefficient={setCoefficient}
          isPeriodUnlimited={isPeriodUnlimited}
          setIsPeriodUnlimited={setIsPeriodUnlimited}
          handleSave={handleSave}
        />
      </div>

      {/* <div style={{ marginTop: '50px' }}>
        <LimitsScope />
      </div> */}

      <div style={{ marginTop: '50px' }}>
        {events.length !== 0 && (
          <ul className={styles.eventsList}>
            {events.map(event => {
              const startDate = new Date(event.startDate);
              const endDate = new Date(event.endDate);
              const testArr = [];

              if (event.activities.messages === true) {
                testArr.push('Спілкування в текстових каналах');
              }
              if (event.activities.voice === true) {
                testArr.push('Спілкування в голосових чатах');
              }
              if (event.activities.stage === true) {
                testArr.push('Перебування на трибунах');
              }
              if (event.activities.boosts === true) {
                testArr.push('Буст серверу');
              }

              return (
                <li key={event._id} className={styles.eventsItem}>
                  <p className={styles.eventsText}>
                    Ліміт з
                    <span className={styles.eventSpan}>
                      {startDate.getDate()}/{startDate.getMonth() + 1}/
                      {startDate.getFullYear()}
                    </span>
                    до
                    <span className={styles.eventSpan}>
                      {endDate.getDate()}/{endDate.getMonth() + 1}/
                      {endDate.getFullYear()}
                    </span>
                    за
                    <span className={styles.eventSpan}>
                      {testArr.join(', ')}
                    </span>
                  </p>
                  <div className={styles.eventsBox}>
                    <button type="button" className={styles.deleteEventBtn}>
                      <Trash2 />
                    </button>
                    <button
                      type="button"
                      className={styles.showMoreEventBtn}
                      onClick={() => setIsOpenEvent(!isOpenEvent)}
                    >
                      <ChevronDown />
                    </button>
                  </div>
                  {isOpenEvent && (
                    <div className={styles.fullEventBox}>
                      <h3 className={styles.fullEventTitle}>Коефіцієнт</h3>
                      <div className={styles.fullEventCoefficientBox}>
                        {event.kLimit}
                        <Shadow
                          leftFirst={-7}
                          widthFirst={5}
                          heightSecond={5}
                          rightSecond={3}
                          bottomSecond={-7}
                          backgroundBoth={'var(--shadow-secondary-border)'}
                          borderColorBoth={'var(--chart-accent-color)'}
                        />
                      </div>
                      <div className={styles.fullEventTargesBox}>
                        <div className={styles.fullEventTargetRolesBox}>
                          <h3 className={styles.fullEventTitle}>
                            Цільові ролі
                          </h3>
                          <div className={styles.fullEventTargetRolesBlock}>
                            <p>{event.targetRoles.join(', ')}</p>
                            <Shadow
                              leftFirst={-7}
                              widthFirst={5}
                              heightSecond={5}
                              rightSecond={3}
                              bottomSecond={-7}
                              backgroundBoth={'var(--shadow-secondary-border)'}
                              borderColorBoth={'var(--chart-accent-color)'}
                            />
                          </div>
                        </div>
                        <div className={styles.fullEventTargetChannelsBox}>
                          <h3 className={styles.fullEventTitle}>
                            Цільові канали
                          </h3>
                          <div className={styles.fullEventTargetChannelsBlock}>
                            <p>{event.targetChannels.join(', ')}</p>
                            <Shadow
                              leftFirst={-7}
                              widthFirst={5}
                              heightSecond={5}
                              rightSecond={3}
                              bottomSecond={-7}
                              backgroundBoth={'var(--shadow-secondary-border)'}
                              borderColorBoth={'var(--chart-accent-color)'}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

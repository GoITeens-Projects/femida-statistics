import { useState, useEffect } from 'react';
import { UnsavedChangesModal } from '../BadWord/UnsavedChangesModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SettingsNavigation } from '../SettingsNavigation/SettingsNavigation';
import styles from '../CountOfXp/CountOfXPPage.module.css';
import Shadow from 'components/Shadow/Shadow';
import LimitsScope from 'components/LimitsScope/LimitsScope';
import PeriodOfLimits from 'components/PereiodOfLimits/PeriodOfLimits';
import { fetchSettings } from '../../../redux/settings/operation';
import { selectSettingsData } from '../../../redux/settings/selectors';
import { PatchSettings } from '../../../redux/settings/operation';
import { Trash2, ChevronDown } from 'lucide-react';
import limitsScopeStyles from '../../LimitsScope/LimitsScope.module.css';
import axios from '../../../redux/axiosConfig';
import { PeriodsSettings } from '../PeriodsSettings/PeriodsSettings';

export const LimitsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = useSelector(selectSettingsData);

  const [isChangesSaved, setIsChangesSaved] = useState(true);
  const [selectedTargetRoles, setSelectedTargetRoles] = useState([]);
  const [selectedTargetChannels, setSelectedTargetChannels] = useState([]);
  const [isEventMessages, setIsEventMessages] = useState(false);
  const [isEventVoice, setIsEventVoice] = useState(false);
  const [isEventStage, setIsEventStage] = useState(false);
  const [isEventBoost, setIsEventBoost] = useState(false);
  const [isIgnoreAdmins, setIsIgnoreAdmins] = useState(false);
  // const [isOpenEvent, setIsOpenEvent] = useState(false);
  const [openEvents, setOpenEvents] = useState({});

  const toggleEventDetails = index => {
    setOpenEvents(prev => ({
      ...prev,
      [index]: !prev[index], // Перемикаємо стан конкретного івента
    }));
  };

  const [startDateLimit, setStartDateLimit] = useState('');
  const [endDateLimit, setEndDateLimit] = useState('');
  const [coefficient, setCoefficient] = useState('');
  const [isPeriodUnlimited, setIsPeriodUnlimited] = useState('');
  const [events, setEvents] = useState([]);
  const [isUnsavedModalOpen, setIsUnsavedModalOpen] = useState(false);
  
  // const settings = useSelector(selectSettingsData);
  const [targetRoles, setTargetRoles] = useState([]);
  const [targetChannels, setTargetChannels] = useState([]);
  const accessToken = localStorage.getItem('token');

  // useEffect(() => {
    
  // }, []);

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

    const dataToSave = [
      ...events,
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
        targetChannels: selectedTargetChannels.map(channel => channel.id),
        targetRoles: selectedTargetRoles.map(role => role.id),
      },
    ];
    setEvents(prevState =>
      prevState.concat({
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
        targetChannels: selectedTargetChannels.map(channel => channel.id),
        targetRoles: selectedTargetRoles.map(role => role.id),
      })
    );

    dispatch(
      PatchSettings({
        settings: {
          events: [
            ...events,
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
              targetChannels: selectedTargetChannels.map(channel => channel.id),
              targetRoles: selectedTargetRoles.map(role => role.id),
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
    navigate('/settings');
  };

  const handleDeleteEvent = evt => {
    const eventIdToDelete = evt.target.parentNode.getAttribute('data-id');
    const filtredEvents = events.filter(event => event._id !== eventIdToDelete);
    console.log(filtredEvents);
    setEvents(filtredEvents);
    dispatch(
      PatchSettings({
        settings: {
          events: filtredEvents,
        },
      })
    );
  };

  const handleCoefficientChange = (evt, index) => {
    let inputValue = evt.target.value.replace(/\D/g, '');
    inputValue = inputValue.replace(/(\d{2})(\d{3})/, '$1.$2');

    setEvents(prevEvents =>
      prevEvents.map((event, i) =>
        i === index ? { ...event, kLimit: inputValue } : event
      )
    );
  };
  console.log(events);

  const onSubmitChanges = (
    startDate,
    endDate,
    coefficient,
    id,
    targetChannels,
    targetRoles
  ) => {
    // if(startDate === '' || endDate === '') return
    const newArray = events.map(element => {
      // console.log('_id', element._id)
      // console.log('id', id);;
      if (element._id === id) {
        return {
          activities: {
            messages: element.activities.messages,
            voice: element.activities.voice,
            stage:  element.activities.stage,
            boosts: element.activities.boosts,
          },
          startDate,
          endDate,
          k: element.k,
          kLimit: coefficient,
          _id: id,
          targetChannels: targetChannels.map(ch => ch.id),
          targetRoles: targetRoles.map(role => role.id),
        };
      } else {
        return element;
      }
    });
    dispatch(
      PatchSettings({
        settings: {
          events: newArray,
        },
      })
    );
    dispatch(fetchSettings());
  };

  const onDelete = id => {
    const newArray = events.filter(el => {
      const fltr = Object.values(el).includes(id);
      return !fltr;
    });
    dispatch(
      PatchSettings({
        settings: {
          events: newArray,
        },
      })
    );
    dispatch(fetchSettings());
    // dispatch(addInfo({ type: 'countOfXP', info: newArray }));
  };
  const addNew = () => {
    dispatch(
      PatchSettings({
        settings: {
          events: [
            {
              activities: {
                messages: false,
                voice: false,
                stage: false,
                boosts:false,
              },
              startDate: '',
              endDate: '',
              k: 1,
              kLimit: 1,
            },
            ...events,
          ],
        },
      })
    );
    dispatch(fetchSettings());
  };


  return (
    <>
       <div className={styles['navigation-container']}>
      <SettingsNavigation
        onHandleBackClick={handleBackClick}
        onHandleSave={handleSave}
      />
</div>

      <div className={styles.container}>
          <h3 className={styles.subtitle}>Назва ліміта</h3>
          <div className={styles['dropdown-display']}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'#558DB2'}
            />
            <input
              type="text"
              placeholder="Введіть назву активності"
              className={styles.limitsInputName}
            />
          </div>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--chart-accent-color)'}
            borderColorBoth={'var(--border-accent-color)'}
          />
        </div>
      {!isChangesSaved && (
        <UnsavedChangesModal
          onClose={handleDiscardChanges}
          onSave={handleSave}
        />
      )}

<button
            type="button"
            className={styles['add-new-button']}
            onClick={addNew}
          >
            Додати новий період
          </button>

{events.map(el => {
            return (
              <PeriodsSettings
                key={el._id}
                id={el._id}
                thisStartDate={el.startDate}
                thisEndDate={el.endDate}
                thisCountOfXP={el.kLimit}
                thisTargetChannels={el.targetChannels}
                thisTargetRoles={el.targetRoles}
                onSubmitChanges={onSubmitChanges}
                onDelete={onDelete}
                thisMessages={el.activities.messages}
                thisVoice={el.activities.voice}
                thisStage={el.activities.stage}
                thisBoosts={el.activities.boosts}
                thisType='limit'
              />
            );
          })}
    </>
  );
};

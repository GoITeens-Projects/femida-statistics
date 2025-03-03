import { PeriodsSettings } from '../PeriodsSettings/PeriodsSettings';
import {
  fetchChannels,
  fetchSettings,
  fetchRoles,
  PatchSettings,
} from '../../../redux/settings/operation';
import styles from './CountOfXPPage.module.css';
import { SettingsNavigation } from '../SettingsNavigation/SettingsNavigation';
import Shadow from '../../Shadow/Shadow';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountOfXP } from '../../../redux/improvised/selectors';
import { addInfo } from '../../../redux/improvised/operation';
import { BasicXPSettings } from '../BasicXPSettings/BasicXPSettings';
import { nanoid } from 'nanoid';
import { selectSettingsData } from '../../../redux/settings/selectors';
import { useNavigate } from 'react-router-dom';
import { UnsavedChangesModal } from '../BadWord/UnsavedChangesModal';
import { RiKeyLine } from 'react-icons/ri';

export const CountOfXPPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // useEffect(() => {
  //   dispatch(fetchSettings());
  //   dispatch(fetchChannels());
  //   dispatch(fetchRoles())
  // }, [dispatch]);

  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('messages');
  const [isChangesSaved, setIsChangesSaved] = useState(true);

  const countOfXpArray = useSelector(selectCountOfXP);
  const settings = useSelector(selectSettingsData);
  const events = settings.settings.events ? settings.settings.events : [];

  const options = ['messages', 'voice', 'stage', 'boosts', 'За замовчуванням'];

  console.log('settings.settings', settings.settings.xps.message);

  // const events = events.filter(el => {
  //   const fltr = el.activities[selectedActivity];
  //   return fltr;
  // });

  const save = () => {
    const newArray = events.map(element => {
      if (
        events.some(
          cur =>
            element._id === cur._id &&
            JSON.stringify(element) === JSON.stringify(cur)
        )
      ) {
        return events.find(el => el._id === element._id);
      } else {
        return element;
      }
    });
    console.log('newArray', newArray);
  };

  const handleDiscardChanges = () => {
    setIsChangesSaved(true);
    navigate('/settings');
  };

  const onSubmitChanges = (
    startDate,
    endDate,
    countOfXP,
    id,
    targetChannels,
    targetRoles,
    messages,
    voice,
    stage,
    boosts
  ) => {
    // if(startDate === '' || endDate === '') return
    const newArray = events.map(element => {
      // console.log('_id', element._id)
      // console.log('id', id);;
      if (element._id === id) {
        return {
          activities: {
            messages: messages,
            voice: voice,
            stage: stage,
            boosts: boosts,
          },
          startDate,
          endDate,
          k: countOfXP,
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
                boosts: false,
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

  const basicSubmit = (message, voice, stage, boost, voiceWithAdmin, invite) => {
      dispatch(PatchSettings({settings: {
        xps: {
          message, voice, stage, boost, voiceWithAdmin, invite
        }
      }}))
      dispatch(fetchSettings());
  }
  return (
    <>
      <div className={styles['navigation-container']}>
        <SettingsNavigation onHandleSave={save} onHandleBackClick={()=> navigate('/settings')}/>
      </div>
      <h1 className={styles['title']}>Кількість XP</h1>
      
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
                  onSave={save}
                />
              )}
     
      {selectedActivity !== 'За замовчуванням' ? (
        <>
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
                // thisStartDateStr={el.startDateStr}
                // thisEndDateStr={el.endDateStr}
                thisCountOfXP={el.k}
                thisThisDisabled={false}
                thisTargetChannels={el.targetChannels}
                thisTargetRoles={el.targetRoles}
                onSubmitChanges={onSubmitChanges}
                onDelete={onDelete}
                thisMessages={el.activities.messages}
                thisVoice={el.activities.voice}
                thisStage={el.activities.stage}
                thisBoosts={el.activities.boosts}
                thisType='xp'
              />
            );
          })}
        </>
      ) : (
        <BasicXPSettings 
        thisMessage={settings.settings.xps.message}
  thisVoice={settings.settings.xps.voice}
  thisStage={settings.settings.xps.stage}
  thisBoost={settings.settings.xps.boost}
  thisVoiceWithAdmin={settings.settings.xps.voiceWithAdmin}
  // thisStudentsK
  thisInvite={settings.settings.xps.invite}
  onSubmit={basicSubmit}
  />
      )}
    </>
  );
};

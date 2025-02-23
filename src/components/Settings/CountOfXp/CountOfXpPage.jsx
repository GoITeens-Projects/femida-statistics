import { PeriodsSettings } from '../PeriodsSettings/PeriodsSettings';
import { fetchChannels, fetchSettings, fetchRoles, PatchSettings } from '../../../redux/settings/operation';
import styles from './CountOfXPPage.module.css';
import { SettingsNavigation } from '../SettingsNavigation/SettingsNavigation';
import Shadow from '../../Shadow/Shadow';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountOfXP } from '../../../redux/improvised/selectors';
import { addInfo } from '../../../redux/improvised/operation';
import { BasicXPSettings } from '../BasicXPSettings/BasicXPSettings';
import { nanoid } from 'nanoid';
import {selectSettingsData} from '../../../redux/settings/selectors'

export const CountOfXPPage = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchSettings());
  //   dispatch(fetchChannels());
  //   dispatch(fetchRoles())
  // }, [dispatch]); 

  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('messages');
  const countOfXpArray = useSelector(selectCountOfXP);
  const settings = useSelector(selectSettingsData)
  const events = settings.settings.events ? settings.settings.events : []


  const options = [
    'messages',
    'voice',
    'stage',
    'boost',
    'За замовчуванням',
  ];

  console.log('events', events);

  const save = () => {};
  const currentArray = events.filter(el => {
    const fltr = el.activities[selectedActivity];
    return fltr;
  });

  console.log('currentArray', currentArray);

  const onSubmitChanges = (
    startDate,
    endDate,
    countOfXP,
    disabled,
    id,
    targetChannels,
    targetRoles
  ) => {
    const newArray = events.map(element => {
      // console.log('_id', element._id)
      // console.log('id', id);;
      if (element._id === id) {
        return {
          activities:{
            messages: selectedActivity === 'messages', 
            voice: selectedActivity === 'voice', 
            stage: selectedActivity === 'stage', 
            boost: selectedActivity === 'boost', 
          },
          startDate,
          endDate,
          k: countOfXP,
          _id: id,
          targetChannels,
          targetRoles
        };
      } else {
        return element;
      }
    });
    dispatch(PatchSettings({settings: {
      events: newArray
    }}));
  };

  const onDelete = id => {
    const newArray = countOfXpArray.filter(el => {
      const fltr = Object.values(el).includes(id);
      return !fltr;
    });
    dispatch(addInfo({ type: 'countOfXP', info: newArray }));
    // dispatch(addInfo({ type: 'countOfXP', info: newArray }));
  };
  const addNew = () => {
    dispatch(
      addInfo({
        type: 'countOfXP',
        info: [
          ...countOfXpArray,
          {
            startDate: '',
            endDate: '',
            startDateStr: '',
            endDateStr: '',
            countOfXP: 0,
            disabled: false,
            id: nanoid(),
            type: selectedActivity,
          },
        ],
      })
    );
  };
  return (
    <>
      <div className={styles['navigation-container']}>
        <SettingsNavigation onHandleSave={save} />
      </div>
      <div className={styles['container']}>
        <Shadow
          leftFirst={-7}
          widthFirst={5}
          heightSecond={5}
          rightSecond={3}
          bottomSecond={-7}
          backgroundBoth={'var(--chart-accent-color)'}
          borderColorBoth={'var(--border-accent-color)'}
        />
        <p className={styles['subtitle']}>Умови видачі ХР</p>
        <div className={styles['dropdown-display']}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var( --shadow-settings-border)'}
          />
          <button
            className={styles['dropdown-button']}
            onClick={() => setIsActivityDropdownOpen(!isActivityDropdownOpen)}
          >
            {selectedActivity}
            <span className={styles['dropdown-arrow']}>
              {isActivityDropdownOpen ? '◄' : '▼'}{' '}
            </span>
          </button>
          {isActivityDropdownOpen && (
            <ul className={styles['dropdown-list']}>
              {options.map((option, index) => (
                <li
                  key={index}
                  className={styles['dropdown-item']}
                  onClick={() => {
                    setSelectedActivity(option);
                    setIsActivityDropdownOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {selectedActivity !== 'За замовчуванням' ? (
       <><button
       type="button"
       className={styles['add-new-button']}
       onClick={addNew}
     >
       Додати новий період
     </button>
     { currentArray.map(el => {
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
            />
          );
        })} </>
      ) : (
        <BasicXPSettings />
      )}
    </>
  );
};

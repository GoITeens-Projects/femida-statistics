import { PeriodsSettings } from '../PeriodsSettings/PeriodsSettings.';
import styles from './CountOfXPPage.module.css';
import { SettingsNavigation } from '../SettingsNavigation/SettingsNavigation';
import Shadow from '../../Shadow/Shadow';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountOfXP } from '../../../redux/improvised/selectors';
import { addInfo } from '../../../redux/improvised/operation';
import { nanoid } from 'nanoid';

export const CountOfXPPage = () => {
  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('За повідомлення');
  const countOfXpArray = useSelector(selectCountOfXP);
  const dispatch = useDispatch();

  const options = ['За повідомлення', 'За войс', 'За триюуну', 'За буст'];
  const save = () => {};
  const currentArray = countOfXpArray.filter(el => {
    const fltr = el.type === selectedActivity
  return fltr})
  

  const onSubmitChanges = (startDate, endDate, startDateStr, endDateStr, countOfXP, disabled, id) => {
    const newArray = countOfXpArray.map(element => {
      if (element.id === id) {
        return {
          startDate,
          endDate,
          startDateStr,
          endDateStr,
          countOfXP,
          disabled,
          id,
          type: element.type,
        };
      } else {
        return element;
      }
    });
    dispatch(addInfo({ type: 'countOfXP', info: newArray }));
  };

  const onDelete = id => {
    const newArray = countOfXpArray.filter(
     ( el)=>{
        const fltr = Object.values(el).includes(id)
        return !fltr
        }
    );
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
            endDateStr:'',
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
      <button
        type="button"
        className={styles['add-new-button']}
        onClick={addNew}
      >
        Додати новий період
      </button>
      {currentArray.map(el => {
        return (
          <PeriodsSettings
            key={el.id}
            id={el.id}
            thisStartDate={el.startDate}
            thisEndDate={el.endDate}
            thisStartDateStr={el.startDateStr}
            thisEndDateStr={el.endDateStr}
            thisCountOfXP={el.countOfXP}
            thisDisabled={el.disabled}
            onSubmitChanges={onSubmitChanges}
            onDelete={onDelete}
          />
        );
      })}
    </>
  );
};

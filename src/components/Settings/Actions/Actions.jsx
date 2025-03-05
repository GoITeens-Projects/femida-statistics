import styles from './Actions.module.css';
import { ChevronDown } from 'lucide-react';
import Shadow from '../../Shadow/Shadow';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PatchSettings } from '../../../redux/settings/operation';
import { fetchSettings } from '../../../redux/settings/operation';
import { ActionsElement } from './ActionsElement';


export const Actions = () => {
    const dispatch = useDispatch();
  const [isOpenDropDown, setIsOpenDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Оберіть опцію');
  const [selectedAction, setSelectedAction] = useState("null");

  const options = [
    'Скинути всі попередження, окрім останнього',
    'Скинути всі попередження, включаючи останнє',
    'Лишити всі попередження',
  ];
  const restrictedOptions = [
    { value: 'null', label: 'Немає', color: 'var(--text-color)' },
    { value: '1', label: 'Скинути всі попередження, окрім останнього', color: 'var(--text-color)' },
    { value: '2', label: 'Скинути всі попередження, включаючи останнє', color: 'var(--text-color)' },
    { value: '2', label: 'Лишити всі попередження', color: 'var(--text-color)' },
];

const handleSelectChange = (selectedOption) => {
  setSelectedAction(selectedOption?.value || 'null'); // Змінення вибору дії

};

  const handleSelectDropdown = option => {
    setSelectedOption(option);
    setIsOpenDropdown(false);
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
            //   ...events,
            ],
          },
        })
      );
      dispatch(fetchSettings());
    };

  return (
    <>
      <div className={styles.generalSettingsBox}>
      <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--chart-accent-color)'}
            borderColorBoth={'var(--border-accent-color)'}
          />
      <p className={styles['subtitle']}>При м’юті на сервері...</p>
        <div className={styles.dropdown}>
          <button
            className={styles['dropdown-button']}
            onClick={() => setIsOpenDropdown(!isOpenDropDown)}
          >
            <span>{selectedOption}</span>
            <ChevronDown
              className={`${styles.icon} ${
                isOpenDropDown ? `${styles.rotate}` : ''
              }`}
            />
          </button>
          {isOpenDropDown && (
            <ul className={styles['dropdown-menu']}>
              {options.map((option, index) => (
                <li key={index} onClick={() => handleSelectDropdown(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
          <Shadow
            leftFirst={-6}
            widthFirst={5}
            heightSecond={5}
            rightSecond={2}
            bottomSecond={-6}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
        </div>
      </div>
      <button
            type="button"
            className={styles['add-new-button']}
            onClick={addNew}
          >
            Додати новий період
          </button>
          <ActionsElement />
          
    </>
  );
};

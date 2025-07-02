import CustomDropdown from "../CustomDropdown";
import Shadow from '../../Shadow/Shadow';
import styles from './Actions.module.css';
import { useState } from "react";
import { ChevronDown } from 'lucide-react';
import { ScrollableNumbers } from "../ActionSettings/ScrollableNumbers";

const padNumber = (num) => String(num).padStart(2, "0");

export const ActionsElement = () => {
    const [selectedAction, setSelectedAction] = useState("null");
    const [isOpenDropDown, setIsOpenDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState( { value: 'null', label: 'Немає', color: 'var(--text-color)' });
    const [days, setDays] = useState(0);
      const [hours, setHours] = useState(0);
      const [minutes, setMinutes] = useState(0);

    const options = [
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
    return <>
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
          <p className={styles['subtitle']}>Дія</p>
          <div className={styles['subcontainer']}>
          <div className={styles.secondDropdown}>
          <Shadow
            leftFirst={-6}
            widthFirst={5}
            heightSecond={5}
            rightSecond={2}
            bottomSecond={-6}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
          <button
            className={styles['dropdown-button']}
            onClick={() => setIsOpenDropdown(!isOpenDropDown)}
          >
            <span>{selectedOption.label}</span>
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
                  {option.label}
                </li>
              ))}
            </ul>
          )}
          
        </div>
        <div className={styles['inputContainer']}>
        <Shadow
            leftFirst={-6}
            widthFirst={5}
            heightSecond={5}
            rightSecond={2}
            bottomSecond={-6}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
          <p className={styles['inputText']}>Якщо в учасника </p>
          <input type="number" placeholder="N" className={styles['input']}></input>
          <p className={styles['inputText']}>попередженнь </p>
        
        </div>
        </div>
        <p className={styles['subtitle']}>Час дії</p>
        <div className={styles.NumbersContainer}>
                <ScrollableNumbers maxNumber={31} label="Дні" value={days} onChange={setDays} />
                <ScrollableNumbers maxNumber={23} label="Години" value={hours} onChange={setHours} />
                <ScrollableNumbers maxNumber={59} label="Хвилини" value={minutes} onChange={setMinutes} />
                <div>
                    <svg className={styles.Decor} width="200" height="40" viewBox="0 0 183 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1H183" stroke="#ACD0D6" stroke-dasharray="6 6" />
                    </svg>
                </div>
                <p className={styles.TotalNumber}>{`${padNumber(days)} днів, ${padNumber(hours)} годин, ${padNumber(minutes)} хвилин`}</p>
            </div>
        </div>
    </>
}
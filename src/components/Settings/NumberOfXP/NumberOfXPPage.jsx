import { SettingsNavigation } from "../SettingsNavigation/SettingsNavigation"
import styles from "./NumberOfXP.module.css";
import Shadow from "../../Shadow/Shadow"
import { useState } from "react";

export const NumberOfXPPage = () => {
    const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false)
    const [selectedActivity, setSelectedActivity] = useState('За повідомлення')
    const save = () => {

    }

    const options = ["За повідомлення", "За войс", "За триюуну", "За буст"]

    // const 
    return <>
    <div className={styles['navigation-container']}>
    <SettingsNavigation onHandleSave={save}/>
    </div>
   
    <div className={styles['container']}>
        <Shadow
          leftFirst={-7}
          widthFirst={5}
          heightSecond={5}
          rightSecond={3}
          bottomSecond={-7}
          backgroundBoth={'var(--shadow-secondary-border)'}
          borderColorBoth={'var(--chart-accent-color)'}
        />
        <p className={styles["subtitle"]}>Умови видачі ХР</p>
          <div className={styles["dropdown-display"]}>
            <button
              className={styles['dropdown-button']}
              onClick={() => setIsActivityDropdownOpen(!isActivityDropdownOpen)}
            >
              {selectedActivity}
              <span className={styles['dropdown-arrow']}>▼</span>
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

    <div className={styles['container']}>
    <Shadow
          leftFirst={-7}
          widthFirst={5}
          heightSecond={5}
          rightSecond={3}
          bottomSecond={-7}
          backgroundBoth={'var(--shadow-secondary-border)'}
          borderColorBoth={'var(--chart-accent-color)'}/>
    <p className={styles["subtitle"]}>Період видачі ХР</p>
    <div className={styles["date-subcountainer"]}>
        <div className={styles["date-countainer"]}>
            <p>З</p>
            <label><Shadow
          leftFirst={-7}
          widthFirst={5}
          heightSecond={5}
          rightSecond={3}
          bottomSecond={-7}
           backgroundBoth={'var(--shadow-secondary-border)'}
          borderColorBoth={'var( --shadow-settings-border)'}
        />
            <input type="date" name="start" id="start" className={styles["input"]}/>
            </label>
            <p>до</p>
            <label className={styles["input"]}><Shadow
          leftFirst={-7}
          widthFirst={5}
          heightSecond={5}
          rightSecond={3}
          bottomSecond={-7}
           backgroundBoth={'var(--shadow-secondary-border)'}
          borderColorBoth={'var (--shadow-settings-border)'}
        />
            <input type="date" name="end" id="end" />
            </label>
        </div>
        <div className={styles['checkbox-container']}>
        <label className={styles.limitsScopesCheckboxLabel}>
            <input type="checkbox" />
            <span className={styles.limitsScopesCheckboxSpan}></span>
          </label>
          <p className={styles.limitsScopeSubtitle}>
            Не поширювати на Адміністраторів і Модераторів
          </p>
          </div>
          </div>
    
    <p className={styles["subtitle"]}>Кількість ХР</p>
    <label><Shadow
          leftFirst={-7}
          widthFirst={5}
          heightSecond={5}
          rightSecond={3}
          bottomSecond={-7}
           backgroundBoth={'var(--shadow-secondary-border)'}
          borderColorBoth={'var(--shadow-settings-border)'}
        />
    <input 
    type="text"
     name="number"
      id="number" 
      className={styles["dropdown-display"]}
      placeholder="00 000"/>
      </label>
    <div>

    </div>
    </div>
    </>
}
import { useState } from 'react';
import styles from './LimitsScope.module.css';

const LimitsScope = () => {
  //   const [isOpen, setIsOpen] = useState(false);
  const [isOpenRoles, setIsOpenRoles] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState('Цільові ролі');
  const [isOpenMissedRoles, setIsOpenMissedRoles] = useState(false);
  const [selectedMissedRoles, setSelectedMissedRoles] =
    useState('Пропущені ролі');
  const [isOpenChannels, setIsOpenChannels] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState('Цільові канали');
  const [isOpenMissedChannels, setIsOpenMissedChannels] = useState(false);
  const [selectedMissedChannel, setSelectedMissedChannels] =
    useState('Пропущені канали');
  //   const [selected, setSelected] = useState('Цільові ролі');
  const options = ['Адміністратор', 'Користувач', 'Модератор'];

  return (
    <div className={styles.limitsScope}>
      <div className={styles.limitsScopeBlock}>
        <h2 className={styles.limitsScopeTitle}>
          Область дії загальних лімітів
        </h2>
        <div className={styles.limitsScopeBox}>
          {/* <input type="checkbox" className={styles.limitsScopeCheckbox} />
          <span className={styles.CheckboxMark}></span>
          <p className={styles.limitsScopeSubtitle}>
            Не поширювати на Адміністраторів і Модераторів
          </p> */}
          <label className={styles.limitsScopesCheckboxLabel}>
            <input type="checkbox" />
            <span className={styles.limitsScopesCheckboxSpan}></span>
          </label>
          <p className={styles.limitsScopeSubtitle}>
            Не поширювати на Адміністраторів і Модераторів
          </p>
        </div>
      </div>
      <ul className={styles.limitsScopeList}>
        <li className={styles.limitsScopeItem}>
          <div className={styles['dropdown-container']}>
            <button
              className={styles['dropdown-button']}
              onClick={() => setIsOpenRoles(!isOpenRoles)}
            >
              {selectedRoles}
              <span className={styles['dropdown-arrow']}>▼</span>
            </button>
            {isOpenRoles && (
              <ul className={styles['dropdown-list']}>
                {options.map((option, index) => (
                  <li
                    key={index}
                    className={styles['dropdown-item']}
                    onClick={() => {
                      setSelectedRoles(option);
                      setIsOpenRoles(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
        <li className={styles.limitsScopeItem}>
          <div className={styles['dropdown-container']}>
            <button
              className={styles['dropdown-button']}
              onClick={() => setIsOpenMissedRoles(!isOpenMissedRoles)}
            >
              {selectedMissedRoles}
              <span className={styles['dropdown-arrow']}>▼</span>
            </button>
            {isOpenMissedRoles && (
              <ul className={styles['dropdown-list']}>
                {options.map((option, index) => (
                  <li
                    key={index}
                    className={styles['dropdown-item']}
                    onClick={() => {
                      setSelectedMissedRoles(option);
                      setIsOpenMissedRoles(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
        <li className={styles.limitsScopeItem}>
          <div className={styles['dropdown-container']}>
            <button
              className={styles['dropdown-button']}
              onClick={() => setIsOpenChannels(!isOpenChannels)}
            >
              {selectedChannels}
              <span className={styles['dropdown-arrow']}>▼</span>
            </button>
            {isOpenChannels && (
              <ul className={styles['dropdown-list']}>
                {options.map((option, index) => (
                  <li
                    key={index}
                    className={styles['dropdown-item']}
                    onClick={() => {
                      setSelectedChannels(option);
                      setIsOpenChannels(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
        <li className={styles.limitsScopeItem}>
          <div className={styles['dropdown-container']}>
            <button
              className={styles['dropdown-button']}
              onClick={() => setIsOpenMissedChannels(!isOpenMissedChannels)}
            >
              {selectedMissedChannel}
              <span className={styles['dropdown-arrow']}>▼</span>
            </button>
            {isOpenMissedChannels && (
              <ul className={styles['dropdown-list']}>
                {options.map((option, index) => (
                  <li
                    key={index}
                    className={styles['dropdown-item']}
                    onClick={() => {
                      setSelectedMissedChannels(option);
                      setIsOpenMissedChannels(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LimitsScope;

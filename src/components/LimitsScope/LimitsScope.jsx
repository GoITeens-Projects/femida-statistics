import { useState } from 'react';
import styles from './LimitsScope.module.css';
import Shadow from '../Shadow/Shadow';
import { useDispatch } from 'react-redux';
import { toast, Bounce } from 'react-toastify';

const LimitsScope = () => {
  const dispatch = useDispatch();
  const [isIgnoreAdmins, setIsIgnoreAdmins] = useState(false);
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
  const options = ['Адміністратор', 'Користувач', 'Модератор'];

  const handleSaveLimits = evt => {
    evt.preventDefault();
    // dispatch({
    //   type: 'limits',
    //   settings: {
    //     actions: {
    //       ignoreAdmins: isIgnoreAdmins,
    //     },
    //     targetRoles: selectedRoles,
    //     missedRoles: selectedMissedRoles,
    //     targetChannels: selectedChannels,
    //     missedChannels: selectedMissedChannel,
    //   },
    // });
    toast.success('Область дії загальних лімітів збережено', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      transition: Bounce,
    });
  };

  return (
    <div className={styles.limitsScope}>
      <div className={styles.limitsScopeBlock}>
        <div className={styles.limitsScopeBox}>
          <label className={styles.limitsScopesCheckboxLabel}>
            <input
              type="checkbox"
              onChange={evt => {
                setIsIgnoreAdmins(evt.target.checked);
              }}
            />
            <span className={styles.limitsScopesCheckboxSpan}></span>
          </label>
          <p className={styles.limitsScopeSubtitle}>
            Не поширювати на Адміністраторів і Модераторів
          </p>
        </div>
      </div>
      <button
        type="button"
        className={styles.saveLimitsBtn}
        onClick={handleSaveLimits}
      >
        Збрегети дії загальних лімітів
      </button>
      <ul className={styles.limitsScopeList}>
        <li className={styles.limitsScopeItem}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
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
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
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
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
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
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
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

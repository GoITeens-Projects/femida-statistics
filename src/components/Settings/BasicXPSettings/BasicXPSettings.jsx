import s from './BasicXPSettings.module.css';
import Shadow from '../../Shadow/Shadow';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
  selectSettingsTextChannels,
  selectSettingsVoiceChannels,
} from '../../../redux/settings/selectors';

export const BasicXPSettings = () => {
  const textChannels = useSelector(selectSettingsTextChannels);
  const voiceChannels = useSelector(selectSettingsVoiceChannels);
  const [checked, setChecked] = useState('коефіцієнт');
  const [isIgnoreAdmins, setIsIgnoreAdmins] = useState(false);
  const [isOpenRoles, setIsOpenRoles] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState('Цільові ролі');
  const [isOpenChannels, setIsOpenChannels] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const options = ['Адміністратор', 'Користувач', 'Модератор'];
  const channels = [...textChannels, ...voiceChannels];

  const onChecked = el => {
    setChecked(el);
  };

  const onChennelChoose = channel => {
    let newArray = [];
    if (selectedChannels.includes(channel)) {
      newArray = selectedChannels.filter(el => {
        const fltr = Object.values(el).includes(channel.id);
        console.log('fltr', fltr);
        return !fltr;
      });
    } else {
      newArray = [channel, ...selectedChannels];
    }
    console.log('new:', newArray);
    setSelectedChannels(newArray);
  };
  return (
    <div className={s['container']}>
      <Shadow
        leftFirst={-7}
        widthFirst={5}
        heightSecond={5}
        rightSecond={3}
        bottomSecond={-7}
        backgroundBoth={'var(--chart-accent-color)'}
        borderColorBoth={'var(--border-accent-color)'}
      />
      <ul className={s['list']}>
        <li>
          <p className={s['subtitle']}>За повідомлення</p>
          <label className={s['label']}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var( --shadow-settings-border)'}
            />

            <input type="number" className={s['input']} />
          </label>
        </li>
        <li>
          <p className={s['subtitle']}>За войси</p>
          <label className={s['label']}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var( --shadow-settings-border)'}
            />

            <input type="number" className={s['input']} />
          </label>
        </li>
        <li>
          <p className={s['subtitle']}>За трибуну</p>
          <label className={s['label']}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var( --shadow-settings-border)'}
            />

            <input type="number" className={s['input']} />
          </label>
        </li>
        <li>
          <p className={s['subtitle']}>За буст</p>
          <label className={s['label']}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var( --shadow-settings-border)'}
            />

            <input type="number" className={s['input']} />
          </label>
        </li>
      </ul>
      <div className={s['subcontainer']}>
        <p className={s['subtitle']}>Надбавка студентам</p>
        <div className={s['checkboxMainCountainer']}>
          <div className={s['checkbox-container']}>
            <label className={s.limitsScopesCheckboxLabel}>
              <input
                type="checkbox"
                onChange={() => onChecked('коефіцієнт')}
                checked={checked === 'коефіцієнт'}
              />
              <span className={s.limitsScopesCheckboxSpan}></span>
            </label>
            <p className={s.limitsScopeSubtitle}>Коефіцієнт</p>
          </div>
          <div className={s['checkbox-container']}>
            <label className={s.limitsScopesCheckboxLabel}>
              <input
                type="checkbox"
                onChange={() => onChecked('бали')}
                checked={checked === 'бали'}
              />
              <span className={s.limitsScopesCheckboxSpan}></span>
            </label>
            <p className={s.limitsScopeSubtitle}>Кількість ХР</p>
          </div>
        </div>
        <label className={s['students-label']}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var( --shadow-settings-border)'}
          />
          <input type="number" className={s['input']} />
        </label>
      </div>
      <div className={s.limitsScopeBox}>
        <label className={s.limitsScopesCheckboxLabel}>
          <input
            type="checkbox"
            onChange={evt => {
              setIsIgnoreAdmins(evt.target.checked);
            }}
          />
          <span className={s.limitsScopesCheckboxSpan}></span>
        </label>
        <p className={s.limitsScopeSubtitle}>
          Не поширювати на Адміністраторів і Модераторів
        </p>
      </div>
      <ul className={s.limitsScopeList}>
        <li className={s.limitsScopeItem}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
          <div className={s['dropdown-container']}>
            <button
              className={s['dropdown-button']}
              onClick={() => setIsOpenRoles(!isOpenRoles)}
            >
              {selectedRoles}
              <span className={s['dropdown-arrow']}>▼</span>
            </button>
            {isOpenRoles && (
              <ul className={s['dropdown-list']}>
                {options.map((option, index) => (
                  <li key={index} className={s['dropdown-item']}>
                    {option}
                    <div className={s.limitsScopeBox}>
                      <label className={s.limitsScopesCheckboxLabel}>
                        <input
                          type="checkbox"
                          onChange={evt => {
                            setIsIgnoreAdmins(evt.target.checked);
                          }}
                        />
                        <span className={s.limitsScopesCheckboxSpan}></span>
                      </label>
                      <p className={s.limitsScopeSubtitle}>
                        Не поширювати на Адміністраторів і Модераторів
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
        <li className={s.limitsScopeItem}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'var(--shadow-secondary-border)'}
            borderColorBoth={'var(--chart-accent-color)'}
          />
          <div className={s['dropdown-container']}>
            <button
              className={s['dropdown-button']}
              onClick={() => setIsOpenChannels(!isOpenChannels)}
            >
              {selectedChannels.length > 0
                ? selectedChannels.map(ch => ch.name).join('; ').length > 40
                  ? `${selectedChannels
                      .map(ch => ch.name)
                      .join('; ')
                      .slice(0, 40)}...`
                  : selectedChannels.map(ch => ch.name).join('; ')
                : 'Цільові канали'}
              <span className={s['dropdown-arrow']}>▼</span>
            </button>
            {isOpenChannels && (
              <ul className={s['dropdown-list']}>
                {channels.map((option, index) => (
                  <li key={index} className={s['dropdown-item']}>
                    <div className={s.limitsScopeBox}>
                      <label className={s.limitsScopesCheckboxLabel}>
                        <input
                          type="checkbox"
                          onChange={() => {
                            onChennelChoose(option);
                          }}
                          checked={selectedChannels.includes(option)}
                        />
                        <span className={s.limitsScopesCheckboxSpan}></span>
                      </label>
                    </div>
                    {option.name}
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

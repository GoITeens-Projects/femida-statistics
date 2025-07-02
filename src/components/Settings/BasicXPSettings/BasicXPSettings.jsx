import s from './BasicXPSettings.module.css';
import Shadow from '../../Shadow/Shadow';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {
  selectSettingsTextChannels,
  selectSettingsVoiceChannels,
} from '../../../redux/settings/selectors';

export const BasicXPSettings = (
 { thisMessage,
  thisVoice,
  thisStage,
  thisBoost,
  thisVoiceWithAdmin,
  // thisStudentsK
  thisInvite,
  onSubmit}
) => {
  const textChannels = useSelector(selectSettingsTextChannels);
  const voiceChannels = useSelector(selectSettingsVoiceChannels);
  const [studentsK, setStudentsK] = useState(0);
  const [message, setMessage] = useState(thisMessage);
  const [voice, setVoice] = useState(thisVoice);
  const [stage, setStage] = useState(thisStage);
  const [boost, setBoost] = useState(thisBoost);
  const [voiceWithAdmin, setVoiceWithAdmin] = useState(thisVoiceWithAdmin);
  const [invite, setInvite] = useState(thisInvite);
  const [isIgnoreAdmins, setIsIgnoreAdmins] = useState(false);
  const [isOpenRoles, setIsOpenRoles] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState('Цільові ролі');
  const [isOpenChannels, setIsOpenChannels] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const options = ['Адміністратор', 'Користувач', 'Модератор'];
  const channels = [...textChannels, ...voiceChannels];

  // const onChecked = el => {
  //   setChecked(el);
  // };
  console.log('message', message);
  console.log('thisMessage', thisMessage);

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
          <div className={s['label']}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var( --shadow-settings-border)'}
            />

            <input
              type="number"
              name="message"
              value={`${message}`}
              onChange={e => setMessage(Number(e.currentTarget.value))}
              className={s['input']}
            />
          </div>
        </li>
        <li>
          <p className={s['subtitle']}>За войси</p>
          <div className={s['label']}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var( --shadow-settings-border)'}
            />

            <input
              type="number"
              name="voice"
              value={`${voice}`}
              onChange={e => setVoice(Number(e.currentTarget.value))}
              className={s['input']}
            />
          </div>
        </li>
        <li>
          <p className={s['subtitle']}>За трибуну</p>
          <div className={s['label']}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var( --shadow-settings-border)'}
            />

            <input
              type="number"
              name="stage"
              value={`${stage}`}
              onChange={e => setStage(Number(e.currentTarget.value))}
              className={s['input']}
            />
          </div>
        </li>
        <li>
          <p className={s['subtitle']}>За буст</p>
          <div className={s['label']}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var( --shadow-settings-border)'}
            />

            <input
              type="number"
              name="boost"
              value={`${boost}`}
              onChange={e => setBoost(Number(e.currentTarget.value))}
              className={s['input']}
            />
          </div>
        </li>
        <li>
          <p className={s['subtitle']}>За войс з адміном</p>
          <div className={s['label']}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var( --shadow-settings-border)'}
            />

            <input
              type="number"
              name="voiceWithAdmin"
              value={`${voiceWithAdmin}`}
              onChange={e => setVoiceWithAdmin(Number(e.currentTarget.value))}
              className={s['input']}
            />
          </div>
        </li>
        <li>
          <p className={s['subtitle']}>За запрошення</p>
          <div className={s['label']}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var( --shadow-settings-border)'}
            />

            <input
              type="number"
              name="invite"
              value={`${invite}`}
              onChange={e => setInvite(Number(e.currentTarget.value))}
              className={s['input']}
            />
          </div>
        </li>
        <li>
          <p className={s['subtitle']}>Коефіцієнт набавки студентам</p>
          <div className={s['label']}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var( --shadow-settings-border)'}
            />

            <input
              type="number"
              name="studentsK"
              value={`${studentsK}`}
              onChange={e => setStudentsK(Number(e.currentTarget.value))}
              className={s['input']}
            />
          </div>
        </li>
      </ul>

      {/* <div className={s.limitsScopeBox}>
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
      <ul className={s.limitsScopeList}> */}
        {/* <li className={s.limitsScopeItem}>
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
                    <p className={s.limitsScopeSubtitle}>{option.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      </ul> */}
      <button
            type="button"
            className={s['confirm-changes-button']}
            onClick={()=>onSubmit(message, voice, stage, boost, voiceWithAdmin, invite)}
          >
            Підтвердити зміни
          </button>
    </div>
  );
};

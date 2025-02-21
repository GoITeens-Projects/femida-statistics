import styles from './Limits.module.css';
import Shadow from 'components/Shadow/Shadow';
import { Trash2, ChevronDown } from 'lucide-react';
import limitsScopeStyles from '../../LimitsScope/LimitsScope.module.css';
import { useState } from 'react';

const LimitsList = ({
  events,
  targetRoles,
  handleDeleteEvent,
  toggleEventDetails,
  handleCoefficientChange,
  openEvents,
}) => {
  const [isOpenRoles, setIsOpenRoles] = useState(false);
  const [selectedTargetRoles, setSelectedTargetRoles] = useState([]);
  
  return (
    <>
      {events.length !== 0 && (
        <ul className={styles.eventsList}>
          {events.map((event, index) => {
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);
            const testArr = [];
            const filtredRoles = targetRoles.filter(
              (targetRole, index) => targetRole.id === event.targetRoles[index]
            );

            console.log(filtredRoles);

            if (event.activities.messages === true) {
              testArr.push('Спілкування в текстових каналах');
            }
            if (event.activities.voice === true) {
              testArr.push('Спілкування в голосових чатах');
            }
            if (event.activities.stage === true) {
              testArr.push('Перебування на трибунах');
            }
            if (event.activities.boosts === true) {
              testArr.push('Буст серверу');
            }

            return (
              <li key={index} className={styles.eventsItem}>
                <p className={styles.eventsText}>
                  Ліміт з
                  <span className={styles.eventSpan}>
                    {startDate.getDate()}/{startDate.getMonth() + 1}/
                    {startDate.getFullYear()}
                  </span>
                  до
                  <span className={styles.eventSpan}>
                    {endDate.getDate()}/{endDate.getMonth() + 1}/
                    {endDate.getFullYear()}
                  </span>
                  за
                  <span className={styles.eventSpan}>{testArr.join(', ')}</span>
                </p>
                <div className={styles.eventsBox}>
                  <button
                    type="button"
                    className={styles.deleteEventBtn}
                    onClick={handleDeleteEvent}
                    data-id={event._id}
                  >
                    <Trash2 />
                  </button>
                  <button
                    type="button"
                    className={styles.showMoreEventBtn}
                    onClick={() => toggleEventDetails(index)}
                  >
                    <ChevronDown />
                  </button>
                </div>
                {openEvents[index] && (
                  <div className={styles.fullEventBox}>
                    <h3 className={styles.fullEventTitle}>Коефіцієнт</h3>
                    <div className={styles.fullEventCoefficientBox}>
                      {/* <input type="text" value={event.kLimit} /> */}
                      {/* {event.kLimit} */}
                      <input
                        type="text"
                        className={styles.periodOfLimitsCoefficientInput}
                        onChange={e => handleCoefficientChange(e, index)}
                        value={event.kLimit}
                        maxLength="6"
                      />
                      <Shadow
                        leftFirst={-7}
                        widthFirst={5}
                        heightSecond={5}
                        rightSecond={3}
                        bottomSecond={-7}
                        backgroundBoth={'var(--shadow-secondary-border)'}
                        borderColorBoth={'var(--chart-accent-color)'}
                      />
                    </div>
                    <div className={styles.fullEventTargesBox}>
                      <div className={styles.fullEventTargetRolesBox}>
                        <h3 className={styles.fullEventTitle}>Цільові ролі</h3>
                        <div className={styles.fullEventTargetRolesBlock}>
                          {/* <p>{event.targetRoles.join(', ')}</p>
                            <Shadow
                              leftFirst={-7}
                              widthFirst={5}
                              heightSecond={5}
                              rightSecond={3}
                              bottomSecond={-7}
                              backgroundBoth={'var(--shadow-secondary-border)'}
                              borderColorBoth={'var(--chart-accent-color)'}
                            /> */}
                          {/* <p>
                              {filtredRoles.map(role => role.name).join(', ')}
                            </p> */}
                          <div
                            className={limitsScopeStyles['dropdown-container']}
                          >
                            <button
                              className={limitsScopeStyles['dropdown-button']}
                              onClick={() => setIsOpenRoles(!isOpenRoles)}
                            >
                              {selectedTargetRoles.length > 0
                                ? selectedTargetRoles
                                    .map(role => role.name)
                                    .join(', ')
                                : 'Цільові ролі'}
                              <span
                                className={limitsScopeStyles['dropdown-arrow']}
                              >
                                ▼
                              </span>
                            </button>
                            {isOpenRoles && (
                              <ul
                                className={limitsScopeStyles['dropdown-list']}
                              >
                                {targetRoles.map((targetRole, index) => (
                                  <li
                                    key={targetRole.id}
                                    className={
                                      limitsScopeStyles['dropdown-item']
                                    }
                                  >
                                    <label
                                      className={
                                        styles.periodOfLimitsCheckboxLabel
                                      }
                                    >
                                      <input
                                        type="checkbox"
                                        checked={filtredRoles.includes(
                                          targetRole
                                        )}
                                        onChange={evt =>
                                          setSelectedTargetRoles(prevState => {
                                            if (evt.target.checked) {
                                              return [...prevState, targetRole];
                                            } else {
                                              return prevState.filter(
                                                item => item !== targetRole
                                              );
                                            }
                                          })
                                        }
                                      />
                                      <span
                                        className={
                                          styles.periodOfLimitsCheckboxSpan
                                        }
                                      ></span>
                                    </label>
                                    <p
                                      className={styles.periodOfLimitsSubtitle}
                                      onClick={() => {
                                        const isSelected =
                                          selectedTargetRoles.includes(
                                            targetRole
                                          );
                                        setSelectedTargetRoles(prevState => {
                                          if (!isSelected) {
                                            return [...prevState, targetRole];
                                          } else {
                                            return prevState.filter(
                                              item => item !== targetRole
                                            );
                                          }
                                        });
                                      }}
                                      style={{
                                        color: targetRole.color,
                                        // textShadow: '0px 0px 10px #DEAB9A',
                                      }}
                                    >
                                      {targetRole.name}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={styles.fullEventTargetChannelsBox}>
                        <h3 className={styles.fullEventTitle}>
                          Цільові канали
                        </h3>
                        <div className={styles.fullEventTargetChannelsBlock}>
                          <p>{event.targetChannels.join(', ')}</p>
                          <Shadow
                            leftFirst={-7}
                            widthFirst={5}
                            heightSecond={5}
                            rightSecond={3}
                            bottomSecond={-7}
                            backgroundBoth={'var(--shadow-secondary-border)'}
                            borderColorBoth={'var(--chart-accent-color)'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default LimitsList;

import styles from './Tops.module.css';
import TopSection from 'components/TopSection/TopSection';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completeLogs } from '../../redux/statistics/operation';
import {
  selectCompletedMessagesLogs,
  selectCompletedStagesLogs,
  selectCompletedVoicesLogs,
  selectMessagesLogs,
} from '../../redux/statistics/selectors';
import { selectFilterUnit } from '../../redux/filter/selectors';

const TopChannels = ({ type }) => {
  const logs = useSelector(selectMessagesLogs);
  const messageLogs = useSelector(selectCompletedMessagesLogs);
  const voiceLogs = useSelector(selectCompletedVoicesLogs);
  const stageLogs = useSelector(selectCompletedStagesLogs);
  const unit = useSelector(selectFilterUnit)
  const dispatch = useDispatch();

  useEffect(() => {
    if (logs.length === 0) {
      dispatch(completeLogs());
      console.log('logs:', logs);
    }
  }, [dispatch, logs, messageLogs]);

  const currentLogs =
    type === 'chat'
      ? messageLogs
      : type === 'voice' && unit === 'minutes'
      ? voiceLogs.map(log => {
          return { ...log, count: Math.round(log.count.minutes) };
        })
      : type === 'voice' && unit === 'hours'
      ? voiceLogs.map(log => {
          return {
            ...log, 
            count: parseFloat(log.count.hours.toFixed(2)),
          };
        })
      : type === 'stage' && unit === 'minutes'
      ? stageLogs.map(log => {
          return { ...log,  count: Math.round(log.count.minutes) };
        })
      : stageLogs.map(log => {
          return {
            ...log, 
            count: parseFloat(log.count.hours.toFixed(2)),
          };
        });

  return (
    <>
      <div className={`${styles.topsBox}`}>
        {logs.length > 0 && (
          <>
            <TopSection
              type={type}
              toArr={currentLogs}
              title={'Топ учасників'}
              isChannel={false}
            />
            <TopSection
              type={type}
              toArr={currentLogs}
              title={'Топ каналів (в розробці)'}
              isChannel={true}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TopChannels;

import styles from './Tops.module.css';
import TopSection from 'components/TopSection/TopSection';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completeMessagesLogs } from '../../redux/statistics/operation';

const TopChannels = () => {
  const logs = useSelector(state => state.statistics.completedMessagesLogs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (logs.length === 0) {
      dispatch(completeMessagesLogs());
    }
  }, [dispatch, logs]);

  return (
    <>
      <div className={`${styles.topsBox}`}>
        {logs.length > 0 ? (
          <>
            <TopSection
              toArr={logs}
              title={'Топ учасників'}
              isChannel={false}
            />
            <TopSection toArr={logs} title={'Топ каналів'} isChannel={true} />
          </>
        ):
        (<p>Loading...</p>)}
      </div>
    </>
  );
};

export default TopChannels;

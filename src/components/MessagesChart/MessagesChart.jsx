import styles from './MessagesChart.module.css'; // Підключаємо модуль стилів
import {
  BarChart,
  CartesianGrid,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';
import { messagesData } from './DataServerMessages';
import { CustomTooltip } from './CustomTooltip/CustomTooltip';
import { useSelector } from 'react-redux';
import {
  selectFilterUnit,
  selectWindowWidth,
} from '../../redux/filter/selectors';
import {
  selectMessagesCount,
  selectStageActivitiesCount,
  selectvoiceActivitiesCount,
} from '../../redux/statistics/selectors';
import Shadow from 'components/Shadow/Shadow';

export const MessagesChart = ({ type, include }) => {
  const messages = useSelector(selectMessagesCount);
  const voice = useSelector(selectvoiceActivitiesCount);
  const stage = useSelector(selectStageActivitiesCount);
  const unit = useSelector(selectFilterUnit);
  const ww = useSelector(selectWindowWidth);
  const size = ww * 0.85 - 100;

  // console.log("messages", data);
  console.log('stage', stage);
  const data =
    type === 'chat'
      ? messages
      : type === 'voice' && unit === 'minutes'
      ? voice.map(log => {
          return { time: log.time, count: Math.round(log.count.minutes) };
        })
      : type === 'voice' && unit === 'hours'
      ? voice.map(log => {
          return {
            time: log.time,
            count: parseFloat(log.count.hours.toFixed(2)),
          };
        })
      : type === 'stage' && unit === 'minutes'
      ? stage.map(log => {
          return { time: log.time, count: Math.round(log.count.minutes) };
        })
      : stage.map(log => {
          return {
            time: log.time,
            count: parseFloat(log.count.hours.toFixed(2)),
          };
        });

  // if (type !== 'chat' && unit === 'minutes'){
  //   data = data.map(log => {return {time: log.time, count: log.minutes}})
  // } else if (type !== 'chat' && unit === 'hours') {
  //   data = data.map(log => {return {time: log.time, count: log.hours}})
  // }

  console.log('data', data);

  let theMostActiveNum = 0;
  let theMostActiveStr = '';
  let theLessActiveNum = data[0].count;
  let theLessActiveStr = data[0].time;

  data.forEach(log => {
    if (log.count >= theMostActiveNum) {
      theMostActiveNum = log.count;
      theMostActiveStr = log.time;
    }
    if (log.count <= theLessActiveNum) {
      theLessActiveNum = log.count;
      theLessActiveStr = log.time;
    }
  });
  return (
    <>
      <section>
        <div>
          <h1 className={styles.messagesChart__title}>
            {type === 'chat'
              ? 'Повідомлення'
              : type === 'voice'
              ? 'Голосові канали'
              : 'Трибуна'}
          </h1>
          <p className={styles.messagesChart__description}>
            {type === 'chat'
              ? 'Загальна кількість надісланих повідомлень на сервері'
              : type === 'voice'
              ? 'Загальна кількість часу, проведеного у голосових каналас'
              : 'Загальна кількість часуб проведеного на трибуні'}
          </p>

          <div className={styles.messagesChart__border}>
            <Shadow
              leftFirst={-7}
              widthFirst={5}
              heightSecond={5}
              rightSecond={3}
              bottomSecond={-7}
              backgroundBoth={'#6EABD4'}
              borderColorBoth={'#558DB2'}
            />
            <div className={styles.messagesChart__statistics}>
              <div className={styles.messagesChart__statItem}>
                <p className={styles.messagesChart__statLabel}>
                {type === 'chat'
              ? 'Найбільша кількість повідомлень'
              : 'Найбільша кількість часу'
              }
                  
                </p>
                <p className={styles.messagesChart__statValue}>
                  {theMostActiveNum}
                  {type === 'chat'
                    ? `(${theMostActiveStr})`
                    : unit === 'minutes'
                    ? `хв (${theMostActiveStr})`
                    : `год (${theMostActiveStr})`}
                </p>
              </div>
              <div className={styles.messagesChart__statItem}>
                <p className={styles.messagesChart__statLabel__2}>
                {type === 'chat'
              ? 'Найменша кількість повідомлень'
              : 'Найменша кількість часу'
              }
                </p>
                <p className={styles.messagesChart__statLabel__2}>
                  {theLessActiveNum}
                  {type === 'chat'
                    ? `(${theLessActiveStr})`
                    : unit === 'minutes'
                    ? `хв (${theLessActiveStr})`
                    : `год (${theLessActiveStr})`}
                </p>
              </div>
            </div>

            <div className={styles.messagesChart__chartWrapper}>
              <BarChart
                width={size}
                height={310}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 12, stroke: 'var(--text-accent-color)' }}
                  axisLine={{
                    stroke: 'var(--bg-accent-color)',
                    strokeWidth: 2,
                  }}
                  tickLine={{ stroke: 'var(--bg-accent-color)' }}
                />
                <YAxis
                  axisLine={false}
                  tick={{ stroke: 'var(--text-accent-color)', dx: -3 }}
                  tickLine={false}
                />
                <CartesianGrid
                  stroke="var(--chart-line-color)"
                  strokeWidth={2}
                  vertical={false}
                />
                <Tooltip content={<CustomTooltip type={type} unit={unit} />} />
                <Bar
                  dataKey="count"
                  fill="var(--chart-accent-color)"
                  activeBar={<Rectangle fill="var(--shadow-secondary-color)" />}
                />
              </BarChart>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

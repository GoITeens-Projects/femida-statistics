import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styles from './StatusChart.module.css';
import { CustomTooltip } from './CustomTooltip/CustomTooltip';
import { useSelector } from 'react-redux';
import { selectWindowWidth } from '../../redux/filter/selectors';
import { selectMembersStatuses } from '../../redux/statistics/selectors';
import { useState } from 'react';
import Shadow from 'components/Shadow/Shadow';

export const StatusChart = () => {
  const membersStatuses = useSelector(selectMembersStatuses);
  const ww = useSelector(selectWindowWidth);
  const size = ww * 0.85 - 100;

  const dataSize = membersStatuses.length;
  const lastOne = membersStatuses[dataSize - 1];

  const savedClickStates = JSON.parse(
    localStorage.getItem('statusChartClickStates')
  ) || {
    clickOnline: true,
    clickAway: false,
    clickDnd: false,
    clickOffline: false,
  };

  const [clickStates, setClickStates] = useState(savedClickStates);
  const [hideStates, setHideStates] = useState({
    online: false,
    away: false,
    dnd: false,
    offline: false,
  });

  const updateLocalStorage = newStates => {
    localStorage.setItem('statusChartClickStates', JSON.stringify(newStates));
  };

  const handleClick = status => {
    const statusKey = `click${status.charAt(0).toUpperCase() + status.slice(1)
      }`;

    // Онлайн завжди залишається активним
    if (status === 'online') {
      return;
    }

    const newHideStates = {
      online: true,
      away: true,
      dnd: true,
      offline: true,
    };
    setHideStates(newHideStates);

    setTimeout(() => {
      setClickStates(prev => {
        const updated = { ...prev, [statusKey]: !prev[statusKey] };
        updateLocalStorage(updated);
        return updated;
      });
      setHideStates({ online: false, away: false, dnd: false, offline: false });
    }, 500);
  };

  return (
    <section>
      <div>
        <h1 className={styles.statusChartTitle}>Статус учасників</h1>
        <p className={styles.statusChartDescription}>
          Кількість учасників з різними статусами
        </p>

        <div className={styles.statusChartBorder}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'#6EABD4'}
            borderColorBoth={'#558DB2'}
          />
          <div className={styles.statusChartMembersSummary}>
            {['online', 'away', 'dnd', 'offline'].map((status, index) => (
              <div
                key={status}
                className={`${styles[`statusChartStatusItem${status.charAt(0).toUpperCase() + status.slice(1)}`]} ${!clickStates[
                  `click${status.charAt(0).toUpperCase() + status.slice(1)}`
                ]
                  ? styles.statusChartStatusItemInactive
                  : ''
                  }`}
                onClick={() => handleClick(status)}
              >
                <span className={styles.statusChartSpan}></span>
                <p
                  className={`${styles.statusChartStatusLabel} ${!clickStates[
                    `click${status.charAt(0).toUpperCase() + status.slice(1)}`
                  ]
                    ? styles.statusChartStatusItemTextInactive
                    : ''
                    }`}
                >
                  {status === 'online'
                    ? 'В мережі'
                    : status === 'away'
                      ? 'Відійшли'
                      : status === 'dnd'
                        ? 'Не турбувати'
                        : 'Не в мережі'}
                </p>
                <p
                  className={`${styles.statusChartStatusCount} ${!clickStates[
                    `click${status.charAt(0).toUpperCase() + status.slice(1)}`
                  ]
                    ? styles.statusChartStatusItemTextInactive2
                    : ''
                    }`}
                >
                  {index === 0
                    ? lastOne.online
                    : index === 1
                      ? lastOne.away
                      : index === 2
                        ? lastOne.dnd
                        : lastOne.offline}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.statusChartChartWrapper}>
            <AreaChart width={size} height={310} data={membersStatuses} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-online-accent-color)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--chart-online-accent-color)" stopOpacity={0.45} />
                </linearGradient>
                <linearGradient id="colorAway" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-inactive-color)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--chart-inactive-color)" stopOpacity={0.45} />
                </linearGradient>
                <linearGradient id="colorDnd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-offline-accent-color)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--chart-offline-accent-color)" stopOpacity={0.45} />
                </linearGradient>
                <linearGradient id="colorOffline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor=" --text-secondary-color" stopOpacity={0.2} />
                  <stop offset="95%" stopColor=" --text-secondary-color" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fontSize: 12, stroke: "#666" }} axisLine={{ stroke: "#ccc", strokeWidth: 2 }} tickLine={{ stroke: "#ccc" }} />
              <YAxis axisLine={false} tick={{ stroke: "#666", dx: -3 }} tickLine={false} allowDataOverflow={true} />
              <CartesianGrid stroke="#e0e0e0" strokeWidth={2} vertical={false} />
              <Tooltip content={<CustomTooltip />} />
              {['online', 'away', 'dnd', 'offline'].map((status) => (
                clickStates[`click${status.charAt(0).toUpperCase() + status.slice(1)}`] && (
                  <Area
                    key={status}
                    type="monotone"
                    dataKey={status}
                    stroke={status === 'online' ? "var(--chart-online-accent-color)" : status === 'away' ? "var(--chart-inactive-color)" : status === 'dnd' ? "var(--chart-offline-accent-color)" : " --text-secondary-color"}
                    fillOpacity={1}
                    fill={`url(#color${status.charAt(0).toUpperCase() + status.slice(1)})`}
                    name={status === 'online' ? "В мережі" : status === 'away' ? "Відійшли" : status === 'dnd' ? "Не турбувати" : "Не в мережі"}
                    className={styles[hideStates[status] ? 'fadeOut' : 'fadeIn']}
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                )
              ))}
            </AreaChart>
          </div>
        </div>
      </div>
    </section>
  );

};

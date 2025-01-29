import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchStatistics } from '../../redux/statistics/operation';
import styles from './ServerMembers.module.css';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { data } from './DataServerMmbers';
import { CustomTooltip } from './CustomTooltip/CustomTooltip';
import { selectWindowWidth } from '../../redux/filter/selectors';
import { selectServerMembers } from '../../redux/statistics/selectors';
import Shadow from 'components/Shadow/Shadow';

export const ServerMembers = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(selectServerMembers);
  const ww = useSelector(selectWindowWidth);
  const size = ww * 0.85 - 100;

  // Збережені стани кліків
  const savedClickStates = JSON.parse(
    localStorage.getItem('serverMembersClickStates')
  ) || {
    clickTotal: true,
    clickJoined: true,
    clickLeft: true,
  };

  const [clickStates, setClickStates] = useState(savedClickStates);
  const [hideStates, setHideStates] = useState({
    total: false,
    joined: false,
    left: false,
  });

  const updateLocalStorage = newStates => {
    localStorage.setItem('serverMembersClickStates', JSON.stringify(newStates));
  };

  const handleClick = status => {
    if (status === 'clickJoined') {
      return;
    }
    const newHideStates = { total: true, joined: true, left: true };
    setHideStates(newHideStates);

    setTimeout(() => {
      setClickStates(prev => {
        const updated = { ...prev, [status]: !prev[status] };
        updateLocalStorage(updated);
        return updated;
      });
      setHideStates({ total: false, joined: false, left: false });
    }, 500);
  };

  const dataSize = statistics.length;
  const lastOne = statistics[dataSize - 1];

  let totalJoined = 0;
  let totalLeft = 0;

  statistics.forEach(el => {
    totalJoined += el.joined;
    totalLeft += el.left;
  });

  return (
    <section>
      <div>
        <h1 className={styles.title}>Учасники</h1>
        <p className={styles.text}>Загальна кількість учасників на сервері</p>

        <div className={styles.containerBorder}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'#6EABD4'}
            borderColorBoth={'#558DB2'}
          />
          <div className={styles.containers}>
            <div
              className={`${styles.totalMembersContainer2} ${!clickStates.clickJoined
                ? styles.statusChartStatusItemInactive
                : ''
                }`}
              onClick={() => handleClick('clickJoined')}
            >
              {/* <span className={styles.statusChartSpan}></span> */}

              <p className={styles.totalMembersText}>Приєдналось</p>
              <p className={styles.totalMembersText}>{totalJoined}</p>
            </div>
            <div
              className={`${styles.totalMembersContainer3} ${!clickStates.clickLeft
                ? styles.statusChartStatusItemInactive
                : ''
                }`}
              onClick={() => handleClick('clickLeft')}
            >
              {/* <span className={styles.statusChartSpan}></span> */}
              <p className={styles.totalMembersText3}>Покинуло</p>
              <p className={styles.totalMembersText3}>{totalLeft}</p>
            </div>
            <div
              className={`${styles.totalMembersContainer} ${!clickStates.clickTotal
                ? styles.statusChartStatusItemInactive
                : ''
                }`}
              onClick={() => handleClick('clickTotal')}
            >
              {/* <span className={styles.statusChartSpan}></span> */}
              <p
                className={`${styles.totalMembersText} ${!clickStates.clickTotal
                  ? styles.statusChartStatusItemTextInactive
                  : ''
                  }`}
              >
                Кількість учасників
              </p>
              <p
                className={`${styles.totalMembersText} ${!clickStates.clickTotal
                  ? styles.statusChartStatusItemTextInactive2
                  : ''
                  }`}
              >
                {lastOne.total}
              </p>
            </div>
          </div>

          <div className={styles.containerSchedule}>
            <AreaChart
              width={size}
              height={310}
              data={statistics}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-accent-color)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-accent-color)"
                    stopOpacity={0.45}
                  />
                </linearGradient>
                <linearGradient id="colorJoined" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--btn-accent-color)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--btn-accent-color)"
                    stopOpacity={0.45}
                  />
                </linearGradient>
                <linearGradient id="colorLeft" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--legend-brighter-teal-color)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--legend-brighter-teal-color)"
                    stopOpacity={0.45}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, stroke: 'var(--text-accent-color)' }}
                axisLine={{ stroke: 'var(--bg-accent-color)', strokeWidth: 2 }}
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
              <Tooltip content={<CustomTooltip />} />

              {clickStates.clickTotal && (
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="var(--chart-accent-color)"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                  name="Загальна кількість учасників"
                  className={styles[hideStates.total ? 'fadeOut' : 'fadeIn']}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              )}
              {clickStates.clickJoined && (
                <Area
                  type="monotone"
                  dataKey="joined"
                  stroke="var(--btn-accent-color)"
                  fillOpacity={1}
                  fill="url(#colorJoined)"
                  name="Приєдналося"
                  className={styles[hideStates.joined ? 'fadeOut' : 'fadeIn']}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              )}
              {clickStates.clickLeft && (
                <Area
                  type="monotone"
                  dataKey="left"
                  stroke="var(--legend-brighter-teal-color)"
                  fillOpacity={1}
                  fill="url(#colorLeft)"
                  name="Покинуло"
                  className={styles[hideStates.left ? 'fadeOut' : 'fadeIn']}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              )}
            </AreaChart>
          </div>
        </div>
      </div>
    </section>
  );
};

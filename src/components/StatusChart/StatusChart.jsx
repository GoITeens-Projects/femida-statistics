import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './StatusChart.module.css';
import { statusData } from './DataStatus';
import { CustomTooltip } from './CustomTooltip/CustomTooltip';
import { useSelector } from 'react-redux';
import { selectWindowWidth } from '../../redux/filter/selectors';
import { useEffect, useState } from 'react';

export const StatusChart = () => {
    const ww = useSelector(selectWindowWidth);
    const size = (ww * 0.85) - 100;

    // Ініціалізація станів з localStorage
    const savedClickStates = JSON.parse(localStorage.getItem('statusChartClickStates')) || {
        clickAway: false,
        clickDnd: false,
        clickOffline: false,
    };

    const [clickAway, setClickAway] = useState(savedClickStates.clickAway);
    const [clickDnd, setClickDnd] = useState(savedClickStates.clickDnd);
    const [clickOffline, setClickOffline] = useState(savedClickStates.clickOffline);

    const [hideAway, setHideAway] = useState(false);
    const [hideDnd, setHideDnd] = useState(false);
    const [hideOffline, setHideOffline] = useState(false);

    const [reload, setReload] = useState(false);

    // Оновлення localStorage при зміні стану
    const updateLocalStorage = (newStates) => {
        localStorage.setItem('statusChartClickStates', JSON.stringify(newStates));
    };

    const handleClick = (status) => {
        switch (status) {
            case 'away':
                if (clickAway) {
                    if (clickDnd) {
                        setHideDnd(true)
                        setTimeout(() =>  setHideDnd(false), 1000);
                    }
                    if (clickOffline) {
                        setHideOffline(true)
                        setTimeout(() => setHideOffline(false), 1000);
                    }
               
                    setHideAway(true);
                    setTimeout(() => setClickAway(false), 1000);
                } else {
                    if (clickDnd) {
                        setHideDnd(true)
                        setTimeout(() =>  setHideDnd(false), 1000);
                    }
                    if (clickOffline) {
                        setHideOffline(true)
                        setTimeout(() => setHideOffline(false), 1000);
                    }
               
                    setClickAway(true);
                    setHideAway(false);
                }
                updateLocalStorage({ clickAway: !clickAway, clickDnd, clickOffline });
                break;
            case 'dnd':
                if (clickDnd) {
                    if (clickAway) {
                        setHideAway(true)
                        setTimeout(() =>  setHideAway(false), 1000);
                    }
                    if (clickOffline) {
                        setHideOffline(true)
                        setTimeout(() => setHideOffline(false), 1000);
                    }
               
                    setHideDnd(true);
                    setTimeout(() => setClickDnd(false), 1000);
                } else {
                    if (clickAway) {
                        setHideAway(true)
                        setTimeout(() =>  setHideAway(false), 1000);
                    }
                    if (clickOffline) {
                        setHideOffline(true)
                        setTimeout(() => setHideOffline(false), 1000);
                    }

                    setClickDnd(true);
                    setHideDnd(false);
                }
                updateLocalStorage({ clickAway, clickDnd: !clickDnd, clickOffline });
                break;
            case 'offline':
                if (clickOffline) {
                    if (clickAway) {
                        setHideAway(true)
                        setTimeout(() =>  setHideAway(false), 1000);
                    }
                    if (clickDnd) {
                        setHideDnd(true)
                        setTimeout(() => setHideDnd(false), 1000);
                    }
                    setHideOffline(true);
                    setTimeout(() => setClickOffline(false), 1000);
                } else {
                    if (clickAway) {
                        setHideAway(true)
                        setTimeout(() =>  setHideAway(false), 1000);
                    }
                    if (clickDnd) {
                        setHideDnd(true)
                        setTimeout(() => setHideDnd(false), 1000);
                    }
                    
                    setClickOffline(true);
                    setHideOffline(false);
                }
                updateLocalStorage({ clickAway, clickDnd, clickOffline: !clickOffline });
                break;
            default:
                break;
        }
    };


    return (
        <section>
            <div>
                <h1 className={styles.statusChart__title}>Статус учасників</h1>
                <p className={styles.statusChart__description}>Кількість учасників з різними статусами</p>

                <div className={styles.statusChart__border}>
                    <div className={styles.statusChart__membersSummary}>
                        <div className={styles.statusChart__statusItem__online} onClick={() => handleClick('online')}>
                            <p className={styles.statusChart__statusLabel}>В мережі</p>
                            <p className={styles.statusChart__statusCount}>320</p>
                        </div>
                        <div className={styles.statusChart__statusItem__away} onClick={() => handleClick('away')}>
                            <p className={styles.statusChart__statusLabel}>Відійшли</p>
                            <p className={styles.statusChart__statusCount}>180</p>
                        </div>
                        <div className={styles.statusChart__statusItem__dnd} onClick={() => handleClick('dnd')}>
                            <p className={styles.statusChart__statusLabel}>Не турбувати</p>
                            <p className={styles.statusChart__statusCount}>150</p>
                        </div>
                        <div className={styles.statusChart__statusItem__offline} onClick={() => handleClick('offline')}>
                            <p className={styles.statusChart__statusLabel}>Не в мережі</p>
                            <p className={styles.statusChart__statusCount}>3100</p>
                        </div>
                    </div>

                    <div className={styles.statusChart__chartWrapper}>
                        <AreaChart width={size} height={310} data={statusData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                                    <stop offset="5%" stopColor="#999999" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#999999" stopOpacity={0.2} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" tick={{ fontSize: 12, stroke: "#666" }}
                                axisLine={{ stroke: "#ccc", strokeWidth: 2 }} tickLine={{ stroke: "#ccc" }} />
                            <YAxis axisLine={false} tick={{ stroke: "#666", dx: -3 }} tickLine={false} allowDataOverflow={true} animationDuration={100000} />
                            <CartesianGrid stroke="#e0e0e0" strokeWidth={2} vertical={false} />
                            <Tooltip content={<CustomTooltip />} />
{!reload && <>
                            <Area
                                type="monotone"
                                dataKey="online"
                                stroke="var(--chart-online-accent-color)"
                                fillOpacity={1}
                                fill="url(#colorOnline)"
                                name="В мережі"
                                isAnimationActive={true}
                                    animationDuration={5000}
                            />

                            {clickAway && (
                                <Area
                                    type="monotone"
                                    dataKey="away"
                                    stroke="var(--chart-inactive-color)"
                                    fillOpacity={1}
                                    fill="url(#colorAway)"
                                    name="Відійшли"
                                    className={`${styles.area} ${hideAway ? styles.fadeOut :  styles.fadeIn}`}
                                    isAnimationActive={true}
                                    animationDuration={5000}
                                />
                            )}
                            {clickDnd && (
                                <Area
                                    type="monotone"
                                    dataKey="dnd"
                                    stroke="var(--chart-offline-accent-color)"
                                    fillOpacity={1}
                                    fill="url(#colorDnd)"
                                    name="Не турбувати"
                                    className={`${styles.area} ${hideDnd ? styles.fadeOut : styles.fadeIn}`}
                                    isAnimationActive={true}
                                    animationDuration={5000}
                                />
                            )}
                            {clickOffline && (
                                <Area
                                    type="monotone"
                                    dataKey="offline"
                                    stroke="#999999"
                                    fillOpacity={1}
                                    fill="url(#colorOffline)"
                                    name="Не в мережі"
                                    className={`${styles.area} ${hideOffline ? styles.fadeOut : styles.fadeIn}`}
                                    isAnimationActive={true}
                                    animationDuration={5000}
                                />
                            )}
                            </>}
                        </AreaChart>
                    </div>
                </div>
            </div>
        </section>
    );
};

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

    const savedClickStates = JSON.parse(localStorage.getItem('statusChartClickStates')) || {
        clickOnline: true,
        clickAway: false,
        clickDnd: false,
        clickOffline: false,
    };

    const [clickStates, setClickStates] = useState(savedClickStates);
    const [hideStates, setHideStates] = useState({ online: false, away: false, dnd: false, offline: false });

    const updateLocalStorage = (newStates) => {
        localStorage.setItem('statusChartClickStates', JSON.stringify(newStates));
    };

    const handleClick = (status) => {
        const statusKey = `click${status.charAt(0).toUpperCase() + status.slice(1)}`;

        // Онлайн завжди залишається активним
        if (status === 'online') {
            return;
        }

        const newHideStates = { online: true, away: true, dnd: true, offline: true };
        setHideStates(newHideStates);

        setTimeout(() => {
            setClickStates((prev) => {
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
                <h1 className={styles.statusChart__title}>Статус учасників</h1>
                <p className={styles.statusChart__description}>Кількість учасників з різними статусами</p>

                <div className={styles.statusChart__border}>
                    <div className={styles.statusChart__membersSummary}>
                        {['online', 'away', 'dnd', 'offline'].map((status, index) => (
                            <div
                                key={status}
                                className={`${styles[`statusChart__statusItem__${status}`]} ${!clickStates[`click${status.charAt(0).toUpperCase() + status.slice(1)}`] ? styles.statusChart__statusItem__inactive : ''}`}
                                onClick={() => handleClick(status)}
                            >
                                <span className={styles.statusChart_Span}></span>
                                <p className={`${styles.statusChart__statusLabel} ${!clickStates[`click${status.charAt(0).toUpperCase() + status.slice(1)}`] ? styles.statusChart__statusItem__text__inactive : ''}`}>
                                    {status === 'online' ? 'В мережі' : status === 'away' ? 'Відійшли' : status === 'dnd' ? 'Не турбувати' : 'Не в мережі'}
                                </p>
                                <p className={`${styles.statusChart__statusCount} ${!clickStates[`click${status.charAt(0).toUpperCase() + status.slice(1)}`] ? styles.statusChart__statusItem__text__inactive_2 : ''}`}>
                                    {index === 0 ? 320 : index === 1 ? 180 : index === 2 ? 150 : 3100}
                                </p>

                            </div>


                        ))}
                    </div>

                    <div className={styles.statusChart__chartWrapper}>
                        <AreaChart width={size} height={310} data={statusData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                                        stroke={status === 'online' ? "var(--chart-online-accent-color)" : status === 'away' ? "var(--chart-inactive-color)" : status === 'dnd' ? "var(--chart-offline-accent-color)" : "#999999"}
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

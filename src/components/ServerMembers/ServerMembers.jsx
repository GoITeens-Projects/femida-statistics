import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchStatistics } from '../../redux/statistics/operation';
import { CiFilter } from "react-icons/ci";
import styles from './ServerMembers.module.css'; // Підключаємо модуль стилів
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { data } from './DataServerMmbers';
import { CustomTooltip } from './CustomTooltip/CustomTooltip';
import { selectWindowWidth } from '../../redux/filter/selectors';

export const ServerMembers = () => {
    const dispatch = useDispatch();
    const statistics = useSelector(state => state.statistics); // Замініть на правильний шлях до вашого стейту

    const ww = useSelector(selectWindowWidth)
    const size = ww *0.85 - 100

    return (
        <section>
            <div>
                <h1 className={styles.title}>Учасники</h1>
                <p className={styles.text}>Загальна кількість учасників на сервері</p>

                <div className={styles.containerBorder}>
                    <div className={styles.containers}>
                        <div className={styles.totalMembersContainer}>
                            <p className={styles.totalMembersText}>Кількість учасників</p>
                            <p className={styles.totalMembersText}>3444</p>
                        </div>
                        <div className={styles.totalMembersContainer2}>
                            <p className={styles.totalMembersText}>Приєдналось</p>
                            <p className={styles.totalMembersText}>320</p>
                        </div>
                        <div className={styles.totalMembersContainer3}>
                            <p className={styles.totalMembersText_3}>Покинуло</p>
                            <p className={styles.totalMembersText_3}>198</p>
                        </div>
                    </div>

                    <div className={styles.containerSchedule}>
                        <AreaChart width={size} height={310} data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorJoined" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--btn-accent-color)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--btn-accent-color)" stopOpacity={0.45} />
                                </linearGradient>
                                <linearGradient id="colorLeft" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--legend-brighter-teal-color)" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="var(--legend-brighter-teal-color)" stopOpacity={0.45} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" tick={{ fontSize: 12, stroke: "var(--text-accent-color)" }}
                                axisLine={{ stroke: "var(--bg-accent-color)", strokeWidth: 2 }} tickLine={{ stroke: "var(--bg-accent-color)" }} />
                            <YAxis axisLine={false} tick={{ stroke: "var(--text-accent-color)", dx: -3 }} tickLine={false} />
                            <CartesianGrid stroke="var(--bg-accent-color)" strokeWidth={2} vertical={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="joined" stroke="var(--btn-accent-color)" fillOpacity={1} fill="url(#colorJoined)" name="Приєдналося" />
                            <Area type="monotone" dataKey="left" stroke="var(--legend-brighter-teal-color)" fillOpacity={1} fill="url(#colorLeft)" name="Покинуло" />
                        </AreaChart>
                    </div>
                </div>
            </div>
        </section>
    );
};
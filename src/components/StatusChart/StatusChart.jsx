import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './StatusChart.module.css';
import { statusData } from './DataStatus';
import { CustomTooltip } from './CustomTooltip/CustomTooltip';
import { useSelector } from 'react-redux';
import { selectWindowWidth } from '../../redux/filter/selectors';

export const StatusChart = () => {
    const ww = useSelector(selectWindowWidth)
    const size =( ww * 0.85) - 100
    return (
        <>
            <section>
                <div >
                    <h1 className={styles.statusChart__title}>Статус учасників</h1>
                    <p className={styles.statusChart__description}>Кількість учасників з різними статусами</p>

                    <div className={styles.statusChart__border}>
                        <div className={styles.statusChart__membersSummary}>
                            <div className={styles.statusChart__statusItem__online}>
                                <p className={styles.statusChart__statusLabel}>В мережі</p>
                                <p className={styles.statusChart__statusCount}>320</p>
                            </div>
                            <div className={styles.statusChart__statusItem__away}>
                                <p className={styles.statusChart__statusLabel}>Відійшли</p>
                                <p className={styles.statusChart__statusCount}>180</p>
                            </div>
                            <div className={styles.statusChart__statusItem__dnd}>
                                <p className={styles.statusChart__statusLabel}>Не турбувати</p>
                                <p className={styles.statusChart__statusCount}>150</p>
                            </div>
                            <div className={styles.statusChart__statusItem__offline}>
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
                                <YAxis axisLine={false} tick={{ stroke: "#666", dx: -3 }} tickLine={false} />
                                <CartesianGrid stroke="#e0e0e0" strokeWidth={2} vertical={false} />
                                <Tooltip content={<CustomTooltip />} />

                                <Area type="monotone" dataKey="online" stroke="var(--chart-online-accent-color)" fillOpacity={1} fill="url(#colorOnline)" name="В мережі" />
                                <Area type="monotone" dataKey="away" stroke="var(--chart-inactive-color)" fillOpacity={1} fill="url(#colorAway)" name="Відійшли" />
                                <Area type="monotone" dataKey="dnd" stroke="var(--chart-offline-accent-color)" fillOpacity={1} fill="url(#colorDnd)" name="Не турбувати" />
                                <Area type="monotone" dataKey="offline" stroke="#999999" fillOpacity={1} fill="url(#colorOffline)" name="Не в мережі" />
                            </AreaChart>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

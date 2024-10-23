import styles from './CustomTooltip.module.css';
import { statusData } from '../DataStatus'; // Імпортуємо дані статусів

export const CustomTooltip = ({ active, label }) => {
    if (active) {
        // Знаходимо дані для відповідної дати
        const dataPoint = statusData.find((data) => data.name === label);

        // Якщо дані знайдено, витягуємо значення для всіх статусів
        const onlineValue = dataPoint?.online || 0;
        const awayValue = dataPoint?.away || 0;
        const dndValue = dataPoint?.dnd || 0;
        const offlineValue = dataPoint?.offline || 0;

        return (
            <div className={styles.CustomTooltipContainer}>
                <p className={styles.dateToolTip}>{label}</p>
                <div className={styles.containerData}>
                    <div className={styles.row}>
                        <p className={styles.titleToolTip}>В мережі</p>
                        <p className={styles.numberToolTip}>{onlineValue}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.titleToolTip}>Відійшли</p>
                        <p className={styles.numberToolTip}>{awayValue}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.titleToolTip}>Не турбувати</p>
                        <p className={styles.numberToolTip}>{dndValue}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.titleToolTip}>Не в мережі</p>
                        <p className={styles.numberToolTip}>{offlineValue}</p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};
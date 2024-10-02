import styled from 'styled-components';
import styles from './CustomTooltip.module.css';

export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const onlineValue = payload[0]?.value || 0;
        const awayValue = payload[1]?.value || 0;
        const dndValue = payload[2]?.value || 0;
        const offlineValue = payload[3]?.value || 0;


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


import styled from 'styled-components';
import styles from './CustomTooltip.module.css';

export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const joinedValue = payload[0]?.value || 0;
        const leftValue = payload[1]?.value || 0;
        const totalValue = payload[0]?.payload?.total || 0;

        return (
            <div className={styles.CustomTooltipContainer}>
                <p className={styles.dateToolTip}>{label}</p>
                <div className={styles.containerData}>
                    <div className={styles.row}>
                        <p className={styles.titleToolTip}>Кількість учасників</p>
                        <p className={styles.numberToolTip}>{totalValue}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.titleToolTip}>Приєдналося</p>
                        <p className={styles.numberToolTip}>{joinedValue}</p>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.titleToolTip}>Покинуло</p>
                        <p className={styles.numberToolTip}>{leftValue}</p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

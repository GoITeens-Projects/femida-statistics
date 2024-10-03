import styles from './CustomTooltip.module.css';

export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const messagesValue = payload[0]?.value || 0; // Отримуємо значення кількості повідомлень за день

        return (
            <div className={styles.CustomTooltipContainer}>
                <p className={styles.dateToolTip}>{label}</p>
                <div className={styles.containerData}>
                    <div className={styles.row}>
                        <p className={styles.titleToolTip}>Кількість повідомлень</p>
                        <p className={styles.numberToolTip}>{messagesValue}</p> {/* Виводимо кількість повідомлень */}
                    </div>
                </div>
            </div>
        );
    }

    return null;
};
import styled from 'styled-components';
import styles from './CustomTooltip.module.css';
import { data } from '../DataServerMmbers'; // Імпортуємо дані статусів
import { useSelector } from 'react-redux';
import { selectServerMembers } from '../../../redux/statistics/selectors';

export const CustomTooltip = ({ active, label }) => {
    const members = useSelector(selectServerMembers)
    if (active) {
        // Знаходимо дані для відповідної дати
        const dataPoint = members.find((data) => data.name === label);

        // Отримуємо значення, використовуючи дані з statusData
        const totalValue = dataPoint?.total || 0; // Якщо є поле total
        const joinedValue = dataPoint?.joined || 0; // Змінюємо на ваше фактичне поле
        const leftValue = dataPoint?.left || 0; // Змінюємо на ваше фактичне поле

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

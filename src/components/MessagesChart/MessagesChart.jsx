import styles from './MessagesChart.module.css'; // Підключаємо модуль стилів
import { BarChart, CartesianGrid, Rectangle, Tooltip, XAxis, YAxis, Bar } from 'recharts';
import { messagesData } from './DataServerMessages';
import { CustomTooltip } from './CustomTooltip/CustomTooltip';
import { useSelector } from 'react-redux';
import { selectWindowWidth } from '../../redux/filter/selectors';
import {selectMessagesCount } from '../../redux/statistics/selectors';

export const MessagesChart = () => {
    const messages = useSelector(selectMessagesCount)
    const ww = useSelector(selectWindowWidth)
    const size =( ww * 0.85) - 100

    let theMostActiveNum = 0;
    let theMostActiveStr = '';
    let theLessActiveNum = messages[0].messages;
    let theLessActiveStr = messages[0].name;

    messages.forEach(log => {
        if(log.messages >= theMostActiveNum){
            theMostActiveNum = log.messages;
            theMostActiveStr = log.name;
        } 
        if(log.messages <= theLessActiveNum){
            theLessActiveNum = log.messages;
            theLessActiveStr = log.name
        }
    });
    return (
        <>
            <section>
                <div>
                    <h1 className={styles.messagesChart__title}>Повідомлення</h1>
                    <p className={styles.messagesChart__description}>Загальна кількість надісланих повідомлень на сервері</p>

                    <div className={styles.messagesChart__border}>
                        <div className={styles.messagesChart__statistics}>
                            <div className={styles.messagesChart__statItem}>
                                <p className={styles.messagesChart__statLabel}>Найбільша кількість повідомлень</p>
                                <p className={styles.messagesChart__statValue}>{theMostActiveNum} ({theMostActiveStr})</p>
                            </div>
                            <div className={styles.messagesChart__statItem}>
                                <p className={styles.messagesChart__statLabel__2}>Найменша кількість повідомлень</p>
                                <p className={styles.messagesChart__statLabel__2}>{theLessActiveNum} ({theLessActiveStr})</p>
                            </div>
                        </div>

                        <div className={styles.messagesChart__chartWrapper}>
                            <BarChart width={size} height={310} data={messages}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <XAxis dataKey="name" tick={{ fontSize: 12, stroke: "var(--text-accent-color)" }}
                                    axisLine={{ stroke: "var(--bg-accent-color)", strokeWidth: 2 }} tickLine={{ stroke: "var(--bg-accent-color)" }} />
                                <YAxis axisLine={false} tick={{ stroke: "var(--text-accent-color)", dx: -3 }} tickLine={false} />
                                <CartesianGrid stroke="var(--bg-accent-color)" strokeWidth={2} vertical={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="messages" fill='var(--chart-accent-color)' activeBar={<Rectangle fill='var(--shadow-secondary-color)' />} />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

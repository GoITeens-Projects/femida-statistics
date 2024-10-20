// import { selectWindowWidth } from 'redux/filter/selectors';
import { selectWindowWidth } from '../../redux/filter/selectors';
import { TopsGlobalBox } from 'components/TopSection/TopSection.styled';
import styles from '../TopSection/TopSection.module.css'
import { useSelector } from 'react-redux';

const MainTop = ({ topArr, title, isChannel, children }) => {
  const ww = useSelector(selectWindowWidth);

  const size = (ww * 0.85 - 120) / 2;

  return (
    <TopsGlobalBox size={size}>
      <h2 className={styles.topsTitle}>{title}</h2>
      <div className={styles.topsBox}>
        <div className={styles.topsHeaderBox}>
          <p className={styles.topsRank}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
              >
                <path
                  d="M0.666667 8H3.33333C3.7 8 4 7.7 4 7.33333C4 6.96667 3.7 6.66667 3.33333 6.66667H0.666667C0.3 6.66667 0 6.96667 0 7.33333C0 7.7 0.3 8 0.666667 8ZM0 0.666667C0 1.03333 0.3 1.33333 0.666667 1.33333H11.3333C11.7 1.33333 12 1.03333 12 0.666667C12 0.3 11.7 0 11.3333 0H0.666667C0.3 0 0 0.3 0 0.666667ZM0.666667 4.66667H7.33333C7.7 4.66667 8 4.36667 8 4C8 3.63333 7.7 3.33333 7.33333 3.33333H0.666667C0.3 3.33333 0 3.63333 0 4C0 4.36667 0.3 4.66667 0.666667 4.66667Z"
                  fill="#678F95"
                />
              </svg>
            </span>
            Ранг
          </p>
          <p className={styles.topsUserNamesTitle}>
            {isChannel === true ? 'Назва каналу' : 'Ім’я користувача'}
          </p>
          <p className={styles.topsMessagesQuantityTitle}>
            Кількість повідомлень
          </p>
        </div>
        <ul className={styles.topsList}>
          {topArr.map((top, idx) => {
            return (
              <li key={top.id} className={styles.topsItem}>
                <p className={styles.topsUserRankText}>{idx + 1}</p>
                {isChannel ? null : (
                  <img src={top.userAvatarUrl} className={styles.topsUserImg} />
                )}
                {/* <h2 className={styles.topsUsername}>{top.userName}</h2> */}
                {isChannel ? (
                  <h2 className={styles.topsChannel}>{top.userName}</h2>
                ) : (
                  <h2 className={styles.topsUsername}>{top.userName}</h2>
                )}
                <p className={styles.topsUserMessagesQuantityText}>
                  {top.messagesQuantity}
                </p>
              </li>
            );
          })}
        </ul>
        {children}
      </div>
    </TopsGlobalBox>
  );
};

export default MainTop;

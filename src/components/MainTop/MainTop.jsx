import {
  selectFilterUnit,
  selectWindowWidth,
} from '../../redux/filter/selectors';
import { TopsGlobalBox } from 'components/TopSection/TopSection.styled';
import styles from '../TopSection/TopSection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Shadow from 'components/Shadow/Shadow';
import { completeLogs } from '../../redux/statistics/operation';

const MainTop = ({ topArr, title, isChannel, children, type }) => {
  const ww = useSelector(selectWindowWidth);
  const unit = useSelector(selectFilterUnit);
  const dispatch = useDispatch()
  console.log('topArr.length', topArr[0]);

  const size = (ww * 0.85 - 120) / 2;
 setTimeout(()=> {
  if(topArr.length === 1 ){
    dispatch(completeLogs())
  }
 }, 90000)
  

  return (
    <TopsGlobalBox size={size}>
      <h2 className={styles.topsTitle}>{title}</h2>
      <div className={styles.topsBox}>
        <Shadow
          leftFirst={-7}
          widthFirst={5}
          heightSecond={5}
          rightSecond={3}
          bottomSecond={-7}
          backgroundBoth={'#6EABD4'}
          borderColorBoth={'#558DB2'}
        />
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
                  fill="--text-accent-color"
                />
              </svg>
            </span>
            Ранг
          </p>
          <p className={styles.topsUserNamesTitle}>
            {isChannel === true ? 'Назва каналу' : 'Ім’я користувача'}
          </p>
          <p className={styles.topsMessagesQuantityTitle}>
            {type === 'chat'
              ? 'Кількість повідомлень'
              : 'Кількість проведеного часу'}
          </p>
        </div>
        <ul className={styles.topsList}>
          {
          topArr.length === 1 ? <p>Loading</p>  : 
          topArr.map((top, idx) => {
            return (
              <li key={top.id} className={styles.topsItem}>
                <p className={styles.topsUserRankText}>{idx + 1}</p>
                {isChannel ? null : (
                  <img
                    src={top.avatar}
                    className={styles.topsUserImg}
                    alt={`${top.username} avatar`}
                  />
                )}
                {isChannel ? (
                  <h2 className={styles.topsChannel}>Канал</h2>
                ) : (
                  <h2 className={styles.topsUsername}>
                    {`${top.globalName ? top.globalName : ''} ${
                      top.username && top.globalName
                        ? `(${top.username})`
                        : top.username
                    }`.length > 51
                      ? `${`${top.globalname ? top.globalName : ''} ${
                          top.username ? top.username : ''
                        }`.slice(0, 51)}...`
                      : `${top.globalName ? top.globalName : ''} ${
                          top.username && top.globalName
                            ? `(${top.username})`
                            : top.username
                        }`}
                  </h2>
                )}
                {isChannel ? (
                  <p className={styles.topsUserMessagesQuantityText}>00</p>
                ) : (
                  <p className={styles.topsUserMessagesQuantityText}>
                    {top.count}{' '}
                    {type === 'chat'
                      ? ''
                      : type !== 'chat' && unit === 'minutes'
                      ? 'хв'
                      : 'год'}
                  </p>
                )}
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

// {/* <li key={top.id} className={styles.topsItem}>
//   <p className={styles.topsUserRankText}>{idx + 1}</p>
//   {isChannel ? null : (
//     <img src={top.avatar} className={styles.topsUserImg} alt="userImg" />
//   )}
//   {/* <h2 className={styles.topsUsername}>{top.userName}</h2> */}
//   {isChannel ? (
//     <h2 className={styles.topsChannel}>{top.username}</h2>
//   ) : (
//     <h2 className={styles.topsUsername}>{top.username}</h2>
//   )}
//   <p className={styles.topsUserMessagesQuantityText}>{top.count}</p>
// </li>; */}


import { SettingsNavigation } from 'components/Settings/SettingsNavigation/SettingsNavigation';
import styles from './GiftPage.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Vector from './Vector.svg'
import { useEffect, useState } from 'react';
import { fetchGifts, fetchUserName } from '../../../../redux/gift/operation';
import { FilterGift } from './FilterGift/FilterGift';
import Shadow from 'components/Shadow/Shadow';


export const GiftPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { giftRequests, usernames, loading } = useSelector(state => state.gifts);
  const [visibleCount, setVisibleCount] = useState(3); // Початково показуємо 3 записи

  useEffect(() => {
    dispatch(fetchGifts());
  }, [dispatch]);

  useEffect(() => {
    if (giftRequests.length > 0) {
      const ids = [...new Set(giftRequests.map(req => req.clientData?.discordId).filter(Boolean))].join(',');
      if (ids) {
        dispatch(fetchUserName(ids));
      }
    }
  }, [giftRequests, dispatch]);

  const handleBackClick = () => navigate("/settings");
  const handleLoadMore = () => setVisibleCount(prev => prev + 3);

  const visibleRequests = giftRequests.slice(0, visibleCount);

  return (
    <section>
      <SettingsNavigation onHandleBackClick={handleBackClick} onHandleSave={() => {}} />
      <div className={styles.Container}>
        <h1 className={styles.TitleBadWords}>Подарунки</h1>
        <div className={styles.FilterTitleContainer}>
          <img src={Vector} alt='svg' />
          <h3 className={styles.FilterTitle}>Фільтри</h3>
        </div>

        <div className={styles.FromContainer}>
          <Shadow leftFirst={-7} widthFirst={5} heightSecond={5} rightSecond={3} bottomSecond={-7} backgroundBoth={'#6EABD4'} borderColorBoth={'#558DB2'} />
          <table>
            <thead>
              <tr>
                <td className={styles.TableHeaderCell}>Ім’я користувача</td>
                <td className={styles.TableHeaderCell}>E-mail</td>
                <td className={styles.TableHeaderCell}>Рейтинг (XP)</td>
                <td className={styles.TableHeaderCell}>Поточний подарунок</td>
                <td className={styles.TableHeaderCell}>Адреса для надсилання</td>
                <td className={styles.TableHeaderCell}>Статус</td>
                <td className={styles.TableHeaderCell}>Коментар</td>
              </tr>
            </thead>
            <tbody>
              {visibleRequests.map((req) => {
                const discordId = req.clientData?.discordId;
                const user = usernames[discordId];
                const displayName = user
                  ? `${user.username} (${user.globalName})`
                  : discordId || 'Невідомо';

                return (
                  <tr key={req.id}>
                    <td className={styles.TableBodyCell}>
                      <div className={styles.UserCell}>
                        {user?.avatar && (
                          <img
                            src={user.avatar}
                            alt="avatar"
                            className={styles.UserAvatar}
                          />
                        )}
                        {displayName}
                      </div>
                    </td>
                    <td className={styles.TableBodyCell}>example@gmail.com</td>
                    <td className={styles.TableBodyCell}>{req.requestedGift.toReceive.presentXpPrice}</td>
                    <td className={styles.TableBodyCell}>{req.requestedGift.title}</td>
                    <td className={styles.TableBodyCell}>Адреса для надсилання</td>
                    <td className={styles.TableBodyCell}><button>очікується</button></td>
                    <td className={styles.TableBodyCell}>Коментар/нотатка</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Кнопка для завантаження ще */}
          {visibleCount < giftRequests.length && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button onClick={handleLoadMore} className={styles.LoadMoreButton}>
                Завантажити ще
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
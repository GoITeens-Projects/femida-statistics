import { SettingsNavigation } from 'components/Settings/SettingsNavigation/SettingsNavigation';
import styles from './GiftPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchGifts, fetchUserName, PatchGift } from '../../../../redux/gift/operation';
import { FilterGift } from './FilterGift/FilterGift';
import Shadow from 'components/Shadow/Shadow';
import { GiftDetailsModal } from './GiftDetailsModal';

export const GiftPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { giftRequests, usernames } = useSelector((state) => state.gifts);
  const [visibleCount, setVisibleCount] = useState(3);
  const [expandedRowId, setExpandedRowId] = useState(null);

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('giftComments');
    return saved ? JSON.parse(saved) : {};
  });

  const [statuses, setStatuses] = useState({});

  const handleCommentChange = (id, value) => {
    if (value.length <= 26) {
      setComments(prev => {
        const updated = { ...prev, [id]: value };
        localStorage.setItem('giftComments', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleCommentBlur = (id) => {
    const extraComment = comments[id] || '';
    const currentStatus = statuses[id] || 'Очікується'; // дефолт статус, якщо не вибрано

    dispatch(PatchGift({
      id,
      data: {
        newState: {
          status: {
            text: currentStatus,
          },
          extraComment,
        },
        isXpDeducted: false,
        postOrderId: '',
      }
    }));
  };

  const handleStatusChange = (id, status) => {
    setStatuses(prev => ({ ...prev, [id]: status }));

    const extraComment = comments[id] || '';

    dispatch(PatchGift({
      id,
      data: {
        newState: {
          status: {
            text: status,
          },
          extraComment,
        },
        isXpDeducted: false,
        postOrderId: '',
      }
    }));
  };

  const getInitialFilters = () => {
    const savedFilters = localStorage.getItem('giftFilters');
    return savedFilters
      ? JSON.parse(savedFilters)
      : { giftTypeIds: [], minXp: null, maxXp: null };
  };

  const [filters, setFilters] = useState(getInitialFilters);
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    dispatch(fetchGifts());
  }, [dispatch]);

  useEffect(() => {
    if (giftRequests.length > 0) {
      const ids = [
        ...new Set(giftRequests.map((req) => req.clientData?.discordId).filter(Boolean)),
      ].join(',');
      if (ids) dispatch(fetchUserName(ids));
    }
  }, [giftRequests, dispatch]);

  useEffect(() => {
    let result = giftRequests;

    if (filters.giftTypeIds.length > 0) {
      result = result.filter((req) =>
        filters.giftTypeIds.includes(String(req.requestedGift.giftId))
      );
    }

    if (filters.minXp !== null) {
      result = result.filter((req) => req.requestedGift.toReceive.presentXpPrice >= filters.minXp);
    }

    if (filters.maxXp !== null) {
      result = result.filter((req) => req.requestedGift.toReceive.presentXpPrice <= filters.maxXp);
    }

    setFilteredRequests(
      result.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  }, [filters, giftRequests]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    localStorage.setItem('giftFilters', JSON.stringify(newFilters));
  };

  const handleBackClick = () => navigate('/settings');
  const handleLoadMore = () => setVisibleCount((prev) => prev + 3);

  const toggleRow = (e, id) => {
    if (e.target.tagName === 'INPUT') return;
    setExpandedRowId((prevId) => (prevId === id ? null : id));
  };

  const visibleRequests = filteredRequests.slice(0, visibleCount);

  return (
    <section>
      <SettingsNavigation onHandleBackClick={handleBackClick} onHandleSave={() => {}} />
      <div className={styles.Container}>
        <h1 className={styles.TitleBadWords}>Подарунки</h1>
        <FilterGift onFilterChange={handleFilterChange} />
        <div className={styles.FromContainer}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'#6EABD4'}
            borderColorBoth={'#558DB2'}
          />
          <table>
            <thead>
              <tr>
                <td className={`${styles.TableHeaderCell} ${styles.UserColumn}`}>Ім’я користувача</td>
                <td className={`${styles.TableHeaderCell} ${styles.DateColumn}`}>Дата</td>
                <td className={styles.TableHeaderCell}>Вартість подарунку (XP)</td>
                <td className={`${styles.TableHeaderCell} ${styles.GiftColumn}`}>Поточний подарунок</td>
                <td className={`${styles.TableHeaderCell} ${styles.StatusColumn}`}>Статус</td>
                <td className={`${styles.TableHeaderCell} ${styles.CommentColumn}`}>Коментар</td>
                <td className={`${styles.TableHeaderCell} ${styles.CommentColumn}`}></td>
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
                  <React.Fragment key={req.id}>
                    <tr
                      className={`${styles.ClickableRow} ${expandedRowId === req.id ? styles.activeRow : ''}`}
                      onClick={(e) => toggleRow(e, req.id)}
                    >
                      <td className={`${styles.TableBodyCell} ${styles.UserColumn}`}>
                        <div className={styles.UserCell}>
                          {user?.avatar && (
                            <img src={user.avatar} alt="avatar" className={styles.UserAvatar} />
                          )}
                          {displayName}
                        </div>
                      </td>
                      <td className={`${styles.TableBodyCell} ${styles.DateColumn}`}>
                        {new Date(req.createdAt).toLocaleString('uk-UA', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className={`${styles.TableBodyCell} ${styles.XpColumn}`}>
                        {req.requestedGift.toReceive.presentXpPrice}
                      </td>
                      <td className={`${styles.TableBodyCell} ${styles.GiftColumn}`}>
                        {req.requestedGift.title}
                      </td>
                      <td className={`${styles.TableBodyCell} ${styles.StatusColumn}`}>
                        <div className={styles.RadioGroup}>
                          <label className={styles.statusReceived}>
                            <input
                              type="radio"
                              name={`status-${req.id}`}
                              value="Отримано"
                              checked={statuses[req.id] === 'Отримано'}
                              onChange={() => handleStatusChange(req.id, 'Отримано')}
                            /> ✅Отримано
                          </label>
                          <label className={styles.statusSent}>
                            <input
                              type="radio"
                              name={`status-${req.id}`}
                              value="Відправлено"
                              checked={statuses[req.id] === 'Відправлено'}
                              onChange={() => handleStatusChange(req.id, 'Відправлено')}
                            /> 📦Відправлено
                          </label>
                          <label className={styles.statusPending}>
                            <input
                              type="radio"
                              name={`status-${req.id}`}
                              value="Очікується"
                              checked={statuses[req.id] === 'Очікується'}
                              onChange={() => handleStatusChange(req.id, 'Очікується')}
                            /> ⏳Очікується
                          </label>
                          <label className={styles.statusCancelled}>
                            <input
                              type="radio"
                              name={`status-${req.id}`}
                              value="Скасовано"
                              checked={statuses[req.id] === 'Скасовано'}
                              onChange={() => handleStatusChange(req.id, 'Скасовано')}
                            /> ❌Скасовано
                          </label>
                        </div>
                      </td>
                      <td className={`${styles.TableBodyCell} ${styles.CommentColumn}`}>
                        <input
                          className={styles.Comment}
                          type="text"
                          maxLength={26}
                          value={comments[req.id] || ''}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleCommentChange(req.id, e.target.value)}
                          onBlur={() => handleCommentBlur(req.id)}
                        />
                      </td>
                    </tr>
                    {expandedRowId === req.id && (
                      <GiftDetailsModal id={req.id} request={req} />
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          {visibleCount < filteredRequests.length && (
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

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGiftsManage } from '../../../../../../redux/gift/operation';
import { SettingsNavigation } from 'components/Settings/SettingsNavigation/SettingsNavigation';
import Shadow from 'components/Shadow/Shadow';
import { GiftManageModal } from './GiftManageModal';
import styles from './GiftManage.module.css';
import setingsIcon from './Group.svg';

export const GiftManage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { giftsManage, loading, error } = useSelector(state => state.gifts);

  const [expandedId, setExpandedId] = useState(null);   // id активного подарунка
  const [previewSrc, setPreviewSrc] = useState(null);   // повноекранне зображення
  const [creatingNew, setCreatingNew] = useState(false); // режим створення нового подарунка

  useEffect(() => {
    dispatch(fetchGiftsManage());
  }, [dispatch]);

  const handleBackClick = () => navigate('/settings');

  const toggleRow = (e, id) => {
    if (e.target.closest(`.${styles.ColAction}`)) return;
    setExpandedId(prev => (prev === id ? null : id));
  };

  const openImage = (e, src) => {
    e.stopPropagation();
    setPreviewSrc(src);
  };

  return (
    <section>
      <SettingsNavigation
        onHandleBackClick={handleBackClick}
        onHandleSave={() => {}}
      />

      <div className={styles.Container}>
        <h1 className={styles.Title}>Управління подарунками</h1>

        <button
          className={styles.AddGiftButton}
          onClick={() => setCreatingNew(true)}
        >
         <span className={styles.AddGiftButtonText}>+</span> Додати подарунок
        </button>

        <div className={styles.FromContainer}>
          <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth="#6EABD4"
            borderColorBoth="#558DB2"
          />

          {loading && <p>Завантаження...</p>}
          {error && <p className={styles.Error}>{error}</p>}

          {!loading && !error && (
            <>
              <table className={styles.Table}>
                <thead>
                  <tr>
                    <td className={`${styles.Th} ${styles.ColTitle}`}>ID Подарунку</td>
                    <td className={`${styles.Th} ${styles.ColTitle}`}>Назва подарунку</td>
                    <td className={`${styles.Th} ${styles.ColType}`}>Тип</td>
                    <td className={`${styles.Th} ${styles.ColImage}`}>Зображення</td>
                    <td className={`${styles.Th} ${styles.ColAvail}`}>Доступність</td>
                    <td className={`${styles.Th} ${styles.ColPrice}`}>Ціна XP</td>
                  </tr>
                </thead>
                <tbody>
                  {giftsManage.map(gift => (
                    <React.Fragment key={gift.giftId}>
                      <tr
                        className={`${styles.Row} ${
                          expandedId === gift.giftId ? styles.activeRow : ''
                        }`}
                        onClick={e => toggleRow(e, gift.giftId)}
                      >
                        <td className={styles.Td}>{gift.giftId}</td>
                        <td className={styles.Td}>{gift.title}</td>
                        <td className={styles.Td}>
                          {gift.isVirtual ? 'Віртуальний' : 'Фізичний'}
                        </td>
                        <td className={styles.Td}>
                          <img
                            src={gift.image}
                            alt={gift.title}
                            className={styles.Image}
                            onClick={e => openImage(e, gift.image)}
                          />
                        </td>
                        <td className={styles.Td}>
                          {gift.status.available
                            ? 'Доступний'
                            : ` ${gift.status.reason || 'Недоступний'}`}
                        </td>
                        <td className={styles.Td}>{gift.toReceive.presentXpPrice}</td>
                      </tr>

                      {expandedId === gift.giftId && (
                        <GiftManageModal
                          giftId={gift.giftId}
                          onClose={() => setExpandedId(null)}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              {previewSrc && (
                <div
                  className={styles.ImageOverlay}
                  onClick={() => setPreviewSrc(null)}
                >
                  <img src={previewSrc} alt="" className={styles.ImageFull} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Модалка для створення нового подарунка */}
      {creatingNew && (
        <GiftManageModal giftId={null} onClose={() => setCreatingNew(false)} />
      )}
    </section>
  );
};

import styles from './FilterGift.module.css';
import Shadow from 'components/Shadow/Shadow';
import { useEffect, useState } from 'react';

export const FilterGiftModal = ({ decline, onApply }) => {
  const [selectedGiftTypes, setSelectedGiftTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [minXp, setMinXp] = useState('');
  const [maxXp, setMaxXp] = useState('');

  // ✅ Завантаження збережених фільтрів з localStorage
  useEffect(() => {
    const saved = localStorage.getItem('giftFilters');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelectedGiftTypes(parsed.giftTypeIds || []);
      setMinXp(parsed.minXp !== null ? parsed.minXp : '');
      setMaxXp(parsed.maxXp !== null ? parsed.maxXp : '');
      setSelectedStatuses(parsed.statuses || []);
    }
  }, []);

  const handleGiftCheckboxChange = (e) => {
    const id = e.target.dataset.giftId;
    setSelectedGiftTypes((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleStatusChange = (e) => {
    const status = e.target.dataset.status;
    setSelectedStatuses((prev) =>
      e.target.checked ? [...prev, status] : prev.filter((s) => s !== status)
    );
  };

  const handleApply = () => {
    const filters = {
      giftTypeIds: selectedGiftTypes,
      statuses: selectedStatuses,
      minXp: minXp ? parseInt(minXp) : null,
      maxXp: maxXp ? parseInt(maxXp) : null,
    };
    onApply(filters);
    decline();
  };

  return (
    <>
      <div className={styles.overlay} onClick={decline}></div>
      <div className={styles.filterModal}>
        <Shadow
          leftFirst={-5}
          backgroundBoth={'var(--shadow-secondary-color)'}
          rightSecond={1}
          bottomSecond={-5}
          borderColorBoth={'var(--shadow-secondary-border)'}
        />
        <div className={styles.headerFilterModal}>
          <button onClick={decline} className={styles.backButton}>Назад</button>
          <h5 className={styles.filterNameTitle}>Фільтр: запити</h5>
        </div>
        <div className={styles.filterLine}></div>
        <div className={styles.boxForMobile}>
          <div className={styles.intervalBox}>
            <h5 className={styles.intervalTitle}>Тип Подарунку</h5>
            {[
              { id: '1', label: 'Футболка GoITeens' },
              { id: '2', label: 'Худі GoITeens' },
              { id: '3', label: 'Discord Nitro' },
            ].map(({ id, label }) => (
              <div key={id} className={styles.ContainerCheckBoxAction1}>
                <label className={styles.CustomCheckbox}>
                  <input
                    type="checkbox"
                    data-gift-id={id}
                    onChange={handleGiftCheckboxChange}
                    checked={selectedGiftTypes.includes(id)}
                  />
                  <span className={styles.CheckboxMark}></span>
                  {label}
                </label>
              </div>
            ))}
          </div>

          <div className={styles.intervalBox}>
            <h5 className={styles.intervalTitle}>Статус</h5>
            {[
              'Отримано',
              'Відправлено',
              'Очікується',
              'Скасовано',
            ].map((status) => (
              <div key={status} className={styles.ContainerCheckBoxAction1}>
                <label className={styles.CustomCheckbox}>
                  <input
                    type="checkbox"
                    data-status={status}
                    onChange={handleStatusChange}
                    checked={selectedStatuses.includes(status)}
                  />
                  <span className={styles.CheckboxMark}></span>
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.periodOfTimeBox}>
          <h5 className={styles.periodOfTimeTitle}>Рейтинг ХР</h5>
          <div className={styles.RatingXpContainer}>
            <p className={styles.RatingXpText}>Мінімум:</p>
            <input
              className={styles.RatingXpInput}
              type="number"
              inputMode="numeric"
              value={minXp}
              onChange={(e) => setMinXp(e.target.value)}
            />
            <p className={styles.RatingXpText}>XP</p>
          </div>
          <div className={styles.RatingXpContainer}>
            <p className={styles.RatingXpText}>Максимум:</p>
            <input
              className={styles.RatingXpInput2}
              type="number"
              inputMode="numeric"
              value={maxXp}
              onChange={(e) => setMaxXp(e.target.value)}
            />
            <p className={styles.RatingXpText}>XP</p>
          </div>
        </div>

        <button className={styles.saveFilterBtn} onClick={handleApply}>Зберегти</button>
      </div>
    </>
  );
};

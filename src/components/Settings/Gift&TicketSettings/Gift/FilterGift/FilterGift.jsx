import styles from './FilterGift.module.css';
import { useState } from 'react';
import { FilterGiftModal } from './FilterGiftModal';
import Vector from '../Vector.svg';

export const FilterGift = ({ onFilterChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const decline = () => setModalVisible(false);

  const handleApplyFilter = (filters) => {
    onFilterChange(filters);
  };

  return (
    <div className={styles.testDiv}>
      <button onClick={() => setModalVisible(true)} className={styles.openFilterBtn}>
        <img src={Vector} alt="svg" />
        Фільтр
      </button>
      {modalVisible && (
        <FilterGiftModal decline={decline} onApply={handleApplyFilter} />
      )}
    </div>
  );
};

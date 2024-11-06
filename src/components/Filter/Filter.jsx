import styles from './Filter.module.css';
import { useState } from 'react';
import { FilterModal } from './FilterModal';

export const Filter = () => {
  const [modalTreaker, setModalTreaker] = useState(false);

  const delince = () => {
    setModalTreaker(false);
  };

  return (
    <div>
      <p></p>
      <button
        onClick={() => setModalTreaker(true)}
        className={styles.openFilterBtn}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M11.6154 1.92303H2.38462C1.61991 1.92303 1 2.54295 1 3.30765V11.6153C1 12.38 1.61991 13 2.38462 13H11.6154C12.3801 13 13 12.38 13 11.6153V3.30765C13 2.54295 12.3801 1.92303 11.6154 1.92303Z"
            stroke="black"
            stroke-width="1.25"
            stroke-linejoin="round"
          />
          <path
            d="M8.15373 6.99997C8.53608 6.99997 8.84604 6.69002 8.84604 6.30766C8.84604 5.92531 8.53608 5.61536 8.15373 5.61536C7.77138 5.61536 7.46143 5.92531 7.46143 6.30766C7.46143 6.69002 7.77138 6.99997 8.15373 6.99997Z"
            fill="black"
          />
          <path
            d="M10.4615 6.99997C10.8438 6.99997 11.1538 6.69002 11.1538 6.30766C11.1538 5.92531 10.8438 5.61536 10.4615 5.61536C10.0791 5.61536 9.76918 5.92531 9.76918 6.30766C9.76918 6.69002 10.0791 6.99997 10.4615 6.99997Z"
            fill="black"
          />
          <path
            d="M8.15373 9.30765C8.53608 9.30765 8.84604 8.99769 8.84604 8.61534C8.84604 8.23299 8.53608 7.92303 8.15373 7.92303C7.77138 7.92303 7.46143 8.23299 7.46143 8.61534C7.46143 8.99769 7.77138 9.30765 8.15373 9.30765Z"
            fill="black"
          />
          <path
            d="M10.4615 9.30765C10.8438 9.30765 11.1538 8.99769 11.1538 8.61534C11.1538 8.23299 10.8438 7.92303 10.4615 7.92303C10.0791 7.92303 9.76918 8.23299 9.76918 8.61534C9.76918 8.99769 10.0791 9.30765 10.4615 9.30765Z"
            fill="black"
          />
          <path
            d="M3.53843 9.30765C3.92078 9.30765 4.23074 8.99769 4.23074 8.61534C4.23074 8.23299 3.92078 7.92303 3.53843 7.92303C3.15608 7.92303 2.84612 8.23299 2.84612 8.61534C2.84612 8.99769 3.15608 9.30765 3.53843 9.30765Z"
            fill="black"
          />
          <path
            d="M5.84618 9.30765C6.22854 9.30765 6.53849 8.99769 6.53849 8.61534C6.53849 8.23299 6.22854 7.92303 5.84618 7.92303C5.46383 7.92303 5.15388 8.23299 5.15388 8.61534C5.15388 8.99769 5.46383 9.30765 5.84618 9.30765Z"
            fill="black"
          />
          <path
            d="M3.53843 11.6154C3.92078 11.6154 4.23074 11.3054 4.23074 10.9231C4.23074 10.5407 3.92078 10.2308 3.53843 10.2308C3.15608 10.2308 2.84612 10.5407 2.84612 10.9231C2.84612 11.3054 3.15608 11.6154 3.53843 11.6154Z"
            fill="black"
          />
          <path
            d="M5.84618 11.6154C6.22854 11.6154 6.53849 11.3054 6.53849 10.9231C6.53849 10.5407 6.22854 10.2308 5.84618 10.2308C5.46383 10.2308 5.15388 10.5407 5.15388 10.9231C5.15388 11.3054 5.46383 11.6154 5.84618 11.6154Z"
            fill="black"
          />
          <path
            d="M8.15373 11.6154C8.53608 11.6154 8.84604 11.3054 8.84604 10.9231C8.84604 10.5407 8.53608 10.2308 8.15373 10.2308C7.77138 10.2308 7.46143 10.5407 7.46143 10.9231C7.46143 11.3054 7.77138 11.6154 8.15373 11.6154Z"
            fill="black"
          />
          <path
            d="M3.30775 1V1.92308M10.6924 1V1.92308"
            stroke="black"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13 4.23077H1"
            stroke="black"
            stroke-width="1.25"
            stroke-linejoin="round"
          />
        </svg>
        Фільтр: час
      </button>
      {modalTreaker && <FilterModal delince={delince} />}
    </div>
  );
};

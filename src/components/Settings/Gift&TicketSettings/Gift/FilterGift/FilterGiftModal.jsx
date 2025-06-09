import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import styles from './FilterGift.module.css';

import Shadow from 'components/Shadow/Shadow';

export const FilterGiftModal = ({ delince }) => {

  

  const dispatch = useDispatch();







  return (
    <>
      <div className={styles.overlay} ></div>
      <div className={styles.filterModal}>
        <Shadow
          leftFirst={-5}
          backgroundBoth={'var(--shadow-secondary-color)'}
          rightSecond={1}
          bottomSecond={-5}
          borderColorBoth={'var(--shadow-secondary-border)'}
        />
        
       
      </div>
    </>
  );
};

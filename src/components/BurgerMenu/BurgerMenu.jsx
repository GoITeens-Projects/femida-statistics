import styles from './BurgerMenu.module.css';
import { Navigation } from 'components/Navigation/Navigation';

const BurgerMenu = ({ isOpenBurger, setIsOpenBurger }) => {
  return (
    <div className={styles.burgerBackdrop}>
      <div className={styles.burgerContainer}>
        <div className={styles.burgerBox}>
          <div className={styles.burgerBtnsBox}>
            <button type="button" className={styles.loginMenuBtn}>
              Увійти
            </button>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
          <Navigation />
        </div>
        {/* <h1>hello</h1> */}
      </div>
    </div>
  );
};

export default BurgerMenu;

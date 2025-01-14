import styles from './BurgerMenu.module.css';
import { Navigation } from 'components/Navigation/Navigation';
import ToggleTheme from 'components/ToggleTheme/ToggleTheme';
import WhenLoginBox from 'components/WhenLoginBox/WhenLoginBox';

const BurgerMenu = () => {
  return (
    <div className={styles.burgerContainer}>
      <div className={styles.burgerBox}>
        <div className={styles.burgerBtnsBox}>
          <WhenLoginBox />
          <ToggleTheme />
        </div>
        <Navigation />
      </div>
    </div>
  );
};

export default BurgerMenu;

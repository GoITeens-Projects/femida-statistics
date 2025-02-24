import { AutoModerationFilter } from 'components/Settings/AutoModerationFilter/AutoModerationFilter';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels, fetchSettings, fetchRoles } from '../redux/settings/operation';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import s from '../components/Main.module.css';
import { ClimbingBoxLoader } from 'react-spinners';
// import { Limits } from "components/Settings/Limit/Limits";
import { Bounce, ToastContainer } from 'react-toastify';
import styles from './Settings.module.css';
import { ChevronDown } from 'lucide-react';
import Shadow from 'components/Shadow/Shadow';

export const Settings = () => {
  const dispatch = useDispatch();
  const [isOpenDropDown, setIsOpenDropdown] = useState(false);
  const options = ['Ролі модераторів', 'Ролі адміністраторів', 'Ще щось за потреби'];
  const [selectedOption, setSelectedOption] = useState('Оберіть опцію');
  const { data, loading, error } = useSelector(state => state.settings);

  const handleSelectDropdown = option => {
    setSelectedOption(option);
    setIsOpenDropdown(false);
  };

  useEffect(() => {
    dispatch(fetchSettings());
    dispatch(fetchChannels());
    dispatch(fetchRoles())
  }, [dispatch]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <>
      {/* <motion.div
             initial={{ opacity: 0, y: -50 }} // Початковий стан
             animate={{ opacity: 1, y: 0 }}   // Анімований стан
             exit={{ opacity: 0, y: 50 }}     // Стан при зникненні
             transition={{ duration: 1.5 }}   // Тривалість переходу
           > */}

      <div className={styles.generalSettings}>
        <h2 className={styles.generalSettingsTitle}>Загальне</h2>
        <div className={styles.generalSettingsBox}>
          <div className={styles.dropdown}>
            <button
              className={styles['dropdown-button']}
              onClick={() => setIsOpenDropdown(!isOpenDropDown)}
            >
              <span>{selectedOption}</span>
              <ChevronDown
                className={`${styles.icon} ${isOpenDropDown ? `${styles.rotate}` : ''
                  }`}
              />
            </button>
            {isOpenDropDown && (
              <ul className={styles['dropdown-menu']}>
                {options.map((option, index) => (
                  <li key={index} onClick={() => handleSelectDropdown(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
            <Shadow
              leftFirst={-6}
              widthFirst={5}
              heightSecond={5}
              rightSecond={2}
              bottomSecond={-6}
              backgroundBoth={'var(--shadow-secondary-border)'}
              borderColorBoth={'var(--chart-accent-color)'}
            />
          </div>
          <div className={styles.generalBox}>
            <div className={styles.generalSettingsFlexbox}>
              <label className={styles.generalSettingsCheckboxLabel}>
                <input type="checkbox" />
                <span className={styles.generalSettingsCheckboxSpan}></span>
              </label>
              <p className={styles.generalSettingsSubtitle}>
                Не поширювати кулдаун команд на Адміністраторів і Модераторів
              </p>
            </div>
            <div className={styles.generalSettingsFlexbox}>
              <label className={styles.generalSettingsCheckboxLabel}>
                <input type="checkbox" />
                <span className={styles.generalSettingsCheckboxSpan}></span>
              </label>
              <p className={styles.generalSettingsSubtitle}>
                Дозволяти Модераторам з вищою роллю керувати нижчими
                Модераторами
              </p>
            </div>
            <div className={styles.generalSettingsFlexbox}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                // checked={isEnabled}
                // onChange={handleToggle}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
              <p className={styles.generalSettingsSubtitle}>
                Встановити час дії попередження за замовчуванням
              </p>
            </div>
          </div>
        </div>
      </div>

      <section >
        <h1 className={styles.TitleModeration}>Фільтри автомодерації</h1>
        <div className={styles.settingsContainer}>

          <AutoModerationFilter
            moderationTitle="Погані слова"
            moderationList="Мат, небажані вирази"
            endpoint="badword"
            nameForUpdate="badwords"
            activeSlider={true}

          />
          <AutoModerationFilter
            moderationTitle="Ліміти"
            moderationList="Редагувати ліміти"
            endpoint="limits"
            activeSlider={false}

          />
          <AutoModerationFilter
            moderationTitle="Повторний текст"
            moderationList="Нікому надмірний флуд не потрібний"
            endpoint="spam"
            nameForUpdate="spam"
            activeSlider={true}
          />
          <AutoModerationFilter
            moderationTitle="Посилання та фішингові сайти"
            moderationList="Небажані посилання та сайти"
            endpoint="links"
            nameForUpdate="scamLinks"
            activeSlider={true}
          />

          <AutoModerationFilter
            moderationTitle="Кількість ХР"
            moderationList="Редагувати видачу досвіду учасникам"
            endpoint="number-of-xp"
            activeSlider={false}

          />
          <AutoModerationFilter
            moderationTitle="Фан команди"
            moderationList="Редагувати доступ користування команд"
            endpoint="commands"
            activeSlider={false} // без лапок!
          />
        </div>

      </section>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {/* </motion.div> */}
    </>
  );
};

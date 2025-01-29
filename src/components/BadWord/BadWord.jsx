import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { badWord } from "../../redux/badword/operation";
import styles from "./BadWord.module.css";
import { IoMdClose } from "react-icons/io";
import { Modal } from "./BadWordModal";
import { Link } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Shadow from "components/Shadow/Shadow";



export const BadWord = () => {
    const [isEnabled, setIsEnabled] = useState(false);


    const dispatch = useDispatch();

    const handleToggle = () => {
        setIsEnabled(!isEnabled);
        dispatch(badWord({ settings: { badwords: { enabled: !isEnabled } } }));
    };

    useEffect(() => {
        // Отримуємо тему з локального сховища
        const savedTheme = localStorage.getItem("theme") || "light";


        // Перевіряємо, чи є повідомлення в локальному сховищі
        const message = localStorage.getItem("toastMessage");
        if (message) {
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: savedTheme, // Динамічно встановлюємо тему для тосту
                transition: Bounce,
            });
        }
    }, []);


    return (
        <section>
            <div className={styles.moderationCard}>
            <Shadow
            leftFirst={-7}
            widthFirst={5}
            heightSecond={5}
            rightSecond={3}
            bottomSecond={-7}
            backgroundBoth={'#6EABD4'}
            borderColorBoth={'#558DB2'}
          />
                <div className={styles.moderationContent}>
                    <h2 className={styles.moderationTitle}>Погані слова</h2>
                    <p className={styles.moderationList}>Мат, небажані вирази</p>
                </div>
                <div className={styles.controls}>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                        <span className={`${styles.slider} ${styles.round}`}></span>
                    </label>
                    <Link to="/settings/badword" >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="20"
                            viewBox="0 0 19 20"
                            fill="none"
                        >
                            <path
                                d="M9.50007 12.7C10.9938 12.7 12.2047 11.4912 12.2047 9.99999C12.2047 8.50882 10.9938 7.29999 9.50007 7.29999C8.00633 7.29999 6.79541 8.50882 6.79541 9.99999C6.79541 11.4912 8.00633 12.7 9.50007 12.7Z"
                                stroke={
                                    localStorage.getItem('theme') === 'dark' ? 'white' : 'var(--shadow-secondary-border)'
                                }
                                stroke-width="1.25"
                            />
                            <path
                                d="M1.98196 8.776C2.40839 9.0424 2.68246 9.4978 2.68246 10C2.68246 10.5022 2.40839 10.9576 1.98196 11.224C1.69256 11.4067 1.50504 11.5516 1.37251 11.7244C1.22834 11.912 1.12261 12.1261 1.06135 12.3545C1.00009 12.5829 0.984511 12.8211 1.01549 13.0555C1.06237 13.4101 1.27244 13.7737 1.69166 14.5C2.11268 15.2263 2.32274 15.589 2.60673 15.8077C2.79465 15.9516 3.00913 16.0572 3.23791 16.1183C3.4667 16.1795 3.70532 16.195 3.94013 16.1641C4.1565 16.1353 4.37558 16.0471 4.6785 15.8869C4.89536 15.7687 5.13872 15.7074 5.3858 15.7086C5.63287 15.7099 5.87559 15.7737 6.09123 15.8941C6.52668 16.1461 6.78543 16.6096 6.80346 17.1118C6.81608 17.4538 6.84854 17.6878 6.93238 17.8885C7.023 18.107 7.15587 18.3056 7.3234 18.4728C7.49094 18.6401 7.68985 18.7727 7.90876 18.8632C8.23963 19 8.65975 19 9.5 19C10.3402 19 10.7604 19 11.0912 18.8632C11.3102 18.7727 11.5091 18.6401 11.6766 18.4728C11.8441 18.3056 11.977 18.107 12.0676 17.8885C12.1506 17.6878 12.1839 17.4538 12.1965 17.1118C12.2146 16.6096 12.4733 16.1452 12.9088 15.8941C13.1244 15.7737 13.3671 15.7099 13.6142 15.7086C13.8613 15.7074 14.1046 15.7687 14.3215 15.8869C14.6244 16.0471 14.8444 16.1353 15.0608 16.1641C15.5347 16.2263 16.014 16.0981 16.3933 15.8077C16.6773 15.5899 16.8873 15.2263 17.3074 14.5C17.495 14.176 17.6401 13.9249 17.7483 13.7143M17.018 11.2249C16.8071 11.0966 16.6323 10.9171 16.5098 10.703C16.3873 10.489 16.3211 10.2474 16.3175 10.0009C16.3175 9.4978 16.5916 9.0424 17.018 8.7751C17.3074 8.5933 17.4941 8.4484 17.6275 8.2756C17.7717 8.08801 17.8774 7.8739 17.9386 7.64551C17.9999 7.41711 18.0155 7.17891 17.9845 6.9445C17.9376 6.5899 17.7276 6.2263 17.3083 5.5C16.8873 4.7737 16.6773 4.411 16.3933 4.1923C16.2054 4.04838 15.9909 3.94283 15.7621 3.88168C15.5333 3.82053 15.2947 3.80497 15.0599 3.8359C14.8435 3.8647 14.6244 3.9529 14.3206 4.1131C14.1038 4.23113 13.8607 4.29238 13.6138 4.29112C13.3669 4.28986 13.1243 4.22613 12.9088 4.1059C12.6966 3.97962 12.5199 3.80168 12.3954 3.58872C12.2708 3.37576 12.2024 3.13474 12.1965 2.8882C12.1839 2.5462 12.1515 2.3122 12.0676 2.1115C11.977 1.89296 11.8441 1.6944 11.6766 1.52715C11.5091 1.35991 11.3102 1.22726 11.0912 1.1368C10.7604 1 10.3402 1 9.5 1C8.65975 1 8.23963 1 7.90876 1.1368C7.68985 1.22726 7.49094 1.35991 7.3234 1.52715C7.15587 1.6944 7.023 1.89296 6.93238 2.1115C6.84944 2.3122 6.81608 2.5462 6.80346 2.8882C6.79759 3.13474 6.72917 3.37576 6.60461 3.58872C6.48005 3.80168 6.30342 3.97962 6.09123 4.1059C5.87559 4.22629 5.63287 4.29011 5.3858 4.29136C5.13872 4.29262 4.89536 4.23129 4.6785 4.1131C4.37558 3.9529 4.1556 3.8647 3.93923 3.8359C3.4653 3.77368 2.98602 3.90188 2.60673 4.1923C2.32365 4.411 2.11268 4.7737 1.69256 5.5C1.50504 5.824 1.35989 6.0751 1.2517 6.2857"
                                stroke={
                                    localStorage.getItem('theme') === 'dark' ? 'white' : 'var(--shadow-secondary-border)'
                                }
                                stroke-width="1.25"
                                stroke-linecap="round"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
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
        </section>
    );
};

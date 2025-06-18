import { useDispatch, useSelector } from 'react-redux';
import styles from './GiftDetailsModal.module.css';
import { useEffect } from 'react';
import { fetchGift } from '../../../../redux/gift/operation';



export const GiftDetailsModal = ({ id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchGift(id));
    }
  }, [dispatch, id]);

  // Отримуємо всі завантажені подарунки з Redux
  const selectedGifts = useSelector(state => state.gifts.selectedGifts);

  // Знаходимо потрібний подарунок за id
  const giftData = selectedGifts.find(g => g.giftRequest.id === id);

  const client = giftData?.giftRequest?.clientData;

  return (
    <tr className={styles.ModalRow}>
      <td colSpan={7}>
        <div className={styles.ModalContent}>
          {client ? (
            <table className={styles.GiftInfoTable}>
              <tbody>
                <tr>
                  <td><strong>Імʼя:</strong></td>
                  <td>{client.firstName}</td>
                </tr>
                <tr>
                  <td><strong>Прізвище:</strong></td>
                  <td>{client.lastName}</td>
                </tr>
                <tr>
                  <td><strong>По батькові:</strong></td>
                  <td>{client.patronymic}</td>
                </tr>
                <tr>
                  <td><strong>Адреса:</strong></td>
                  <td>{client.address}</td>
                </tr>
                <tr>
                  <td><strong>Телефон:</strong></td>
                  <td>{client.phoneNumber}</td>
                  
                </tr>
                 
    <div className={styles.RadioGroup}>
      <label className={styles.statusSent}>
        <input type="radio"  /> Відправлено
      </label>
      <label className={styles.statusPending}>
        <input type="radio"  /> Очікується
      </label>
      <label className={styles.statusCancelled}>
        <input type="radio"  /> Скасовано
      </label>
    </div>

              </tbody>
            </table>
          ) : (
            <p>Завантаження...</p>
          )}
        </div>
      </td>
    </tr>
  );
};

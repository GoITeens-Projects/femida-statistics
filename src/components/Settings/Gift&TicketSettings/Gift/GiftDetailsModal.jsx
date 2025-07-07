import { useDispatch, useSelector } from 'react-redux';
import styles from './GiftDetailsModal.module.css';
import { useEffect, useState } from 'react';
import { fetchGift } from '../../../../redux/gift/operation';
import { PacmanLoader } from 'react-spinners';

export const GiftDetailsModal = ({ id }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      dispatch(fetchGift(id)).finally(() => setIsLoading(false));
    }
  }, [dispatch, id]);

  const selectedGifts = useSelector(state => state.gifts.selectedGifts);
  const giftData = selectedGifts.find(g => g.giftRequest.id === id);
  const client = giftData?.giftRequest?.clientData;

  return (
    <tr className={styles.ModalRow}>
      <td colSpan={7}>
        <div className={styles.ModalContent}>
          {isLoading || !client ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <PacmanLoader color="#6EABD4" size={20} speedMultiplier={1.5} />
            </div>
          ) : (
            <table className={styles.GiftInfoTable}>
              <tbody>
                <tr>
                  <td className={styles.GiftInfoText}>Імʼя:</td>
                  <td className={styles.GiftInfoText}>{client.firstName}</td>
                </tr>
                <tr>
                  <td className={styles.GiftInfoText}>Прізвище:</td>
                  <td className={styles.GiftInfoText}>{client.lastName}</td>
                </tr>
                <tr>
                  <td className={styles.GiftInfoText}>По батькові:</td>
                  <td className={styles.GiftInfoText}>{client.patronymic}</td>
                </tr>
                <tr>
                  <td className={styles.GiftInfoText}>Адреса:</td>
                  <td className={styles.GiftInfoText}>{client.address}</td>
                </tr>
                <tr>
                  <td className={styles.GiftInfoText}>Телефон:</td>
                  <td className={styles.GiftInfoText}>{client.phoneNumber}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </td>
    </tr>
  );
};


import { SettingsNavigation } from 'components/Settings/SettingsNavigation/SettingsNavigation';
import styles from './GiftPage.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Vector from './Vector.svg'
import { useEffect } from 'react';
import { fetchGifts } from '../../../../redux/gift/operation';
import { FilterGift } from './FilterGift/FilterGift';
import Shadow from 'components/Shadow/Shadow';


export const GiftPage = () => {
       const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
        dispatch(fetchGifts());
    }, [dispatch]);
    const handleSave = ()=>{
        
    }
  const { giftRequests, loading, error } = useSelector((state) => state.gifts);
    const handleBackClick = () =>{
return  navigate("/settings");
}

console.log('стейт подарунків:', giftRequests);

   

return(
       <section>
                  <SettingsNavigation
                      onHandleBackClick={handleBackClick}
                      onHandleSave={handleSave}
                  />
                  <div className={styles.Container}>
                      <h1 className={styles.TitleBadWords}>Подарунки</h1>

                      <div className={styles.FilterTitleContainer}>
                      <img src={Vector} alt='svg'></img>
                      <h3 className={styles.FilterTitle} >Фільтри</h3>
                      </div>
                      {/* <FilterGift/> */}
                
                      <div className={styles.FromContainer}>
                    <Shadow leftFirst={-7} widthFirst={5} heightSecond={5} rightSecond={3} bottomSecond={-7} backgroundBoth={'#6EABD4'} borderColorBoth={'#558DB2'} />


<table>
  <tr>
    <td className={styles.TableHeaderCell}>Ім’я користувача</td>
    <td className={styles.TableHeaderCell}>E-mail</td>
    <td className={styles.TableHeaderCell}>Рейтинг (ХР)</td>
    <td className={styles.TableHeaderCell}>Поточний подарунок</td>
    <td className={styles.TableHeaderCell}>Адреса для надсилання</td>
    <td className={styles.TableHeaderCell}>Статус</td>
    <td className={styles.TableHeaderCell}>Коментар</td>
  </tr>

  <tr>
    <td className={styles.TableBodyCell}>Breed</td>
    <td className={styles.TableBodyCell}>example@gmail.com</td>
    <td className={styles.TableBodyCell}>00000</td>
    <td className={styles.TableBodyCell}>Поточний подарунок</td>
    <td className={styles.TableBodyCell}>Адреса для надсилання</td>
    <td className={styles.TableBodyCell}><button>очікується</button></td>
    <td className={styles.TableBodyCell}>Коментар/нотатка</td>
  </tr>
</table>

                      </div>
                  
                  </div>
              
              </section>
       
    )
}
import { nanoid } from '@reduxjs/toolkit';
import { ServerMembers } from 'components/ServerMembers/ServerMembers';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchStatistics } from '../redux/statistics/operation';
import { Filter } from 'components/Filter/Filter';
import { MessagesChart } from 'components/MessagesChart/MessagesChart';
import MainTop from 'components/MainTop/MainTop';
import topStyles from '../components/Tops/Tops.module.css';
import setTheme from 'utils/setTheme';

const testTop = [
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'Імʼя користувача',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'Імʼя користувача',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userAvatarUrl:
      'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
    userName: 'Імʼя користувача',
    messagesQuantity: 12345,
    id: nanoid(),
  },
];

export const Overview = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Виконуємо fetch при завантаженні компонента
    setTheme()
    dispatch(fetchStatistics());
  }, [dispatch]);
  return (
    <>
      <ServerMembers />
      <MessagesChart />
      <div className={topStyles.topsBox}>
        <MainTop topArr={testTop} title={'Топ учасників'} isChannel={false} />
        <MainTop topArr={testTop} title={'Топ каналів'} isChannel={true} />
      </div>
      {/* <Filter /> */}
    </>
  );
};

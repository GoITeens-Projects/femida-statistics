import { nanoid } from '@reduxjs/toolkit';
import { ServerMembers } from 'components/ServerMembers/ServerMembers';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchStatistics } from '../redux/statistics/operation';
import { Filter } from 'components/Filter/Filter';
import { MessagesChart } from 'components/MessagesChart/MessagesChart';
import MainTop from 'components/MainTop/MainTop';
import topStyles from '../components/Tops/Tops.module.css';
import setTheme from 'utils/setTheme';
import { selectMessagesLogs } from '../redux/statistics/selectors';
import getUsersInfo from 'utils/getUsersInfo';
import axios from '../redux/axiosConfig';

const testTop = [
  {
    userName: 'Імʼя користувача',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userName: 'Імʼя користувача',
    messagesQuantity: 12345,
    id: nanoid(),
  },
  {
    userName: 'Імʼя користувача',
    messagesQuantity: 12345,
    id: nanoid(),
  },
];

export const Overview = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Виконуємо fetch при завантаженні компонента
    setTheme();
    dispatch(fetchStatistics());
  }, []);

  const messagesLogs = useSelector(selectMessagesLogs);
  const topUsersByMessages = [
    messagesLogs[0],
    messagesLogs[1],
    messagesLogs[2],
  ];
  // console.log('topusersbymessages', topUsersByMessages);

  const topUsersByMessagesIds = topUsersByMessages.map(user => {
    try {
      return user.id;
    } catch (err) {
      console.error(err);
    }
  });
  // console.log('ids', topUsersByMessagesIds);

  useEffect(() => {
    const test = async () => {
      if (users.length !== 0) {
        return;
      }
      try {
        let joinArr = topUsersByMessagesIds.join(',');
        const response = await axios.get(`stats/usernames?ids=${joinArr}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const data = response.data.users;
        const validation = data.map((user, i) => {
          return { ...user, count: topUsersByMessages[i].count };
        });
        if (validation.length === 0) {
          console.log('validation is empty');
          return;
        }
        setUsers(validation);
        console.log('val', validation);
      } catch (err) {
        console.log('err', err);
      }
    };
    test();
  }, [messagesLogs]);

  console.log(users.length !== 0 && users);

  return (
    <>
      <ServerMembers />
      <MessagesChart />
      <div className={topStyles.topsBox}>
        <MainTop topArr={users} title={'Топ учасників'} isChannel={false} />
        <MainTop topArr={users} title={'Топ каналів'} isChannel={true} />
      </div>
      {/* <Filter /> */}
    </>
  );
};

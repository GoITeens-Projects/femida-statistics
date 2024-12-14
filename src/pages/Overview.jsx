import { nanoid } from '@reduxjs/toolkit';
import { ServerMembers } from 'components/ServerMembers/ServerMembers';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchStatistics, completeMessagesLogs } from '../redux/statistics/operation';
import { Filter } from 'components/Filter/Filter';
import { MessagesChart } from 'components/MessagesChart/MessagesChart';
import MainTop from 'components/MainTop/MainTop';
import topStyles from '../components/Tops/Tops.module.css';
import setTheme from 'utils/setTheme';
import updateTokens from 'utils/updateToken';
import { selectMessagesLogs, selectCompletedMessagesLogs, selectLoading } from '../redux/statistics/selectors';
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
  const messagesLogs = useSelector(selectMessagesLogs)
  const logs = useSelector(selectCompletedMessagesLogs);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading)
  console.log("overview render ")
  useEffect(() => {
    console.log("overview render effect")
    // // Виконуємо fetch при завантаженні компонента
    // // if (logs.length === 0) {
      dispatch(completeMessagesLogs());
      // if(!loading){
        // dispatch(fetchStatistics());
      // }
      // dispatch(fetchStatistics());
    //   // updateTokens()
    //   setTheme();
    }, []);

  // const messagesLogs = useSelector(selectMessagesLogs);
  // const topUsersByMessages = [
  //   messagesLogs[0],
  //   messagesLogs[1],
  //   messagesLogs[2],
  // ];
  // // console.log('topusersbymessages', topUsersByMessages);

  // const topUsersByMessagesIds = topUsersByMessages.map(user => {
  //   try {
  //     return user.id;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });
  // // console.log('ids', topUsersByMessagesIds);

  // useEffect(() => {
  //   const test = async () => {
  //     if (users.length !== 0) {
  //       return;
  //     }
  //     try {
  //       let joinArr = topUsersByMessagesIds.join(',');
  //       const response = await axios.get(`stats/usernames?ids=${joinArr}`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  //         },
  //       });
  //       const data = response.data.users;
  //       const validation = data.map((user, i) => {
  //         return { ...user, count: topUsersByMessages[i].count };
  //       });
  //       if (validation.length === 0) {
  //         console.log('validation is empty');
  //         return;
  //       }
  //       setUsers(validation);
  //       console.log('val', validation);
  //     } catch (err) {
  //       console.log('err', err);
  //     }
  //   };
  //   test();
  // }, [messagesLogs]);

  // console.log(users.length !== 0 && users);

  return (
    <>
      <ServerMembers />
      <MessagesChart />
      {logs.length > 0 ? (<div className={topStyles.topsBox}>
        <MainTop topArr={logs} title={'Топ учасників'} isChannel={false} />
        <MainTop topArr={logs} title={'Топ каналів'} isChannel={true} />
      </div>) : (
        <p>Loading...</p>
      )}
      {/* <Filter /> */}
    </>
  );
};

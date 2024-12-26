import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUsersInfo } from 'utils/getUsersInfo';

export const fetchStatistics = createAsyncThunk(
  'stats/getStats',
  async (body, thunkApi) => {
    console.log('fetch');
    try {
      const state = thunkApi.getState();
      const accessToken = localStorage.getItem('token');
      let interval = state.filter.interval;
      let period = state.filter.period;
      const prevInterval = state.statistics.prevInterval;
      const prevPeriod = state.statistics.prevPeriod
      if (body) {
        interval = body.interval;
        period = body.period
      }
      
      let fatchInterval = 'h';

      switch (interval) {
        case 'hours':
          fatchInterval = 'h';
          break;

        case 'days':
          fatchInterval = 'd';
          break;

        case 'weeks':
          fatchInterval = 'w';
          break;

        case 'months':
          fatchInterval = 'm';
          break;
        default:
          break;
      }

      console.log(prevPeriod, period, prevInterval, interval)

      console.log('try');
     if(prevPeriod === period && prevInterval === interval){
      return
     }
      let config = {
        method: 'get',
        url: `https://femida-api.onrender.com/stats?time=${period}${fatchInterval}&interval=${interval}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const { data } = await axios.request(config);
      console.log(data);
      if (data.count === 0) {
        return {
          serverMembers: [{ name: '', joined: 0, left: 0, total: 0 }],
          membersStatuses: [
            { name: '', online: 0, away: 0, dnd: 0, offline: 0 },
          ],
          messagesCount: [{ name: '', messages: 0 }],
          messagesLogs: [{ id: '', count: 0 }],
          stageActivitiesCount: [],
          stageActivitiesLogs: [],
          voiseActivitiesCount: [],
          voiceActivitiesLogs: [],
        };
      }

      // Комбінуємо всі об'єкти статистики в один
      const ids = [];
      const monthNames = [
        'Січ',
        'Лют',
        'Берез',
        'Квіт',
        'Трав',
        'Чер',
        'Лип',
        'Сер',
        'Вер',
        'Жовт',
        'Лист',
        'Груд',
      ];
      const combinedStatistics = data.data.reduce(
        (acc, curr) => {
          let time = '';
          if (interval === 'hours') {
            const str = curr.statisticsTimestamps[0];
            time = `${str.slice(11, 13)} год`;
          } else if (interval === 'days') {
            const str = curr.statisticsTimestamps[0];
            const month = str.slice(5, 7);
            console.log('month:', month);
            const day = str.slice(8, 10);
            console.log('day:', day);
            time = `${day} ${monthNames[month - 1]}`;
          } else if (interval === 'weeks'){
            const startStr = curr.statisticsTimestamps[0]
            const startMonth = startStr.slice(5, 7);
            const startDay = startStr.slice(8, 10);
            const len = curr.statisticsTimestamps.length - 1
            const endStr = curr.statisticsTimestamps[len]
            const endMonth = endStr.slice(5, 7);
            const endDay = endStr.slice(8, 10)
            time = startMonth === endMonth ? `${startDay} - ${endDay} ${monthNames[startMonth - 1]}` : `${startDay} ${monthNames[startMonth - 1]} - ${endDay} ${monthNames[endMonth - 1]}` 
          } else if (interval === 'months') {
            const str = curr.statisticsTimestamps[0];
            const month = str.slice(5, 7);
            time = `${monthNames[month - 1]}`;
          }

          acc.serverMembers = [
            ...acc.serverMembers,
            {
              name: time,
              joined: curr.statistics.membersJoin.count,
              left: curr.statistics.membersLeft.count,
              total: curr.statistics.totalMembers,
            },
          ];

          acc.membersStatuses = [
            ...acc.membersStatuses,
            {
              name: time,
              online: curr.statistics.membersStatuses.online,
              away: curr.statistics.membersStatuses.inactive,
              dnd: curr.statistics.membersStatuses.dnd,
              offline: curr.statistics.membersStatuses.offline,
            },
          ];

          acc.messagesCount = [
            ...acc.messagesCount,
            {
              name: time,
              messages: curr.statistics.messages.count,
            },
          ];

          curr.statistics.messages.logs.forEach(log => ids.push(log.id));

          // // Оновлюємо активність в stage та voice
          // acc.stageActivitiesCount += curr.statistics.stageActivities.count;
          // acc.stageActivitiesLogs += [...acc.stageActivitiesLogs, ...curr.statistics.stageActivities.logs];

          // acc.voiceActivitiesCount += curr.statistics.voiceActivities.count;
          // acc.voiceActivitiesLogs += [...acc.voiceActivitiesLogs, ...curr.statistics.voiceActivities.logs];

          // Повертаємо накопичений об'єкт
          return acc;
        },
        {
          serverMembers: [],
          membersStatuses: [],
          messagesCount: [],
          stageActivitiesCount: [],
          stageActivitiesLogs: [],
          voiseActivitiesCount: [],
          voiceActivitiesLogs: [],
        }
      );

      const counts = {};
      ids.forEach(id => {
        counts[id] = (counts[id] || 0) + 1;
      });

      const logs = Object.entries(counts).map(([key, value]) => {
        return { id: key, count: value };
      });

      const messagesLogs = logs.sort((a, b) => b.count - a.count);

      // messagesLogs = [...acc.messagesLogs, ...newLogs]

      console.log({ ...combinedStatistics, messagesLogs });
      return { ...combinedStatistics, messagesLogs, prevInterval: interval, prevPeriod: period };
    } catch (error) {
      return thunkApi.rejectWithValue('Не вдалося отримати статистику');
    }
  }
);

export const completeMessagesLogs = createAsyncThunk(
  'stats/completeMessagesLogs',
  async (time, thunkApi) => {
    console.log("completeMessagesLogs");

    const state = thunkApi.getState();
    const messagesLogs = state.statistics.messagesLogs;
    const currLogs = messagesLogs.slice(0, 10);

    const ids = currLogs.map(user => user.id).join(',');
     
    const info = await getUsersInfo(ids);
    console.log("info:", info);
    const validation = info.map((user, i) => {
      return { ...user, count: currLogs[i].count };
    });

    return validation;

    // if(users.length >0){return}
    //   if (arr.length === 0 && count < 1) {

    //     count += 1;
    //     console.log('count:)', count);
    //      getInfo();
    //   } else {
    //     console.log('users rerun:', users);

    //   }
    // };
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchStatistics = createAsyncThunk('stats/getStats', async (time, thunkApi) => {
    console.log("fetch");
    try {
        const state = thunkApi.getState();
        const { accessToken } = state.auth;
        const interval = state.filter.interval
        const period = state.filter.period 
        let fatchInterval = 'h'
        

        switch (interval) {
            case 'hours':
                fatchInterval = 'h';
                break

            case 'days': 
             fatchInterval = 'd'
             break

            case 'weeks':
                fatchInterval = 'm'
                break
               
            case 'months': 
            fatchInterval = 'm'
            break
            default:
                break;
        }

        console.log("try");

        let config = {
            method: 'get',
            url: `https://femida-api.onrender.com/stats?time=${period}${fatchInterval}&interval=${interval === 'weeks' ? 'months' : interval}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.request(config);
        console.log(data);

        // const today = new Date().toISOString().slice(0, 10); // поточна дата у форматі YYYY-MM-DD

        // Фільтруємо статистику за сьогоднішній день
        // const filteredData = data.statistics.map((log) =>{
        //     return log.statisticsTimestamp.slice(0, 10)}
        // );
        // console.log(filteredData);

        // console.log('before');
        // Комбінуємо всі об'єкти статистики в один
        const combinedStatistics = data.data.reduce((acc, curr) => {
            let time = ''
            //  console.log("reduce");
            if(interval === 'hours'){
                const str = curr.statisticsTimestamps[0]
                time = `${str.slice(11, 13)} год`;
            }
            
            acc.serverMembers = [...acc.serverMembers,
                                 { 
                                   "name": time,
                                   "joined": curr.statistics.membersJoin.count,
                                   "left": curr.statistics.membersLeft.count,
                                   "total": curr.statistics.totalMembers
                                }
            ]
            // acc.totalMembers += curr.totalMembers
            
            // // Оновлюємо лічильники учасників, що приєдналися і лівнули
            // acc.membersJoin += curr.statistics.membersJoin.count;
            // acc.membersLeft += curr.statistics.membersLeft.count;

            acc.membersStatuses = [...acc.membersStatuses,
                                   {
                                    name: time,
                                    online: curr.statistics.membersStatuses.online,
                                    away: curr.statistics.membersStatuses.inactive,
                                    dnd: curr.statistics.membersStatuses.dnd,
                                    offline: curr.statistics.membersStatuses.offline
                                    }
                                  ]
            // curr.statistics.membersStatuses

            acc.messagesCount = [...acc.messagesCount,
                                 {
                                    "name": time,
                                    "messages": curr.statistics.messages.count
                                 }
                                ]

            const ids = curr.statistics.messages.logs.map(log => log.id);
            const counts = {};
             ids.forEach(id => {
                counts[id] = (counts[id] || 0) + 1
            });

            const newLogs = Object.entries(counts).map(([key, value]) => {
                return {id: key, count: value}
            })

            acc.messagesLogs = [...acc.messagesLogs, ...newLogs]

            // // Оновлюємо активність в stage та voice
            // acc.stageActivitiesCount += curr.statistics.stageActivities.count;
            // acc.stageActivitiesLogs += [...acc.stageActivitiesLogs, ...curr.statistics.stageActivities.logs];

            // acc.voiceActivitiesCount += curr.statistics.voiceActivities.count;
            // acc.voiceActivitiesLogs += [...acc.voiceActivitiesLogs, ...curr.statistics.voiceActivities.logs];

            
            // Повертаємо накопичений об'єкт
            return acc;
        }, {
            serverMembers: [],
            membersStatuses: [],
            messagesCount: [],
            messagesLogs: [],
            stageActivitiesCount: [],
            stageActivitiesLogs: [],
            voiseActivitiesCount: [],
            voiceActivitiesLogs: [],
        });

        console.log({...combinedStatistics});
        return combinedStatistics

    } catch (error) {
        return thunkApi.rejectWithValue('Не вдалося отримати статистику');
    }
});
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchStatistics = createAsyncThunk('stats/getStats', async (time, thunkApi) => {
    try {
        const state = thunkApi.getState();
        const { accessToken } = state.auth;

        let config = {
            method: 'get',
            url: 'https://femida-api.onrender.com/stats?time=1d',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        };

        const { data } = await axios.request(config);
        console.log(data);

        const today = new Date().toISOString().slice(0, 10); // поточна дата у форматі YYYY-MM-DD

        // Фільтруємо статистику за сьогоднішній день
        const filteredData = data.statistics.filter((log) =>
            log.statisticsTimestamp.slice(0, 10) === today
        );
        console.log(filteredData);


        // Комбінуємо всі об'єкти статистики в один
        const combinedStatistics = filteredData.reduce((acc, curr) => {
            // Оновлюємо лічильники учасників, що приєдналися і лівнули
            acc.membersJoin.count += curr.statistics.membersJoin.count;
            acc.membersLeft.count += curr.statistics.membersLeft.count;

            // Оновлюємо лічильники повідомлень
            acc.messages.count += curr.statistics.messages.count;

            // Оновлюємо активність в stage та voice
            acc.stageActivities.count += curr.statistics.stageActivities.count;
            acc.voiceActivities.count += curr.statistics.voiceActivities.count;

            // Повертаємо накопичений об'єкт
            return acc;
        }, {
            membersJoin: { count: 0 },
            membersLeft: { count: 0 },
            messages: { count: 0 },
            stageActivities: { count: 0 },
            voiceActivities: { count: 0 },
        });

        console.log(combinedStatistics);

    } catch (error) {
        return thunkApi.rejectWithValue('Не вдалося отримати статистику');
    }
});
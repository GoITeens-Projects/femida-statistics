import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://femida-api.onrender.com/', // Правильний baseURL

});

export default instance;
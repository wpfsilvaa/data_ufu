import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 10000, // Timeout opcional (em ms)

});


export default api;
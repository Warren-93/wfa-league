import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://warriorsfootballassociation-api.onrender.com/api/v1/',
    headers: { "access-Control-Allow-Origin": "true" }
});

console.log('Axios config loaded');

export default axiosInstance;

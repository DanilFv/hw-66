import axios from 'axios';

const axiosAPI = axios.create({
    baseURL: 'https://js-30-danil-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosAPI;
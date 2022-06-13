import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:2022/'
})

export {
    axiosInstance,
}
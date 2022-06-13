import { axiosInstance } from '../helpers/axios-config'

const getUser = () => {
    return axiosInstance.get('usuarios', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getUserbyId = (userId) => {
    return axiosInstance.get(`usuarios/${userId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const postUser = (data) => {
    return axiosInstance.post('usuarios', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const putUser = (userId, data) => {
    return axiosInstance.put(`usuarios/${userId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getUser, getUserbyId, postUser, putUser,
}
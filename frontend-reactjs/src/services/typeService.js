import { axiosInstance } from '../helpers/axios-config'

const getType = () => {
    return axiosInstance.get('tipos', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getTypebyId = (typeId) => {
    return axiosInstance.get(`tipos/${typeId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const postType = (data) => {
    return axiosInstance.post('tipos', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const putType = (typeId, data) => {
    return axiosInstance.put(`tipos/${typeId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getType, getTypebyId, postType, putType,
}
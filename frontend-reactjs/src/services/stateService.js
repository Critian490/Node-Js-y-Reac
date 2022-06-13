import { axiosInstance } from '../helpers/axios-config'

const getState = () => {
    return axiosInstance.get('estados', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getStatebyId = (stateId) => {
    return axiosInstance.get(`estados/${stateId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const postState = (data) => {
    return axiosInstance.post('estados', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const putState = (stateId, data) => {
    return axiosInstance.put(`estados/${stateId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getState, getStatebyId, postState, putState,
}
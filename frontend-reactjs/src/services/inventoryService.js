import { axiosInstance } from '../helpers/axios-config'

const getInventory = () => {
    return axiosInstance.get('inventario', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getInventorybyId = (inventoryId) => {
    return axiosInstance.get(`inventario/${inventoryId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const postInventory = (data) => {
    return axiosInstance.post('inventario', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const putInventory = (inventoryId, data) => {
    return axiosInstance.put(`inventario/${inventoryId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getInventory, getInventorybyId, postInventory, putInventory,
}
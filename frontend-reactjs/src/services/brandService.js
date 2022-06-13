import { axiosInstance } from '../helpers/axios-config'

const getBrand = () => {
    return axiosInstance.get('marcas', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getBrandbyId = (brandId) => {
    return axiosInstance.get(`marcas/${brandId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}


const postBrand = (data) => {
    return axiosInstance.post('marcas', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const putBrand = (brandId, data) => {
    return axiosInstance.put(`marcas/${brandId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getBrand, getBrandbyId, postBrand, putBrand,
}
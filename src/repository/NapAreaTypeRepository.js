import axios from '../axios/app';

const NapAreaTypeRepository = {
    getAllAreaTypesPagedWithKeyword: (keyword, page=0, size=10) => {
        return axios.get(`/rest/nap-area-type/all?keyword=${keyword}&page=${page}&size=${size}`)
    },

    getAllAreaTypesPagedWithoutKeyword: (page=0, size=10) => {
        return axios.get(`/rest/nap-area-type/allWithout?page=${page}&size=${size}`)
    },

    findAreaTypeById: (areaTypeId) => {
        return axios.get(`/rest/nap-area-type/${areaTypeId}`)
    },

    findAllActiveAreaTypes: () => {
        return axios.get(`/rest/nap-area-type/allActive`)
    },

    createAreaType: (areaType) => {
        return axios.post(`/rest/nap-area-type/create`, areaType)
    },

    updateAreaType: (areaType) => {
        return axios.put(`/rest/nap-area-type/update`, areaType)
    },

    deleteAreaType: (areaTypeId) => {
        return axios.put(`/rest/nap-area-type/delete/${areaTypeId}`)
    }
}

export default NapAreaTypeRepository;
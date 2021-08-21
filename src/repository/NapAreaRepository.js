import axios from '../axios/app';

const NapAreaRepository = {

    getAllNapAreaPaged: (keyword, page=0, size=10) => {
        return axios.get(`/rest/nap-area/all?keyword=${keyword}&page=${page}&size=${size}`)
    },

    findNapAreaById: (napAreaId) => {
        return axios.get(`/rest/nap-area/${napAreaId}`)
    },

    findAllActiveNapAreas: () => {
        return axios.get(`/rest/nap-area/allActive`)
    },

    findAllActiveNapAreasByNap: (napId) => {
        return axios.get(`/rest/nap-area/allActiveByNap/${napId}`)
    },

    createNapArea: (napArea) => {
        return axios.post(`/rest/nap-area/create`, napArea)
    },

    updateNapArea: (napArea) => {
        return axios.put(`/rest/nap-area/update`, napArea)
    },

    deleteNapArea: (napAreaId) => {
        return axios.put(`/rest/nap-area/delete/${napAreaId}`)
    }
}

export default NapAreaRepository;
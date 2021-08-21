import axios from '../axios/app';

const AreaOfInterestRepository = {

    getAllAreasOfInterest: (keyword, page=0, size=10) => {
        return axios.get(`/rest/area-of-interest/get-all?keyword=${keyword}&page=${page}&size=${size}`);
    },

    createAreaOfInterest: (areaOfInterest) => {
        return axios.post(`/rest/area-of-interest/create`, areaOfInterest)
    },

    updateAreaOfInterest: (areaOfInterest) => {
        return axios.put(`/rest/area-of-interest/update`, areaOfInterest)
    },

    deleteAreaOfInterest: (areaId) => {
        return axios.put(`/rest/area-of-interest/delete/${areaId}`)
    },

    findAreaOfInterestById: (areaId) => {
        return axios.get(`/rest/area-of-interest/${areaId}`)
    },

    findAllActive: () => {
        return axios.get(`/rest/area-of-interest/allActive`)
    },

    findAreasForUser: () => {
        return axios.get(`/rest/area-of-interest/areasForUser`)
    }
}

export default AreaOfInterestRepository;
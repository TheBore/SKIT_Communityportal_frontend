import axios from '../axios/app';

const NAPRepository = {

    getAllNAPs: () => {
        return axios.get('/rest/nap/all')
    },

    getRecentNAPs: () => {
        return axios.get('rest/nap/all-recent')
    },

    getAllNAPsList: () => {
        return axios.get('rest/nap/all-list')
    },

    getNAPById: (id) => {
        return axios.get(`rest/nap/${id}`)
    },

    createNap: (entity) => {
        return axios.post('/rest/nap/create', entity)
    },

    updateNap: (entity, id) => {
        return axios.put(`/rest/nap/update/${id}`, entity)
    },

    openForEvaluation: (checked, id) => {
        return axios.put(`/rest/nap/evaluation-status/${id}/${checked}`)
    }
}

export default NAPRepository;
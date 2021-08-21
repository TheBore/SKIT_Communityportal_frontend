import axios from '../axios/app';

const MeasureRepository = {

    getAllMeasuresList: () => {
        return axios.get('/rest/measure/all-list')
    },

    getMeasureById: (id) => {
        return axios.get(`/rest/measure/${id}`)
    },

    getMeasuresByNapId: (id) => {
        return axios.get(`/rest/measure/all-by-nap/${id}`)
    },

    getMeasuresByProblemId: (id) => {
        return axios.get(`/rest/measure/all-by-problem/${id}`)
    },

    createMeasure: (entity) => {
        return axios.post('/rest/measure/create', entity)
    },

    updateMeasure: (entity) => {
        return axios.put('/rest/measure/update', entity)
    }
}

export default MeasureRepository;
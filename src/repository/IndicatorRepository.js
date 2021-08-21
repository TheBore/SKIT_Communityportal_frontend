import axios from '../axios/app';

const IndicatorRepository = {

    getAllIndicatorsList: () => {
        return axios.get('/rest/indicator/all-list')
    },

    getAllIndicatorsByActivityId: (id) => {
        return axios.get(`/rest/indicator/all-by-activity/${id}`)
    },

    getAllIndicatorsPageByActivityId: (id, page) => {
        return axios.get(`/rest/indicator/all-by-activity-page/${id}?page=${page}&size=5`)
    },

    createIndicator: (entity) => {
        return axios.post('/rest/indicator/create', entity)
    },

    updateIndicator: (entity, id) => {
        return axios.post(`/rest/indicator/update/${id}`, entity)
    },

    findIndicatorById: (id) => {
        return axios.get(`/rest/indicator/${id}`)
    },

    updateIndicatorOnEvaluation: (entity) => {
        return axios.put('rest/indicator/update-indicator-on-evaluation', entity)
    }

}

export default IndicatorRepository;
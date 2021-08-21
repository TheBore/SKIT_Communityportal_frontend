import axios from '../axios/app';

const ActivityRepository = {

    getActivityById: (id) => {
        return axios.get(`/rest/activity/${id}`)
    },

    getAllActivitiesList: () => {
        return axios.get('/rest/activity/all-list')
    },

    getActivitiesByMeasureId: (id) => {
        return axios.get(`/rest/activity/all-by-measure/${id}`)
    },

    createActivity: (entity) => {
        return axios.post('/rest/activity/create', entity)
    },

    updateActivity: (entity, id) => {
        return axios.post(`/rest/activity/update/${id}`, entity)
    },

    getAllInstitutionsByActivity: (id) => {
        return axios.get(`/rest/activity/all-institutions-by-activity/${id}`)
    },

    getAllActivitiesByInstitution: (id) => {
        return axios.get(`/rest/activity/all-by-institution/${id}`)
    }

}

export default ActivityRepository
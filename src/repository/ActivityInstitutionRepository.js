import axios from '../axios/app';

const ActivityInstitutionRepository = {
    getAllActivityInstitutionPaged: (keyword, page=0, size=10) => {
        return axios.get(`/rest/activityInstitution/paged?keyword=${keyword}&page=${page}&size=${size}`)
    },

    findActivityInstitutionById: (activityInstitutionId) => {
        return axios.get(`/rest/activityInstitution/${activityInstitutionId}`)
    },

    findAllActivityInstitutions: () => {
        return axios.get(`/rest/activityInstitution/all-listed`)
    },

    createActivityInstitution: (activityInstitution) => {
        return axios.post(`/rest/activityInstitution/create`, activityInstitution)
    },

    updateActivityInstitution: (activityInstitution) => {
        return axios.put(`/rest/activityInstitution/update`, activityInstitution)
    },

    deleteActivityInstitution: (activityInstitutionId) => {
        return axios.delete(`/rest/activityInstitution/delete/${activityInstitutionId}`)
    }
}

export default ActivityInstitutionRepository;
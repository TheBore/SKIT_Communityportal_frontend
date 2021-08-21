import axios from '../axios/app';

const StatusRepository = {

    getAllStatuses: (keyword) => {
        return axios.get(`/rest/status/all?keyword=${keyword}`)
    },
    getStatusById: (statusId) => {
        return axios.get(`/rest/status/${statusId}`)
    },
    createStatus: (status) => {
        return axios.post(`/rest/status/create`, status)
    },
    updateStatus: (status) => {
        return axios.put(`/rest/status/update`, status)
    },
    deleteStatus: (statusId) => {
        return axios.delete(`/rest/status/delete/${statusId}`)
    },
    getStatusesByType: (statusType) => {
        return axios.get(`/rest/status/getStatusesByType?statusType=${statusType}`)
    }
}

export default StatusRepository;
import axios from '../axios/app';

const SendRequestForEvaluationRepository = {

    sendRequestForEvaluation: (instIds, title, body) => {
        return axios.post(`/rest/sendRequest/institutions/${instIds}?title=${title}&body=${body}`)
    },

    findAllPaged: (page = 0, size = 10) => {
        return axios.get(`/rest/sendRequest/paged?page=${page}&size=${size}`)
    },

    sendRequestForEvaluationTags: (tagsIds, title, body) => {
        return axios.post(`/rest/sendRequest/tags/${tagsIds}?title=${title}&body=${body}`)
    },

    sendRequestForEvaluationCategories: (categoriesIds, title, body) => {
        return axios.post(`/rest/sendRequest/categories/${categoriesIds}?title=${title}&body=${body}`)
    },

    notifyDirectors: (emails, message) => {
        return axios.post(`/rest/sendRequest/notify/${emails}?message=${message}`)
    }

}

export default SendRequestForEvaluationRepository;
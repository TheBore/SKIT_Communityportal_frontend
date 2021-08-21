import axios from '../axios/app';

const EvaluationRepository = {

    createEvaluation: (entity) => {
        return axios.post('/rest/evaluation/create', entity)
    },

    getEvaluationByNapId: (napId) => {
        return axios.get(`/rest/evaluation/get-by-nap/${napId}`)
    },

    getAllEvaluations: (napId) => {
        return axios.get(`/rest/evaluation/all-by-nap/${napId}`)
    },

    openOldEvaluation: (evaluationId) => {
        return axios.put(`/rest/evaluation/open-old/${evaluationId}`)
    }

}

export default EvaluationRepository
import axios from '../axios/app';

const ProblemRepository = {

    findAllProblemsList: () => {
        return axios.get('/rest/problem/all-list')
    },

    findProblemById : (id) => {
        return axios.get(`/rest/problem/${id}`)
    },

    createProblem: (entity) => {
        return axios.post('/rest/problem/create', entity)
    },

    updateProblem: (entity) => {
        return axios.put('/rest/problem/update', entity)
    }

}

export default ProblemRepository;
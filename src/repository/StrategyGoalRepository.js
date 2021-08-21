import axios from '../axios/app';

const StrategyGoalRepository = {

    getAllStrategyGoalsPaged: (keyword, page=0, size=10) => {
        return axios.get(`/rest/strategy-goal/all?keyword=${keyword}&page=${page}&size=${size}`)
    },

    getAllStrategyGoalsList: () => {
        return axios.get('rest/strategy-goal/all-listed')
    },

    findStrategyGoalById: (strategyGoalId) => {
        return axios.get(`/rest/strategy-goal/${strategyGoalId}`)
    },

    createStrategyGoal: (strategyGoal) => {
        return axios.post(`/rest/strategy-goal/create`, strategyGoal)
    },

    updateStrategyGoal: (strategyGoal) => {
        return axios.put(`/rest/strategy-goal/update`, strategyGoal)
    },

    deleteStrategyGoal: (strategyGoalId) => {
        return axios.put(`/rest/strategy-goal/delete/${strategyGoalId}`)
    }

}

export default StrategyGoalRepository;
import axios from '../axios/app';

const QuestionRepository = {

    getAllQuestions: (page = 0, size = 10) => {
        return axios.get(`/rest/question/all?page=${page}&size=${size}`);
    },

    getAllQuestionsAdmin: (page = 0, size = 10) => {
        return axios.get(`/rest/question/allQuestions?page=${page}&size=${size}`);
    },

    addQuestion: (question) => {
        return axios.post(`/rest/question/create`, question);
    },

    getQuestionById: (id) => {
        return axios.get(`/rest/question/${id}`);
    },

    updateQuestion: (question) => {
        return axios.patch(`/rest/question/update`, question);
    },

    deleteQuestion: (id) => {
        return axios.post(`/rest/question/delete/${id}`);
    },

    unDeleteQuestion: (id) => {
        return axios.post(`/rest/question/unDelete/${id}`);
    },

    getAllInactiveQuestions: (page = 0, size = 10) => {
        return axios.get(`/rest/question/allQuestionsNotActive?page=${page}&size=${size}`);
    },

    numberOfMessagesForQuestion: (questionId) => {
        return axios.get(`/rest/question/numberOfMessagesForQuestion/${questionId}`)
    }


};

export default QuestionRepository;

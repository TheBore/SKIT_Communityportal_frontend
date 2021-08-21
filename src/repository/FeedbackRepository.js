import axios from "../axios/app";

const FeedbackRepository = {

    getFeedbackById: (id) => {
        return axios.get("/rest/feedback/" + id)
    },
    getFeedbackPage: (page = 0, size = 10) => {
        return axios.get(`/rest/feedback/paged?page=${page}&size=${size}`);
    },
    addFeedback: (form) => {
        return axios.post("/rest/feedback/add", form)
    },
    editFeedback: (entity) => {
        return axios.patch(`/rest/feedback/edit`, entity)
    },
    deleteFeedback: (id) => {
        return axios.delete("/rest/feedback/" + id)
    },
    getFeedbackStatistics: (id) => {
        return axios.get("/rest/feedback/analyse/" + id)
    },
    getFeedbackStatisticsAnswersUsers: (feedbackId,answer) => {
        return axios.get(`/rest/answer/institutions?feedbackitemid=${feedbackId}&answer=${answer}`)
    },
    getNumberOfFeedbackPublishes: (id) => {
        return axios.get(`/rest/feedback/publishes-number/${id}`)
    }

};

export default FeedbackRepository;
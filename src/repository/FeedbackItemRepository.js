import axios from "../axios/app";

const FeedbackItemRepository = {

    getFeedbackItemPage: (feedbackId, page = 0, size = 5) => {
        return axios.get(`/rest/allfeeditems/${feedbackId}/paged?page=${page}&size=${size}`)
    },
    addFeedbackItem: (feedbackId, obj) => {
        return axios.post(`/rest/addfeeditem?feedbackId=${feedbackId}`, obj)
    },
    deleteFeedbackItem: (id) => {
        return axios.delete(`/rest/deletefeeditem/${id}`)
    },
    updateFeedbackItem: (obj) => {
        return axios.patch(`/rest/updatefeeditem`, obj)
    },
    getAllFeedbackItemsRest: (feedbackId) => {
        return axios.get(`/rest/feedbackitem/all?feedbackId=${feedbackId}`)
    },
    saveFileForFeedbackAnswer: (form) => {
        return axios.post(`/rest/answer/addAttachment`, form)
    },
    getAttachmentsForFeedbackItem: (feedbackItemId) => {
        return axios.get(`/rest/feedbackitem/answer/${feedbackItemId}`)
    }

}
export default FeedbackItemRepository;
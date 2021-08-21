import axios from "../axios/app";

const FeedbackPublicationRepository = {

    publishFeedbackToInstitutions: (feedbackId, insIds) => {
        return axios.post("/rest/feedback/" + feedbackId + "/institution/" + insIds)
    },
    publishFeedbackToTags: (feedbackId, tagIds) => {
        return axios.post("/rest/feedback/" + feedbackId + "/tags/" + tagIds)
    },
    getFeedbackPublication: (feedbackId, page = 0, size = 10) => {
        return axios.get(`/rest/feedpub/${feedbackId}/paged?page=${page}&size=${size}`)
    },
    getFeedbackPublicationById: (feedPubId) => {
        return axios.get(`/rest/getFeedPub/${feedPubId}`)
    },
    deleteFeedbackPub: (feedpubId) => {
        return axios.delete(`/rest/feedbackPub/${feedpubId}`)
    },
    remindFeedbackPub: (institutionId, message) => {
        return axios.post(`/rest/feedback/mail/reminder?fpinstitutionId=${institutionId}&message=${message}`)
    },
    escalateFeedbackPub: (direktorEmail, message) => {
        return axios.post(`/rest/feedback/mail/escalate?direktorEmail=${direktorEmail}&message=${message}`)
    },
    getFeedbackPublicationsForInstitution: (institutionId, page = 0, size = 9) => {
        return axios.get(`/rest/feedbackpub/paged?institutionId=${institutionId}&page=${page}&size=${size}`);
    },
    markReadFeedPub: (feedpubId) => {
        return axios.post(`/rest/feedbackPub/markRead/${feedpubId}`)
    },
    submitAnswers: (feedbackPublicationId, answers) => {
        const data = {}
        for (let [key, value] of Object.entries(answers)) {
            if (Array.isArray(value)) {
                data[key] = value.join(";");
            } else {
                data[key] = value;
            }
        }
        return axios.post(`/rest/saveFeedbackAnswers/${feedbackPublicationId}`, data);
    },
    getAnswers: (feedbackPublicationId) => {
        return axios.get(`/rest/getByPublication/${feedbackPublicationId}`);
    }
};

export default FeedbackPublicationRepository;
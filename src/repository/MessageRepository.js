import axios from '../axios/app';

const MessageRepository = {

    getMessagesForQuestion: (questionId, selectedPage) => {
        return axios.get(`/rest/message/allActive/${questionId}?page=${selectedPage}&size=10`);
    },

    getInactiveMessagesForQuestion: (questionId, selectedPage) => {
        return axios.get(`/rest/message/allInactive/${questionId}?page=${selectedPage}&size=10`);
    },

    createMessageInQuestion: (email, questionId, message) => {
        return axios.post(`/rest/message/create/${questionId}?email=${email}`, message)
    },


    deleteMessage: (messageId) => {
        return axios.post(`/rest/message/delete/${messageId}`);
    },

    unDeleteMessage: (messageId) => {
        return axios.post(`/rest/message/unDelete/${messageId}`);
    },

    findMessageById: (messageId) => {
        return axios.get(`/rest/message/${messageId}`);
    },

    getMessagesForAdmin: (questionId, selectedPage) => {
        return axios.get(`/rest/message/allMessages/${questionId}?page=${selectedPage}&size=10`)
    },

    updateMessage: (message) => {
        return axios.put(`/rest/message/update`, message)
    },

    createReplyMessage: (replyMessageId, questionId, email, message) => {
        return axios.post(`/rest/message/createReplyMessage/${replyMessageId}/${questionId}?email=${email}`, message)
    },
}

export default MessageRepository;
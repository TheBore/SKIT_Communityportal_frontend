import axios from '../axios/app';

const FAQRepository = {

    getAllFAQ: (page = 0, size = 5) => {
        return axios.get(`/rest/faq/all?page=${page}&size=${size}`)
    },
    deleteFAQ: (id) => {
        return axios.delete(`/rest/faq/delete/${id}`)
    },
    addFAQ: (questionMK, questionAL, answerMK, answerAL, attachment) => {
        let data = new FormData();
        data.set("questionMK", questionMK);
        data.set("questionAL", questionAL);
        data.set("answerMK", answerMK);
        data.set("answerAL", answerAL);
        if (attachment !== null)
            data.set("attachment", attachment);

        return axios.post("/rest/faq/create", data);
    },
    updateFAQ: (questionMK, questionAL, answerMK, answerAL, attachment, id) => {
        let data = new FormData();
        data.set("questionMK", questionMK);
        data.set("questionAL", questionAL);
        data.set("answerMK", answerMK);
        data.set("answerAL", answerAL);
        if (attachment !== null) {
            data.set("attachment", attachment);
        }
        data.set("id", id);

        return axios.patch("/rest/faq/update", data);
    },
    getAttachment: (id) => {
        return axios.get(`/rest/faq/download/${id}`)
    }
};
export default FAQRepository;
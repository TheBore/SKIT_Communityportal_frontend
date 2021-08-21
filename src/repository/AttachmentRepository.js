import axios from '../axios/app';

const AttachmentRepository = {

    downloadAttachment: (id) => {
        return axios.get("/rest/attachment/download/"+id)
    },

    addAttachment: (attachment) => {
        return axios.post(`/rest/attachment/addAttachment`, attachment)
    }
};
export default AttachmentRepository;
import axios from '../axios/app';

const AnnouncementAttachmentRepository = {

    addAttachment: (request) => {
        return axios.post("/rest/addAttachment", request)
    },
    getAttachments:(annId)=>{
        return axios.get("/rest/attachments/"+annId)
    },
    removeAttachment:(annId,attId) => {
        return axios.delete('/rest/deleteAnnAtt?announcementId='+annId+"&attachmentId="+attId)
    }


};

export default AnnouncementAttachmentRepository;
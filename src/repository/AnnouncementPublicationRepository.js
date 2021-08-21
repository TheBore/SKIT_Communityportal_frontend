import axios from '../axios/app';

const AnnouncementPublicationRepository = {
    getPublicationByAnnId: (id, selectedPage) => {
        return axios.get(`/rest/annpub/${id}?page=${selectedPage}&size=10`);
    },
    deleteAnnPub: (id) => {
        return axios.delete('/rest/annpub/' + id);
    },
    sendMailRemind: (apinstitutionId, message) => {
        const form = new FormData();
        form.append("apinstitutionId", apinstitutionId);
        form.append("message", message);
        return axios.post('/rest/mail/reminder', form);
    },
    sendMailEscalate: (direktorEmail, message) => {
        const form = new FormData();
        form.append("direktorEmail", direktorEmail);
        form.append("message", message);
        return axios.post('/rest/mail/escalate', form);
    },
    getAnnPubPaged: (receiverId, selectedPage) => {
        return axios.get(`/rest/annpub/paged?receiverId=${receiverId}&page=${selectedPage}&size=9`)
    },
    markReadAndOpenAnnPub: (id) => {
        return axios.post('/rest/myannouncements/' + id)
    },
    publishToInstitutions: (annId, institutions) => {
        return axios.post("/rest/ann/" + annId + "/institution/" + institutions)
    },
    publishToTags: (annId, tags) => {
        return axios.post("/rest/ann/" + annId + "/publishByInstitutionTags/" + tags)
    },
    report: (page = 0, size = 10) => {
        return axios.get(`/rest/annPub/report?page=${page}&size=${size}`)
    },
    reportByTitle: (title, page = 0, size = 10) => {
        return axios.get(`/rest/annPub/reportbyann?title=${title}&page=${page}&size=${size}`)
    },
    reportByUser: (firstName, lastName, page = 0, size = 10) => {
        return axios.get(`/rest/annPub/reportbyuser?firstName=${firstName}&lastName=${lastName}&page=${page}&size=${size}`)
    },
    getAttachemtsForPublication: (annPubId) => {
        return axios.get(`rest/attachIds/${annPubId}`)
    }
};

export default AnnouncementPublicationRepository;
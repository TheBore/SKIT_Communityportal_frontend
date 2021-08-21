import axios from '../axios/app';

const AnnouncementRepository = {

    addAnnouncement: (request) => {
        return axios.post("/rest/createAnn", request)
    },
    getAnnouncementById: (id) => {
        return axios.get("/rest/announcement/" + id)
    },
    updateAnnouncement: (announcement) => {
        return axios.patch(`/rest/updateAnn`,announcement)
    },
    getNumberOfAnnouncementPublishes: (id) => {
        return axios.get(`/rest/announcement/number-publishes/${id}`)
    }

};

export default AnnouncementRepository;